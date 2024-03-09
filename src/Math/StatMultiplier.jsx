export function romanToInt(s) {
    const romanHash = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    }
    let accumulator = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "I" && s[i + 1] === "V") {
            accumulator += 4
            i++
        } else if (s[i] === "I" && s[i + 1] === "X") {
            accumulator += 9
            i++
        } else if (s[i] === "X" && s[i + 1] === "L") {
            accumulator += 40
            i++
        } else if (s[i] === "X" && s[i + 1] === "C") {
            accumulator += 90
            i++
        } else if (s[i] === "C" && s[i + 1] === "D") {
            accumulator += 400
            i++
        } else if (s[i] === "C" && s[i + 1] === "M") {
            accumulator += 900;
            i++
        } else {
            accumulator += romanHash[s[i]]
        }
    }
    return accumulator
}

export function rarityToInt(rarity) {
    let rarityNum = 0
    switch (rarity) {
        case 'Common':
            rarityNum = 1
            break
        case 'Uncommon':
            rarityNum = 2
            break
        case 'Rare':
            rarityNum = 3
            break
        case 'Ultra-Rare':
            rarityNum = 4
            break
        case 'Elite':
            rarityNum = 5
            break
        case 'Legendary':
            rarityNum = 6
            break
        case 'Ultimate':
            rarityNum = 7
            break
}
    return rarityNum
}

export function shieldStatMultiplier(item, rank, rarity, quality, trigger, mutate, voidbuff) {
    let newItem = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rankNum = romanToInt(rank)
    let rarityNum = rarityToInt(rarity)
    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let qual = ( (quality - 129) / 1000 ) + 1
    let voidstat = voidbuff[1]
    if(trigger == true){ 
        qual = ( (quality - 29) / 1000 ) + 1
        voidstat = voidstat * rarityNum * qual
    }
    if (voidbuff[0] === "Add 1 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 1
    } else if (voidbuff[0] === "Add 2 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 2
    } else if (voidbuff[0] === "Add 3 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 3
    } else if (voidbuff[0] === "Add_EP"){
        voidstat = voidbuff[1]
    }

    let containsVoid = false
    let containsMutate = false

    for (let i = 0; i < newItem.length; i++) {
        if ( (newItem[i][0] === "Shield_Capacity") || 
            (newItem[i][0] === "Human_Shields") || 
            (newItem[i][0] === "Pirate_Shields") || 
            (newItem[i][0] === "Het_Shields") || 
            (newItem[i][0] === "Wyrd_Shields") || 
            (newItem[i][0] === "Precursor_Shields")
            ) 
        {
            newItem[i][1] = ( newItem[i][1] * rankNum ) * qual
        } else if ( newItem[i][0] === "EP" ) 
        {
            newItem[i][1] = newItem[i][1] + rankNum - rarityNum
            if (newItem[i][1] < 0) { newItem[i][1] = 0 }
        } else
        { 
            newItem[i][1] = ( newItem[i][1] * rarityNum ) * qual
        }

        if (newItem[i][0] === mutate[0]){ 
            newItem[i][1] = newItem[i][1] + mutate[1]
            containsMutate = true
        }
        if (newItem[i][0] === voidbuff[0] && trigger == true){ 
            newItem[i][1] = newItem[i][1] + voidstat
            containsVoid = true
        }
    }
    
    if (mutate[1] != 0 && containsMutate == false){ newItem[newItem.length] = mutate }
    if (voidbuff[1] != 0 && containsVoid == false && trigger == true){
        if (voidbuff[0] === mutate[0] && mutate[1] != 0){
            newItem[newItem.length-1] = [mutate[0], mutate[1] + voidstat]
        } else { newItem[newItem.length] = [voidbuff[0], voidstat] }
    }

    return newItem
}

export function armorStatMultiplier(item, rank, rarity, quality, trigger, mutate, voidbuff) {
    let newItem1 = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rankNum = romanToInt(rank)
    let rarityNum = rarityToInt(rarity)
    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let qual = ( (quality - 129) / 1000 ) + 1
    let voidstat = voidbuff[1]
    if(trigger == true){ 
        qual = ( (quality - 29) / 1000 ) + 1
        voidstat = voidstat * rarityNum * qual
    }
    if (voidbuff[0] === "Add 1 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 1
    } else if (voidbuff[0] === "Add 2 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 2
    } else if (voidbuff[0] === "Add 3 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 3
    } else if (voidbuff[0] === "Add_EP"){
        voidstat = voidbuff[1]
    }

    let newItem = newItem1
    // console.log(newItem)
    let containsVoid = false
    let containsMutate = false

    let EP = newItem[newItem.length - 1][1] + rankNum - rarityNum

    if (EP < 0) { EP = 0 }

    const big = [1.66666, 1.677326, 1.687659, 1.6969924, 1.7059924, 1.7143254, 1.7223254]
    const small = [big[0]*0.5, big[1]*0.5, big[2]*0.5, big[3]*0.5, big[4]*0.5, big[5]*0.5, big[6]*0.5,]

    for (let i = 0; i < newItem.length; i++) {
        if ( (newItem[i][0] === "Max_Hull") ) 
        {
            if( (newItem[i][1] == 125) ) {
                newItem[i][1] = ( ( newItem[i][1] + (5 * (rarityNum-1)) ) * rankNum ) * qual
            } else {
                newItem[i][1] =( ( newItem[i][1] + (10 * (rarityNum-1)) ) * rankNum ) * qual
            }
        } else if ( newItem[i][0] === "%_Move_Cooldown" )
        {
            if( newItem[i][1] == 1.66666 ) {
                newItem[i][1] = big[rarityNum-1] * rankNum
            } else { newItem[i][1] = small[rarityNum-1] * rankNum }
        } else if ( newItem[i][0] === "EP" )
        {
            newItem[i][1] = EP
        } else if ( 
        (newItem[i][0] === "Human_Hull") || 
        (newItem[i][0] === "Pirate_Hull") ||
        (newItem[i][0] === "Het_Hull") || 
        (newItem[i][0] === "Wyrd_Hull") || 
        (newItem[i][0] === "Precursor_Hull")
            ) 
        {
            if( (newItem[i][1] == 12.5)){
                newItem[i][1] = ( newItem[i][1] + (0.5 * (rarityNum - 1) ) ) * rankNum * qual
            } else if( (newItem[i][1] == 25)){
                newItem[i][1] = ( newItem[i][1] + (1 * (rarityNum - 1) ) ) * rankNum * qual
            } else if( (newItem[i][1] == 37.5)){
                newItem[i][1] = ( newItem[i][1] + (1.5 * (rarityNum - 1) ) ) * rankNum * qual
            } else {
                newItem[i][1] = ( newItem[i][1] + (0.75 * (rarityNum - 1) ) ) * rankNum * qual
            }
        } else{
            newItem[i][1] = ( newItem[i][1] * 0.5 ) * (EP + rarityNum) * qual
        }

        if (newItem[i][0] === mutate[0]){ 
            newItem[i][1] = newItem[i][1] + mutate[1]
            containsMutate = true
        }
        if (newItem[i][0] === voidbuff[0] && trigger == true){ 
            newItem[i][1] = newItem[i][1] + voidstat
            containsVoid = true
        }
    }

    if (mutate[1] != 0 && containsMutate == false){ newItem[newItem.length] = mutate }
    if (voidbuff[1] != 0 && containsVoid == false && trigger == true){
        if (voidbuff[0] === mutate[0] && mutate[1] != 0){
            newItem[newItem.length-1] = [mutate[0], mutate[1] + voidstat]
        } else { newItem[newItem.length] = [voidbuff[0], voidstat] }
    }
    // console.log("final newItem")
    // console.log(newItem)
    return newItem
}

export function storageStatMultiplier(item, rank, rarity, quality, trigger, mutate, voidbuff){
    let newItem = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rankNum = romanToInt(rank)
    let rarityNum = rarityToInt(rarity)
    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let rssQual = ( (quality - 129) * 0.0009 ) + 1
    let qual = ( (quality - 129) * 0.001 ) + 1
    let voidstat = voidbuff[1]
    if(trigger == true){ 
        rssQual = ( (quality - 29) * 0.0009 ) + 1
        qual = ( (quality - 29) * 0.001 ) + 1
        voidstat = voidstat * rarityNum * qual
    }
    if (voidbuff[0] === "Add 1 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 1
    } else if (voidbuff[0] === "Add 2 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 2
    } else if (voidbuff[0] === "Add 3 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 3
    } else if (voidbuff[0] === "Add_EP"){
        voidstat = voidbuff[1]
    }

    let containsVoid = false
    let containsMutate = false

    if (newItem.length > 1 ){
        let EP = newItem[3][1] + rankNum - rarityNum
        if (EP < 0) { EP = 0 }

        // newItem[0][1] = (newItem[0][1] + ( (3.07 * 0.1666666) * ( rarityNum-1) )) + (1.01* (rankNum-1) )
        newItem[0][1] = ( newItem[0][1] + ( 0.5 * (rarityNum-1) ) + (rankNum-1) ) * rssQual
        newItem[1][1] = ( newItem[1][1] * rarityNum ) * qual
        if (EP >= 4 ) {
            newItem[2][1] = 0
            newItem[3][1] = EP
            newItem[5][1] = 1
        } else{
            let base = (newItem[2][1] / 0.75) * rarityNum
            newItem[2][1] = base - ( (base/4) * EP )
            newItem[3][1] = EP
        }
        if (rarityNum >= 5){
            newItem[4][1] = rarityNum - 4
        }

        for(let i=0; i<newItem.length; i++){
            if (newItem[i][0] === mutate[0]){ 
                newItem[i][1] = newItem[i][1] + mutate[1]
                containsMutate = true
            }
            if (newItem[i][0] === voidbuff[0] && trigger == true){ 
                newItem[i][1] = newItem[i][1] + voidstat
                containsVoid = true
            }
        }
    }

    if (mutate[1] != 0 && containsMutate == false){ newItem[newItem.length] = mutate }
    if (voidbuff[1] != 0 && containsVoid == false && trigger == true){
        if (voidbuff[0] === mutate[0] && mutate[1] != 0){
            newItem[newItem.length-1] = [mutate[0], mutate[1] + voidstat]
        } else { newItem[newItem.length] = [voidbuff[0], voidstat] }
    }
    
    return newItem
}

export function cpuStatMultiplier(item, rarity, quality, trigger, mutate, voidbuff){
    let stats = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rarityNum = rarityToInt(rarity)

    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let qual = ( (quality - 129) * 0.001 )
    let voidstat = voidbuff[1]
    if(trigger == true){ 
        qual = ( (quality - 29) * 0.001 )
        voidstat = voidstat * rarityNum * (qual + 1)
    }
    if (voidbuff[0] === "Add 1 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 1
    } else if (voidbuff[0] === "Add 2 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 2
    } else if (voidbuff[0] === "Add 3 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 3
    } else if (voidbuff[0] === "Add_EP"){
        voidstat = voidbuff[1]
    }

    let containsVoid = false
    let containsMutate = false

    for (let i = 0; i < stats.length; i++) {
        if ( stats[i][0] === "Resource_Storage" ){
            if ( stats[i][1] == -11 ) { stats[i][1] = ( stats[i][1] + (rarityNum-1) ) + ( qual * rarityNum ) }
            else if ( stats[i][1] == -25 ) { stats[i][1] = ( stats[i][1] + ( 3 * (rarityNum-1)) ) + ( qual * rarityNum * 3 ) }
            else if ( stats[i][1] == 1 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * (1 + qual) }
            else if ( stats[i][1] == 2.8 ) { stats[i][1] = ( stats[i][1] + ( 0.8 * (rarityNum-1) ) ) + ( qual * rarityNum * 0.8) }
        } else if (stats[i][0] === "Evasion_Chance"){
            if ( stats[i][1] == 7 ) { stats[i][1] = ( stats[i][1] + (rarityNum - 1) ) * (1 + qual) }
            else if ( stats[i][1] == 7.25 ) { stats[i][1] = ( stats[i][1] + ( 1.25 * (rarityNum - 1)) ) * (1 + qual) }
            else if ( stats[i][1] == 10 ) { stats[i][1] = ( stats[i][1] + ( 2 * (rarityNum - 1)) ) * (1 + qual) }
            else if ( stats[i][1] == 12.75 ) { stats[i][1] = ( stats[i][1] + ( 2.25 * (rarityNum - 1)) ) * (1 + qual) }
            else if ( stats[i][1] == -13 ) { stats[i][1] = ( stats[i][1] + (rarityNum-1) ) + ( qual * rarityNum ) }
            else if ( stats[i][1] == -10 ) { stats[i][1] = ( stats[i][1] + (rarityNum-1) ) + ( qual * rarityNum ) }
            else if ( stats[i][1] == -25 ) { stats[i][1] = ( stats[i][1] + ( 3 * (rarityNum-1)) ) + ( qual * rarityNum * 3 ) }
            else if ( stats[i][1] == 1 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * ( 1 + qual ) }
        } else if ( stats[i][0] === "%_XP_Gains" ){
            if ( stats[i][1] == -10 ) { stats[i][1] = ( stats[i][1] + (rarityNum - 1) ) + (qual * rarityNum) }
            else if ( stats[i][1] == -45 ) { stats[i][1] = ( stats[i][1] + ( 5 * (rarityNum-1)) ) + ( qual * rarityNum * 5 ) }
            else if ( stats[i][1] == 7 ) { stats[i][1] = ( stats[i][1] + (rarityNum-1) ) * (1 + qual) }
            else if ( stats[i][1] == 7.5 ) { stats[i][1] = ( stats[i][1] + ( 1.5 * (rarityNum-1) ) ) * (1 + qual) }
            else if ( stats[i][1] == 8.5 ) { stats[i][1] = ( stats[i][1] + ( 2 * (rarityNum-1) ) ) * (1 + qual) }
            else if ( stats[i][1] == 9.5 ) { stats[i][1] = ( stats[i][1] + ( 2.5 * (rarityNum-1) ) ) * (1 + qual) }
        } else if ( stats[i][0] === "%_Hull_Damage" ){ 
            if ( stats[i][1] == 0.8 || stats[i][1] == 1.6 || stats[i][1] == 1.76 || stats[i][1] == 1.92 || stats[i][1] == 2.08 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * (1 + qual) }
        } else if ( stats[i][0] === "%_Move_Cooldown" ){
            if ( stats[i][1] == 32 ) { stats[i][1] = ( stats[i][1] - ( 4 * (rarityNum-1)) ) - ( qual * 4 * rarityNum ) }
            else if ( stats[i][1] == 25 ) { stats[i][1] = ( stats[i][1] - ( 3 * (rarityNum-1)) ) - ( qual * 3 * rarityNum ) }
            else if ( stats[i][1] == -1.5 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * ( 1 + qual) }
            else if ( stats[i][1] == -1.25 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * ( 1 + qual) }
            else if ( stats[i][1] == -1.8 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * ( 1 + qual) }
            else if ( stats[i][1] == -2.1 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * ( 1 + qual) }
            else if ( stats[i][1] == -2.4 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * ( 1 + qual) }
            else if ( stats[i][1] == -1 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * ( 1 + qual) }
        } else if ( stats[i][0] === "Hit_Chance" ){
            if ( stats[i][1] == -13 ) { stats[i][1] = ( stats[i][1] + (rarityNum-1) ) + ( qual * rarityNum ) }
            else if ( stats[i][1] == 9.5 ) { stats[i][1] = ( stats[i][1] + (1.5 * (rarityNum-1)) ) * ( 1 + qual ) }
            else if ( stats[i][1] == 9.75 ) { stats[i][1] = ( stats[i][1] + (1.75 * (rarityNum-1)) ) * ( 1 + qual ) }
            else if ( stats[i][1] == 12 ) { stats[i][1] = ( stats[i][1] + (2 * (rarityNum-1)) ) * ( 1 + qual ) }
            else if ( stats[i][1] == 14.25 ) { stats[i][1] = ( stats[i][1] + (2.25 * (rarityNum-1)) ) * ( 1 + qual ) }
        } else if ( stats[i][0] === "Critical_Chance" ) {
            if ( stats[i][1] == -10 ) { stats[i][1] = ( stats[i][1] + ( 0.5 * (rarityNum-1)) ) + ( qual * rarityNum * 0.5 ) }
            else if ( stats[i][1] == -25 ) { stats[i][1] = ( stats[i][1] + ( 3 * (rarityNum-1)) ) + ( qual * rarityNum * 3 ) }
            else if ( stats[i][1] == 7 ) { stats[i][1] = ( stats[i][1] + (rarityNum-1) ) * ( 1 + qual ) }
            else if ( stats[i][1] == 8 ) { stats[i][1] = ( stats[i][1] + ( 2 * (rarityNum-1)) ) * ( 1 + qual ) }
            else if ( stats[i][1] == 8.5 ) { stats[i][1] = ( stats[i][1] + ( 2.5 * (rarityNum-1)) ) * ( 1 + qual ) }
            else if ( stats[i][1] == 9 ) { stats[i][1] = ( stats[i][1] + ( 3 * (rarityNum-1)) ) * ( 1 + qual ) }
        } else if ( stats[i][0] === "Hack_Resist" ){
            if ( stats[i][1] == 1 || stats[i][1] == 1.5 || stats[i][1] == 2 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * (1 + qual) }
        } else if ( stats[i][0] === "Add_EP" ){
            if (stats.length == 3 && stats[i][1] == 1 && rarityNum >= 5) { stats[i][1] = 2 }
            else if ( stats[i][1] > 0 && rarityNum == 7) { stats[i][1]++ }
        } else if ( stats[i][0] === "Splash_Chance" ){
            if ( stats[i][1] == -10 ) { stats[i][1] = ( stats[i][1] + (rarityNum - 1) ) + (qual * rarityNum) }
            else if ( stats[i][1] == 6 ) { stats[i][1] = ( stats[i][1] + ( 2 * (rarityNum-1)) ) * ( 1 + qual ) }
            else if ( stats[i][1] == 8.5 ) { stats[i][1] = ( stats[i][1] + ( 2.5 * (rarityNum-1)) ) * ( 1 + qual ) }
            else if ( stats[i][1] == 11 ) { stats[i][1] = ( stats[i][1] + ( 3 * (rarityNum-1)) ) * ( 1 + qual ) }
            else if ( stats[i][1] == 13.5 ) { stats[i][1] = ( stats[i][1] + ( 3.5 * (rarityNum-1)) ) * ( 1 + qual ) }
        } else if ( stats[i][0] === "%_Hull_Repairs" ){
            if ( stats[i][1] == -18 ) { stats[i][1] = ( stats[i][1] + ( 2 * (rarityNum - 1)) ) + (qual * rarityNum * 2) }
            else if ( stats[i][1] == -17 ) { stats[i][1] = ( stats[i][1] + ( rarityNum - 1 ) ) + (qual * rarityNum) }
            else if ( stats[i][1] == -25 ) { stats[i][1] = ( stats[i][1] + ( 3 * (rarityNum-1)) ) + ( qual * rarityNum * 3 ) }
            else if ( stats[i][1] == 2 || stats[i][1] == 3.3 || stats[i][1] == 4.6) { stats[i][1] = ( stats[i][1] + (rarityNum-1) ) * ( 1 + qual ) }
        } else if ( stats[i][0] === "%_Incoming_Damage" ){
            if ( stats[i][1] == 10 ) { stats[i][1] = ( stats[i][1] - ((rarityNum-1)) ) - ( qual * rarityNum ) }
            else if ( stats[i][1] == 16 ) { stats[i][1] = ( stats[i][1] - (2 * (rarityNum-1)) ) - ( qual * rarityNum * 2 ) }
            else if ( stats[i][1] == -0.5 ) { stats[i][1] = ( stats[i][1] - ( 0.5 * (rarityNum-1)) ) - ( qual * rarityNum * 0.5 )  }
            else if ( stats[i][1] == -0.6 ) { stats[i][1] = ( stats[i][1] - ( 0.6 * (rarityNum-1)) ) - ( qual * rarityNum * 0.6 )  }
            else if ( stats[i][1] == -0.7 ) { stats[i][1] = ( stats[i][1] - ( 0.7 * (rarityNum-1)) ) - ( qual * rarityNum * 0.7 )  }
        } else if ( stats[i][0] === "Grapple_Resist" ){
            if ( stats[i][1] == 1 || stats[i][1] == 1.5 || stats[i][1] == 1.75 || stats[i][1] == 2 || stats[i][1] == 2.5 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * ( 1 + qual ) }
        } else if ( stats[i][0] === "Critical_Resist" ){
            if ( stats[i][1] == 1 || stats[i][1] == 1.5 || stats[i][1] == 1.75  || stats[i][1] == 2 || stats[i][1] == 2.5 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * ( 1 + qual ) }
        } else if ( stats[i][0] === "Splash_Resist" ){
            if ( stats[i][1] == 1 || stats[i][1] == 1.2 || stats[i][1] == 1.5 || stats[i][1] == 2 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * (1 + qual) }
        } else if ( stats[i][0] === "%_Outgoing_Damage" ){
            if ( stats[i][1] == 3 ) { stats[i][1] = ( stats[i][1] + (rarityNum-1) ) * (1 + qual) }
            else if ( stats[i][1] == 1.6 || stats[i][1] == 2 || stats[i][1] == 2.4 ) { stats[i][1] = ( stats[i][1] * rarityNum ) * (1 + qual) }
        } else if ( stats[i][0] === "%_Shield_Pierce" ){
            if ( stats[i][1] == 1 ) { stats[i][1] = ( stats[i][1] *rarityNum ) * (1 + qual) }
        }

        if (stats[i][0] === mutate[0]){ 
            stats[i][1] = stats[i][1] + mutate[1]
            containsMutate = true
        }
        if (stats[i][0] === voidbuff[0] && trigger == true){ 
            stats[i][1] = stats[i][1] + voidstat
            containsVoid = true
        }
    }

    if (mutate[1] != 0 && containsMutate == false){ stats[stats.length] = mutate }
    if (voidbuff[1] != 0 && containsVoid == false && trigger == true){
        if (voidbuff[0] === mutate[0] && mutate[1] != 0){
            stats[stats.length-1] = [mutate[0], mutate[1] + voidstat]
        } else { stats[stats.length] = [voidbuff[0], voidstat] }
    }
    
    return stats
}

export function engineStatMultiplier(item, rarity, quality, trigger, mutate, voidbuff) {
    let newItem = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rarityNum = rarityToInt(rarity)

    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let qual = ( (quality - 129) * 0.001 )
    let voidstat = voidbuff[1]
    if(trigger == true){ 
        qual = ( (quality - 29) * 0.001 ) 
        voidstat = voidstat * rarityNum * (qual + 1)
    }
    if (voidbuff[0] === "Add 1 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 1
    } else if (voidbuff[0] === "Add 2 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 2
    } else if (voidbuff[0] === "Add 3 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 3
    } else if (voidbuff[0] === "Add_EP"){
        voidstat = voidbuff[1]
    }

    let containsVoid = false
    let containsMutate = false

    if ( newItem.length == 2 ) {
        newItem[0][1] = ( newItem[0][1] * rarityNum ) * (1 + qual)
        if (trigger == true){ newItem[0][1] = newItem[0][1] * 1.1 }
        if ( rarityNum == 7 ) { newItem[1][1]++ }
    }else {
        for (let i = 0; i < newItem.length; i++) {
            if( newItem[i][0] === "Add_EP" && rarityNum >= 6 ) {
                newItem[i][1]++
            } else if ( newItem[i][1] == 25.0 ){
                newItem[i][1] = ( newItem[i][1] - ( 2 * (rarityNum-1) ) ) - ( qual * rarityNum * 2)
            } else if ( newItem[i][1] == 6 ){
                newItem[i][1] = ( newItem[i][1] + (5 * (rarityNum-1) ) ) * (1 + qual)
            } else if (newItem[i][0] === "Moves to Burn 3 Crew"){
                newItem[i][1] = ( newItem[i][1] + (rarityNum-1) ) * (1 + qual )
            } else {
                newItem[i][1] = ( newItem[i][1] * rarityNum ) * (1 + qual )
            }
        }
    }

    for(let i=0; i<newItem.length; i++){
        if (newItem[i][0] === mutate[0]){ 
            newItem[i][1] = newItem[i][1] + mutate[1]
            containsMutate = true
        }
        if (newItem[i][0] === voidbuff[0] && trigger == true){ 
            newItem[i][1] = newItem[i][1] + voidstat
            containsVoid = true
        }
    }

    if (mutate[1] != 0 && containsMutate == false){ newItem[newItem.length] = mutate }
    if (voidbuff[1] != 0 && containsVoid == false && trigger == true){
        if (voidbuff[0] === mutate[0] && mutate[1] != 0){
            newItem[newItem.length-1] = [mutate[0], mutate[1] + voidstat]
        } else { newItem[newItem.length] = [voidbuff[0], voidstat] }
    }

    return newItem
}

export function specialStatMultiplier(item, rarity, quality, trigger, mutate, voidbuff) {
    let newItem = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rarityNum = rarityToInt(rarity)

    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let qual = ( (quality - 129) * 0.001 )
    let voidstat = voidbuff[1]
    if(trigger == true){ 
        qual = ( (quality - 29) * 0.001 )
        voidstat = voidstat * rarityNum * (qual + 1)
    }
    if (voidbuff[0] === "Add 1 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 1
    } else if (voidbuff[0] === "Add 2 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 2
    } else if (voidbuff[0] === "Add 3 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 3
    } else if (voidbuff[0] === "Add_EP"){
        voidstat = voidbuff[1]
    }

    let containsVoid = false
    let containsMutate = false

    let droneArr = [-8.33, -9.09, -10, -11.11, -12.5, -14.29, -16.67]

    for (let i = 0; i < newItem.length; i++) {
        if( newItem[i][0] === "Add_EP" ) {
            if ( newItem[0][0] == "% Stun or Throw Chance on Ram" ){
                if (rarityNum >= 5) {newItem[i][1] = rarityNum-4}
            } else if ( newItem[i][1] == 2 || newItem.length == 1 || newItem[0][0] === "%_Hull_Damage" || newItem[2][1] == 5.11 || newItem[0][0] === "Hack_Resist") {
                if (rarityNum >= 6) {newItem[i][1] = newItem[i][1] + (rarityNum-5) }
            } else if ( newItem[0][0] === "%_Move_Cooldown" || newItem.length == 8 ){
                if (rarityNum == 4 || rarityNum == 5 || rarityNum == 6) {newItem[i][1] = 1}
                if (rarityNum == 7) {newItem[i][1] = 2}
            } else if ( newItem[0][0] === "Power_Recharge" ) {
                if (rarityNum == 7) {newItem[i][1] = 2}
            } else {
                if (rarityNum == 5 || rarityNum == 6) {newItem[i][1]++}
                if (rarityNum == 7) {newItem[i][1] = 2}
            } 
        } else if (newItem[i][0] === "% Repair & Harvest Drone Speed"){
            newItem[i][1] = droneArr[rarityNum-1] * ( 1 + qual )
        } else if (newItem[i][1] == 5){
            newItem[i][1] = ( newItem[i][1] + (3 * (rarityNum-1)) ) * (1 + qual)
        } else if (newItem[i][1] == -80) {
            if (rarityNum == 1){newItem[i][1] = -80}
            else { newItem[i][1] = ( newItem[i][1] + (10 * (rarityNum-1)) ) + ( qual * (rarityNum-1) * 10 ) }
        } else if (newItem[i][1] == 80) {
            newItem[i][1] = ( newItem[i][1] + (10 * (rarityNum-1)) ) * (1 + qual)
        } else if (newItem[i][0] === "Grapple_Power" && newItem[i][1] == 2.5) {
            newItem[i][1] = ( newItem[i][1] + (1.5 * (rarityNum-1)) ) * (1 + qual)
        } else if (newItem[i][0] === "Add_Weapon_Slot" && rarityNum == 7){
            newItem[i][1] = 1
        } else if (newItem[i][0] === "Add_Drone_Slot" && rarityNum == 7){
            newItem[i][1] = 1
        } else if (newItem[i][0] === "Visible Scan Range Bonus") {
            if (rarityNum == 1){newItem[i][1] = 1}
            else {newItem[i][1] = rarityNum-1}
        } else if (newItem[i][1] == 0) {
            if (rarityNum >= 6) {newItem[i][1] = (15 * (rarityNum-5)) * (1 + qual) }
        } else {
            newItem[i][1] = ( newItem[i][1] * rarityNum ) * (1 + qual)
        }

        if (newItem[i][0] === mutate[0]){ 
            newItem[i][1] = newItem[i][1] + mutate[1]
            containsMutate = true
        }
        if (newItem[i][0] === voidbuff[0] && trigger == true){ 
            newItem[i][1] = newItem[i][1] + voidstat
            containsVoid = true
        }
    }

    if (mutate[1] != 0 && containsMutate == false){ newItem[newItem.length] = mutate }
    if (voidbuff[1] != 0 && containsVoid == false && trigger == true){
        if (voidbuff[0] === mutate[0] && mutate[1] != 0){
            newItem[newItem.length-1] = [mutate[0], mutate[1] + voidstat]
        } else { newItem[newItem.length] = [voidbuff[0], voidstat] }
    }
    
    return newItem
}

export function batteryStatMultiplier(item, rarity, quality, trigger, mutate, voidbuff){
    let newItem = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rarityNum = rarityToInt(rarity)

    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let qual = ( (quality - 129) * 0.001 )
    let voidstat = voidbuff[1]
    if(trigger == true){ 
        qual = ( (quality - 29) * 0.001 )
        voidstat = voidstat * rarityNum * (qual + 1)
    }
    if (voidbuff[0] === "Add 1 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 1
    } else if (voidbuff[0] === "Add 2 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 2
    } else if (voidbuff[0] === "Add 3 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 3
    } else if (voidbuff[0] === "Add_EP"){
        voidstat = voidbuff[1]
    }

    let containsVoid = false
    let containsMutate = false

    for (let i = 0; i < newItem.length; i++) {
        if( newItem[i][0] === "Add_EP" ){ 
            if ( rarityNum == 7 ){ newItem[i][1] = 1 }
            else { newItem[i][1] = 0 }
        }
        else if( newItem[i][0] === "Power_Recharge" ){ newItem[i][1] = ( newItem[i][1] + ( 9 * (rarityNum-1)) ) * ( 1+qual ) }
        else if( newItem[i][0] === "Shield_Capacity" || 
                newItem[i][0] === "%_Hull_Repairs" || 
                newItem[i][0] === "Battery_Drain_Power" || 
                newItem[i][0] === "Critical_Chance" || 
                newItem[i][0] === "%_XP_Gains" || 
                newItem[i][0] === "Grapple_Power" || 
                newItem[i][0] === "Hit_Chance" ){ newItem[i][1] = ( newItem[i][1] * rarityNum ) * ( 1+qual ) }
        else if( newItem[i][1] == 0 && rarityNum >= 3){ newItem[i][1] = ( rarityNum ) * ( 1+qual ) }
        else if( newItem[i][1] < 0 ){ 
            let rev = newItem[i][1] * (-1)
            rev = ( rev * rarityNum ) * ( 1+qual)
            newItem[i][1] = rev * (-1)
        }
        else if( newItem[i][0] === "Battery_Drain_Resist" ){ newItem[i][1] = ( newItem[i][1] + ( 1.5 * (rarityNum-1))) * ( 1+qual ) }
        else{ newItem[i][1] = ( newItem[i][1] + ( (newItem[i][1]/2) * (rarityNum-1)) ) * ( 1+qual )  }

        if (newItem[i][0] === mutate[0]){ 
            newItem[i][1] = newItem[i][1] + mutate[1]
            containsMutate = true
        }
        if (newItem[i][0] === voidbuff[0] && trigger == true){ 
            newItem[i][1] = newItem[i][1] + voidstat
            containsVoid = true
        }
    }

    if (mutate[1] != 0 && containsMutate == false){ newItem[newItem.length] = mutate }
    if (voidbuff[1] != 0 && containsVoid == false && trigger == true){ newItem[newItem.length] = [voidbuff[0], voidstat] }

    return newItem
}

export function auxBatteryStatMultiplier(item, rarity, quality, trigger, mutate, voidbuff){
    let newItem = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rarityNum = rarityToInt(rarity)
    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let qual = ( (quality - 129) * 0.001 )
    let voidstat = voidbuff[1]
    if(trigger == true){ 
        qual = ( (quality - 29) * 0.001 )
        voidstat = voidstat * rarityNum * (qual + 1)
    }
    if (voidbuff[0] === "Add 1 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 1
    } else if (voidbuff[0] === "Add 2 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 2
    } else if (voidbuff[0] === "Add 3 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 3
    } else if (voidbuff[0] === "Add_EP"){
        voidstat = voidbuff[1]
    }

    let containsVoid = false
    let containsMutate = false

    for (let i = 0; i < newItem.length; i++) {
        if( newItem[i][0] === "Add_EP" ){ 
            if ( rarityNum == 7 ){ newItem[i][1] = 1 }
            else { newItem[i][1] = 0 }
        }
        else if( newItem[i][0] === "Power_Recharge" ){ newItem[i][1] = ( newItem[i][1] + ( 9 * (rarityNum-1)) ) * ( 1+qual ) }
        else if( newItem[i][0] === "Shield_Capacity" || 
                newItem[i][0] === "%_Hull_Repairs" || 
                newItem[i][0] === "Battery_Drain_Power" || 
                newItem[i][0] === "Critical_Chance" || 
                newItem[i][0] === "%_XP_Gains" || 
                newItem[i][0] === "Grapple_Power" || 
                newItem[i][0] === "Hit_Chance" ){ newItem[i][1] = ( newItem[i][1] * rarityNum ) * ( 1+qual ) }
        else if( newItem[i][1] == 0 && rarityNum >= 3){ newItem[i][1] = ( rarityNum ) * ( 1+qual ) }
        else if( newItem[i][1] < 0 ){ 
            let rev = newItem[i][1] * (-1)
            rev = ( rev * rarityNum ) * ( 1+qual)
            newItem[i][1] = rev * (-1)
        }
        else if( newItem[i][0] === "Battery_Drain_Resist" ){ newItem[i][1] = ( newItem[i][1] + ( 1.5 * (rarityNum-1))) * ( 1+qual ) }
        else{ newItem[i][1] = ( newItem[i][1] + ( (newItem[i][1]/2) * (rarityNum-1)) ) * ( 1+qual )  }

        if (newItem[i][0] === mutate[0]){ 
            newItem[i][1] = newItem[i][1] + mutate[1]
            containsMutate = true
        }
        if (newItem[i][0] === voidbuff[0] && trigger == true){ 
            newItem[i][1] = newItem[i][1] + voidstat
            containsVoid = true
        }

        if ( newItem[i][0] !== "Add_EP" &&
            newItem[i][0] !== "Human_Battery" &&
            newItem[i][0] !== "Pirate_Battery" &&
            newItem[i][0] !== "Het_Battery" &&
            newItem[i][0] !== "Wyrd_Battery" &&
            newItem[i][0] !== "Precursor_Battery" ){ newItem[i][1] = newItem[i][1] * 0.1 }
    }

    if (mutate[1] != 0 && containsMutate == false){ newItem[newItem.length] = [mutate[0], mutate[1]*0.1] }
    if (voidbuff[1] != 0 && containsVoid == false && trigger == true){
        if (voidbuff[0] === mutate[0] && mutate[1] != 0){
            newItem[newItem.length-1] = [mutate[0], (mutate[1] + voidstat) * 0.1]
        } else { newItem[newItem.length] = [voidbuff[0], voidstat * 0.1] }
    }

    return newItem
}

export function weaponStatMultiplier(item, rank, rarity, quality, trigger, mutate, voidbuff){
    let newItem = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rarityNum = rarityToInt(rarity)
    let rankNum = romanToInt(rank)

    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let qual = ( (quality - 129) * 0.001 )
    let voidstat = voidbuff[1]
    if(trigger == true){ 
        qual = ( (quality - 29) * 0.001 )
        voidstat = voidstat * rarityNum * (qual + 1)
    }
    if (voidbuff[0] === "Add 1 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 1
    } else if (voidbuff[0] === "Add 2 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 2
    } else if (voidbuff[0] === "Add 3 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 3
    } else if (voidbuff[0] === "Add_EP"){
        voidstat = voidbuff[1]
    }

    let containsVoid = false
    let containsMutate = false

    for (let i = 0; i < newItem.length; i++) {
        if ( newItem[i][0] === "Add_EP" ){ continue }
        else if ( newItem[i][0] === "%_Outgoing_Damage" && newItem[i][1] == 0 && rarityNum >= 4 ){ newItem[i][1] = ( 2 * (rarityNum-3) ) * ( 1+qual )  }
        else if ( newItem[i][0] === "Max_Hull" && newItem[i][1] == 0 && rarityNum >= 3 ){ newItem[i][1] = ( 100 * (rarityNum-2) ) * ( 1+qual ) }
        else if ( newItem[i][0] === "EP" ){ 
            newItem[i][1] = newItem[i][1] + rankNum - rarityNum
            if ( newItem[i][1] < 0 ) { newItem[i][1] = 0 } 
        }
        else { newItem[i][1] = ( newItem[i][1] * rarityNum ) * ( 1+qual ) }

        if (newItem[i][0] === mutate[0]){ 
            newItem[i][1] = newItem[i][1] + mutate[1]
            containsMutate = true
        }
        if (newItem[i][0] === voidbuff[0] && trigger == true){ 
            newItem[i][1] = newItem[i][1] + voidstat
            containsVoid = true
        }
    }

    if (mutate[1] != 0 && containsMutate == false){ newItem[newItem.length] = mutate }
    if (voidbuff[1] != 0 && containsVoid == false && trigger == true){
        if (voidbuff[0] === mutate[0] && mutate[1] != 0){
            newItem[newItem.length-1] = [mutate[0], mutate[1] + voidstat]
        } else { newItem[newItem.length] = [voidbuff[0], voidstat] }
    }

    return newItem
}

export function weaponDamageMultiplier(item, rank, rarity, quality, trigger){
    let newItem = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rankNum = romanToInt(rank)
    let rarityNum = rarityToInt(rarity)
    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let qual = ( (quality - 129) * 0.001 )
    if(trigger == true){ qual = ( (quality - 29) * 0.001 ) }

    let minStep = newItem[2][1] * (1+qual) * 0.125
    let maxStep = newItem[3][1] * (1+qual) * 0.125

    newItem[2][1] = ( newItem[2][1] * (1+qual) ) + ( minStep * ( (rankNum + rarityNum) - 2 ) )
    newItem[3][1] = ( newItem[3][1] * (1+qual) ) + ( maxStep * ( (rankNum + rarityNum) - 2 ) )

    return newItem
}

export function auxWeaponStatMultiplier(item, rank, rarity, quality, trigger, mutate, voidbuff){
    let newItem = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rarityNum = rarityToInt(rarity)
    let rankNum = romanToInt(rank)

    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let qual = ( (quality - 129) * 0.001 )
    let voidstat = voidbuff[1]
    if(trigger == true){ 
        qual = ( (quality - 29) * 0.001 )
        voidstat = voidstat * rarityNum * (qual + 1)
    }
    if (voidbuff[0] === "Add 1 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 1
    } else if (voidbuff[0] === "Add 2 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 2
    } else if (voidbuff[0] === "Add 3 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 3
    } else if (voidbuff[0] === "Add_EP"){
        voidstat = voidbuff[1]
    }

    let containsVoid = false
    let containsMutate = false

    for (let i = 0; i < newItem.length; i++) {
        if ( newItem[i][0] === "Add_EP" ){ continue }
        else if ( newItem[i][0] === "%_Outgoing_Damage" && newItem[i][1] == 0 && rarityNum >= 4 ){ newItem[i][1] = (( 2 * (rarityNum-3) ) * ( 1+qual )) * 0.1 }
        else if ( newItem[i][0] === "Max_Hull" && newItem[i][1] == 0 && rarityNum >= 3 ){ newItem[i][1] = (( 100 * (rarityNum-2) ) * ( 1+qual )) * 0.1 }
        else if ( newItem[i][0] === "EP" ){ 
            newItem[i][1] = newItem[i][1] + rankNum - rarityNum
            if ( newItem[i][1] < 0 ) { newItem[i][1] = 0 } 
        }

        if (newItem[i][0] === mutate[0]){ 
            newItem[i][1] = newItem[i][1] + mutate[1]
            containsMutate = true
        }
        if (newItem[i][0] === voidbuff[0] && trigger == true){ 
            newItem[i][1] = newItem[i][1] + voidstat
            containsVoid = true
        }
        else { newItem[i][1] = (( newItem[i][1] * rarityNum ) * ( 1+qual )) * 0.1 }
    }

    if (mutate[1] != 0 && containsMutate == false){ newItem[newItem.length] = [mutate[0], mutate[1]*0.1] }
    if (voidbuff[1] != 0 && containsVoid == false && trigger == true){
        if (voidbuff[0] === mutate[0] && mutate[1] != 0){
            newItem[newItem.length-1] = [mutate[0], (mutate[1] + voidstat) * 0.1]
        } else { newItem[newItem.length] = [voidbuff[0], voidstat * 0.1] }
    }

    return newItem
}

export function droneStatMultiplier(item, rarity, quality, trigger, mutate, voidbuff){
    let newItem = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rarityNum = rarityToInt(rarity)

    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let qual = ( (quality - 129) * 0.001 )
    let voidstat = voidbuff[1]
    if(trigger == true){ 
        qual = ( (quality - 29) * 0.001 )
        voidstat = voidstat * rarityNum * (qual + 1)
    }
    if (voidbuff[0] === "Add 1 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 1
    } else if (voidbuff[0] === "Add 2 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 2
    } else if (voidbuff[0] === "Add 3 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 3
    } else if (voidbuff[0] === "Add_EP"){
        voidstat = voidbuff[1]
    }

    let containsVoid = false
    let containsMutate = false

    for (let i = 0; i < newItem.length; i++) {
        if( newItem[i][0] === "EP" ){
            newItem[i][1] = Math.round(newItem[i][1] - ( (rarityNum-1) / 2 ) )
            if ( newItem[i][1] < 0 ){ newItem[i][1] = 0 }
        } else if ( newItem[i][0] === "%_Shield_Pierce" ||
                    newItem[i][0] === "%_Shield_Damage"){ 
            newItem[i][1] = ( newItem[i][1] + ( (newItem[i][1]/2) * (rarityNum-1) ) ) * ( 1+qual ) 
        } else if ( newItem[i][0] === "%_Incoming_Damage" ||
                    newItem[i][0] === "%_Targeting_Speed" ||
                    newItem[i][0] === "Shield_Capacity" ||
                    newItem[i][0] === "Battery_Drain_Resist" ||
                    newItem[i][0] === "Battery_Drain_Attack_Power" ||
                    newItem[i][0] === "Evasion_Chance" ||
                    newItem[i][0] === "Critical_Chance" ||
                    newItem[i][0] === "Resource_Storage" ||
                    newItem[i][0] === "%_Hull_Repairs" ||
                    newItem[i][0] === "Max_Hull" ||
                    newItem[i][0] === "%_Move_Cooldown" ||
                    newItem[i][0] === "%_Critical_Damage" ||
                    newItem[i][0] === "Hit_Chance" ||
                    newItem[i][0] === "Splash_Chance" ||
                    newItem[i][0] === "%_Outgoing_Damage" ||
                    newItem[i][0] === "Hack_Attack_Power" ||
                    newItem[i][0] === "Grapple_Attack_Power" ){
            newItem[i][1] = ( newItem[i][1] * rarityNum ) * (1+qual)
        } else if ( newItem[i][0] === "Splash_Resist" ||
                    newItem[i][0] === "Hack_Resist" ||
                    newItem[i][0] === "Grapple_Resist" ||
                    newItem[i][0] === "Critical_Resist"){
            if ( (newItem[i][1] == 6 && newItem[0][0]) === "%_Move_Cooldown" || 
                newItem[i][1] == 3 || 
                newItem[i][1] == 3.5 || 
                newItem[i][1] == 4.5 ){ newItem[i][1] = ( newItem[i][1] + ( 0.5 * (rarityNum-1) ) ) * ( 1+qual ) }
            else if ( newItem[i][1] == 3.25 || 
                    newItem[i][1] == 3.75 ||
                    newItem[i][1] == 6.25 ){ newItem[i][1] = ( newItem[i][1] + ( 0.75 * (rarityNum-1) ) ) * ( 1+qual ) }
            else if ( ( newItem[i][1] == 6.5 && newItem[0][0] === "Max_Hull" ) ||
                    newItem[i][1] == 5 ||
                    newItem[i][1] == 6 || 
                    newItem[i][1] == 7 || 
                    newItem[i][1] == 9 ||
                    newItem[i][1] == 12 ){ newItem[i][1] = ( newItem[i][1] + (rarityNum-1) ) * ( 1+qual ) }
            else if ( ( newItem[i][1] == 6.5 && newItem[0][0] !== "Max_Hull" ) || 
                    newItem[i][1] == 7.5 ||
                    newItem[i][1] == 12.5 ){ newItem[i][1] = ( newItem[i][1] + ( 1.5 * (rarityNum-1) ) ) * ( 1+qual ) }
            else if ( newItem[i][1] == 10 ||
                    newItem[i][1] == 13 ){ newItem[i][1] = ( newItem[i][1] + ( 2 * (rarityNum-1) ) ) * ( 1+qual ) }
        } else if ( newItem[i][0] === "%_XP_Gains" ){
            newItem[i][1] = ( newItem[i][1] + (rarityNum-1) ) * ( 1+qual )
        }

        if (newItem[i][0] === mutate[0]){ 
            newItem[i][1] = newItem[i][1] + mutate[1]
            containsMutate = true
        }
        if (newItem[i][0] === voidbuff[0] && trigger == true){ 
            newItem[i][1] = newItem[i][1] + voidstat
            containsVoid = true
        }
    }

    if (mutate[1] != 0 && containsMutate == false){ newItem[newItem.length] = mutate }
    if (voidbuff[1] != 0 && containsVoid == false && trigger == true){
        if (voidbuff[0] === mutate[0] && mutate[1] != 0){
            newItem[newItem.length-1] = [mutate[0], mutate[1] + voidstat]
        } else { newItem[newItem.length] = [voidbuff[0], voidstat] }
    }

    return newItem
}

export function auxDroneStatMultiplier(item, rarity, quality, trigger, mutate, voidbuff){
    let newItem = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rarityNum = rarityToInt(rarity)

    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let qual = ( (quality - 129) * 0.001 )
    let voidstat = voidbuff[1]
    if(trigger == true){ 
        qual = ( (quality - 29) * 0.001 )
        voidstat = voidstat * rarityNum * (qual + 1)
    }
    if (voidbuff[0] === "Add 1 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 1
    } else if (voidbuff[0] === "Add 2 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 2
    } else if (voidbuff[0] === "Add 3 EP"){
        voidbuff[0] = "Add_EP"
        voidstat = 3
    } else if (voidbuff[0] === "Add_EP"){
        voidstat = voidbuff[1]
    }

    let containsVoid = false
    let containsMutate = false

    for (let i = 0; i < newItem.length; i++) {
        if( newItem[i][0] === "EP" ){
            newItem[i][1] = Math.round(newItem[i][1] - ( (rarityNum-1) / 2 ) )
            if ( newItem[i][1] < 0 ){ newItem[i][1] = 0 }
        } else if ( newItem[i][0] === "%_Shield_Pierce" ||
                    newItem[i][0] === "%_Shield_Damage"){ 
            newItem[i][1] = ( newItem[i][1] + ( (newItem[i][1]/2) * (rarityNum-1) ) ) * ( 1+qual ) 
        } else if ( newItem[i][0] === "%_Incoming_Damage" ||
                    newItem[i][0] === "%_Targeting_Speed" ||
                    newItem[i][0] === "Shield_Capacity" ||
                    newItem[i][0] === "Battery_Drain_Resist" ||
                    newItem[i][0] === "Battery_Drain_Attack_Power" ||
                    newItem[i][0] === "Evasion_Chance" ||
                    newItem[i][0] === "Critical_Chance" ||
                    newItem[i][0] === "Resource_Storage" ||
                    newItem[i][0] === "%_Hull_Repairs" ||
                    newItem[i][0] === "Max_Hull" ||
                    newItem[i][0] === "%_Move_Cooldown" ||
                    newItem[i][0] === "%_Critical_Damage" ||
                    newItem[i][0] === "Hit_Chance" ||
                    newItem[i][0] === "Splash_Chance" ||
                    newItem[i][0] === "%_Outgoing_Damage" ||
                    newItem[i][0] === "Hack_Attack_Power" ||
                    newItem[i][0] === "Grapple_Attack_Power" ){
            newItem[i][1] = ( newItem[i][1] * rarityNum ) * (1+qual)
        } else if ( newItem[i][0] === "Splash_Resist" ||
                    newItem[i][0] === "Hack_Resist" ||
                    newItem[i][0] === "Grapple_Resist" ||
                    newItem[i][0] === "Critical_Resist"){
            if ( newItem[i][1] == 3 || 
                newItem[i][1] == 3.5 || 
                newItem[i][1] == 4.5 ){ newItem[i][1] = ( newItem[i][1] + ( 0.5 * (rarityNum-1) ) ) * ( 1+qual ) }
            else if ( newItem[i][1] == 3.25 || 
                    newItem[i][1] == 3.75 ||
                    newItem[i][1] == 6.25 ){ newItem[i][1] = ( newItem[i][1] + ( 0.75 * (rarityNum-1) ) ) * ( 1+qual ) }
            else if ( ( newItem[i][1] == 6.5 && newItem[0][0] === "Max_Hull" ) ||
                    newItem[i][1] == 5 ||
                    newItem[i][1] == 6 || 
                    newItem[i][1] == 7 || 
                    newItem[i][1] == 9 ){ newItem[i][1] = ( newItem[i][1] + (rarityNum-1) ) * ( 1+qual ) }
            else if ( ( newItem[i][1] == 6.5 && newItem[0][0] !== "Max_Hull" ) || 
                    newItem[i][1] == 7.5 ||
                    newItem[i][1] == 12.5 ){ newItem[i][1] = ( newItem[i][1] + ( 1.5 * (rarityNum-1) ) ) * ( 1+qual ) }
            else if ( newItem[i][1] == 10 ||
                    newItem[i][1] == 13 ){ newItem[i][1] = ( newItem[i][1] + ( 2 * (rarityNum-1) ) ) * ( 1+qual ) }
        } else if ( newItem[i][0] === "%_XP_Gains" ){
            newItem[i][1] = ( newItem[i][1] + (rarityNum-1) ) * ( 1+qual )
        }

        if (newItem[i][0] === mutate[0]){ 
            newItem[i][1] = newItem[i][1] + mutate[1]
            containsMutate = true
        }
        if (newItem[i][0] === voidbuff[0] && trigger == true){ 
            newItem[i][1] = newItem[i][1] + voidstat
            containsVoid = true
        }

        if ( newItem[i][0] !== "EP" ){ newItem[i][1] = newItem[i][1] * 0.1 }
    }

    if (mutate[1] != 0 && containsMutate == false){ newItem[newItem.length] = [mutate[0], mutate[1]*0.1] }
    if (voidbuff[1] != 0 && containsVoid == false && trigger == true){
        if (voidbuff[0] === mutate[0] && mutate[1] != 0){
            newItem[newItem.length-1] = [mutate[0], (mutate[1] + voidstat) * 0.1]
        } else { newItem[newItem.length] = [voidbuff[0], voidstat * 0.1] }
    }

    return newItem
}

export function droneDamageMultiplier(item, rarity, quality, trigger){
    let newItem = Object.keys(item).map(key => {
        return [key, item[key]]
    })
    let rarityNum = rarityToInt(rarity)

    if (quality < 1){quality = 1}
    if (quality > 256){quality = 256}
    let qual = ( (quality - 129) * 0.001 )
    if(trigger == true){ qual = ( (quality - 29) * 0.001 ) }

    if( newItem[7][1] === "0" ){
        let minStep = 9.33333
        let maxStep = minStep * 2

        newItem[1][1] = newItem[1][1] - (0.5 * (rarityNum-1))
        newItem[2][1] = ( newItem[2][1] + (minStep * (rarityNum-1)) ) * (1+qual)
        newItem[3][1] = ( newItem[3][1] + (maxStep * (rarityNum-1)) ) * (1+qual)
        
    } else if( newItem[7][1] === "1" ){
        let minStep = 13
        let maxStep = minStep * 2

        newItem[1][1] = newItem[1][1] - (rarityNum-1)
        newItem[2][1] = ( newItem[2][1] + (minStep * (rarityNum-1)) ) * (1+qual)
        newItem[3][1] = ( newItem[3][1] + (maxStep * (rarityNum-1)) ) * (1+qual)

    } else if( newItem[7][1] === "2" ){
        if(newItem[6][1] === "0"){
            newItem[1][1] = newItem[1][1] - (6.5 * (rarityNum-1))
        } else if(newItem[6][1] === "1"){
            newItem[1][1] = newItem[1][1] - (5 * (rarityNum-1))
        } else if(newItem[6][1] === "2"){
            newItem[1][1] = newItem[1][1] - (5.5 * (rarityNum-1))
        } else if(newItem[6][1] === "3"){
            newItem[1][1] = newItem[1][1] - (6 * (rarityNum-1))
        } else if(newItem[6][1] === "4"){
            newItem[1][1] = newItem[1][1] - (7 * (rarityNum-1))
        }
    }

    return newItem
}

export function addStats(ShipStats, ShieldStats, ArmorStats, StorageStats, CpuStats, EngineStats, SpecialStats, MainBatteryStats, AuxBatteryStats1, AuxBatteryStats2, AuxBatteryStats3, AuxBatteryStats4, AuxBatteryStats5, MainWeaponStats, AuxWeaponStats1, AuxWeaponStats2, AuxWeaponStats3, AuxWeaponStats4, AuxWeaponStats5, MainDroneStats, AuxDroneStats1, AuxDroneStats2, AuxDroneStats3, AuxDroneStats4, AuxDroneStats5 ) {
    // console.log("Test Add Stats")
    let newStats = Object.keys(ShipStats).map(key => {
        return [key, ShipStats[key]]
    })

    for (let i = 0; i < newStats.length; i++) {
        for (let j = 0; j < ShieldStats.length; j++){
            if (newStats[i][0] === ShieldStats[j][0]) {
                newStats[i][1] = newStats[i][1] + ShieldStats[j][1]
                break
            }
        }
        for (let j = 0; j < ArmorStats.length; j++){
            if (newStats[i][0] === ArmorStats[j][0]) {
                newStats[i][1] = newStats[i][1] + ArmorStats[j][1]
                break
            }
        }
        for (let j = 0; j < StorageStats.length; j++){
            if (newStats[i][0] === StorageStats[j][0]) {
                newStats[i][1] = newStats[i][1] + StorageStats[j][1]
                break
            }
        }
        for (let j = 0; j < CpuStats.length; j++){
            if (newStats[i][0] === CpuStats[j][0]) {
                newStats[i][1] = newStats[i][1] + CpuStats[j][1]
                break
            }
        }
        for (let j = 0; j < EngineStats.length; j++){
            if (newStats[i][0] === EngineStats[j][0]) {
                newStats[i][1] = newStats[i][1] + EngineStats[j][1]
                break
            }
        }
        for (let j = 0; j < SpecialStats.length; j++){
            if (newStats[i][0] === SpecialStats[j][0]) {
                newStats[i][1] = newStats[i][1] + SpecialStats[j][1]
                break
            }
        }
        for (let j = 0; j < MainBatteryStats.length; j++){
            if (newStats[i][0] === MainBatteryStats[j][0]) {
                newStats[i][1] = newStats[i][1] + MainBatteryStats[j][1]
                break
            }
        }
        for (let j = 0; j < AuxBatteryStats1.length; j++){
            if (newStats[i][0] === AuxBatteryStats1[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxBatteryStats1[j][1]
                break
            }
        }
        for (let j = 0; j < AuxBatteryStats2.length; j++){
            if (newStats[i][0] === AuxBatteryStats2[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxBatteryStats2[j][1]
                break
            }
        }
        for (let j = 0; j < AuxBatteryStats3.length; j++){
            if (newStats[i][0] === AuxBatteryStats3[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxBatteryStats3[j][1]
                break
            }
        }
        for (let j = 0; j < AuxBatteryStats4.length; j++){
            if (newStats[i][0] === AuxBatteryStats4[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxBatteryStats4[j][1]
                break
            }
        }
        for (let j = 0; j < AuxBatteryStats5.length; j++){
            if (newStats[i][0] === AuxBatteryStats5[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxBatteryStats5[j][1]
                break
            }
        }
        for (let j = 0; j < MainWeaponStats.length; j++){
            if (newStats[i][0] === MainWeaponStats[j][0]) {
                newStats[i][1] = newStats[i][1] + MainWeaponStats[j][1]
                break
            }
        }
        for (let j = 0; j < AuxWeaponStats1.length; j++){
            if (newStats[i][0] === AuxWeaponStats1[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxWeaponStats1[j][1]
                break
            }
        }
        for (let j = 0; j < AuxWeaponStats2.length; j++){
            if (newStats[i][0] === AuxWeaponStats2[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxWeaponStats2[j][1]
                break
            }
        }
        for (let j = 0; j < AuxWeaponStats3.length; j++){
            if (newStats[i][0] === AuxWeaponStats3[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxWeaponStats3[j][1]
                break
            }
        }
        for (let j = 0; j < AuxWeaponStats4.length; j++){
            if (newStats[i][0] === AuxWeaponStats4[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxWeaponStats4[j][1]
                break
            }
        }
        for (let j = 0; j < AuxWeaponStats5.length; j++){
            if (newStats[i][0] === AuxWeaponStats5[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxWeaponStats5[j][1]
                break
            }
        }
        for (let j = 0; j < MainDroneStats.length; j++){
            if (newStats[i][0] === MainDroneStats[j][0]) {
                newStats[i][1] = newStats[i][1] + MainDroneStats[j][1]
                break
            }
        }
        for (let j = 0; j < AuxDroneStats1.length; j++){
            if (newStats[i][0] === AuxDroneStats1[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxDroneStats1[j][1]
                break
            }
        }
        for (let j = 0; j < AuxDroneStats2.length; j++){
            if (newStats[i][0] === AuxDroneStats2[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxDroneStats2[j][1]
                break
            }
        }
        for (let j = 0; j < AuxDroneStats3.length; j++){
            if (newStats[i][0] === AuxDroneStats3[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxDroneStats3[j][1]
                break
            }
        }
        for (let j = 0; j < AuxDroneStats4.length; j++){
            if (newStats[i][0] === AuxDroneStats4[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxDroneStats4[j][1]
                break
            }
        }
        for (let j = 0; j < AuxDroneStats5.length; j++){
            if (newStats[i][0] === AuxDroneStats5[j][0]) {
                newStats[i][1] = newStats[i][1] + AuxDroneStats5[j][1]
                break
            }
        }
    }
    // console.log(newStats)
    return newStats
}

///**************** DIMINISHING RETURNS *********************

/// <summary>
        /// Applies diminishing returns to a value with a static constant.
        /// https://gamedev.stackexchange.com/questions/109985/simple-diminishing-return-with-cap
        /// </summary>
        /// <param name="value">The unmodified value to be diminished.</param>
        /// <param name="startScalingAt">The minimum value to start DR scaling at.</param>
        /// <param name="isPercentAsDecimal">
        /// Some stats like Outgoing Damage are expressed as a decimal, such as 0.15 is 15% damage bonus.
        /// Others are not, such as Splash Chance, and is expressed in whole numbers like 15 Splash chance.
        /// if isPercentAsDecimal is FALSE, the value is divided by 100 internally then converted back before return.
        /// </param>
        /// <param name="nMod">A constant that controls how punishing DR is. Higher is more punishing.</param>
        /// <returns>Returns value diminished</returns>
export function GetTibDR(value, startScalingAt, isPercentAsDecimal)
{
    let nMod = 1.25

    if (!isPercentAsDecimal)
        return GetTibDR(value/100.0, startScalingAt/100.0, true, nMod)*100.0
    if (value < 0.0)
        return -GetTibDR(-value, startScalingAt, true, nMod)
    if (startScalingAt < 0.0)
        return -GetTibDR(value, -startScalingAt, true, nMod)
    if (value <= startScalingAt)
        return value
    return startScalingAt + (value - startScalingAt)/(value - startScalingAt + nMod)
} 

export function enhancedStatsHandler(enhancedStats, damagestats){
    let alienMinHull = damagestats[2][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[4]/100))
    let alienMinShield = damagestats[2][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[4]/100))
    let alienMaxHull = damagestats[3][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[4]/100))
    let alienMaxShield = damagestats[3][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[4]/100))
    let alienCritMinHull = damagestats[2][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[4]/100))
    let alienCritMinShield = damagestats[2][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[4]/100))
    let alienCritMaxHull = damagestats[3][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[4]/100))
    let alienCritMaxShield = damagestats[3][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[4]/100))
    let playerMinHull = damagestats[2][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[5]/100))
    let playerMinShield = damagestats[2][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[5]/100))
    let playerMaxHull = damagestats[3][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[5]/100))
    let playerMaxShield = damagestats[3][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[5]/100))
    let playerCritMinHull = damagestats[2][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[5]/100))
    let playerCritMinShield = damagestats[2][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[5]/100))
    let playerCritMaxHull = damagestats[3][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[5]/100))
    let playerCritMaxShield = damagestats[3][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[5]/100))

    return [Math.round(alienMinHull), 
            Math.round(alienMinShield), 
            Math.round(alienMaxHull), 
            Math.round(alienMaxShield), 
            Math.round(alienCritMinHull), 
            Math.round(alienCritMinShield), 
            Math.round(alienCritMaxHull), 
            Math.round(alienCritMaxShield), 
            Math.round(playerMinHull), 
            Math.round(playerMinShield), 
            Math.round(playerMaxHull), 
            Math.round(playerMaxShield), 
            Math.round(playerCritMinHull), 
            Math.round(playerCritMinShield), 
            Math.round(playerCritMaxHull), 
            Math.round(playerCritMaxShield)]
}

export function enhancedDroneStatsHandler(enhancedStats, damagestats){
    let alienMinHull = 0
    let alienMinShield = 0
    let alienMaxHull = 0
    let alienMaxShield = 0
    let alienCritMinHull = 0
    let alienCritMinShield = 0
    let alienCritMaxHull = 0
    let alienCritMaxShield = 0
    let playerMinHull = 0
    let playerMinShield = 0
    let playerMaxHull = 0
    let playerMaxShield = 0
    let playerCritMinHull = 0
    let playerCritMinShield = 0
    let playerCritMaxHull = 0
    let playerCritMaxShield = 0

    if (damagestats[7][1] === '0'){
        alienMinHull = damagestats[2][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[4]/100)) * (1 + (enhancedStats[6]/100))
        alienMinShield = damagestats[2][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[4]/100)) * (1 + (enhancedStats[6]/100))
        alienMaxHull = damagestats[3][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[4]/100)) * (1 + (enhancedStats[6]/100))
        alienMaxShield = damagestats[3][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[4]/100)) * (1 + (enhancedStats[6]/100))
        alienCritMinHull = damagestats[2][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[4]/100)) * (1 + (enhancedStats[6]/100))
        alienCritMinShield = damagestats[2][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[4]/100)) * (1 + (enhancedStats[6]/100))
        alienCritMaxHull = damagestats[3][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[4]/100)) * (1 + (enhancedStats[6]/100))
        alienCritMaxShield = damagestats[3][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[4]/100)) * (1 + (enhancedStats[6]/100))
        playerMinHull = damagestats[2][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[5]/100)) * (1 + (enhancedStats[6]/100))
        playerMinShield = damagestats[2][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[5]/100)) * (1 + (enhancedStats[6]/100))
        playerMaxHull = damagestats[3][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[5]/100)) * (1 + (enhancedStats[6]/100))
        playerMaxShield = damagestats[3][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (1 + (enhancedStats[5]/100)) * (1 + (enhancedStats[6]/100))
        playerCritMinHull = damagestats[2][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[5]/100)) * (1 + (enhancedStats[6]/100))
        playerCritMinShield = damagestats[2][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[5]/100)) * (1 + (enhancedStats[6]/100))
        playerCritMaxHull = damagestats[3][1] * (enhancedStats[0]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[5]/100)) * (1 + (enhancedStats[6]/100))
        playerCritMaxShield = damagestats[3][1] * (enhancedStats[1]/100) * (enhancedStats[2]/100) * (enhancedStats[3]/100) * (1 + (enhancedStats[5]/100)) * (1 + (enhancedStats[6]/100))
    } else if (damagestats[7][1] === '1'){
        alienMinHull = damagestats[2][1] * (1 + (enhancedStats[7]/100))
        alienMinShield = damagestats[3][1] * (1 + (enhancedStats[7]/100))
    } else {
        alienMinHull = damagestats[2][1] * (1 + (enhancedStats[8]/100))
    }

    return [Math.round(alienMinHull), 
            Math.round(alienMinShield), 
            Math.round(alienMaxHull), 
            Math.round(alienMaxShield),
            Math.round(alienCritMinHull), 
            Math.round(alienCritMinShield), 
            Math.round(alienCritMaxHull), 
            Math.round(alienCritMaxShield), 
            Math.round(playerMinHull), 
            Math.round(playerMinShield), 
            Math.round(playerMaxHull), 
            Math.round(playerMaxShield), 
            Math.round(playerCritMinHull), 
            Math.round(playerCritMinShield), 
            Math.round(playerCritMaxHull), 
            Math.round(playerCritMaxShield)]
}