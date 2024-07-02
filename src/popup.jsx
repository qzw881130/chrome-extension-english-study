import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import './style.css';
import  {Counter} from './Counter'
import {Mode} from "./Mode";

const Popup = () => {

    const CoverLetters = [
        `pls click "Play Next" Button to switch to next video`,
        `Shift + p`
    ];


    return (
        <div className="container" style={{    fontWeight: 700, display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center", borderRadius: '2px'}}>
            <h2>Tips </h2>
            <p style={{ fontSize: "24px", color: "#000", height: '36px', background: 'yellow', width: '100%', padding: '5px'}}>The extension just works in pc.xiaoe-tech.com</p>
            <ul className="tips">
                {CoverLetters.map((item)=> {
                    return <li key={item}>{item}</li>
                })}
            </ul>

            
        </div>
    );
}
const container = document.getElementById('react-target')
ReactDOM.createRoot(container).render(
<React.StrictMode>
<Popup />
</React.StrictMode>,
)