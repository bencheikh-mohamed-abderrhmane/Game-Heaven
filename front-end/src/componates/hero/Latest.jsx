import React, { useState, useEffect } from 'react';
import './latest.css'; // Ajoutez un fichier CSS pour le style
import Item from '../items/Item';

function Latest() {
    const [new_collection, setNew_collection] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/newcollections')
            .then((response) => response.json())
            .then((data) => setNew_collection(data));
    }, []);

    return (
        <div className='latest'>
            <h2>Latest Additions</h2>
            <div className="latest-grid">
                {new_collection.map((item, i) => (
                    <Item 
                        key={i} 
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

export default Latest;
