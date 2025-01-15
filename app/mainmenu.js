'use client'
import Peer from 'peerjs';
import { useState } from 'react';

import './mainmenu.css';

const appID = "GoA-II-Pick-n-Ban-Tool-Game-ID-";
var peer;

function TeamSizeSelector({ teamsize, availableTeamsizes, onChangeTeamSize }) {
    return (
        <select className="teamSizeSelector" value={teamsize} onChange={(e) => onChangeTeamSize(e.target.value)}>
            {availableTeamsizes.map(n => (
                <option key={n} value={n}>{n} players per team</option>
            ))}
        </select>
    )
}

function randomID() { return (Math.floor(Math.random() * 100000000)).toString() }

export default function MainMenu({ onChangeView, teamsize, availableTeamsizes, onChangeTeamSize, onConnection }) {
    const [state, setState] = useState("idle");
    const [gameID, setGameID] = useState(randomID);
    const [gameIDToJoin, setGameIDToJoin] = useState("");

    function startHosting() {
        setState("hosting");
        console.log("Starting peer server...")
        peer = new Peer(appID + teamsize.toString() + gameID);
        peer.on('open', function (id) {
            console.log('Host ID is: ' + id);
        });
        peer.on('connection', function (c) {
            console.log("Game was connected to.");
            onConnection(c, true);
        });
        peer.on('error', function (e) { console.log(e) });
    }

    function endHosting() {
        setState("idle");
        peer.destroy();
        setGameID(randomID);
        console.log("Peer server destroyed.");
    }

    function join() {
        onChangeTeamSize(parseInt(gameIDToJoin.charAt(0)))
        if (peer) { peer.destroy() }
        console.log("Starting peer server...")
        peer = new Peer();
        peer.on('open', function (id) {
            console.log('Host ID is: ' + id);
            const hostID = appID + gameIDToJoin;
            console.log("Connecting to Game: " + hostID);
            onConnection(peer.connect(hostID, { label: gameIDToJoin }), false);
        });
        peer.on('error', function (e) { console.log(e) });
    }

    return (
        <div className='mainMenu'>
            <h1>GoA II Pick'n'Ban</h1>
            {state == "idle" ? (
                <>
                    <div className='startMenu'>
                        <h2>Start game</h2>
                        <TeamSizeSelector
                            teamsize={teamsize}
                            availableTeamsizes={availableTeamsizes}
                            onChangeTeamSize={onChangeTeamSize}
                        />
                        <div className='startButtons'>
                            <button className="startButton" onClick={() => onChangeView("pickbanscreen")}>Start local</button>
                            <button className="startButton" onClick={() => startHosting()}>Host</button>
                        </div>
                    </div>
                    <h2>Join game</h2>
                    <div className='joinMenu'>
                        <div className='idForm'>
                            <div className='gameIDLabel'>Game ID:</div>
                            <input
                                className='idInputField'
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]{7}"
                                placeholder="xxxxxxx"
                                value={gameIDToJoin}
                                onChange={e => setGameIDToJoin(e.target.value)}
                            />
                        </div>
                        <button className='joinButton' onClick={() => join()}>Join</button>
                    </div>
                </>
            ) : null}
            {state == "hosting" ? (
                <div className='lobby'>
                    <label>Game ID: {teamsize.toString() + gameID}</label>
                    <button onClick={() => endHosting()}>End Hosting</button>
                </div>
            ) : null}

        </div >
    )
}