import React, { useEffect, useState } from "react"
import Items from '../Data/Items.json'
import RankSelector from "./RankSelector"
import Popup from "./Popup"
import Mutate from '../Data/BaseMutateStats.json'
import voidItems from '../Data/BaseVoidStats.json'
import { weaponStatMultiplier, weaponDamageMultiplier, rarityToInt, enhancedStatsHandler } from '../Math/StatMultiplier'
import AttackTimer from "./AttackTimer"

function MainWeaponSelector( props ) {
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
    const [mutaterarity, setMutaterarity] = useState('Common')
    const [voidBuff, setVoidBuff] = useState(['', 0])
    const [enemyShipClass, setEnemyShipClass] = useState('')
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
        setMultipliedstats(weaponStatMultiplier(weapon.Stats, weaponrank, weaponrarity, weaponquality, trigger, mutate, mutaterarity, voidBuff))
        setDamagestats(weaponDamageMultiplier(weapon, weaponrank, weaponrarity, weaponquality, trigger))
        handleWeaponPerk(weapon, weaponrarity)
        // console.log(damagestats)
    }, [weaponrank, weaponrarity, weaponquality, trigger, mutate, mutaterarity, voidBuff])

    useEffect(() => {
        props.changeWeaponStats(multipliedstats)
    }, [multipliedstats])

    useEffect(() => {
        setEnhancedarr(enhancedStatsHandler(props.enhancedStats, damagestats))
    }, [props.enhancedStats, damagestats])

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
        <div className="Weapon_Selector">
            <div className="ItemRows">
                <div className="TopRow">
                    <h2>Weapon<button onClick={() => handleReset()}>X</button></h2>
                    <select id="SelectFaction" onChange={(e) => {
                        setWeaponlist(Items[7].Item_Factions[e.target.value].Items)
                        setWeapon(Items[7].Item_Factions[e.target.value].Items[weaponid])
                        setMultipliedstats(weaponStatMultiplier(Items[7].Item_Factions[e.target.value].Items[weaponid].Stats, weaponrank, weaponrarity, weaponquality, trigger, mutate, mutaterarity, voidBuff))
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
                        setMultipliedstats(weaponStatMultiplier(weaponlist[e.target.value].Stats, weaponrank, weaponrarity, weaponquality, trigger, mutate, mutaterarity, voidBuff))
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
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3>NPC Damage</h3>
                <h4>Hull: {enhancedarr[0]} - {enhancedarr[2]} {"—>"} {enhancedarr[4]} - {enhancedarr[6]} | DPS: {Math.round((enhancedarr[2] + enhancedarr[0])/(2*weapon.Shot_Timer)*10)/10} {"—>"} {Math.round((enhancedarr[6] + enhancedarr[4])/(2*weapon.Shot_Timer)*10)/10}</h4>
                <h4>Shield: {enhancedarr[1]} - {enhancedarr[3]} {"—>"} {enhancedarr[5]} - {enhancedarr[7]} | DPS: {Math.round((enhancedarr[1] + enhancedarr[3])/(2*weapon.Shot_Timer)*10)/10} {"—>"} {Math.round((enhancedarr[5] + enhancedarr[7])/(2*weapon.Shot_Timer)*10)/10}</h4>
                <h3>Player Damage</h3>
                <h4>Hull: {enhancedarr[8]} - {enhancedarr[10]} {"—>"} {enhancedarr[12]} - {enhancedarr[14]} | DPS: {Math.round((enhancedarr[8] + enhancedarr[10])/(2*weapon.Shot_Timer)*10)/10} {"—>"} {Math.round((enhancedarr[12] + enhancedarr[14])/(2*weapon.Shot_Timer)*10)/10}</h4>
                <h4>Shield: {enhancedarr[9]} - {enhancedarr[11]} {"—>"} {enhancedarr[13]} - {enhancedarr[15]} | DPS: {Math.round((enhancedarr[9] + enhancedarr[11])/(2*weapon.Shot_Timer)*10)/10} {"—>"} {Math.round((enhancedarr[13] + enhancedarr[15])/(2*weapon.Shot_Timer)*10)/10}</h4>
                <h3>Target Lock Timer: { AttackTimer(props.enhancedStats[10], enemyShipClass, props.enhancedStats[9], false) / 1000 } Seconds (0.8s min)</h3>
                <h4> Select Enemy Ship Class: {" "}
                    <select name="EnemyShipClass" onChange={(e) => setEnemyShipClass(e.target.value)}>
                        <option value='0'>--Select Ship Class--</option>
                        <option value='Gunboat'>Gunboat</option>
                        <option value='Shuttle'>Shuttle</option>
                        <option value='Frigate'>Frigate</option>
                        <option value='Assassin'>Assassin</option>
                        <option value='Cruiser'>Cruiser</option>
                        <option value='Destroyer'>Destroyer</option>
                        <option value='Battleship'>Battleship</option>
                        <option value='Flagship'>Flagship</option>
                        <option value='Carrier'>Carrier</option>
                        <option value='Hades'>Hades</option>
                        <option value='Emporer'>Emporer</option>
                    </select>
                </h4>
            </Popup>
        </div>
        </>
    )
}

export default MainWeaponSelector