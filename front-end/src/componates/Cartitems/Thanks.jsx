import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './thanks.css'; // Import the CSS file for the animation

function Thanks(props) {
    const [animate, setAnimate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('auth-token'); // Récupérer le token depuis le localStorage

        if (!authToken) {
            // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
            navigate('/login',window.scrollTo(0, 0));
            return;
        }

        setTimeout(() => {
            window.scrollTo(0, 0); // Scroll to the top of the page
            setAnimate(true);
        }, 500); // Delay to start the animation
    }, [navigate]);

    return (
        <div className={`thanks-container ${animate ? 'animate' : ''}`}>
            <div className="thanks-message">
                <h1>Thank You!</h1>
                <p>Your order has been confirmed.</p>
            </div>
        </div>
    );
}

export default Thanks;
