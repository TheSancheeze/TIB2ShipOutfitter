import React, { useState } from "react"

function RankSelector( props ) {
    // console.log("Test Rank Selector")
    return (
        <>
            <div className="Rank_Selector">
                <select name="Rarity" onChange={(e) => props.changeRarity(e.target.value)}>
                    <option value='0'>--Select Rarity--</option>
                    <option value='Common'>Common</option>
                    <option value='Uncommon'>Uncommon</option>
                    <option value='Rare'>Rare</option>
                    <option value='Ultra-Rare'>Ultra-Rare</option>
                    <option value='Elite'>Elite</option>
                    <option value='Legendary'>Legendary</option>
                    <option value='Ultimate'>Ultimate</option>
                </select>
                <select name="Rank" onChange={(e) => props.changeRank(e.target.value)}>
                    <option value='0'>--Select Rank--</option>
                    <option value='I'>I</option>
                    <option value='II'>II</option>
                    <option value='III'>III</option>
                    <option value='IV'>IV</option>
                    <option value='V'>V</option>
                    <option value='VI'>VI</option>
                    <option value='VII'>VII</option>
                    <option value='VIII'>VIII</option>
                    <option value='IX'>IX</option>
                    <option value='X'>X</option>
                    <option value='XI'>XI</option>
                    <option value='XII'>XII</option>
                    <option value='XIII'>XIII</option>
                    <option value='XIV'>XIV</option>
                    <option value='XV'>XV</option>
                    <option value='XVI'>XVI</option>
                    <option value='XVII'>XVII</option>
                    <option value='XVIII'>XVIII</option>
                    <option value='XIX'>XIX</option>
                    <option value='XX'>XX</option>
                    <option value='XXI'>XXI</option>
                    <option value='XXII'>XXII</option>
                    <option value='XXIII'>XXIII</option>
                    <option value='XXIV'>XXIV</option>
                    <option value='XXV'>XXV</option>
                    <option value='XXVI'>XXVI</option>
                    <option value='XXVII'>XXVII</option>
                    <option value='XXVIII'>XXVIII</option>
                    <option value='XXIX'>XXIX</option>
                    <option value='XXX'>XXX</option>
                </select>
            </div>
        </>
    )
}

export default RankSelector