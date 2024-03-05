import React, {useEffect, useState} from 'react'
import Base from '../Data/BaseShipStats.json'
import { finalizeStats } from '../Math/AddBonusStats'
import { GetTibDR } from '../Math/StatMultiplier'
import PerkSelector from './PerksSelector'
import '../CSS/ShipStats.css'

function ShipStats(props) {
    const [extraperks, setExtraperks] = useState([[''], ['']])
    const [shiplevel, setShiplevel] = useState(50)
    let FinalStats = finalizeStats(props.NewShipStats, props.Active_Perks)
    let speedPercent = (100 + FinalStats[8][1]) * 0.01

    useEffect(() => {
        props.changeExtraPerks(extraperks)
    }, [extraperks])

    let skills = []
    for (let i=0; i<props.cSkills.length; i++){
        skills[i] = props.cSkills[i] + props.pSkills[i] + props.sSkills[i]
    }

    let offenceDR = 15
    let defenceDR = 20

    // console.log(FinalStats)
    // console.log(GetTibDR(64.6, 15, false))

    let maxHull = (Base.Max_Hull + FinalStats[0][1] + FinalStats[34+Number(props.speed.Faction_ID)][1] + (shiplevel * 3)) * ( 1 + (FinalStats[56][1] / 100) )
    let shieldCap = (Base.Shield_Capacity + FinalStats[1][1] + FinalStats[29+Number(props.speed.Faction_ID)][1]) * ( 1 + (FinalStats[51][1] / 100) )
    let powerCap = Base.Power_Capacity + FinalStats[2][1] + FinalStats[57+Number(props.speed.Faction_ID)][1]
    let powerRecharge = Base.Power_Recharge + FinalStats[3][1] + skills[19]
    let resourceStorage = (Base.Resource_Storage + FinalStats[4][1] + skills[0]) * (1+(FinalStats[62][1]/100))
    let xpGains = Base['%_XP_Gains'] + FinalStats[5][1] + skills[5]
    let hullRepairs = Base['%_Hull_Repairs'] + FinalStats[6][1] + skills[1]
    let targetingSpeed = Base['%_Targeting_Speed'] + FinalStats[7][1]
    let moveSpeed = ( Base.Move_Speed[props.speed.Ship_Class] * ( speedPercent ) )

    let preMoveSpeed = Base.Pre_Move_Speed[props.speed.Ship_Class]
    let hullDamage = Base['%_Hull_Damage'] + FinalStats[9][1] + skills[21]
    let shieldDamage = Base['%_Shield_Damage'] + FinalStats[10][1] + skills[3]
    let shieldPierce = Base['%_Shield_Pierce'] + FinalStats[11][1] + skills[20]
    let hitChance = Base.Hit_Chance + FinalStats[12][1] + skills[13]
    let hitDR = GetTibDR(hitChance, defenceDR, false)
    let critChance = Base.Critical_Chance + FinalStats[13][1] + skills[7]
    let splashChance = Base.Splash_Chance + FinalStats[14][1] + skills[12]
    let grapPower = Base.Grapple_Attack_Power + FinalStats[15][1] + (hitDR/5) + skills[10]
    let drainPower = Base.Battery_Drain_Attack_Power + FinalStats[16][1] + (hitDR/5) + skills[9]
    let hackPower = Base.Hack_Attack_Power + FinalStats[17][1] + (hitDR/5) + skills[11]

    let outgoingDmg = Base['%_Outgoing_Damage'] + FinalStats[18][1] + skills[2]
    let incomingDmg = Base['%_Incoming_Damage'] + FinalStats[19][1] + skills[4]
    let critDmg = Base['%_Critical_Damage'] + FinalStats[20][1] + skills[6]
    let evasionChance = Base.Evasion_Chance + FinalStats[21][1] + skills[8]
    let evasionDR = GetTibDR(evasionChance, 10, false)
    let critResist = Base.Critical_Resist + FinalStats[22][1] + skills[16]
    let splashResist = Base.Splash_Resist + FinalStats[23][1] + skills[17]
    let grappleResist = Base.Grapple_Resist + FinalStats[24][1] + (evasionDR/5) + skills[15]
    let drainResist = Base.Battery_Drain_Resist + FinalStats[25][1] + (evasionDR/5) + skills[18]
    let hackResist = Base.Hack_Resist + FinalStats[26][1] + (evasionDR/5) + skills[14]

    let cloakDuration = FinalStats[42][1]
    let cloakCooldown = FinalStats[43][1]
    let grappleDuration = FinalStats[44][1] * (1+(grapPower*0.01))
    let grappleCooldown = FinalStats[45][1]
    let repairCooldown = FinalStats[46][1]
    let drainCooldown = FinalStats[47][1]
    let hackDuration = FinalStats[48][1] * (1+(hackPower*0.01))
    let hackCooldown = FinalStats[49][1]
    let scanCooldown = FinalStats[50][1]
    let shieldMax = FinalStats[51][1]
    let alienBonusDMG = FinalStats[52][1]
    let attackDroneDMG = FinalStats[53][1]
    let droneRepairs = FinalStats[54][1]
    let batteryStolen = FinalStats[55][1] * (1+(drainPower*0.01))
    let percentHullMax = FinalStats[56][1]
    let playerBonusDMG = FinalStats[64][1]
    let bonusHarvesting = FinalStats[63][1]

    useEffect(() => {
        props.changeExtraItemStats([
            ( GetTibDR((hullDamage-100), 5, false)+100 ), 
            ( GetTibDR((shieldDamage-100), 5, false)+100 ), 
            ( GetTibDR((outgoingDmg-100), 5, false)+100 ), 
            ( GetTibDR((critDmg-200), 14, false)+200 ),
            alienBonusDMG,
            playerBonusDMG,
            attackDroneDMG,
            droneRepairs,
            bonusHarvesting
        ])
    }, [hullDamage, shieldDamage, outgoingDmg, critDmg, alienBonusDMG, playerBonusDMG, attackDroneDMG, droneRepairs, bonusHarvesting])

    // console.log("Test Ship Stats")
    return (
        <> 
        <div className='stats'>
            <div className='shipLevel'>
                <h2>Select Ship Level</h2>
                <input type="number" id='level' placeholder='50.00' min='0' step='0.01' onChange={e => setShiplevel(e.target.value)} />
            </div>
            <div className='statColumns'>
                <div className='column firstColumn'>
                    <h3>{Math.round(maxHull * 10) / 10} Max Hull</h3>
                    <h3>{Math.round(shieldCap * 10) / 10} Shield Capacity</h3>
                    <h3>{Math.round(powerCap * 10) / 10} Power Capacity</h3>
                    <h3>{Math.round(powerRecharge * 10) / 10} Power Recharge</h3>
                    <h3>{Math.round(resourceStorage * 10) / 10} Resource Storage</h3>
                    <h3>{Math.round(xpGains * 10) / 10}% XP Gains</h3>
                    <h3>{Math.round(hullRepairs * 10) / 10}% Hull Repairs ({Math.round((4 * hullRepairs/1) * 10) / 10})</h3>
                    <h3>{Math.round(targetingSpeed * 10) / 10}% Targeting Speed</h3>
                    <h3>{Math.round(moveSpeed * 10) / 10} Move Speed + {preMoveSpeed} Pre-Jump</h3>
                    <h3>(-65% Max, {Math.round(FinalStats[8][1] * 10) / 10}% Total)</h3>
                </div>
                <div className='column secondColumn'>
                    <h3>({Math.round(hullDamage * 10) / 10}) {Math.round(( GetTibDR((hullDamage-100), 5, false)+100 ) * 10) / 10}% Hull Damage</h3>
                    <h3>({Math.round(shieldDamage * 10) / 10}) {Math.round(( GetTibDR((shieldDamage-100), 5, false)+100 ) * 10) / 10}% Shield Damage</h3>
                    <h3>({Math.round(shieldPierce * 10) / 10}) {Math.round(GetTibDR(shieldPierce, offenceDR, true) * 10) / 10}% Shield Pierce</h3>
                    <h3>(115% Max Shield Pierce)</h3>
                    <h3>({Math.round(hitChance * 10) / 10}) {Math.round(hitDR * 10) / 10} Hit Chance</h3>
                    <h3>({Math.round(critChance * 10) / 10}) {Math.round(GetTibDR(critChance, 10, false) * 10) / 10} Critical Chance</h3>
                    <h3>({Math.round(splashChance * 10) / 10}) {Math.round(GetTibDR(splashChance, offenceDR, false) * 10) / 10} Splash Chance</h3>
                    <h3>({Math.round(grapPower * 10) / 10}) {Math.round(GetTibDR(grapPower, offenceDR, false) * 10) / 10} Grapple Attack</h3>
                    <h3>({Math.round(drainPower * 10) / 10}) {Math.round(GetTibDR(drainPower, offenceDR, false) * 10) / 10} Battery Drain Attack</h3>
                    <h3>({Math.round(hackPower * 10) / 10}) {Math.round(GetTibDR(hackPower, offenceDR, false) * 10) / 10} Hack Attack</h3>
                </div>
                <div className='column thirdColumn'>
                    <h3>({Math.round(outgoingDmg * 10) / 10}) {Math.round(( GetTibDR((outgoingDmg-100), 5, false)+100 ) * 10) / 10}% Outgoing Damage</h3>
                    <h3>({Math.round(incomingDmg * 10) / 10}) {Math.round(( GetTibDR((incomingDmg-100), 5, false)+100 ) * 10) / 10}% Incoming Damage</h3>
                    <h3>({Math.round(critDmg * 10) / 10}) {Math.round(( GetTibDR((critDmg-200), 14, false)+200 ) * 10) / 10}% Critical Damage</h3>
                    <h3>({Math.round(evasionChance * 10) / 10}) {Math.round(evasionDR * 10) / 10} Evasion Chance</h3>
                    <h3>({Math.round(critResist * 10) / 10}) {Math.round(GetTibDR(critResist, 25, false) * 10) / 10} Critical Resist</h3>
                    <h3>({Math.round(splashResist * 10) / 10}) {Math.round(GetTibDR(splashResist, 25, false) * 10) / 10} Splash Resist</h3>
                    <h3>({Math.round(grappleResist * 10) / 10}) {Math.round(GetTibDR(grappleResist, 25, false) * 10) / 10} Grapple Resist</h3>
                    <h3>({Math.round(drainResist * 10) / 10}) {Math.round(GetTibDR(drainResist, 25, false) * 10) / 10} Battery Drain Resist</h3>
                    <h3>({Math.round(hackResist * 10) / 10}) {Math.round(GetTibDR(hackResist, 25, false) * 10) / 10} Hack Resist</h3>
                </div>
            </div>
            <div className='extraStats'>
                <div>
                <h2>Extra Stats</h2>
                <h3>{Math.round(cloakDuration * 10) / 10} Seconds Cloak Duration</h3>
                <h3>{Math.round(cloakCooldown * 10) / 10} Seconds Cloak Cooldown</h3>
                <h3>{Math.round(grappleDuration * 10) / 10} Seconds Grapple Duration</h3>
                <h3>{Math.round(grappleCooldown * 10) / 10} Seconds Grapple Cooldown</h3>
                <h3>{Math.round(repairCooldown * 10) / 10} Seconds Repair Cooldown</h3>
                <h3>{Math.round(batteryStolen * 10) / 10} Battery Stolen</h3>
                <h3>{Math.round(drainCooldown * 10) / 10} Seconds Drain Cooldown</h3>
                <h3>{Math.round(hackDuration * 10) / 10} Seconds Hack Duration</h3>
                <h3>{Math.round(hackCooldown * 10) / 10} Seconds Hack Cooldown</h3>
                <h3>{Math.round(scanCooldown * 10) / 10} Seconds Scan Cooldown</h3>
                <h3>{Math.round(percentHullMax * 10) / 10} % Hull Max</h3>
                <h3>{Math.round(shieldMax * 10) / 10} % Shield Max</h3>
                <h3>{Math.round(alienBonusDMG * 10) / 10} % Alien Bonus Damage</h3>
                <h3>{Math.round(attackDroneDMG * 10) / 10} % Attack Drone Damage</h3>
                <h3>{Math.round(droneRepairs * 10) / 10} % Drone Hull Repairs</h3>
                </div>
            </div>
            <div className='extraBonus'>
                <PerkSelector changePerks={extraperks => setExtraperks(extraperks)}/>
            </div>
        </div>
        </>
    )
}

export default ShipStats