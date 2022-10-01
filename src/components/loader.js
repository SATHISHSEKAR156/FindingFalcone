import React from 'react';
import Loading from '../icons/giphy.gif';
import "../styles/components.css";

export default function Loader(props) {
    const {content=""} =props;

    return <div className="loader-container">
        <div>
            <img className="loader-img" src={Loading} alt="loading..." />
            <h4 style={{letterSpacing:'2px'}}>{content}</h4>
        </div>
    </div>
}