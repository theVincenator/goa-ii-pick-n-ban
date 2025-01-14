'use client'
import { useState } from 'react';

import PickBanScreen from './pickbanscreen.js';
import MainMenu from './mainmenu.js'

export default function App() {
  const availableTeamsizes = [2, 3, 4, 5];

  const [view, setView] = useState("mainmenu");
  const [teamsize, setTeamsize] = useState(availableTeamsizes[0]);
  const [connectionData, setConnectionData] = useState({ isOnline: false, connection: null, label: null, isHosting: false });
  const [receivedHeroName, setReceivedHeroName] = useState("");

  function handleExit() {
    if (connectionData.isOnline) {
      setConnectionData({ isOnline: false, connection: null, label: null, isHosting: false });
      setReceivedHeroName("");
    }
    setView("mainmenu");
  }

  function handleConnection(c: any, isHosting: boolean) {
    setConnectionData({ connection: c, label: c.label, isOnline: true, isHosting: isHosting });
    setReceivedHeroName("");

    c.on('data', function (heroName: string) {
      console.log("received data", heroName);
      setReceivedHeroName(heroName);
    });

    setView("pickbanscreen");
  }

  return (
    <div>
      {view == "mainmenu" ?
        <MainMenu
          onChangeView={setView}
          teamsize={teamsize}
          availableTeamsizes={availableTeamsizes}
          onChangeTeamSize={setTeamsize}
          onConnection={handleConnection}
        /> : null}
      {view == "pickbanscreen" ?
        <PickBanScreen
          handleExit={handleExit}
          teamsize={teamsize}
          connectionData={connectionData}
          receivedHeroName={receivedHeroName}
        /> : null}
    </div>
  )
}
