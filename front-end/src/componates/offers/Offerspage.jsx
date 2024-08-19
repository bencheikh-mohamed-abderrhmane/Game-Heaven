import React, { useState, useEffect } from 'react';
import Item from '../items/Item';
import './offerspage.css';

function Offerspage() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetch('https://game-heaven-front-end.onrender.com/offers')
            .then((response) => response.json())
            .then((data) => setOffers(data));
    }, []);

    return (
        <div className='offerspage'>
            <h2>Exclusive Offers</h2>
            <div className="offerspage-items">
                {offers.map((item, index) => (
                    <Item
                        key={index}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    );
}

export default Offerspage;
