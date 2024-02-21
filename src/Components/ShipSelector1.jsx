import React, { useState } from 'react'
import Ships1 from '../Data/Ships1.json'
import Mods from '../Data/ShipMods.json'
import { romanToInt } from '../Math/StatMultiplier'

function ShipSelector1( props ) {
    const [factionid, setFactionid] = useState('0')
    const [shiplist, setShiplist] = useState([])
    const [ship, setShip] = useState([])
    const [shipid, setShipid] = useState('0')
    const [eliteid, setEliteid] = useState(0)
    const [shipmod, setShipmod] = useState(Mods[8].Perks[0])
    // console.log("Test Ship Selector")

    const handleFaction = (e) => {
        if ( (shipid === "10") && (e !== "0") ) {
            props.changeTest(Ships1.find(faction => faction.Faction_ID === e.target.value).Ships["0"])
            props.changeShipPerks(Ships1.find(faction => faction.Faction_ID === e.target.value).Ships[shipid].Perks[eliteid])
        } else {
            props.changeTest(Ships1.find(faction => faction.Faction_ID === e.target.value).Ships[shipid])
            props.changeShipPerks(Ships1.find(faction => faction.Faction_ID === e.target.value).Ships[shipid].Perks[eliteid])
        }
        const getFactionID = e.target.value
        const getShipData = Ships1.find(faction => faction.Faction_ID === getFactionID).Ships
        setShiplist(getShipData)
        setFactionid(getFactionID)
    }

    const handleShip = (e) => {
        props.changeTest(Ships1.find(faction => faction.Faction_ID === factionid).Ships[e.target.value])
        props.changeShipPerks(Ships1.find(faction => faction.Faction_ID === factionid).Ships[e.target.value].Perks[eliteid])
        const shipID = e.target.value
        setShipid(shipID)
    }

    const handleElite = (e) => {
        props.changeEliteLevel(e)
        props.changeShipPerks(Ships1[factionid].Ships[shipid].Perks[romanToInt(e)])
        props.changeModPerks(shipmod.Perks[romanToInt(e)])
        setEliteid(romanToInt(e))
    }

    const handleMod = (e) => {
        setShipmod(Mods[e])
        props.changeShipMod(Mods[e].Short_Name)
        props.changeModPerks(Mods[e].Perks[eliteid])
    }

    return (
        <>
            <div>
                <div>
                    <h2>Faction | Ship Class | Elite Level | Ship Mod</h2>
                    <select name="Faction" onChange={(e) => handleFaction(e)}>
                        <option value="">--Select Faction--</option>
                        {
                            Ships1.map((getFaction, index) => (
                                <option value={getFaction.Faction_ID} key={index}>{getFaction.Faction_Name}</option>
                            ))
                        }
                    </select>
                    <select name="Ship" onChange={(e) => handleShip(e)}>
                        <option value="">--Select Ship--</option>
                        {
                            shiplist.map((getShip, index) => (
                                <option value={getShip.Ship_ID} key={index}>{getShip.Ship_Class}</option>
                            ))
                        }
                    </select>
                    <select name="Elite" onChange={(e) => handleElite(e.target.value)}>
                        <option value=''>--Select Elite--</option>
                        <option value=''> </option>
                        <option value='I'>I</option>
                        <option value='II'>II</option>
                        <option value='III'>III</option>
                        <option value='IV'>IV</option>
                        <option value='V'>V</option>
                    </select>
                    <select name='ShipMod' onChange={(e) => handleMod(e.target.value)}>
                        <option value="">--Select Mod--</option>
                        {
                            Mods.map((getMod, index) => (
                                <option value={getMod.Item_ID} key={index}>{getMod.Mod_Name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </>
    )
}

export default ShipSelector1