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
        let containsEnemyInter = false
        let containsSpaceLane = false
        let spaceIndex = 0
    
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
                        if( newItem1[i][0] === "Space_Lane_Effect" || 
                            newItem1[i][0] === "Space_Lane_Effect_II" || 
                            newItem1[i][0] === "Space_Lane_Effect_III" ){
                                containsSpaceLane = true
                                spaceIndex = i
                        }
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
                    if( newItem1[i][0] === "Enemy_Interdictor" || 
                        newItem1[i][0] === "Enemy_Interdictor_II" || 
                        newItem1[i][0] === "Enemy_Interdictor_III" ){
                            containsEnemyInter = true
                    }
                    if( newItem1[i][0] === "Space_Lane_Effect" || 
                        newItem1[i][0] === "Space_Lane_Effect_II" || 
                        newItem1[i][0] === "Space_Lane_Effect_III" ){
                            containsSpaceLane = true
                            spaceIndex = i
                    }
                }
            }
        }

        let spliceIndex = []
        let counter = 0
        
        for(let i=0; i<perkArr.length; i++){
            if(perkArr[i] != undefined ){
                for(let j=0; j<perkArr.length; j++){
                    if(perkArr[j] != undefined &&
                        perkArr[i] != perkArr[j] &&
                        perkArr[i][0].substring(0,perkArr[i][0].length-1) === perkArr[j][0].substring(0,perkArr[j][0].length-1)
                        ){
                            if(perkArr[j][0][perkArr[j][0].length-1] < perkArr[i][0][perkArr[i][0].length-1]){
                                spliceIndex[counter] = j
                                counter++
                            }
                    }
                }
            }
        }

        for(let i=0; i<spliceIndex.length; i++){
            perkArr.splice(spliceIndex[i], 1)
        }

        if( containsEnemyInter == true && containsSpaceLane == true){
            perkArr.splice(spaceIndex, 1)
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