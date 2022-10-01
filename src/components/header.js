import React from 'react';
import '../styles/components.css';

export default function Header(props) {
    const { handleReset = () => { } } = props;

    return <div>
        <div className="reset-section">
            <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>
        <div className="title-section">
            <h1 style={{ letterSpacing: '3px' }}>Finding Falcone !</h1>
        </div>
    </div>
}