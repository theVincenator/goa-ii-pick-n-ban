'use client'
import { useEffect, useState } from 'react';

import heroData from './herodataimporter';
import HeroButton from './herobutton'
import HeroCard from './herocard'

import "./pickbanscreen.css";

function TeamAPicks({ teamsize, teamAPicks }) {
    let picks = []
    for (let n = 0; n < teamsize; n++) {
        const name = teamAPicks[n] ? teamAPicks[n].name : "";
        picks.push(<HeroCard key={"teamapick" + n} heroname={name} />);
    }
    return (
        <div className="pickrow">
            {picks}
        </div>
    )
}

function TeamABans({ teamsize, teamABans }) {
    let bans = []
    for (let n = 0; n < teamsize; n++) {
        const name = teamABans[n] ? teamABans[n].name : "";
        bans.push(<HeroCard key={"teamaban" + n} heroname={name} />);
    }
    return (
        <div className="banrow">
            {bans}
        </div>
    )
}

function TeamBPicks({ teamsize, teamBPicks }) {
    let picks = []
    for (let n = 0; n < teamsize; n++) {
        const name = teamBPicks[n] ? teamBPicks[n].name : "";
        picks.push(<HeroCard key={"teambpick" + n} heroname={name} />);
    }
    return (
        <div className="pickrow">
            {picks}
        </div>
    )
}

function TeamBBans({ teamsize, teamBBans }) {
    let bans = []
    for (let n = 0; n < teamsize; n++) {
        const name = teamBBans[n] ? teamBBans[n].name : "";
        bans.push(<HeroCard key={"teambban" + n} heroname={name} />);
    }
    return (
        <div className="banrow">
            {bans}
        </div>
    )
}

function TeamAPicksAndBans({ teamAStatus, teamsize, teamAPicks, teamABans }) {
    return (
        <div className="teamAPicksAndBans">
            <div className="teamAStatus">
                {teamAStatus}
            </div>
            <TeamAPicks teamsize={teamsize} teamAPicks={teamAPicks} />
            <TeamABans teamsize={teamsize} teamABans={teamABans} />
        </div>
    );
}

function TeamBPicksAndBans({ teamBStatus, teamsize, teamBPicks, teamBBans }) {
    return (
        <div className="teamBPicksAndBans">
            <div className="teamBStatus">
                {teamBStatus}
            </div>
            <TeamBPicks teamsize={teamsize} teamBPicks={teamBPicks} />
            <TeamBBans teamsize={teamsize} teamBBans={teamBBans} />
        </div>
    );
}

function AllPicksAndBans({ teamAStatus, teamBStatus, teamsize, teamAPicks, teamABans, teamBPicks, teamBBans }) {
    return (
        <div className="picksAndBans">
            <TeamAPicksAndBans
                teamAStatus={teamAStatus}
                teamsize={teamsize}
                teamAPicks={teamAPicks}
                teamABans={teamABans}
            />
            <TeamBPicksAndBans
                teamBStatus={teamBStatus}
                teamsize={teamsize}
                teamBPicks={teamBPicks}
                teamBBans={teamBBans}
            />
        </div>
    );
}

function HeroGrid({ onSelectedHeroChange, pickOrBanStep, selectedHero, teamAPicks, teamABans, teamBPicks, teamBBans }) {
    const unselectableHeroes = [...teamAPicks, ...teamABans, ...teamBPicks, ...teamBBans];

    let highlightClassName;
    if (pickOrBanStep) {
        highlightClassName = pickOrBanStep.charAt(0) === "A" ? "teamAHighlight" : "teamBHighlight";
    }

    function createRandomHeroButton() {

        const classNamesRandomButton = ['heroButton randomHeroButton'];
        if (selectedHero === null) {
            classNamesRandomButton.push("selectedHeroButton");
            classNamesRandomButton.push(highlightClassName);
        }
        return (
            <HeroButton
                key="Random"
                heroname="Random"
                className={classNamesRandomButton.join(' ')}
                onSelectedHeroChange={() => onSelectedHeroChange(null)}
                isDisabled={false}
            />
        )
    }

    return (
        <div className="heroGrid">
            {createRandomHeroButton()}
            {
                heroData.map((hero) => {
                    let classNames = ["heroButton"];
                    if (hero === selectedHero) {
                        classNames.push("selectedHeroButton");
                        classNames.push(highlightClassName);
                    }

                    if (teamAPicks.includes(hero)) {
                        classNames.push("pickedByTeamAHeroButton");
                    }

                    if (teamBPicks.includes(hero)) {
                        classNames.push("pickedByTeamBHeroButton");
                    }

                    if (teamABans.includes(hero) || teamBBans.includes(hero)) {
                        classNames.push("bannedHeroButton");
                    }

                    return (
                        <HeroButton
                            key={hero.name}
                            heroname={hero.name}
                            className={classNames.join(' ')}
                            onSelectedHeroChange={() => onSelectedHeroChange(hero)}
                            isDisabled={unselectableHeroes.includes(hero)}
                        />
                    )
                })
            }
        </div >
    );
}

function StatPip({ isLight, isOff }) {
    let classNames = ["statPip"];
    if (isOff) {
        classNames.push("offPip");

    } else if (isLight) {
        classNames.push("lightPip");
    } else {
        classNames.push("fullPip");
    }
    return <div className={classNames.join(' ')} />
}

function StatRow({ name, value }) {
    let fullStats = 0;
    let lightStats = 0;
    if (Array.isArray(value)) {
        fullStats = value[0];
        lightStats = value[1];
    } else {
        fullStats = value;
        lightStats = value;
    }

    return (
        <div className='heroStat'>
            <div>{name}</div>
            <div className="heroStatPips">
                {Array.from({ length: 8 }, (_, i) => <StatPip key={name + i}
                    isLight={i > fullStats ? true : false}
                    isOff={i > lightStats}
                />)}
            </div>
        </div>
    );
}

function HeroInfo({ selectedHero }) {
    if (selectedHero) {
        const conjunction = selectedHero.name != "Widget" ? ", " : " and ";
        return (
            <div className="heroInfo">
                <div className="heroName">
                    {selectedHero.name}{conjunction}{selectedHero.class}
                </div>
                <div className="difficultyLevel">
                    {' ★'.repeat(selectedHero.difficulty)}
                </div>
                <div className="heroStats">
                    <StatRow name="Attack" value={selectedHero.attack} />
                    <StatRow name="Defense" value={selectedHero.defense} />
                    <StatRow name="Initiative" value={selectedHero.initiative} />
                    <StatRow name="Movement" value={selectedHero.movement} />
                </div>
            </div >
        );
    } else {
        return (
            <div className="heroInfo randomHeroInfo">
                ?
            </div>
        );
    }
}

function HeroPicker({ submitSelection, allowSelection, pickOrBanStep, teamAPicks, teamABans, teamBPicks, teamBBans }) {
    const [selectedHero, setSelectedHero] = useState(null);

    const unselectableHeroes = [...teamAPicks, ...teamABans, ...teamBPicks, ...teamBBans];
    if (unselectableHeroes.includes(selectedHero)) { setSelectedHero(null) };

    function onConfirm() {
        submitSelection(selectedHero);
        setSelectedHero(null);
    }

    return (
        <div className='heroPicker'>
            <HeroGrid
                onSelectedHeroChange={setSelectedHero}
                pickOrBanStep={pickOrBanStep}
                selectedHero={selectedHero}
                teamAPicks={teamAPicks}
                teamABans={teamABans}
                teamBPicks={teamBPicks}
                teamBBans={teamBBans}
            />
            <div className='confirmbuttonAndInfo'>
                <HeroInfo selectedHero={selectedHero} />
                <ConfirmButton
                    onConfirm={onConfirm}
                    allowSelection={allowSelection}
                    pickOrBanStep={pickOrBanStep}
                    selectedHero={selectedHero}
                />
            </div>
        </div >
    );
}

function ConfirmButton({ onConfirm, allowSelection, pickOrBanStep, selectedHero }) {
    if (!pickOrBanStep) {
        return null;
    }

    let pickOrBanInfoText = "Wait";
    let forTeamText = "for other Team...";
    let heroname = "";

    if (allowSelection) {
        if (pickOrBanStep.charAt(1) === "P") {
            pickOrBanInfoText = "Pick";
            forTeamText = pickOrBanStep.charAt(0) === "A" ? "for Team A" : "for Team B";
        } else {
            pickOrBanInfoText = "Ban"
            forTeamText = "";
        }

        heroname = selectedHero === null ? "a random hero" : selectedHero.name.toUpperCase();
    }

    return (
        <button className="confirmButton" disabled={!allowSelection} onClick={() => onConfirm()
        }>
            {pickOrBanInfoText} {heroname} {forTeamText}
        </button >
    )
}

// AP: Team A, the starting team, picks, AP: Team A bans
// BP: Team B, the other team, picks, BB: Team B bans
const completePickBanOrder = [
    "AB", "BB", "AP", "BP", "BB", "AB", "BP", "AP", // 04 Players
    "AB", "BB", "BP", "AP",                         // 06 Players
    "BB", "AB", "AP", "BP",                         // 08 Players
    "BB", "AB", "BP", "AP"                          // 10 Players
];


export default function PickBanScreen({ handleExit, teamsize, connectionData, receivedHeroName }) {
    const [pickBanOrder, setPickBanOrder] = useState(completePickBanOrder.slice(0, teamsize * 4));
    const [teamAPicks, setTeamAPicks] = useState([]);
    const [teamABans, setTeamABans] = useState([]);
    const [teamBPicks, setTeamBPicks] = useState([]);
    const [teamBBans, setTeamBBans] = useState([]);

    useEffect(() => {
        if (receivedHeroName) {
            console.log("Received Pick: " + receivedHeroName)
            const receivedHero = heroData.find((h) => { return h.name === receivedHeroName });
            selectHero(receivedHero);
        }
    }, [receivedHeroName]);

    // check if its "your turn"
    const allowSelection = pickBanOrder[0] && (
        (!connectionData.isOnline)
        || (connectionData.isHosting && pickBanOrder[0].charAt(0) === "A")
        || (!connectionData.isHosting && pickBanOrder[0].charAt(0) === "B"));

    function onSubmitSelection(hero) {
        let chosenHero;
        if (hero === null) {
            // select random hero
            let unselectableHeroes = [
                ...teamAPicks,
                ...teamABans,
                ...teamBPicks,
                ...teamBBans
            ];

            let selectableHeroes = heroData.filter((h) => !unselectableHeroes.includes(h));
            chosenHero = selectableHeroes[Math.floor(Math.random() * selectableHeroes.length)];
        } else {
            chosenHero = hero;
        }

        selectHero(chosenHero);

        // send game state to others
        if (connectionData.isOnline) {
            connectionData.connection.send(chosenHero.name);
        }
    }

    function selectHero(hero) {
        switch (pickBanOrder[0]) {
            case "AP":
                setTeamAPicks([...teamAPicks, hero]);
                break;
            case "AB":
                setTeamABans([...teamABans, hero]);
                break;
            case "BP":
                setTeamBPicks([...teamBPicks, hero]);
                break;
            case "BB":
                setTeamBBans([...teamBBans, hero]);
                break;
        }
        setPickBanOrder(pickBanOrder.slice(1));
    }

    let teamAStatus;
    let teamBStatus;

    switch (pickBanOrder[0]) {
        case "AP":
            teamAStatus = "Team A is picking...";
            break;
        case "AB":
            teamAStatus = "Team A is banning...";
            break;
        case "BP":
            teamBStatus = "Team B is picking...";
            break;
        case "BB":
            teamBStatus = "Team B is banning...";
            break;
        default:
            teamAStatus = "Team A:";
            teamBStatus = "Team B:";
            break;
    }

    return (
        <div className='scalebox'>
            <div className="pickBanScreen">
                <div className="headerBar">
                    <button className="quitButton" onClick={() => handleExit()}>Back to Main Menu (Abandon)</button>
                    <div className="hostingStatus">
                        {connectionData.isOnline && connectionData.isHosting ? <>Hosting game {connectionData.label}</> : null}
                        {connectionData.isOnline && !connectionData.isHosting ? <>Connected to game {connectionData.label}</> : null}
                    </div>
                </div>
                <AllPicksAndBans
                    teamAStatus={teamAStatus}
                    teamBStatus={teamBStatus}
                    teamsize={teamsize}
                    teamAPicks={teamAPicks}
                    teamABans={teamABans}
                    teamBPicks={teamBPicks}
                    teamBBans={teamBBans}
                />
                <HeroPicker
                    submitSelection={onSubmitSelection}
                    allowSelection={allowSelection}
                    pickOrBanStep={pickBanOrder[0]}
                    teamAPicks={teamAPicks}
                    teamABans={teamABans}
                    teamBPicks={teamBPicks}
                    teamBBans={teamBBans}
                />
            </div>
        </div>
    );
}