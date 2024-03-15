import React, { useState, useEffect } from "react"
import Items from '../Data/Items.json'
import RankSelector from './RankSelector'
import Mutate from '../Data/BaseMutateStats.json'
import voidItems from '../Data/BaseVoidStats.json'
import { storageStatMultiplier } from '../Math/StatMultiplier'

function StorageSelector ( props ) {
    const [storagelist, setStoragelist] = useState([])
    const [storage, setStorage] = useState(Items[2].Item_Factions[5].Items[0])
    const [storageid, setStorageid] = useState('0')
    const [storagerank, setStoragerank] = useState('I')
    const [storagerarity, setStoragerarity] = useState('Common')
    const [storagequality, setStoragequality] = useState(129)
    const [trigger, setTrigger] = useState(false)
    const [mutate, setMutate] = useState(['', 0])
    const [mutaterarity, setMutaterarity] = useState('Common')
    const [voidBuff, setVoidBuff] = useState(['', 0])
    const [multipliedstats, setMultipliedstats] = useState(storage.Stats)
    // console.log("Test Armor Selector")

    useEffect(() => {
        setMultipliedstats(storageStatMultiplier(storage.Stats, storagerank, storagerarity, storagequality, trigger, mutate, mutaterarity, voidBuff))
    }, [storagerank, storagerarity, storagequality, trigger, mutate, mutaterarity, voidBuff])

    useEffect(()=> {
        props.changeStorageStats(multipliedstats)
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
            <div className="Storage_Selector">
                <div className="ItemRows">
                    <div className="TopRow">
                        <h2>Storage<button onClick={() => handleReset()}>X</button></h2>
                        <select id="SelectFaction" onChange={(e) => {
                            setStoragelist(Items[2].Item_Factions[e.target.value].Items)
                            setStorage(Items[2].Item_Factions[e.target.value].Items[storageid])
                            setMultipliedstats(storageStatMultiplier(Items[2].Item_Factions[e.target.value].Items[storageid].Stats, storagerank, storagerarity, storagequality, trigger, mutate, mutaterarity, voidBuff))
                        }}>
                            <option value="5">--Select Faction--</option>
                            {
                                Items[2].Item_Factions.map((getFaction, index) => (
                                    <option value={getFaction.Faction_ID} key={index}>{getFaction.Faction_Name}</option>
                                ))
                            }
                        </select>
                        <select id="SelectType" onChange={(e) => {
                            setStorage(storagelist[e.target.value])
                            setStorageid(e.target.value)
                            setMultipliedstats(storageStatMultiplier(storagelist[e.target.value].Stats, storagerank, storagerarity, storagequality, trigger, mutate, mutaterarity, voidBuff))
                            }}>
                            <option value="0">--Select Storage--</option>
                            {
                                storagelist.map((getStorage, index) => (
                                    <option value={getStorage.Item_ID} key={index}>{getStorage.Item_Name}</option>
                                ))
                            }
                        </select>
                        <RankSelector 
                            changeRank={storagerank => setStoragerank(storagerank)}
                            changeRarity={storagerarity => setStoragerarity(storagerarity)}
                        />
                        <small>
                            Q: <input type="number" id='itemQuality' placeholder="129" min='1' max='256' step='1' onChange={e => setStoragequality(e.target.value)}/>
                            <button onClick={() => setTrigger(!trigger)}>VOID</button>
                        </small>
                    </div>
                    <div className="BottomRow">
                        <h4>{storagerarity} {storage.Item_Name}-{storagerank}</h4>
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

export default StorageSelector