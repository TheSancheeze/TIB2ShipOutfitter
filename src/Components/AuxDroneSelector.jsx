import React, { useEffect, useState } from "react"
import Items from '../Data/Items.json'
import Mutate from '../Data/BaseMutateStats.json'
import voidItems from '../Data/BaseVoidStats.json'
import Popup from "./Popup"
import DronePopup from "./DronePopup"
import HarvestorPopup from "./HarvestorButtonPopup"
import { auxDroneStatMultiplier, droneDamageMultiplier, enhancedDroneStatsHandler } from '../Math/StatMultiplier'
import AttackTimer from "./AttackTimer"

function AuxDroneSelector( props ) {
    const [dronelist, setDronelist] = useState([])
    const [drone, setDrone] = useState(Items[8].Item_Factions[5].Items[0].Items[0])
    const [dronetype, setDronetype] = useState('0')
    const [droneid, setDroneid] = useState('0')
    const [dronerarity, setDronerarity] = useState('Common')
    const [dronequality, setDronequality] = useState(129)
    const [trigger, setTrigger] = useState(false)
    const [multipliedstats, setMultipliedstats] = useState(drone.Stats)
    const [damagestats, setDamagestats] = useState(Object.keys(drone).map(key => {return [key, drone[key]]}))
    const [buttonPopup, setButtonPopup] = useState(false)
    const [droneButtonPopup, setDroneButtonPopup] = useState(false)
    const [harvButtonPopup, setHarvButtonPopup] = useState(false)
    const [enhancedarr, setEnhancedarr] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [mutate, setMutate] = useState(['', 0])
    const [mutaterarity, setMutaterarity] = useState('Common')
    const [voidBuff, setVoidBuff] = useState(['', 0])
    const [enemyShipClass, setEnemyShipClass] = useState('')
    // console.log("Test Drone Selector")

    const handleQual = (qual) => {
        setDronequality(qual)
        setDamagestats(droneDamageMultiplier(drone, dronerarity, qual, trigger))
    }

    const handlePopup = () => {
        if (dronetype === '0'){ setButtonPopup(true) }
        else if (dronetype === '1'){ setDroneButtonPopup(true) }
        else (setHarvButtonPopup(true))
        // console.log(enhancedarr)
    }

    useEffect(() => {
        setMultipliedstats(auxDroneStatMultiplier(drone.Stats, dronerarity, dronequality, trigger, mutate, mutaterarity, voidBuff))
    }, [dronerarity, dronequality, trigger, mutate, mutaterarity, voidBuff])

    useEffect(()=> {
        props.changeDroneStats(multipliedstats)
    }, [multipliedstats])

    useEffect(() => {
        setEnhancedarr(enhancedDroneStatsHandler(props.enhancedStats, damagestats))
    }, [props.enhancedStats, damagestats])

    const handleReset = () => {
        let formArr = []
        for( let i=0; i<24; i++ ){
            formArr[i] = props.x[i]
        }
        formArr[props.index]++
        props.changeFormKeys(formArr)
    }

    return (
        <>
        <div className="Drone_Selector">
            <div className="ItemRows">
                <div className="TopRow">
                    <h2>Drone<button onClick={() => handleReset()}>X</button></h2>
                    <select id="SelectFaction" onChange={(e) => {
                        setDronelist(Items[8].Item_Factions[e.target.value].Items[dronetype].Items)
                        setDrone(Items[8].Item_Factions[e.target.value].Items[dronetype].Items[droneid])
                        setMultipliedstats(auxDroneStatMultiplier(Items[8].Item_Factions[e.target.value].Items[dronetype].Items[droneid].Stats, dronerarity, dronequality, trigger, mutate, mutaterarity, voidBuff))
                        setDamagestats(droneDamageMultiplier(Items[8].Item_Factions[e.target.value].Items[dronetype].Items[droneid], dronerarity, dronequality, trigger))
                    }}>
                        <option value="5">--Select Faction--</option>
                        {
                            Items[8].Item_Factions.map((getFaction, index) => (
                                <option value={getFaction.Faction_ID} key={index}>{getFaction.Faction_Name}</option>
                            ))
                        }
                    </select>
                    <select name="Type" onChange={(e) => {
                        setDronetype(e.target.value)
                        setDronelist(Items[8].Item_Factions[drone.Faction_ID].Items[e.target.value].Items)
                        setDrone(Items[8].Item_Factions[drone.Faction_ID].Items[e.target.value].Items[droneid])
                        setMultipliedstats(auxDroneStatMultiplier(Items[8].Item_Factions[drone.Faction_ID].Items[e.target.value].Items[droneid].Stats, dronerarity, dronequality, trigger, mutate, mutaterarity, voidBuff))
                        setDamagestats(droneDamageMultiplier(Items[8].Item_Factions[drone.Faction_ID].Items[e.target.value].Items[droneid], dronerarity, dronequality, trigger))
                        }}>
                        <option value='0'>--Select Type--</option>
                        <option value='0'>Fighter</option>
                        <option value='1'>Medic</option>
                        <option value='2'>Harvester</option>
                    </select>
                    <select id="SelectType" onChange={(e) => {
                        setDrone(dronelist[e.target.value])
                        setDroneid(e.target.value)
                        setMultipliedstats(auxDroneStatMultiplier(dronelist[e.target.value].Stats, dronerarity, dronequality, trigger, mutate, mutaterarity, voidBuff))
                        setDamagestats(droneDamageMultiplier(dronelist[e.target.value], dronerarity, dronequality, trigger))
                        }}>
                        <option value="0">--Select Drone--</option>
                        {
                            dronelist.map((getDrone, index) => (
                                <option value={getDrone.Item_ID} key={index}>{getDrone.Item_Name}</option>
                            ))
                        }
                    </select>
                    <div className="Rarity_Selector">
                        <select name="Rarity" onChange={(e) => {
                            setDronerarity(e.target.value)
                            setMultipliedstats(auxDroneStatMultiplier(drone.Stats, e.target.value, dronequality, trigger, mutate, mutaterarity, voidBuff))
                            setDamagestats(droneDamageMultiplier(drone, e.target.value, dronequality, trigger))
                            }}>
                            <option value='0'>--Select Rarity--</option>
                            <option value='Common'>Common</option>
                            <option value='Uncommon'>Uncommon</option>
                            <option value='Rare'>Rare</option>
                            <option value='Ultra-Rare'>Ultra-Rare</option>
                            <option value='Elite'>Elite</option>
                            <option value='Legendary'>Legendary</option>
                            <option value='Ultimate'>Ultimate</option>
                        </select>
                    </div>
                    <small>
                        <button onClick={() => handlePopup()}>INFO</button>
                        Q: <input type="number" id='itemQuality' placeholder="129" min='1' max='256' step='1' onChange={e => handleQual(e.target.value)}/>
                        <button onClick={() => {
                            setTrigger(!trigger)
                            setDamagestats(droneDamageMultiplier(drone, dronerarity, dronequality, !trigger))
                        }}>VOID</button>
                    </small>
                </div>
                <div className="BottomRow">
                    <h4>{dronerarity} {drone.Item_Name}</h4>
                    <h5>
                        <small>{Math.round(damagestats[2][1]*10) / 10} To {Math.round(damagestats[3][1]*10) / 10} Every {damagestats[1][1]} Seconds</small>
                        <br></br>
                        {Object.entries(multipliedstats).map( ([key, value]) => (
                            <div key={key}>
                                {Math.round(value[1] * 100) / 100} {value[0]}
                            </div>
                        ))}
                    </h5>
                    <small>
                        <select name="Rarity" onChange={(e) => setMutaterarity(e.target.value)}>
                            <option value='0'>--Select Rarity--</option>
                            <option value='Common'>Common</option>
                            <option value='Uncommon'>Uncommon</option>
                            <option value='Rare'>Rare</option>
                            <option value='Ultra-Rare'>Ultra-Rare</option>
                            <option value='Elite'>Elite</option>
                            <option value='Legendary'>Legendary</option>
                            <option value='Ultimate'>Ultimate</option>
                        </select>
                        <select id="SelectMutate" onChange={(e) => setMutate(e.target.value.split(","))}>
                            <option value="0">--Select Stat--</option>
                            {Object.entries(Mutate).map( ([key, value]) => (
                                <option value={[key, value]} key={key}>{key}</option>
                            ))}
                        </select>
                    </small>
                    <small>
                        Void Buff: 
                        <select id="SelectVoidBuff" onChange={(e) => setVoidBuff([e.target.value, voidItems[e.target.value]])}>
                            <option value="0">--Select Stat--</option>
                            {Object.entries(voidItems).map( ([key, value]) => (
                                <option value={key} key={key}>{key}</option>
                            ))}
                        </select>
                    </small>
                </div>
            </div>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3>NPC Damage</h3>
                <h4>Hull: {enhancedarr[0]} - {enhancedarr[2]} {"—>"} {enhancedarr[4]} - {enhancedarr[6]}</h4>
                <h4>Shield: {enhancedarr[1]} - {enhancedarr[3]} {"—>"} {enhancedarr[5]} - {enhancedarr[7]}</h4>
                <h3>Player Damage</h3>
                <h4>Hull: {enhancedarr[8]} - {enhancedarr[10]} {"—>"} {enhancedarr[12]} - {enhancedarr[14]}</h4>
                <h4>Shield: {enhancedarr[9]} - {enhancedarr[11]} {"—>"} {enhancedarr[13]} - {enhancedarr[15]}</h4>
                <h3>Target Lock Timer: { ( AttackTimer(props.enhancedStats[10], enemyShipClass, props.enhancedStats[9], true) + (5000 * props.auxSlotTimer) ) / 1000 } Seconds (0.8s min)</h3>
                <h4> Select Enemy Ship Class: {" "}
                    <select name="EnemyShipClass" onChange={(e) => setEnemyShipClass(e.target.value)}>
                        <option value='0'>--Select Ship Class--</option>
                        <option value='Gunboat'>Gunboat</option>
                        <option value='Shuttle'>Shuttle</option>
                        <option value='Frigate'>Frigate</option>
                        <option value='Assassin'>Assassin</option>
                        <option value='Cruiser'>Cruiser</option>
                        <option value='Destroyer'>Destroyer</option>
                        <option value='Battleship'>Battleship</option>
                        <option value='Flagship'>Flagship</option>
                        <option value='Carrier'>Carrier</option>
                        <option value='Hades'>Hades</option>
                        <option value='Emporer'>Emporer</option>
                    </select>
                </h4>
            </Popup>
            <DronePopup trigger={droneButtonPopup} setTrigger={setDroneButtonPopup}>
                <h3>Medic Drone</h3>
                <h4>Repairs {enhancedarr[0]} - {enhancedarr[1]} Every {damagestats[1][1]} Seconds</h4>
            </DronePopup>
            <HarvestorPopup trigger={harvButtonPopup} setTrigger={setHarvButtonPopup}>
                <h3>Harvesting</h3>
                <h4>Harvest {enhancedarr[0]} Resources Every {damagestats[1][1]} Seconds</h4>
            </HarvestorPopup>
        </div>
    </>
    )
}

export default AuxDroneSelector