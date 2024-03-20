import './App.css'
import React, { useState, useEffect } from 'react'
import ShipStats from './Components/ShipStats'
import GearSelector from './Components/GearSelector'
import ShipSelector1 from './Components/ShipSelector1'
import Perks from './Components/Perks'
import CorpSkills from './Components/CorpSkills'
import ShipSkills from './Components/ShipSkills'
import PlayerSkills from './Components/PlayerSkills'
import Ships1 from './Data/Ships1.json'
import NewStats from './Data/NewStats.json'
import perksList from './Data/Perks.json'
import { romanToInt } from './Math/StatMultiplier'
import { finalizeStats } from './Math/AddBonusStats'
import AttackTimer from './Components/AttackTimer'

function App() {
  let newItem1 = Object.keys(perksList).map(key => {
    return [key, perksList[key]]
  })
  const [ shipinfo, setShipinfo ] = useState(Ships1[0].Ships[0])
  const [ newstats, setNewstats ] = useState(Object.keys(NewStats).map(key => {return [key, NewStats[key]]}))
  const [ shipperks, setShipperks ] = useState(Ships1[0].Ships[0].Perks[0])
  const [ gearperks, setGearperks ] = useState([[''], ['']])
  const [ elitelvl, setElitelvl ] = useState('')
  const [ shipmod, setShipmod ] = useState('')
  const [ modperks, setModperks ] = useState([[''], ['']])
  const [ activeperks, setActiveperks] = useState([newItem1[6], newItem1[9]])
  const [ extraperks, setExtraperks ] = useState([[''], ['']])
  const [ bonusEP, setBonusEP ] = useState(0)
  const [ extraitemstats, setExtraitemstats ] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [ corpskills, setCorpskills ] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [ playerskills, setPlayerskills ] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [ shipskills, setShipskills ] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  // console.log("******** NEW *********")
  // console.log(AttackTimer(5, 1, -0.45, false) / 1000)
  // console.log("******** NEW *********")

  let ultMod = [0, 0, 0, 0]
  let gunboatElite = 1
  let gunboatExtra = [0, 0, 0]

  if(shipmod === "ULT"){ultMod = [4, 1, 1, 1]}
  if(shipinfo.Ship_Class === "Gunboat"){gunboatElite = 3}
  switch (elitelvl) {
    case 'I':
      gunboatExtra = [1, 0, 0]
      break;
    case 'II':
      gunboatExtra = [2, 1, 0]
      break;
    case 'III':
      gunboatExtra = [2, 1, 1]
      break;
    case 'IV':
      gunboatExtra = [3, 2, 1]
      break;
    case 'V':
      gunboatExtra = [3, 2, 2]
      break;
  }

  let totalEP = shipinfo.EP + newstats[28][1] + (romanToInt(elitelvl) * gunboatElite) + ultMod[0] + bonusEP
  let totalBatts = shipinfo.Batteries + newstats[39][1] + ultMod[1] + gunboatExtra[0]
  let totalWeapons = shipinfo.Weapons + newstats[40][1] + ultMod[2] + gunboatExtra[1]
  let totalDrones = shipinfo.Drones + newstats[41][1] + ultMod[3] + gunboatExtra[2]

  // console.log(activeperks)
  // console.log(shipinfo)
  // console.log(shipperks)
  // console.log("Test Main")
  // console.log(extraperks)
  //Test
  return (
      <>
          <div className='Ship_Selector'>
              <ShipSelector1 
                changeTest={shipinfo => setShipinfo(shipinfo)}
                changeShipPerks={shipperks => setShipperks(shipperks)}
                changeEliteLevel={eliteLVL => setElitelvl(eliteLVL)}
                changeShipMod={shipmod => setShipmod(shipmod)}
                changeModPerks={modperks => setModperks(modperks)}
              />
          </div>
          <div className='Ship_Title'>
              <h1>{shipinfo.Ship_Name} {elitelvl} {shipmod}</h1>
              <h2>A {shipinfo.Ship_Class}-Class {Ships1[shipinfo.Faction_ID].Faction_Name} ship.</h2>
              <h2> {newstats[27][1]} OF {totalEP} EquipPoints Used </h2>
              <h3>Batteries: {totalBatts} | Weapons: {totalWeapons} | Drones: {totalDrones}</h3>
          </div>
          <div className='Gear_Selector'>
              <GearSelector 
                finalStats={newstats => setNewstats(newstats)}
                finalPerks={gearperks => setGearperks(gearperks)}
                enhancedStats={extraitemstats}
              />
          </div>
          <div className='Ship_Stats'>
              <ShipStats 
                speed={shipinfo}
                NewShipStats={newstats}
                Active_Perks={activeperks}
                cSkills={corpskills}
                pSkills={playerskills}
                sSkills={shipskills}
                changeExtraPerks={extraperks => setExtraperks(extraperks)}
                changeExtraItemStats={extraitemstats => setExtraitemstats(extraitemstats)}
                changeBonusEP={bonusEP => setBonusEP(bonusEP)}
              />
          </div>
          <div className='Perks_List'>
              <Perks 
                ship={shipperks}
                gear={gearperks}
                mod={modperks}
                extra={extraperks}
                changeActivePerks={activeperks => setActiveperks(activeperks)}
              />
          </div>
          <div className='Skills'>
            <div className='Container'>
            <CorpSkills changeSkills={corpskills => setCorpskills(corpskills)}/>
            </div>
            <div className='Container'>
            <PlayerSkills changeSkills={playerskills => setPlayerskills(playerskills)}/>
            </div>
            <div className='Container'>
            <ShipSkills changeSkills={shipskills => setShipskills(shipskills)}/>
            </div>
          </div>
      </>
  )
}

export default App
