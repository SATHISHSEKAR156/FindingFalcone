import React from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import ShowResult from '../components/showResult';
import "../styles/pages.css";

export default function FindingFalcone() {
    return <div className="app-container">
        <div>
            <Header />
        </div>
        <div className="content">
            <ShowResult />
        </div>
        <div>
            <Footer />
        </div>
    </div>
}