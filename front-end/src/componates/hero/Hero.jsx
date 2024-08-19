import React from 'react';
import './hero.css'; // Le fichier CSS mis à jour
import handIcon from '../assets/hand-icon.png';
import arrowIcon from '../assets/fleche-droite.png';
import heroImage from '../assets/Newariva.jpeg';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h2>New Arrivals Only</h2>
                <div className="hero-description">
                    <p>new <img src={handIcon} alt="hand icon" className="icon-small" /></p>
                    <p>Catalogue</p>
                    <p>for everyone</p>
                </div>
                <Link to="/latest" className="hero-button">
                    Latest Catalogue <img src={arrowIcon} alt="arrow icon" className="icon-small" />
                </Link>
            </div>
            <div className="hero-image-container">
                <img src={heroImage} alt="New Arrivals" className="hero-image" />
            </div>
        </div>
    );
}

export default Hero;
