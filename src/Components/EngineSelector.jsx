import React, { useState, useEffect } from "react"
import Items from '../Data/Items.json'
import Perks from "./Perks"
import { engineStatMultiplier, rarityToInt } from "../Math/StatMultiplier"

function EngineSelector( props ) {
    const [engine, setEngine] = useState(Items[4].Items[8])
    const [enginerarity, setEnginerarity] = useState('Common')
    const [engineperks, setEngineperks] = useState([''])
    const [enginequality, setEnginequality] = useState(129)
    const [trigger, setTrigger] = useState(false)
    const [multipliedstats, setMultipliedstats] = useState(engine.Stats)
    // console.log("Test Engine Selector")

    const handleEnginePerk = (item, rarity) => {
        let rarityNum = rarityToInt(rarity)
        let bonus = [item.Ultimate_Bonus]
        if (item.Engine_Name === "Gravity Drive"){
            if (rarityNum == 6) {bonus = [item.Ultimate_Bonus + "_II"]}
            if (rarityNum == 7) {bonus = [item.Ultimate_Bonus + "_III"]}
        } else if (item.Engine_Name === "Skip Drive"){
            bonus = [item.Ultimate_Bonus]
        } else if(item.Engine_Name === "Stealth Drive") {
            if (rarityNum == 5) {bonus = ["Cloak_Speed", "Basic_Stealth"]}
            if (rarityNum == 6) {bonus = ["Cloak_Speed_II", "Basic_Stealth"]}
            if (rarityNum == 7) {bonus = ["Clock_Speed_III", "Advanced_Stealth"]}
        }
        setEngineperks(bonus)
        props.changeEnginePerks(bonus)
    }

    const handleEngineQuality = (qual) => {
        setEnginequality(qual)
        setMultipliedstats(engineStatMultiplier(engine.Stats, enginerarity, qual, trigger))
    }

    useEffect(()=> {
        props.changeEngineStats(multipliedstats)
    }, [multipliedstats])

    return (
        <>
            <div className="Engine_Selector">
                <div className="ItemRows">
                    <div className="TopRow">
                        <h2>Engine</h2>
                        <select id="SelectType" onChange={(e) => {
                            setEngine(Items[4].Items[e.target.value])
                            handleEnginePerk(Items[4].Items[e.target.value], enginerarity)
                            setMultipliedstats(engineStatMultiplier(Items[4].Items[e.target.value].Stats, enginerarity, enginequality, trigger))
                            }}>
                            <option value="8">--Select Engine--</option>
                            {
                                Items[4].Items.map((getEngine, index) => (
                                    <option value={getEngine.Engine_ID} key={index}>{getEngine.Engine_Name}</option>
                                ))
                            }
                        </select>
                        <div className="Rarity_Selector">
                            <select name="Rarity" onChange={(e) => {
                                setEnginerarity(e.target.value)
                                handleEnginePerk(engine, e.target.value)
                                setMultipliedstats(engineStatMultiplier(engine.Stats, e.target.value, enginequality, trigger))
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
                            Q: <input type="number" id='itemQuality' placeholder="129" min='1' max='256' step='1' onChange={e => handleEngineQuality(e.target.value)}/>
                            <button onClick={() => {
                                setTrigger(!trigger)
                                setMultipliedstats(engineStatMultiplier(engine.Stats, enginerarity, enginequality, !trigger))
                            }}>VOID</button>
                        </small>
                    </div>
                    <div className="BottomRow">
                        <h4>{enginerarity} {engine.Engine_Name}</h4>
                        <h5>
                            {Object.entries(engineperks).map( ([key, value]) => (
                                <div key={key}>
                                    {value}
                                </div>
                            ))}
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

export default EngineSelector