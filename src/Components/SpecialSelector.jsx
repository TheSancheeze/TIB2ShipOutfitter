import React, { useState, useEffect } from "react"
import Items from '../Data/Items.json'
import Perks from "./Perks"
import Mutate from '../Data/NewStats.json'
import voidItems from '../Data/BaseVoidStats.json'
import SpecialHandler from "../Math/SpecialHandler"
import { specialStatMultiplier, rarityToInt } from "../Math/StatMultiplier"

function SpecialSelector( props ) {
    const [special, setSpecial] = useState(Items[5].Items[21])
    const [specialrarity, setSpecialrarity] = useState('Common')
    const [specialperks, setSpecialperks] = useState([''])
    const [specialquality, setSpecialquality] = useState(129)
    const [trigger, setTrigger] = useState(false)
    const [mutate, setMutate] = useState(['', 0])
    const [voidBuff, setVoidBuff] = useState(['', 0])
    const [multipliedstats, setMultipliedstats] = useState(special.Stats)
    // console.log("Test Special Selector")

    const handleSpecialPerk = (item, rarity) => {
        let rarityNum = rarityToInt(rarity)
        let bonus = SpecialHandler(item, rarityNum)

        setSpecialperks(bonus)
        props.changeSpecialPerks(bonus)
    }

    const handleSpecialQuality = (qual) => {
        setSpecialquality(qual)
        setMultipliedstats(specialStatMultiplier(special.Stats, specialrarity, qual, trigger, mutate, voidBuff))
    }

    useEffect(()=> {
        props.changeSpecialStats(multipliedstats)
    }, [multipliedstats])

    const handleReset = () => {
        setSpecial(Items[0].Item_Factions[5].Items[0])
        setSpecialrarity('Common')
        setSpecialperks([''])
        setSpecialquality(129)
        setTrigger(false)
        setMutate(['', 0])
        setVoidBuff(['', 0])
        setMultipliedstats(special.Stats)
    }

    return (
        <>
            <div className="Special_Selector">
                <div className="ItemRows">
                    <div className="TopRow">
                        <h2>Special<button onClick={() => handleReset()}>X</button></h2>
                        <select id="SelectType" onChange={(e) => {
                            setSpecial(Items[5].Items[e.target.value])
                            handleSpecialPerk(Items[5].Items[e.target.value], specialrarity)
                            setMultipliedstats(specialStatMultiplier(Items[5].Items[e.target.value].Stats, specialrarity, specialquality, trigger, mutate, voidBuff))
                            }}>
                            <option value="20">--Select Special--</option>
                            {
                                Items[5].Items.map((getSpecial, index) => (
                                    <option value={getSpecial.Special_ID} key={index}>{getSpecial.Special_Name}</option>
                                ))
                            }
                        </select>
                        <div className="Rarity_Selector">
                            <select name="Rarity" onChange={(e) => {
                                setSpecialrarity(e.target.value)
                                handleSpecialPerk(special, e.target.value)
                                setMultipliedstats(specialStatMultiplier(special.Stats, e.target.value, specialquality, trigger, mutate, voidBuff))
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
                            Q: <input type="number" id='itemQuality' placeholder="129" min='1' max='256' step='1' onChange={e => handleSpecialQuality(e.target.value)}/>
                            <button onClick={() => {
                            setTrigger(!trigger)
                            setMultipliedstats(specialStatMultiplier(special.Stats, specialrarity, specialquality, !trigger, mutate, voidBuff))
                            }}>VOID</button>
                        </small>
                    </div>
                    <div className="BottomRow">
                        <h4>{specialrarity} {special.Special_Name}</h4>
                        <h5>
                            {Object.entries(specialperks).map( ([key, value]) => (
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
                            M: <input type="number" id="mutateValue" placeholder="0" onChange={(e) => {
                                setMutate([mutate[0], Number(e.target.value)])
                                setMultipliedstats(specialStatMultiplier(special.Stats, specialrarity, specialquality, trigger, [mutate[0], Number(e.target.value)], voidBuff))
                                }}/>
                            <select id="SelectMutate" onChange={(e) => {
                                setMutate([e.target.value, mutate[1]])
                                setMultipliedstats(specialStatMultiplier(special.Stats, specialrarity, specialquality, trigger, [e.target.value, mutate[1]], voidBuff))
                                }}>
                                <option value="0">--Select Stat--</option>
                                {Object.entries(Mutate).map( ([key, value]) => (
                                    <option value={key} key={key}>{key}</option>
                                ))}
                            </select>
                        </small>
                        <small>
                            Void Buff: 
                            <select id="SelectVoidBuff" onChange={(e) => {
                                setVoidBuff([e.target.value, voidItems[e.target.value]])
                                setMultipliedstats(specialStatMultiplier(special.Stats, specialrarity, specialquality, trigger, mutate, [e.target.value, voidItems[e.target.value]]))
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

export default SpecialSelector