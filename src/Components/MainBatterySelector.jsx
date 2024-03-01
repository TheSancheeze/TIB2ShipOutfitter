import React, { useEffect, useState } from "react"
import Items from '../Data/Items.json'
import RankSelector from "./RankSelector"
import { batteryStatMultiplier } from '../Math/StatMultiplier'


function MainBatterySelector( props ) {
    const [batterylist, setBatterylist] = useState([])
    const [battery, setBattery] = useState(Items[6].Item_Factions[5].Items[0])
    const [batteryid, setBatteryid] = useState('0')
    const [batteryrarity, setBatteryrarity] = useState('Common')
    const [batteryquality, setBatteryquality] = useState(129)
    const [trigger, setTrigger] = useState(false)
    const [multipliedstats, setMultipliedstats] = useState(battery.Stats)
    // console.log("Test Battery Selector")

    useEffect(() => {
        setMultipliedstats(batteryStatMultiplier(battery.Stats, batteryrarity, batteryquality, trigger))
    }, [batteryrarity, batteryquality, trigger])

    useEffect(()=> {
        props.changeBatteryStats(multipliedstats)
    }, [multipliedstats])

    return (
        <>
        <div className="Battery_Selector">
            <div className="ItemRows">
                <div className="TopRow">
                    <h2>Battery</h2>
                    <select id="SelectFaction" onChange={(e) => {
                        setBatterylist(Items[6].Item_Factions[e.target.value].Items)
                        setBattery(Items[6].Item_Factions[e.target.value].Items[batteryid])
                        setMultipliedstats(batteryStatMultiplier(Items[6].Item_Factions[e.target.value].Items[batteryid].Stats, batteryrarity, batteryquality, trigger))
                    }}>
                        <option value="5">--Select Faction--</option>
                        {
                            Items[6].Item_Factions.map((getFaction, index) => (
                                <option value={getFaction.Faction_ID} key={index}>{getFaction.Faction_Name}</option>
                            ))
                        }
                    </select>
                    <select id="SelectType" onChange={(e) => {
                        setBattery(batterylist[e.target.value])
                        setBatteryid(e.target.value)
                        setMultipliedstats(batteryStatMultiplier(batterylist[e.target.value].Stats, batteryrarity, batteryquality, trigger))
                        }}>
                        <option value="0">--Select Battery--</option>
                        {
                            batterylist.map((getBattery, index) => (
                                <option value={getBattery.Item_ID} key={index}>{getBattery.Item_Name}</option>
                            ))
                        }
                    </select>
                    <div className="Rarity_Selector">
                        <select name="Rarity" onChange={(e) => {
                            setBatteryrarity(e.target.value)
                            setMultipliedstats(batteryStatMultiplier(battery.Stats, e.target.value, batteryquality, trigger))
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
                        Q: <input type="number" id='itemQuality' placeholder="129" min='1' max='256' step='1' onChange={e => setBatteryquality(e.target.value)}/>
                        <button onClick={() => setTrigger(!trigger)}>VOID</button>
                    </small>
                </div>
                <div className="BottomRow">
                    <h4>{batteryrarity} {battery.Item_Name}</h4>
                    <h5>
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

export default MainBatterySelector