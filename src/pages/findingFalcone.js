import React, { useState } from 'react';
import Footer from '../components/footer';
import Game from '../components/game';
import Header from '../components/header';
import "../styles/pages.css";

export default function FindingFalcone() {

    const [reset, setReset] = useState(true);

    return <div className="app-container">
        <div>
            <Header handleReset={() => setReset(!reset)} />
        </div>
        <div className="content">
            <Game reset={reset} />
        </div>
        <div>
            <Footer />
        </div>
    </div>
}