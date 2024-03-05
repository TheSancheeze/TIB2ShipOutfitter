import React, { useEffect, useState } from "react"
import Items from '../Data/Items.json'
import RankSelector from "./RankSelector"
import Popup from "./Popup"
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
        setMultipliedstats(auxWeaponStatMultiplier(weapon.Stats, weaponrank, weaponrarity, weaponquality, trigger))
        setDamagestats(weaponDamageMultiplier(weapon, weaponrank, weaponrarity, weaponquality, trigger))
        handleWeaponPerk(weapon, weaponrarity)
    }, [weaponrank, weaponrarity, weaponquality, trigger])

    useEffect(()=> {
        props.changeWeaponStats(multipliedstats)
    }, [multipliedstats])

    useEffect(() => {
        setEnhancedarr(enhancedStatsHandler(props.enhancedStats, damagestats))
    }, [props.enhancedStats, damagestats])

    return (
        <>
        <div className="Weapon_Selector">
            <div className="ItemRows">
                <div className="TopRow">
                    <h2>Weapon</h2>
                    <select id="SelectFaction" onChange={(e) => {
                        setWeaponlist(Items[7].Item_Factions[e.target.value].Items)
                        setWeapon(Items[7].Item_Factions[e.target.value].Items[weaponid])
                        setMultipliedstats(auxWeaponStatMultiplier(Items[7].Item_Factions[e.target.value].Items[weaponid].Stats, weaponrank, weaponrarity, weaponquality, trigger))
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
                        setMultipliedstats(auxWeaponStatMultiplier(weaponlist[e.target.value].Stats, weaponrank, weaponrarity, weaponquality, trigger))
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