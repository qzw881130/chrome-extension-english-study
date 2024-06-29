import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import './style.css';
import  {Counter} from './Counter'
import {Mode} from "./Mode";

const Popup = () => {

    const CoverLetters = [
        `pls click "Play Next Video" Button to switch to next video`,
        `Shift + p`
    ];


    return (
        <div className="container" style={{    fontWeight: 700, display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center"}}>
            <h2>Tips </h2>
            <ul className="tips">
                {CoverLetters.map((item)=> {
                    return <li key={item}>{item}</li>
                })}
            </ul>
            {/* <p><img src='./images/icon-128.png' style={{objectFit: "cover"}} /></p> */}

            
        </div>
    );
}
const container = document.getElementById('react-target')
ReactDOM.createRoot(container).render(
<React.StrictMode>
<Popup />
</React.StrictMode>,
)