import React from 'react';
import './Descriptionbox.css'

function Descriptionbox(props) {
    return (
        <div className='Descriptionbox'>
            <div className="Descriptionbox-navigator">
                <div className="Descriptionbox-nav-box">Description</div>
                <div className="Descriptionbox-nav-box-fade">Reviws(122)</div>
            </div>

            <div className="Descriptionbox-description">
                <p>Welcome to ABDOU-COMMERCE, your premier destination for video game enthusiasts.
                     Our platform offers a comprehensive collection of video games, consoles, and gaming accessories,
                     catering to gamers of all ages and preferences.
                     Whether you're a fan of action-packed adventures, immersive RPGs, or competitive esports titles, we have everything you need to elevate your gaming experience.Browse through our vast selection of video games for PlayStation, Xbox, Nintendo Switch, PC, and more. From the latest releases to classic favorites, you'll find games across all genres.</p>
            </div>
            
        </div>
    );
}

export default Descriptionbox;