import React, { useEffect, useState } from "react"
import Items from '../Data/Items.json'
import RankSelector from "./RankSelector"
import Popup from "./Popup"
import Mutate from '../Data/NewStats.json'
import voidItems from '../Data/BaseVoidStats.json'
import { auxWeaponStatMultiplier, weaponDamageMultiplier, rarityToInt, enhancedStatsHandler } from '../Math/StatMultiplier'

function AuxWeaponSelector( props ) {
    const [weaponlist, setWeaponlist] = useState([])
    const [weapon, setWeapon] = useState(Items[7].Item_Factions[4].Items[0])
    const [weaponid, setWeaponid] = useState('0')
    const [weaponrank, setWeaponrank] = useState('I')
    const [weaponrarity, setWeaponrarity] = useState('Common')
    const [weaponquality, setWeaponquality] = useState(129)
    const [multipliedstats, setMultipliedstats] = useState(weapon.Stats)
    const [trigger, setTrigger] = useState(false)
    const [damagestats, setDamagestats] = useState(Object.keys(weapon).map(key => {return [key, weapon[key]]}))
    const [weaponperk, setWeaponperk] = useState([''])
    const [buttonPopup, setButtonPopup] = useState(false)
    const [enhancedarr, setEnhancedarr] = useState([0, 0, 0, 0, 0, 0, 0, 0])
    const [mutate, setMutate] = useState(['', 0])
    const [voidBuff, setVoidBuff] = useState(['', 0])
    // console.log("Test Weapon Selector")

    const handleWeaponPerk = (item, rarity) => {
        let rarityNum = rarityToInt(rarity)
        let bonus = ''

        if ( item.Faction_ID === '1' ){
            bonus = item.Ultimate_Bonus + rarityNum.toString()
        } else if ( rarityNum == 7 ){
            bonus = item.Ultimate_Bonus
        }
        setWeaponperk([bonus])
        props.changeWeaponPerks([bonus])
    }

    useEffect(() => {
        setMultipliedstats(auxWeaponStatMultiplier(weapon.Stats, weaponrank, weaponrarity, weaponquality, trigger, mutate, voidBuff))
        setDamagestats(weaponDamageMultiplier(weapon, weaponrank, weaponrarity, weaponquality, trigger))
        handleWeaponPerk(weapon, weaponrarity)
    }, [weaponrank, weaponrarity, weaponquality, trigger, mutate, voidBuff])

    useEffect(()=> {
        props.changeWeaponStats(multipliedstats)
    }, [multipliedstats])

    useEffect(() => {
        setEnhancedarr(enhancedStatsHandler(props.enhancedStats, damagestats))
    }, [props.enhancedStats, damagestats])

    const handleReset = () => {
        setWeaponlist([])
        setWeapon(Items[7].Item_Factions[4].Items[0])
        setWeaponid('0')
        setWeaponrank('I')
        setWeaponrarity('Common')
        setWeaponquality(129)
        setTrigger(false)
        setMutate(['', 0])
        setVoidBuff(['', 0])
        setMultipliedstats(weapon.Stats)
        setDamagestats(Object.keys(weapon).map(key => {return [key, weapon[key]]}))
        setWeaponperk([''])
        setEnhancedarr([0, 0, 0, 0, 0, 0, 0, 0, 0])
    }

    return (
        <>
        <div className="Weapon_Selector">
            <div className="ItemRows">
                <div className="TopRow">
                    <h2>Weapon<button onClick={() => handleReset()}>X</button></h2>
                    <select id="SelectFaction" onChange={(e) => {
                        setWeaponlist(Items[7].Item_Factions[e.target.value].Items)
                        setWeapon(Items[7].Item_Factions[e.target.value].Items[weaponid])
                        setMultipliedstats(auxWeaponStatMultiplier(Items[7].Item_Factions[e.target.value].Items[weaponid].Stats, weaponrank, weaponrarity, weaponquality, trigger, mutate, voidBuff))
                        setDamagestats(weaponDamageMultiplier(Items[7].Item_Factions[e.target.value].Items[weaponid], weaponrank, weaponrarity, weaponquality, trigger))
                        handleWeaponPerk(Items[7].Item_Factions[e.target.value].Items[weaponid], weaponrarity)
                    }}>
                        <option value="5">--Select Faction--</option>
                        {
                            Items[7].Item_Factions.map((getFaction, index) => (
                                <option value={getFaction.Faction_ID} key={index}>{getFaction.Faction_Name}</option>
                            ))
                        }
                    </select>
                    <select id="SelectType" onChange={(e) => {
                        setWeapon(weaponlist[e.target.value])
                        setWeaponid(e.target.value)
                        setMultipliedstats(auxWeaponStatMultiplier(weaponlist[e.target.value].Stats, weaponrank, weaponrarity, weaponquality, trigger, mutate, voidBuff))
                        setDamagestats(weaponDamageMultiplier(weaponlist[e.target.value], weaponrank, weaponrarity, weaponquality, trigger))
                        handleWeaponPerk(weaponlist[e.target.value], weaponrarity)
                        }}>
                        <option value="0">--Select Weapon--</option>
                        {
                            weaponlist.map((getBattery, index) => (
                                <option value={getBattery.Item_ID} key={index}>{getBattery.Item_Name}</option>
                            ))
                        }
                    </select>
                    <RankSelector 
                        changeRank={weaponrank => setWeaponrank(weaponrank)}
                        changeRarity={weaponrarity => setWeaponrarity(weaponrarity)}
                    />
                    <small>
                        <button onClick={() => setButtonPopup(true)}>DMG</button>
                        Q: <input type="number" id='itemQuality' placeholder="129" min='1' max='256' step='1' onChange={e => setWeaponquality(e.target.value)}/>
                        <button onClick={() => setTrigger(!trigger)}>VOID</button>
                    </small>
                </div>
                <div className="BottomRow">
                    <h4>{weaponrarity} {weapon.Item_Name}-{weaponrank}</h4>
                    <h5>
                        <small>{Math.round(damagestats[2][1]*10) / 10} To {Math.round(damagestats[3][1]*10) / 10} Every {damagestats[1][1]} Seconds</small>
                        <br></br>
                        {weaponperk[0]}
                        <small>
                        {Object.entries(multipliedstats).map( ([key, value]) => (
                            <div key={key}>
                                {Math.round(value[1] * 100) / 100} {value[0]}
                            </div>
                        ))}
                        </small>
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
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3>NPC Damage</h3>
                <h4>Hull: {enhancedarr[0]} - {enhancedarr[2]} {"—>"} {enhancedarr[4]} - {enhancedarr[6]}</h4>
                <h4>Shield: {enhancedarr[1]} - {enhancedarr[3]} {"—>"} {enhancedarr[5]} - {enhancedarr[7]}</h4>
                <h3>Player Damage</h3>
                <h4>Hull: {enhancedarr[8]} - {enhancedarr[10]} {"—>"} {enhancedarr[12]} - {enhancedarr[14]}</h4>
                <h4>Shield: {enhancedarr[9]} - {enhancedarr[11]} {"—>"} {enhancedarr[13]} - {enhancedarr[15]}</h4>
            </Popup>
        </div>
        </>
    )
}

export default AuxWeaponSelector