import { useState } from "react"

function CorpSkills( props ) {
    const [initialvalue, setInitialvalue] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [finalvalue, setFinalvalue] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    const handleButton = (num) => {
        if (num == 0){ 
            setInitialvalue([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            setFinalvalue([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            props.changeSkills([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
        else if (num == 1){ 
            setInitialvalue([5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5])
            setFinalvalue([5, 2.5, 2.5, 2.5, -2.5, 2.5, 2.5, 5, 5, 5, 5, 5, 5, 5, 7.5, 7.5, 7.5, 7.5, 7.5, 5, 2.5, 2.5])
            props.changeSkills([5, 2.5, 2.5, 2.5, -2.5, 2.5, 2.5, 5, 5, 5, 5, 5, 5, 5, 7.5, 7.5, 7.5, 7.5, 7.5, 5, 2.5, 2.5])
        }
        else if (num == 2){ 
            setInitialvalue([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10])
            setFinalvalue([7.5, 3.75, 3.75, 3.75, -3.75, 3.75, 3.75, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 10, 10, 10, 10, 10, 7.5, 3.75, 3.75])
            props.changeSkills([7.5, 3.75, 3.75, 3.75, -3.75, 3.75, 3.75, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 10, 10, 10, 10, 10, 7.5, 3.75, 3.75])
        }
        else { 
            setInitialvalue([15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15])
            setFinalvalue([10, 5, 5, 5, -5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 15, 15, 15, 15, 15, 10, 5, 5])
            props.changeSkills([10, 5, 5, 5, -5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 15, 15, 15, 15, 15, 10, 5, 5])
        }
    }

    function handleSkill(value, position, type){
        let mult = 0.5 * type

        if (value < 0){
            mult = mult * (-1)
            value = value * (-1)
        }

        if (value > 5){
            if (value > 15){value = 15}
            mult = (mult * 5) + ( (mult/2) * (value-5) )
        } else {
            mult = (mult * value)
        }

        const updateInit = initialvalue.map((s, i) => {
            if(i == position){
                return value
            } else {
                return s
            }
        })

        const updateFinal = finalvalue.map((s, i) => {
            if(i == position){
                return mult
            } else {
                return s
            }
        })

        setInitialvalue(updateInit)
        setFinalvalue(updateFinal)
        props.changeSkills(updateFinal)
    }

    const handleSave = () => {
        localStorage.setItem("cSkillsInitial", JSON.stringify(initialvalue))
        localStorage.setItem("cSkillsFinal", JSON.stringify(finalvalue))
    }

    const handleLoad = () => {
        setInitialvalue(JSON.parse(localStorage.getItem("cSkillsInitial")))
        setFinalvalue(JSON.parse(localStorage.getItem("cSkillsFinal")))
        props.changeSkills(JSON.parse(localStorage.getItem("cSkillsFinal")))
    }

    return (
        <>
        <div className="Title">
            <h3>
            <button onClick={() => handleSave()}>Save Skills</button>
            Corp Skills 
            <button onClick={() => handleLoad()}>Load Skills</button>
            </h3>
        </div>
        <div className="ButtonsList">
            <button onClick={() => handleButton(0)}>Set All 0</button>
            <button onClick={() => handleButton(1)}>Set All 5</button>
            <button onClick={() => handleButton(2)}>Set All 10</button>
            <button onClick={() => handleButton(3)}>Set All 15</button>
        </div>
        <div className="Skill_List">
            <div className="Col1">
                <h4>Resource Cap {finalvalue[0]} <input type="number" id="skill" value={initialvalue[0]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 0, 2)}/></h4>
                <h4>Hull Repair {finalvalue[1]} <input type="number" id="skill" value={initialvalue[1]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 1, 1)}/></h4>
                <h4>Damage Bonus {finalvalue[2]} <input type="number" id="skill" value={initialvalue[2]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 2, 1)}/></h4>
                <h4>Shield Damage {finalvalue[3]} <input type="number" id="skill" value={initialvalue[3]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 3, 1)}/></h4>
                <h4>Inc. Damage {finalvalue[4]} <input type="number" id="skill" value={initialvalue[4]} min='0' max='15' step='1' onChange={(e) => handleSkill(-e.target.value, 4, 1)}/></h4>
                <h4>XP Bonus {finalvalue[5]} <input type="number" id="skill" value={initialvalue[5]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 5, 1)}/></h4>
                <h4>Critical Damage {finalvalue[6]} <input type="number" id="skill" value={initialvalue[6]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 6, 1)}/></h4>
                <h4>Critical Chance {finalvalue[7]} <input type="number" id="skill" value={initialvalue[7]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 7, 2)}/></h4>
                <h4>Evasion Chance {finalvalue[8]} <input type="number" id="skill" value={initialvalue[8]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 8, 2)}/></h4>
                <h4>Drain Power {finalvalue[9]} <input type="number" id="skill" value={initialvalue[9]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 9, 2)}/></h4>
                <h4>Grapple Power {finalvalue[10]} <input type="number" id="skill" value={initialvalue[10]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 10, 2)}/></h4>
            </div>
            <div className="Col2">
                <h4>Hack Power {finalvalue[11]} <input type="number" id="skill" value={initialvalue[11]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 11, 2)}/></h4>
                <h4>Splash Chance {finalvalue[12]} <input type="number" id="skill" value={initialvalue[12]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 12, 2)}/></h4>
                <h4>Hit Chance {finalvalue[13]} <input type="number" id="skill" value={initialvalue[13]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 13, 2)}/></h4>
                <h4>Hack Resist {finalvalue[14]} <input type="number" id="skill" value={initialvalue[14]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 14, 3)}/></h4>
                <h4>Grapple Resist {finalvalue[15]} <input type="number" id="skill" value={initialvalue[15]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 15, 3)}/></h4>
                <h4>Critical Resist {finalvalue[16]} <input type="number" id="skill" value={initialvalue[16]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 16, 3)}/></h4>
                <h4>Splash Resist {finalvalue[17]} <input type="number" id="skill" value={initialvalue[17]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 17, 3)}/></h4>
                <h4>Drain Resist {finalvalue[18]} <input type="number" id="skill" value={initialvalue[18]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 18, 3)}/></h4>
                <h4>Power Recharge {finalvalue[19]} <input type="number" id="skill" value={initialvalue[19]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 19, 2)}/></h4>
                <h4>Shield Pierce {finalvalue[20]} <input type="number" id="skill" value={initialvalue[20]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 20, 1)}/></h4>
                <h4>Hull Damage {finalvalue[21]} <input type="number" id="skill" value={initialvalue[21]} min='0' max='15' step='1' onChange={(e) => handleSkill(e.target.value, 21, 1)}/></h4>
            </div>
        </div>
        </>
    )
}

export default CorpSkills