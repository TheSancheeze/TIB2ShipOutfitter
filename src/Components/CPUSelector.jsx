import React, { useState, useEffect } from "react"
import Items from '../Data/Items.json'
import Mutate from '../Data/NewStats.json'
import voidItems from '../Data/BaseVoidStats.json'
import { cpuStatMultiplier, rarityToInt } from '../Math/StatMultiplier'

function CPUSelector(props) {
    const [cpulist, setCpulist] = useState([])
    const [cpu, setCpu] = useState(Items[3].Item_Factions[8].Items[0])
    const [cpuid, setCpuid] = useState('0')
    const [cpurarity, setCpurarity] = useState('Common')
    const [cpuquality, setCpuquality] = useState(129)
    const [trigger, setTrigger] = useState(false)
    const [mutate, setMutate] = useState(['', 0])
    const [voidBuff, setVoidBuff] = useState(['', 0])
    const [multipliedstats, setMultipliedstats] = useState(cpu.Stats)
    const [cpuperk, setCpuperk] = useState([''])
    // console.log("Test CPU Selector")

    const handleCpuPerk = (item, rarity) => {
        let rarityNum = rarityToInt(rarity)
        let bonus = ''
        if (item.Faction_Name === "Sage" && rarityNum > 3){
            bonus = item.Ultimate_Bonus + (rarityNum - 3).toString()
            // setCpuperk(item.Ultimate_Bonus + )
        } else if (item.Faction_Name === "Victor"){
            if (rarityNum < 4) {
                bonus = item.Ultimate_Bonus + "1"
            } else {
                bonus = item.Ultimate_Bonus + (rarityNum - 2).toString()
            }
        } else if(rarityNum == 7) {
            bonus = item.Ultimate_Bonus
        }
        setCpuperk([bonus])
        props.changeCpuPerk([bonus])
    }

    // useEffect(() => {
    //     setMultipliedstats(cpuStatMultiplier(cpu.Stats, cpurarity))
    // }, [cpuquality])
    const handleCpuQuality = (qual) => {
        setCpuquality(qual)
        setMultipliedstats(cpuStatMultiplier(cpu.Stats, cpurarity, qual, trigger, mutate, voidBuff))
    }

    useEffect(()=> {
        props.changeCpuStats(multipliedstats)
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
            <div className="CPU_Selector">
                <div className="ItemRows">
                    <div className="TopRow">
                        <h2>CPU<button onClick={() => handleReset()}>X</button></h2>
                        <select id="SelectFaction" onChange={(e) => {
                            setCpulist(Items[3].Item_Factions[e.target.value].Items)
                            setCpu(Items[3].Item_Factions[e.target.value].Items[cpuid])
                            handleCpuPerk(Items[3].Item_Factions[e.target.value], cpurarity)
                            setMultipliedstats(cpuStatMultiplier(Items[3].Item_Factions[e.target.value].Items[cpuid].Stats, cpurarity, cpuquality, trigger, mutate, voidBuff))
                        }}>
                            <option value="8">--Select Faction--</option>
                            {
                                Items[3].Item_Factions.map((getFaction, index) => (
                                    <option value={getFaction.Faction_ID} key={index}>{getFaction.Faction_Name}</option>
                                ))
                            }
                        </select>
                        <select id="SelectType" onChange={(e) => {
                            setCpu(cpulist[e.target.value])
                            setCpuid(e.target.value)
                            setMultipliedstats(cpuStatMultiplier(cpulist[e.target.value].Stats, cpurarity, cpuquality, trigger, mutate, voidBuff))
                            }}>
                            <option value="0">--Select CPU Type--</option>
                            {
                                cpulist.map((getCpu, index) => (
                                    <option value={getCpu.Item_ID} key={index}>{getCpu.Item_Name}</option>
                                ))
                            }
                        </select>
                        <div className="Rarity_Selector">
                            <select name="Rarity" onChange={(e) => {
                                setCpurarity(e.target.value)
                                handleCpuPerk(Items[3].Item_Factions[cpu.Faction_ID], e.target.value)
                                setMultipliedstats(cpuStatMultiplier(cpu.Stats, e.target.value, cpuquality, trigger, mutate, voidBuff))
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
                            Q: <input type="number" id='itemQuality' placeholder="129" min='1' max='256' step='1' onChange={e => handleCpuQuality(e.target.value)}/>
                            <button onClick={() => {
                            setTrigger(!trigger)
                            setMultipliedstats(cpuStatMultiplier(cpu.Stats, cpurarity, cpuquality, !trigger, mutate, voidBuff))
                            }}>VOID</button>
                        </small>
                    </div>
                    <div className="BottomRow">
                        <h4>{cpurarity} {Items[3].Item_Factions[cpu.Faction_ID].Faction_Name}-{cpu.Item_Name}</h4>
                        <h5>
                            {cpuperk[0]}
                            {Object.entries(multipliedstats).map( ([key, value]) => (
                                <div key={key}>
                                    {Math.round(value[1] * 100) / 100} {value[0]}
                                </div>
                            ))}
                        </h5>
                        <small>
                            M: <input type="number" id="mutateValue" placeholder="0" onChange={(e) => {
                                setMutate([mutate[0], Number(e.target.value)])
                                setMultipliedstats(cpuStatMultiplier(cpu.Stats, cpurarity, cpuquality, trigger, [mutate[0], Number(e.target.value)], voidBuff))
                                }}/>
                            <select id="SelectMutate" onChange={(e) => {
                                setMutate([e.target.value, mutate[1]])
                                setMultipliedstats(cpuStatMultiplier(cpu.Stats, cpurarity, cpuquality, trigger, [e.target.value, mutate[1]], voidBuff))
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
                                setMultipliedstats(cpuStatMultiplier(cpu.Stats, cpurarity, cpuquality, trigger, mutate, [e.target.value, voidItems[e.target.value]]))
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

export default CPUSelector