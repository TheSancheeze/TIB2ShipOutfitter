function AttackTimer(mySize, targetSize, targetSpeed, isDrone) {
    // public enum EntitySize
    // {
    //     NULL = 0,
    //     Small = 1,
    //     Medium = 2,
    //     Large = 3,
    //     Huge = 4,
    //     Massive = 5
    // }
    // private int GetLockTimeMS(EntitySize targetSize, bool isDroneLock)
    // {
    //     const int TARGETING_SPEED_MIN_MS = 800;
    //     const int TARGET_SPEED_MOD_PER_SIZE = 400;
    //     const int DRONE_LOCK_SPEED_PER_SLOT_MS = 5000;
    //     const int WEAPON_LOCK_SPEED_PER_SLOT_MS = 3500;
    //     if (IsDefenseUnit)
    //         return TARGETING_SPEED_MIN_MS;
    //     float mySizeMod;
    //     if (!isDroneLock)
    //     {
    //         mySizeMod = (float) MyEntitySize;
    //         if (mySizeMod > 4.5f)
    //         {
    //             //
    //             //Emperor buff
    //             mySizeMod = 4.5f;
    //         }
    //     }
    //     else mySizeMod = 1.0f;
    //     float sizeDifMS = (mySizeMod - (float) targetSize)*TARGET_SPEED_MOD_PER_SIZE;
    //     float lockSpeedMS = isDroneLock ? DRONE_LOCK_SPEED_PER_SLOT_MS : WEAPON_LOCK_SPEED_PER_SLOT_MS;
    //     float rawLockSpeedMS = lockSpeedMS + sizeDifMS;
    //     int finalMS = (int) Math.Round(rawLockSpeedMS + rawLockSpeedMS*Equipment.Get(StatType.TargetingSpeedPercent));
    //     return finalMS <= TARGETING_SPEED_MIN_MS ? TARGETING_SPEED_MIN_MS : finalMS;
    // }

    let myShip = 0
    let enemyShip = 0

    switch (mySize){
        case 'Gunboat':
        case 'Shuttle':
        case 'Frigate':
        case 'Assassin':
            myShip = 1
            break;
        case 'Cruiser':
        case 'Destroyer':
            myShip = 2
            break;
        case 'Battleship':
        case 'Flagship':
            myShip = 3
            break;
        case 'Carrier':
        case 'Hades':
            myShip = 4
            break;
        case 'Emporer':
            myShip = 5
            break;
    }

    switch (targetSize){
        case 'Gunboat':
        case 'Shuttle':
        case 'Frigate':
        case 'Assassin':
            enemyShip = 1
            break;
        case 'Cruiser':
        case 'Destroyer':
            enemyShip = 2
            break;
        case 'Battleship':
        case 'Flagship':
            enemyShip = 3
            break;
        case 'Carrier':
        case 'Hades':
            enemyShip = 4
            break;
        case 'Emporer':
            enemyShip = 5
            break;
    }
    
    const minSpeed = 800
    const speedModPerSize = 400
    const droneSpeed = 5000
    const weaponSpeed = 3500

    let sizeMod = 1

    if(!isDrone){
        sizeMod = myShip
        if(mySize > 4.5)
            sizeMod = 4.5
    }

    let sizeDifMS = (sizeMod - enemyShip) * speedModPerSize
    let lockSpeedMS = isDrone ? droneSpeed : weaponSpeed
    let rawLockSpeedMS = lockSpeedMS + sizeDifMS

    let finalMS = Math.round(rawLockSpeedMS + rawLockSpeedMS*targetSpeed)

    return finalMS <= minSpeed ? minSpeed : finalMS
}

export default AttackTimer