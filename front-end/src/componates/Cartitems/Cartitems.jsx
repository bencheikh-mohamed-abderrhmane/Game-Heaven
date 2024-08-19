import React, { useContext, useState } from 'react';
import './cartitems.css';
import removeicon from '../assets/remove-icon.png';
import { Shopcontext } from '../../context/Shopcontext';
import { Link } from 'react-router-dom';

function Cartitems(props) {
    const { all_product, cartitem, removefromcart, getTotalCartAmount } = useContext(Shopcontext);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const validPromoCodes = { 'OFF10': 0.1, 'OFF20': 0.2 }; // Example promo codes

    const handlePromoCode = () => {
        if (validPromoCodes[promoCode]) {
            setDiscount(validPromoCodes[promoCode]);
            alert('Promo code applied!');
        } else {
            alert('Invalid promo code');
        }
    };

    const getDiscountedTotal = () => {
        const total = getTotalCartAmount();
        return (total - (total * discount)).toFixed(2);
    };

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p className='total'>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartitem[e.id] > 0) {
                    return (
                        <div className="cartitems-format cartitems-format-main" key={e.id}>
                            <img src={e.image} alt="" className="carticon-product-icon" />
                            <Link to={`/product/${e.id}`}>
                                <p className='product-name'>{e.name}</p>
                            </Link>
                            <p className='product-price'>${e.new_price}</p>
                            <button className='cartitems-quantity'>{cartitem[e.id]}</button>
                            <p>${e.new_price * cartitem[e.id]}</p>
                            <img className='cartitems-remove-icon' src={removeicon} onClick={() => { removefromcart(e.id) }} alt="" />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cart-item-down">
                <div className="cart-item-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cart-item-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-item-total-item">
                            <p>Shipping fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cart-item-total-item">
                            <h3>Total</h3>
                            <h3>${getDiscountedTotal()}</h3>
                        </div>
                    </div>
                  <Link to='/submitcart'>  <button>CONFIRM THE ORDER</button></Link>
                </div>
                <div className="cart-item-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className='cart-item-promobox'>
                        <input 
                            type="text" 
                            placeholder='Promo Code' 
                            value={promoCode} 
                            onChange={(e) => setPromoCode(e.target.value)} 
                        />
                        <button onClick={handlePromoCode}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cartitems;
