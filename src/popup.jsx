import React, { useEffect } from "react";
import { createRoot } from 'react-dom/client';
import './style.css';

const Popup = () => {
    const CoverLetters = [
        `document.getElementsByTagName('video')[0].setAttribute('loop', '1');
        document.getElementsByTagName('video')[0].play();
        document.getElementsByClassName('write-comment-camppro')[0]?.remove()`,
    ];

    return (
        <div className="container">
            <h2>Tips </h2>
            <ul className="tips">
                {CoverLetters.map((item)=> {
                    return <li key={item}>{item}</li>
                })}
            </ul>
            <p><img src='./images/icon-128.png' /></p>
        </div>
    );
}
const container = document.getElementById('react-target')
createRoot(container).render(<Popup />)