import React, { useState, useEffect } from "react"
import Items from '../Data/Items.json'
import RankSelector from './RankSelector'
import { armorStatMultiplier } from '../Math/StatMultiplier'

function ArmorSelector(props) {
    const [armorlist, setArmorlist] = useState([])
    const [armor, setArmor] = useState(Items[1].Item_Factions[5].Items[0])
    const [armorid, setArmorid] = useState('0')
    const [armorrank, setArmorrank] = useState('I')
    const [armorrarity, setArmorrarity] = useState('Common')
    const [armorquality, setArmorquality] = useState(129)
    const [trigger, setTrigger] = useState(false)
    const [multipliedstats, setMultipliedstats] = useState(armor.Stats)
    // console.log("Test Armor Selector")

    useEffect(() => {
        setMultipliedstats(armorStatMultiplier(armor.Stats, armorrank, armorrarity, armorquality, trigger))
    }, [armorrank, armorrarity, armorquality, trigger])

    useEffect(()=> {
        props.changeArmorStats(multipliedstats)
    }, [multipliedstats])

    return (
        <>
            <div className="Armor_Selector">
                <div className="ItemRows">
                    <div className="TopRow">
                        <h2>Armor</h2>
                        <select id="SelectFaction" onChange={(e) => {
                            setArmorlist(Items[1].Item_Factions[e.target.value].Items)
                            setArmor(Items[1].Item_Factions[e.target.value].Items[armorid])
                            setMultipliedstats(armorStatMultiplier(Items[1].Item_Factions[e.target.value].Items[armorid].Stats, armorrank, armorrarity, armorquality, trigger))
                        }}>
                            <option value="5">--Select Faction--</option>
                            {
                                Items[1].Item_Factions.map((getFaction, index) => (
                                    <option value={getFaction.Faction_ID} key={index}>{getFaction.Faction_Name}</option>
                                ))
                            }
                        </select>
                        <select id="SelectType" onChange={(e) => {
                            setArmor(armorlist[e.target.value])
                            setArmorid(e.target.value)
                            setMultipliedstats(armorStatMultiplier(armorlist[e.target.value].Stats, armorrank, armorrarity, armorquality, trigger))
                            }}>
                            <option value="0">--Select Shield--</option>
                            {
                                armorlist.map((getArmor, index) => (
                                    <option value={getArmor.Item_ID} key={index}>{getArmor.Item_Name}</option>
                                ))
                            }
                        </select>
                        <RankSelector 
                            changeRank={armorrank => setArmorrank(armorrank)}
                            changeRarity={armorrarity => setArmorrarity(armorrarity)}
                        />
                        <small>
                            Q: <input type="number" id='itemQuality' placeholder="129" min='1' max='256' step='1' onChange={e => setArmorquality(e.target.value)}/>
                            <button onClick={() => setTrigger(!trigger)}>VOID</button>
                        </small>
                    </div>
                    <div className="BottomRow">
                        <h4>{armorrarity} {armor.Item_Name}-{armorrank}</h4>
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

export default ArmorSelector