import React, { useContext, useState } from 'react';
import { Shopcontext } from '../../context/Shopcontext';
import removeicon from '../assets/remove-icon.png';
import './wishliste.css';
import { Link } from 'react-router-dom';
import Notification from '../notification/Notidication'

function Wishlist_item(props) {
    const { all_product, addtowish, removefromwish, wishitem, addtocart } = useContext(Shopcontext);
    const [notification, setNotification] = useState({ message: null, type: null });

    const handleAddToCart = (id) => {
        addtocart(id);
        setNotification({ message: 'Game Added To Cart!', type: 'cart' });
    };

    const handleNotificationClose = () => {
        setNotification({ message: null, type: null });
    };

    return (
        <div className='wishlist-item'>
            {notification.message && (
                <Notification 
                    message={notification.message} 
                    type={notification.type} 
                    onClose={handleNotificationClose} 
                />
            )}
            <h2>Wishlist</h2>
            {all_product.map((e) => {
                if (wishitem[e.id] > 0) {
                    return (
                        <div className='wishlist-info' key={e.id}>
                            <img className='wishlist-img' src={e.image} alt="" />
                            <div className="wishlist-details">
                            <Link to={`/product/${e.id}`}><p>{e.name}</p></Link>
                                <p>${e.new_price}</p>
                            </div>
                            <div className="custom-select-container">
                                <Link to={`/product/${e.id}`} className="show-game-link">
                                    <button className='show-game'>Show Game</button>
                                </Link>
                                <button className='button-add' onClick={() => handleAddToCart(e.id)}>ADD TO CART</button>
                                <img className='cartiwish-remove-icon' src={removeicon} onClick={() => removefromwish(e.id)} alt="" />
                            </div>
                        </div>
                    );
                }
                return null;
            })}
            <div className='return-home'>
                <Link to={'/'}>
                    <button>Return To Home</button>
                </Link>
            </div>
        </div>
    );
}

export default Wishlist_item;
