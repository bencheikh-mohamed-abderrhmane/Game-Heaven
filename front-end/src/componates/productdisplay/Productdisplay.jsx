import React, { useContext, useState } from 'react';
import './productdisplay.css';
import staricon from '../assets/stariicon.png';
import { Shopcontext } from '../../context/Shopcontext';
import wish_icon from '../assets/addwish.png';
import Notification from '../notification/Notidication';

function Productdisplay(props) {
    const { product } = props;
    const { addtocart, addtowish } = useContext(Shopcontext);
    const [notification, setNotification] = useState({ message: null, type: null });

    const handleAddToCart = (id) => {
        console.log("Token avant l'ajout:", localStorage.getItem('token'));
        addtocart(id);
        setNotification({ message: 'Game Added To Cart!', type: 'cart' });
    };

    const handleAddToWish = (id) => {
        addtowish(id);
        setNotification({ message: 'Game Added To Wishlist!', type: 'wishlist' });
    };

    const handleNotificationClose = () => {
        setNotification({ message: null, type: null });
    };

    // Vérifiez si le produit est défini avant de rendre le contenu
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className='productdisplay'>
            {notification.message && (
                <Notification 
                    message={notification.message} 
                    type={notification.type} 
                    onClose={handleNotificationClose} 
                />
            )}
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img className='product-img' src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img className='staricon' src={staricon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ${product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${product.new_price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    a new and good game, available for all platforms, and playable everywhere in the world,
                    for an unbeatable price. So take advantage of the latest promotions, just order and you will receive the game within the next 3 days.
                </div>
                <div className="">
                    <h1> Platform Available</h1>
                    <div className='productdisplay-right-size'>
                        <div className='play'>PS4</div>
                        <div className='play'>PS5</div>
                        <div className='pc'>PC</div>
                        <div className='switch'>Nintendo Switch</div>
                        <div className='xbox'>Xbox Series X</div>
                    </div>
                </div>
                <div className="additem">
                    <button onClick={() => { handleAddToCart(product.id) }}>ADD TO CART</button>
                    <img onClick={() => { handleAddToWish(product.id) }} className='wishlist' src={wish_icon} alt="" />
                </div>
                <p className="productdisplay-right-category"><span>Category :</span>{product.category}, Game</p>
                <p className="productdisplay-right-category"><span>Tags :</span>#{product.category}, #Gaming, #promotions</p>
            </div>
        </div>
    );
}

export default Productdisplay;