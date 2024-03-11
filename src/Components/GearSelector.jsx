import React, { useEffect, useState } from 'react'
import ShieldSelector from './ShieldSelector'
import ArmorSelector from './ArmorSelector'
import StorageSelector from './StorageSelector'
import CPUSelector from './CPUSelector'
import EngineSelector from './EngineSelector'
import SpecialSelector from './SpecialSelector'
import MainBatterySelector from './MainBatterySelector'
import AuxBatterySelector from './AuxBatterySelector'
import MainWeaponSelector from './WeaponSelector'
import AuxWeaponSelector from './AuxWeaponSelector'
import MainDroneSelector from './MainDroneSelector'
import AuxDroneSelector from './AuxDroneSelector'
import Items from '../Data/Items.json'
import NewStats from '../Data/NewStats.json'
import { addStats } from '../Math/StatMultiplier'
import '../CSS/GearSelector.css'

function GearSelector( props ) {
    const [shieldstats, setShieldstats] = useState(Items[0].Item_Factions[5].Items[0].Stats)
    const [armorstats, setArmorstats] = useState(Items[1].Item_Factions[5].Items[0].Stats)
    const [storagestats, setStoragestats] = useState(Items[2].Item_Factions[5].Items[0].Stats)
    const [cpustats, setCpustats] = useState(Items[3].Item_Factions[8].Items[0].Stats)
    const [cpuperk, setCpuperk] = useState([''])
    const [enginestats, setEnginestats] = useState(Items[4].Items[8].Stats)
    const [engineperks, setEngineperks] = useState([''])
    const [specialstats, setSpecialstats] = useState(Items[5].Items[20].Stats)
    const [specialperks, setSpecialperks] = useState([''])
    const [mainbatterystats, setMainbatterystats] = useState(Items[6].Item_Factions[5].Items[0].Stats)
    const [auxbatterystats1, setAuxbatterystats1] = useState(Items[6].Item_Factions[5].Items[0].Stats)
    const [auxbatterystats2, setAuxbatterystats2] = useState(Items[6].Item_Factions[5].Items[0].Stats)
    const [auxbatterystats3, setAuxbatterystats3] = useState(Items[6].Item_Factions[5].Items[0].Stats)
    const [auxbatterystats4, setAuxbatterystats4] = useState(Items[6].Item_Factions[5].Items[0].Stats)
    const [auxbatterystats5, setAuxbatterystats5] = useState(Items[6].Item_Factions[5].Items[0].Stats)
    const [mainweaponstats, setMainweaponstats] = useState(Items[7].Item_Factions[4].Items[0].Stats)
    const [auxweaponstats1, setAuxweaponstats1] = useState(Items[7].Item_Factions[4].Items[0].Stats)
    const [auxweaponstats2, setAuxweaponstats2] = useState(Items[7].Item_Factions[4].Items[0].Stats)
    const [auxweaponstats3, setAuxweaponstats3] = useState(Items[7].Item_Factions[4].Items[0].Stats)
    const [auxweaponstats4, setAuxweaponstats4] = useState(Items[7].Item_Factions[4].Items[0].Stats)
    const [auxweaponstats5, setAuxweaponstats5] = useState(Items[7].Item_Factions[4].Items[0].Stats)
    const [weaponperk1, setWeaponperk1] = useState([''])
    const [weaponperk2, setWeaponperk2] = useState([''])
    const [weaponperk3, setWeaponperk3] = useState([''])
    const [weaponperk4, setWeaponperk4] = useState([''])
    const [weaponperk5, setWeaponperk5] = useState([''])
    const [weaponperk6, setWeaponperk6] = useState([''])
    const [maindronestats, setMaindronestats] = useState(Items[8].Item_Factions[5].Items[0].Items[0].Stats)
    const [auxdronestats1, setAuxdronestats1] = useState(Items[8].Item_Factions[5].Items[0].Items[0].Stats)
    const [auxdronestats2, setAuxdronestats2] = useState(Items[8].Item_Factions[5].Items[0].Items[0].Stats)
    const [auxdronestats3, setAuxdronestats3] = useState(Items[8].Item_Factions[5].Items[0].Items[0].Stats)
    const [auxdronestats4, setAuxdronestats4] = useState(Items[8].Item_Factions[5].Items[0].Items[0].Stats)
    const [auxdronestats5, setAuxdronestats5] = useState(Items[8].Item_Factions[5].Items[0].Items[0].Stats)
    const [finalshipstats, setFinalshipstats] = useState(Object.keys(NewStats).map(key => {return [key, NewStats[key]]}))
    const [formKeys, setFormKeys] = useState([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400])
    // const [shieldKey, setShieldKey] = useState(0)
    // const [shieldKey, setShieldKey] = useState(0)

    useEffect(() => {
        setFinalshipstats(addStats(NewStats, shieldstats, armorstats, storagestats, cpustats, enginestats, specialstats, mainbatterystats, auxbatterystats1, auxbatterystats2, auxbatterystats3, auxbatterystats4, auxbatterystats5, mainweaponstats, auxweaponstats1, auxweaponstats2, auxweaponstats3, auxweaponstats4, auxweaponstats5, maindronestats, auxdronestats1, auxdronestats2, auxdronestats3, auxdronestats4, auxdronestats5))
    }, [shieldstats, armorstats, storagestats, cpustats, enginestats, specialstats, mainbatterystats, auxbatterystats1, auxbatterystats2, auxbatterystats3, auxbatterystats4, auxbatterystats5, mainweaponstats, auxweaponstats1, auxweaponstats2, auxweaponstats3, auxweaponstats4, auxweaponstats5, maindronestats, auxdronestats1, auxdronestats2, auxdronestats3, auxdronestats4, auxdronestats5])

    useEffect(() => {
        props.finalStats(finalshipstats)
        // console.log(finalshipstats)

        let finalPerkArray = [cpuperk, engineperks, specialperks, weaponperk1, weaponperk2, weaponperk3, weaponperk4, weaponperk5, weaponperk6]
        props.finalPerks(finalPerkArray)
    }, [finalshipstats])

    // console.log("Test Gear Selector")

    return (
        <> 
            <div className="Row1">
                <div className="Shield_Selector">
                    <ShieldSelector 
                        changeShieldStats={shieldstats => setShieldstats(shieldstats)}  
                        key={formKeys[0]} 
                        x={formKeys}
                        index={0}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                </div>
                <div className="Armor_Selector">
                    <ArmorSelector 
                        changeArmorStats={armorstats => setArmorstats(armorstats)} 
                        key={formKeys[1]} 
                        x={formKeys}
                        index={1}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                </div>
                <div className="Storage_Selector">
                    <StorageSelector 
                        changeStorageStats={storagestats => setStoragestats(storagestats)}
                        key={formKeys[2]} 
                        x={formKeys}
                        index={2}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                </div>
                <div className="CPU_Selector">
                    <CPUSelector 
                        changeCpuStats={cpustats => setCpustats(cpustats)}
                        changeCpuPerk={cpuperk => setCpuperk(cpuperk)}
                        key={formKeys[3]} 
                        x={formKeys}
                        index={3}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                </div>
                <div className="Engine_Selector">
                    <EngineSelector 
                        changeEnginePerks={engineperks => setEngineperks(engineperks)}
                        changeEngineStats={enginestats => setEnginestats(enginestats)}
                        key={formKeys[4]} 
                        x={formKeys}
                        index={4}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                </div>
                <div className="Special_Selector">
                    <SpecialSelector 
                        changeSpecialPerks={specialperks => setSpecialperks(specialperks)}
                        changeSpecialStats={specialstats => setSpecialstats(specialstats)}
                        key={formKeys[5]} 
                        x={formKeys}
                        index={5}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                </div>
            </div>
            <div className="Row2">
                <div className="Main_Battery">
                    <MainBatterySelector 
                        changeBatteryStats={mainbatterystats => setMainbatterystats(mainbatterystats)}
                        key={formKeys[6]} 
                        x={formKeys}
                        index={6}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                </div>
                <div className="Aux_Batteries">
                    <AuxBatterySelector 
                        changeBatteryStats={auxbatterystats1 => setAuxbatterystats1(auxbatterystats1)}
                        key={formKeys[7]} 
                        x={formKeys}
                        index={7}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                    <AuxBatterySelector 
                        changeBatteryStats={auxbatterystats2 => setAuxbatterystats2(auxbatterystats2)}
                        key={formKeys[8]} 
                        x={formKeys}
                        index={8}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                    <AuxBatterySelector 
                        changeBatteryStats={auxbatterystats3 => setAuxbatterystats3(auxbatterystats3)}
                        key={formKeys[9]} 
                        x={formKeys}
                        index={9}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                    <AuxBatterySelector 
                        changeBatteryStats={auxbatterystats4 => setAuxbatterystats4(auxbatterystats4)}
                        key={formKeys[10]} 
                        x={formKeys}
                        index={10}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                    <AuxBatterySelector 
                        changeBatteryStats={auxbatterystats5 => setAuxbatterystats5(auxbatterystats5)}
                        key={formKeys[11]} 
                        x={formKeys}
                        index={11}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                </div>
            </div>
            <div className="Row3">
                <div className="Main_Weapon">
                    <MainWeaponSelector 
                        changeWeaponStats={mainweaponstats => setMainweaponstats(mainweaponstats)}
                        changeWeaponPerks={weaponperk1 => setWeaponperk1(weaponperk1)}
                        enhancedStats={props.enhancedStats}
                        key={formKeys[12]} 
                        x={formKeys}
                        index={12}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                </div>
                <div className="Aux_Weapons">
                    <AuxWeaponSelector 
                        changeWeaponStats={auxweaponstats1 => setAuxweaponstats1(auxweaponstats1)}
                        changeWeaponPerks={weaponperk2 => setWeaponperk2(weaponperk2)}
                        enhancedStats={props.enhancedStats}
                        key={formKeys[13]} 
                        x={formKeys}
                        index={13}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                    <AuxWeaponSelector 
                        changeWeaponStats={auxweaponstats2 => setAuxweaponstats2(auxweaponstats2)}
                        changeWeaponPerks={weaponperk3 => setWeaponperk3(weaponperk3)}
                        enhancedStats={props.enhancedStats}
                        key={formKeys[14]} 
                        x={formKeys}
                        index={14}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                    <AuxWeaponSelector 
                        changeWeaponStats={auxweaponstats3 => setAuxweaponstats3(auxweaponstats3)}
                        changeWeaponPerks={weaponperk4 => setWeaponperk4(weaponperk4)}
                        enhancedStats={props.enhancedStats}
                        key={formKeys[15]} 
                        x={formKeys}
                        index={15}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                    <AuxWeaponSelector 
                        changeWeaponStats={auxweaponstats4 => setAuxweaponstats4(auxweaponstats4)}
                        changeWeaponPerks={weaponperk5 => setWeaponperk5(weaponperk5)}
                        enhancedStats={props.enhancedStats}
                        key={formKeys[16]} 
                        x={formKeys}
                        index={16}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                    <AuxWeaponSelector 
                        changeWeaponStats={auxweaponstats5 => setAuxweaponstats5(auxweaponstats5)}
                        changeWeaponPerks={weaponperk6 => setWeaponperk6(weaponperk6)}
                        enhancedStats={props.enhancedStats}
                        key={formKeys[17]} 
                        x={formKeys}
                        index={17}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                </div>
            </div>
            <div className="Row4">
                <div className="Main_Drone">
                    <MainDroneSelector 
                        changeDroneStats={maindronestats => setMaindronestats(maindronestats)} enhancedStats={props.enhancedStats}
                        key={formKeys[18]} 
                        x={formKeys}
                        index={18}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                </div>
                <div className="Aux_Drones">
                    <AuxDroneSelector 
                        changeDroneStats={auxdronestats1 => setAuxdronestats1(auxdronestats1)} enhancedStats={props.enhancedStats}
                        key={formKeys[19]} 
                        x={formKeys}
                        index={19}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                    <AuxDroneSelector 
                        changeDroneStats={auxdronestats2 => setAuxdronestats2(auxdronestats2)} enhancedStats={props.enhancedStats}
                        key={formKeys[20]} 
                        x={formKeys}
                        index={20}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                    <AuxDroneSelector 
                        changeDroneStats={auxdronestats3 => setAuxdronestats3(auxdronestats3)} enhancedStats={props.enhancedStats}
                        key={formKeys[21]} 
                        x={formKeys}
                        index={21}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                    <AuxDroneSelector 
                        changeDroneStats={auxdronestats4 => setAuxdronestats4(auxdronestats4)} enhancedStats={props.enhancedStats}
                        key={formKeys[22]} 
                        x={formKeys}
                        index={22}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                    <AuxDroneSelector 
                        changeDroneStats={auxdronestats5 => setAuxdronestats5(auxdronestats5)} enhancedStats={props.enhancedStats}
                        key={formKeys[23]} 
                        x={formKeys}
                        index={23}
                        changeFormKeys={formKeys => setFormKeys(formKeys)}
                    />
                </div>
            </div>
        </>
    )
}

export default GearSelector

    // let shipstats =  Object.keys(finalshipstats).map(key => {
    //     return [key, finalshipstats[key]]
    // })
    // Object.keys(NewStats).map(key => {return [key, NewStats[key]]})
    // console.log(shipstats)