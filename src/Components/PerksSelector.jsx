import Perks from "../Data/Perks.json"
import { useEffect, useState } from "react"

function PerkSelector( props ){
    const [perksarr, setPerksarr] = useState([])

    let PerksList = Object.keys(Perks).map(key => {
        return [key, Perks[key]]
    })

    useEffect(() =>{
        props.changePerks(perksarr)
    }, [perksarr])

    return (
        <>
        <h3>Choose Extra Perks</h3>
        <select id="SelectPerk" 
            onChange={(e) => setPerksarr([
                ...perksarr,
                e.target.value
            ])}
        >
            <option value="">--Select Perk--</option>
            {
                PerksList.map((getPerks, index) => (
                    <option value={getPerks[0]} key={index}>{getPerks[1].Name}</option>
                ))
            }
        </select>
        <div className="xtraprks">
            {/* <small> */}
                {
                    perksarr.map((getPerks, index) => (
                        <li key={index}>
                            {Perks[getPerks].Name}{' '}
                            <button onClick={() => {
                                setPerksarr(
                                    perksarr.filter((a) => 
                                        (a !== getPerks)
                                    )
                                )
                            }}>
                            Remove
                            </button>
                        </li>
                    ))
                }
            {/* </small> */}
        </div>
        </>
    )
}

export default PerkSelector