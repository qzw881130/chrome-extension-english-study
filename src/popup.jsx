import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import './style.css';

const Popup = () => {
    const CoverLetters = [
        `pls click "Play Next" Button to switch to next video`,
        `Shift + p`
    ];

    const isFirefox = navigator.userAgent.includes("Firefox");
    return (
        <div className="container" style={{    fontWeight: 700, display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center", borderRadius: '2px'}}>
            <h2>Tips </h2>
            {!isFirefox && (<>
            <p style={{ fontSize: "24px", color: "#000", height: '36px', background: '#fcf1d3', width: '100%', padding: '5px'}}>
                <svg focusable="false" width="24" height="24" viewBox="0 0 24 24" className="warn-icon"><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2z"></path><path d="M13 16h-2v2h2v-2zm0-6h-2v4h2v-4z"></path></svg>
                <span className="tip-text">The extension just works in pc.xiaoe-tech.com</span>
            </p>
            <ol className="tips">
                {CoverLetters.map((item)=> {
                    return <li key={item}>{item}</li>
                })}
            </ol></>
        )}
            
        </div>
    );
}
const container = document.getElementById('react-target')
ReactDOM.createRoot(container).render(
<Popup />,
)