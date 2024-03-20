import React, { useState, useEffect } from "react"
import Items from '../Data/Items.json'
import Perks from "./Perks"
import Mutate from '../Data/BaseMutateStats.json'
import voidItems from '../Data/BaseVoidStats.json'
import { engineStatMultiplier, rarityToInt } from "../Math/StatMultiplier"

function EngineSelector( props ) {
    const [engine, setEngine] = useState(Items[4].Items[8])
    const [enginerarity, setEnginerarity] = useState('Common')
    const [engineperks, setEngineperks] = useState([''])
    const [enginequality, setEnginequality] = useState(129)
    const [trigger, setTrigger] = useState(false)
    const [mutate, setMutate] = useState(['', 0])
    const [mutaterarity, setMutaterarity] = useState('Common')
    const [voidBuff, setVoidBuff] = useState(['', 0])
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
            if (rarityNum == 7) {bonus = ["Cloak_Speed_III", "Advanced_Stealth"]}
        }
        setEngineperks(bonus)
    }

    const handleEngineQuality = (qual) => {
        setEnginequality(qual)
        setMultipliedstats(engineStatMultiplier(engine.Stats, enginerarity, qual, trigger, mutate, mutaterarity, voidBuff))
    }

    useEffect(()=> {
        props.changeEngineStats(multipliedstats)
        props.changeEnginePerks(engineperks)
    }, [multipliedstats, engineperks])

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
            <div className="Engine_Selector">
                <div className="ItemRows">
                    <div className="TopRow">
                        <h2>Engine<button onClick={() => handleReset()}>X</button></h2>
                        <select id="SelectType" onChange={(e) => {
                            setEngine(Items[4].Items[e.target.value])
                            handleEnginePerk(Items[4].Items[e.target.value], enginerarity)
                            setMultipliedstats(engineStatMultiplier(Items[4].Items[e.target.value].Stats, enginerarity, enginequality, trigger, mutate, mutaterarity, voidBuff))
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
                                setMultipliedstats(engineStatMultiplier(engine.Stats, e.target.value, enginequality, trigger, mutate, mutaterarity, voidBuff))
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
                                setMultipliedstats(engineStatMultiplier(engine.Stats, enginerarity, enginequality, !trigger, mutate, mutaterarity, voidBuff))
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
                        <small>
                            <select name="Rarity" onChange={(e) => {
                                setMutaterarity(e.target.value)
                                setMultipliedstats(engineStatMultiplier(engine.Stats, enginerarity, enginequality, trigger, mutate, e.target.value, voidBuff))
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
                            <select id="SelectMutate" onChange={(e) => {
                                    setMutate(e.target.value.split(","))
                                    setMultipliedstats(engineStatMultiplier(engine.Stats, enginerarity, enginequality, trigger, e.target.value.split(","), mutaterarity, voidBuff))
                                }}>
                                <option value="0">--Select Stat--</option>
                                {Object.entries(Mutate).map( ([key, value]) => (
                                    <option value={[key, value]} key={key}>{key}</option>
                                ))}
                            </select>
                        </small>
                        <small>
                            Void Buff: 
                            <select id="SelectVoidBuff" onChange={(e) => {
                                setVoidBuff([e.target.value, voidItems[e.target.value]])
                                setMultipliedstats(engineStatMultiplier(engine.Stats, enginerarity, enginequality, trigger, mutate, mutaterarity, [e.target.value, voidItems[e.target.value]]))
                                }}>
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

export default EngineSelector