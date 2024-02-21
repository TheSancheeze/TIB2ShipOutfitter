import Base from '../Data/NewStats.json'

export function finalizeStats(ShipValue, PerkValue) {
    // console.log("Test Perk Addition")
    let BaseStats = Object.keys(Base).map(key => {
        return [key, Base[key]]
    })
    // console.log("************BEFORE LOOP*************")
    for (let i=0; i < ShipValue.length; i++){
        let numToAdd = ShipValue[i][1]
        for (let j=0; j < PerkValue.length; j++){
            if( PerkValue[j] != undefined ){
                let tempStats = Object.keys(PerkValue[j][1]).map(key => {
                    return [key, PerkValue[j][1][key]]
                })
                for (let k=0; k < tempStats.length; k++){
                    if( ShipValue[i][0] === tempStats[k][0] ){
                        numToAdd = numToAdd + tempStats[k][1]
                    }
                }
            }
        }
        BaseStats[i][1] = numToAdd
    }
    // console.log("************AFTER LOOP************")
    // console.log(BaseStats)

    // console.log("*************************")
    return BaseStats
}