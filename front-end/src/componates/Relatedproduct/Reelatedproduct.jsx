import React, { useEffect, useState } from 'react';
import './relatedproduct.css';
import Item from '../items/Item';

function Reelatedproduct() {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        fetch('https://game-heaven-back-end.onrender.com/newcollections')
            .then((response) => response.json())
            .then((data) => {
                // Assuming 'data' is an array of products
                const limitedProducts = data.slice(2,7 ); // Limit to 5 products
                setRelatedProducts(limitedProducts);
            })
            .catch((error) => console.error('Error fetching related products:', error));
    }, []);

    return (
        <div className='relatedproduct'>
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproducts-item">
                {relatedProducts.map((item, i) => (
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

export default Reelatedproduct;
