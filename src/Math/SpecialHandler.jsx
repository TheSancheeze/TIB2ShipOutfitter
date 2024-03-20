export default function SpecialHandler(item, rarity) {
    let perkArr = []
    
    switch (item.Special_Name) {
        case "Advanced Construct":
        case "Advanced Munitions":
        case 'Advanced Propulsion':
            if (rarity == 6) {perkArr[0] = item.Ultimate_Bonus_1}
            if (rarity == 7) {perkArr[0] = item.Ultimate_Bonus_1 + "_II"}
            break
        case "Advanced Electronics":
            if (rarity >= 5) {perkArr[0] = item.Ultimate_Bonus_1 + (rarity - 4).toString()}
            break
        case "Deflector":
        case "Advanced Shields":
        case "Tank":
            perkArr[0] = item.Ultimate_Bonus_1 + rarity.toString()
            if (rarity == 7) {perkArr[1] = item.Ultimate_Bonus_2}
            break
        case "Alien Hunter":
            perkArr[0] = item.Ultimate_Bonus_1 + rarity.toString()
            perkArr[1] = item.Ultimate_Bonus_2 + rarity.toString()
            break
        case "Alien Technology":
        case "Weird Alien Artifact":
            break
        case "Battle Ram":
        case "Prospector":
            perkArr[0] = item.Ultimate_Bonus_1 + rarity.toString()
            break
        case "Bounty Hunter":
            perkArr[0] = item.Ultimate_Bonus_1 + rarity.toString()
            perkArr[1] = item.Ultimate_Bonus_2
            if(rarity == 6) {perkArr[1] = item.Ultimate_Bonus_2 + "_II"}
            if(rarity == 7) {perkArr[1] = item.Ultimate_Bonus_2 + "_III"}
            break
        case "Drone Master":
            perkArr[0] = item.Ultimate_Bonus_1
            perkArr[1] = item.Ultimate_Bonus_2
            if(rarity == 5) {
                perkArr[0] = item.Ultimate_Bonus_1 + "_II"
                perkArr[1] = item.Ultimate_Bonus_2 + "_II"
            }
            if(rarity == 6) {
                perkArr[0] = item.Ultimate_Bonus_1 + "_III"
                perkArr[1] = item.Ultimate_Bonus_2 + "_III"
            }
            if(rarity == 7) {
                perkArr[0] = item.Ultimate_Bonus_1 + "_ADV"
                perkArr[1] = item.Ultimate_Bonus_2 + "_ADV"
            }
            break
        case "Grappling Hook":
        case "Hacker":
        case "Vampire":
            perkArr[0] = item.Ultimate_Bonus_1
            if (rarity >= 4) {perkArr[1] = item.Ultimate_Bonus_2}
            if (rarity == 6) {
                perkArr[0] = item.Ultimate_Bonus_1 + "_II"
                perkArr[1] = item.Ultimate_Bonus_2 + "_II"
            }
            if (rarity == 7) {
                perkArr[0] = item.Ultimate_Bonus_1 + "_III"
                perkArr[1] = item.Ultimate_Bonus_2 + "_III"
            }
            break
        case "Nova Device":
            perkArr[0] = item.Ultimate_Bonus_1 + rarity.toString()
            if (rarity >= 6) {perkArr[1] = item.Ultimate_Bonus_2}
            break
        case "Scout":
        case "Stalker":
            perkArr[0] = item.Ultimate_Bonus_1 + rarity.toString()
            perkArr[1] = item.Ultimate_Bonus_2
            if (rarity > 1) {
                perkArr[0] = item.Ultimate_Bonus_1 + (rarity-1).toString()
                if (rarity == 6) {perkArr[1] = item.Ultimate_Bonus_2 + "_II"}
                if (rarity == 7) {perkArr[1] = item.Ultimate_Bonus_2 + "_III"}
            }
            break
        case "Technician":
            perkArr[0] = item.Ultimate_Bonus_1
            perkArr[1] = item.Ultimate_Bonus_2
            if (rarity == 5) {perkArr[0] = item.Ultimate_Bonus_1 + "_II"}
            if (rarity == 6) {
                perkArr[0] = item.Ultimate_Bonus_1 + "_III"
                perkArr[1] = item.Ultimate_Bonus_2 + "_II"
            }
            if (rarity == 7) {
                perkArr[0] = item.Ultimate_Bonus_1 + "_IV"
                perkArr[1] = item.Ultimate_Bonus_2 + "_III"
            }
            break
    }

    return perkArr
}