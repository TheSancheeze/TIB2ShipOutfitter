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
                <div className="Shield_Selector"><ShieldSelector changeShieldStats={shieldstats => setShieldstats(shieldstats)}/></div>
                <div className="Armor_Selector"><ArmorSelector changeArmorStats={armorstats => setArmorstats(armorstats)}/></div>
                <div className="Storage_Selector"><StorageSelector changeStorageStats={storagestats => setStoragestats(storagestats)}/></div>
                <div className="CPU_Selector">
                    <CPUSelector 
                        changeCpuStats={cpustats => setCpustats(cpustats)}
                        changeCpuPerk={cpuperk => setCpuperk(cpuperk)}
                    />
                </div>
                <div className="Engine_Selector">
                    <EngineSelector 
                        changeEnginePerks={engineperks => setEngineperks(engineperks)}
                        changeEngineStats={enginestats => setEnginestats(enginestats)}
                    />
                </div>
                <div className="Special_Selector">
                    <SpecialSelector 
                        changeSpecialPerks={specialperks => setSpecialperks(specialperks)}
                        changeSpecialStats={specialstats => setSpecialstats(specialstats)}
                    />
                </div>
            </div>
            <div className="Row2">
                <div className="Main_Battery">
                    <MainBatterySelector changeBatteryStats={mainbatterystats => setMainbatterystats(mainbatterystats)}/>
                </div>
                <div className="Aux_Batteries">
                    <AuxBatterySelector changeBatteryStats={auxbatterystats1 => setAuxbatterystats1(auxbatterystats1)}/>
                    <AuxBatterySelector changeBatteryStats={auxbatterystats2 => setAuxbatterystats2(auxbatterystats2)}/>
                    <AuxBatterySelector changeBatteryStats={auxbatterystats3 => setAuxbatterystats3(auxbatterystats3)}/>
                    <AuxBatterySelector changeBatteryStats={auxbatterystats4 => setAuxbatterystats4(auxbatterystats4)}/>
                    <AuxBatterySelector changeBatteryStats={auxbatterystats5 => setAuxbatterystats5(auxbatterystats5)}/>
                </div>
            </div>
            <div className="Row3">
                <div className="Main_Weapon">
                    <MainWeaponSelector 
                        changeWeaponStats={mainweaponstats => setMainweaponstats(mainweaponstats)}
                        changeWeaponPerks={weaponperk1 => setWeaponperk1(weaponperk1)}
                    />
                </div>
                <div className="Aux_Weapons">
                    <AuxWeaponSelector 
                        changeWeaponStats={auxweaponstats1 => setAuxweaponstats1(auxweaponstats1)}
                        changeWeaponPerks={weaponperk2 => setWeaponperk2(weaponperk2)}
                    />
                    <AuxWeaponSelector 
                        changeWeaponStats={auxweaponstats2 => setAuxweaponstats2(auxweaponstats2)}
                        changeWeaponPerks={weaponperk3 => setWeaponperk3(weaponperk3)}
                    />
                    <AuxWeaponSelector 
                        changeWeaponStats={auxweaponstats3 => setAuxweaponstats3(auxweaponstats3)}
                        changeWeaponPerks={weaponperk4 => setWeaponperk4(weaponperk4)}
                    />
                    <AuxWeaponSelector 
                        changeWeaponStats={auxweaponstats4 => setAuxweaponstats4(auxweaponstats4)}
                        changeWeaponPerks={weaponperk5 => setWeaponperk5(weaponperk5)}
                    />
                    <AuxWeaponSelector 
                        changeWeaponStats={auxweaponstats5 => setAuxweaponstats5(auxweaponstats5)}
                        changeWeaponPerks={weaponperk6 => setWeaponperk6(weaponperk6)}
                    />
                </div>
            </div>
            <div className="Row4">
                <div className="Main_Drone">
                    <MainDroneSelector changeDroneStats={maindronestats => setMaindronestats(maindronestats)}/>
                </div>
                <div className="Aux_Drones">
                    <AuxDroneSelector changeDroneStats={auxdronestats1 => setAuxdronestats1(auxdronestats1)}/>
                    <AuxDroneSelector changeDroneStats={auxdronestats2 => setAuxdronestats2(auxdronestats2)}/>
                    <AuxDroneSelector changeDroneStats={auxdronestats3 => setAuxdronestats3(auxdronestats3)}/>
                    <AuxDroneSelector changeDroneStats={auxdronestats4 => setAuxdronestats4(auxdronestats4)}/>
                    <AuxDroneSelector changeDroneStats={auxdronestats5 => setAuxdronestats5(auxdronestats5)}/>
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