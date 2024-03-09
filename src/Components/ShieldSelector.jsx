import React, { useState, useEffect } from "react"
import Items from '../Data/Items.json'
import RankSelector from './RankSelector'
import Mutate from '../Data/NewStats.json'
import voidItems from '../Data/BaseVoidStats.json'
import { shieldStatMultiplier } from '../Math/StatMultiplier'

function ShieldSelector( props ) {
    const [shieldlist, setShieldlist] = useState([])
    const [shield, setShield] = useState(Items[0].Item_Factions[5].Items[0])
    const [shieldid, setShieldid] = useState('0')
    const [shieldrank, setShieldrank] = useState('I')
    const [shieldrarity, setShieldrarity] = useState('Common')
    const [shieldquality, setShieldquality] = useState(129)
    const [trigger, setTrigger] = useState(false)
    const [mutate, setMutate] = useState(['', 0])
    const [voidBuff, setVoidBuff] = useState(['', 0])
    const [multipliedstats, setMultipliedstats] = useState(shield.Stats)
    // console.log("Test Shield Selector")

    useEffect(() => {
        setMultipliedstats(shieldStatMultiplier(shield.Stats, shieldrank, shieldrarity, shieldquality, trigger, mutate, voidBuff))
    }, [shieldrank, shieldrarity, shieldquality, trigger, mutate, voidBuff])

    useEffect(()=> {
        props.changeShieldStats(multipliedstats)
    }, [multipliedstats])

    return (
        <>
            <div className="Shield_Selector">
                <div className="ItemRows">
                    <div className="TopRow">
                        <h2>Shield</h2>
                        <select id="SelectFaction" onChange={(e) => {
                            setShieldlist(Items[0].Item_Factions[e.target.value].Items)
                            setShield(Items[0].Item_Factions[e.target.value].Items[shieldid])
                            setMultipliedstats(shieldStatMultiplier(Items[0].Item_Factions[e.target.value].Items[shieldid].Stats, shieldrank, shieldrarity, shieldquality, trigger, mutate, voidBuff))
                        }}>
                            <option value="5">--Select Faction--</option>
                            {
                                Items[0].Item_Factions.map((getFaction, index) => (
                                    <option value={getFaction.Faction_ID} key={index}>{getFaction.Faction_Name}</option>
                                ))
                            }
                        </select>
                        <select id="SelectType" onChange={(e) => {
                            setShield(shieldlist[e.target.value])
                            setShieldid(e.target.value)
                            setMultipliedstats(shieldStatMultiplier(shieldlist[e.target.value].Stats, shieldrank, shieldrarity, shieldquality, trigger, mutate, voidBuff))
                            }}>
                            <option value="0">--Select Shield--</option>
                            {
                                shieldlist.map((getShield, index) => (
                                    <option value={getShield.Item_ID} key={index}>{getShield.Item_Name}</option>
                                ))
                            }
                        </select>
                        <RankSelector 
                            changeRank={shieldrank => setShieldrank(shieldrank)}
                            changeRarity={shieldrarity => setShieldrarity(shieldrarity)}
                        />
                        <small>
                            Q: <input type="number" id='itemQuality' placeholder="129" min='1' max='256' step='1' onChange={e => setShieldquality(e.target.value)}/>
                            <button onClick={() => setTrigger(!trigger)}>VOID</button>
                        </small>
                    </div>
                    <div className="BottomRow">
                        <h4>{shieldrarity} {shield.Item_Name}-{shieldrank}</h4>
                        <h5>
                            {Object.entries(multipliedstats).map( ([key, value]) => (
                                <div key={key}>
                                    {Math.round(value[1] * 100) / 100} {value[0]}
                                </div>
                            ))}
                        </h5>
                        <small>
                            M: <input type="number" id="mutateValue" placeholder="0" onChange={(e) => setMutate([mutate[0], Number(e.target.value)])}/>
                            <select id="SelectMutate" onChange={(e) => setMutate([e.target.value, mutate[1]])}>
                                <option value="0">--Select Stat--</option>
                                {Object.entries(Mutate).map( ([key, value]) => (
                                    <option value={key} key={key}>{key}</option>
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

export default ShieldSelector

// {Object.entries(multipliedstats).map( ([key, value]) => (
//     <div key={key}>
//         {key} : {value}
//     </div>
// ))}