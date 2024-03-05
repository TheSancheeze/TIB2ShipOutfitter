import { useState } from "react";
import './Popup.css'

function DronePopup( props ) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default DronePopup