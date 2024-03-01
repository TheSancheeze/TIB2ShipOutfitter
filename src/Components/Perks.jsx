import { useEffect, useState } from 'react'
import perksList from '../Data/Perks.json'

function Perks(props) {
    // console.log("Test Perks")
    let newItem1 = Object.keys(perksList).map(key => {
        return [key, perksList[key]]
    })

    const [activeperks, setActiveperks] = useState([newItem1[6], newItem1[9]])

    useEffect(() => {
        let perkArr = []
    
        for (let i=0; i<newItem1.length; i++){
            for(let j=0; j<props.ship.length; j++){
                if( newItem1[i][0] === props.ship[j] ){
                    perkArr[i] = newItem1[i]
                }
            }

            for(let j=0; j<props.gear.length; j++) {
                for(let k=0; k<props.gear[j].length; k++){
                    if( newItem1[i][0] === props.gear[j][k] ){
                        perkArr[i] = newItem1[i]
                    }
                }
            }

            for(let j=0; j<props.mod.length; j++){
                if( newItem1[i][0] === props.mod[j] ){
                    perkArr[i] = newItem1[i]
                }
            }

            for(let j=0; j<props.extra.length; j++){
                if( newItem1[i][0] === props.extra[j] ){
                    perkArr[i] = newItem1[i]
                }
            }
        }

        setActiveperks(perkArr)
        props.changeActivePerks(perkArr)
    }, [props.ship, props.gear, props.mod, props.extra])

    //console.log(activeperks)
    return (
        <>
            <div className='PerksList'>
                <h1>Active Perks</h1>
                <h4>
                    {Object.entries(activeperks).map( ([key, value]) => (
                        <div key={key}>
                            {value[1].Name}: {value[1].Bonus}.
                        </div>
                    ))}
                </h4>
            </div>
        </>
    )
}

export default Perks