import React, { useState, useEffect } from "react"
import Items from '../Data/Items.json'
import Perks from "./Perks"
import SpecialHandler from "../Math/SpecialHandler"
import { specialStatMultiplier, rarityToInt } from "../Math/StatMultiplier"

function SpecialSelector( props ) {
    const [special, setSpecial] = useState(Items[5].Items[21])
    const [specialrarity, setSpecialrarity] = useState('Common')
    const [specialperks, setSpecialperks] = useState([''])
    const [specialquality, setSpecialquality] = useState(129)
    const [trigger, setTrigger] = useState(false)
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
        setMultipliedstats(specialStatMultiplier(special.Stats, specialrarity, qual, trigger))
    }

    useEffect(()=> {
        props.changeSpecialStats(multipliedstats)
    }, [multipliedstats])

    return (
        <>
            <div className="Special_Selector">
                <div className="ItemRows">
                    <div className="TopRow">
                        <h2>Special</h2>
                        <select id="SelectType" onChange={(e) => {
                            setSpecial(Items[5].Items[e.target.value])
                            handleSpecialPerk(Items[5].Items[e.target.value], specialrarity)
                            setMultipliedstats(specialStatMultiplier(Items[5].Items[e.target.value].Stats, specialrarity, specialquality, trigger))
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
                                setMultipliedstats(specialStatMultiplier(special.Stats, e.target.value, specialquality, trigger))
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
                            setMultipliedstats(specialStatMultiplier(special.Stats, specialrarity, specialquality, !trigger))
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpecialSelector