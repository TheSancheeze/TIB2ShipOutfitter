import React, { useEffect, useState } from "react"
import Items from '../Data/Items.json'
import { auxDroneStatMultiplier, droneDamageMultiplier } from '../Math/StatMultiplier'

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
    // console.log("Test Drone Selector")

    const handleQual = (qual) => {
        setDronequality(qual)
        setDamagestats(droneDamageMultiplier(drone, dronerarity, qual, trigger))
    }

    useEffect(() => {
        setMultipliedstats(auxDroneStatMultiplier(drone.Stats, dronerarity, dronequality, trigger))
    }, [dronerarity, dronequality, trigger])

    useEffect(()=> {
        props.changeDroneStats(multipliedstats)
    }, [multipliedstats])

    return (
        <>
        <div className="Drone_Selector">
            <div className="ItemRows">
                <div className="TopRow">
                    <h2>Drone</h2>
                    <select id="SelectFaction" onChange={(e) => {
                        setDronelist(Items[8].Item_Factions[e.target.value].Items[dronetype].Items)
                        setDrone(Items[8].Item_Factions[e.target.value].Items[dronetype].Items[droneid])
                        setMultipliedstats(auxDroneStatMultiplier(Items[8].Item_Factions[e.target.value].Items[dronetype].Items[droneid].Stats, dronerarity, dronequality, trigger))
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
                        setMultipliedstats(auxDroneStatMultiplier(Items[8].Item_Factions[drone.Faction_ID].Items[e.target.value].Items[droneid].Stats, dronerarity, dronequality, trigger))
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
                        setMultipliedstats(auxDroneStatMultiplier(dronelist[e.target.value].Stats, dronerarity, dronequality, trigger))
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
                            setMultipliedstats(auxDroneStatMultiplier(drone.Stats, e.target.value, dronequality, trigger))
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
                </div>
            </div>
        </div>
    </>
    )
}

export default AuxDroneSelector