import React, { useEffect, useState } from "react"
import Items from '../Data/Items.json'
import Mutate from '../Data/BaseMutateStats.json'
import voidItems from '../Data/BaseVoidStats.json'
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
    const [mutate, setMutate] = useState(['', 0])
    const [mutaterarity, setMutaterarity] = useState('Common')
    const [voidBuff, setVoidBuff] = useState(['', 0])
    // console.log("Test Battery Selector")

    useEffect(() => {
        setMultipliedstats(batteryStatMultiplier(battery.Stats, batteryrarity, batteryquality, trigger, mutate, mutaterarity, voidBuff))
    }, [batteryrarity, batteryquality, trigger, mutate, mutaterarity,  voidBuff])

    useEffect(()=> {
        props.changeBatteryStats(multipliedstats)
    }, [multipliedstats])

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
        <div className="Battery_Selector">
            <div className="ItemRows">
                <div className="TopRow">
                    <h2>Battery<button onClick={() => handleReset()}>X</button></h2>
                    <select id="SelectFaction" onChange={(e) => {
                        setBatterylist(Items[6].Item_Factions[e.target.value].Items)
                        setBattery(Items[6].Item_Factions[e.target.value].Items[batteryid])
                        setMultipliedstats(batteryStatMultiplier(Items[6].Item_Factions[e.target.value].Items[batteryid].Stats, batteryrarity, batteryquality, trigger, mutate, mutaterarity, voidBuff))
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
                        setMultipliedstats(batteryStatMultiplier(batterylist[e.target.value].Stats, batteryrarity, batteryquality, trigger, mutate, mutaterarity, voidBuff))
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
                            setMultipliedstats(batteryStatMultiplier(battery.Stats, e.target.value, batteryquality, trigger, mutate, mutaterarity, voidBuff))
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
        </div>
    </>
    )
}

export default MainBatterySelector