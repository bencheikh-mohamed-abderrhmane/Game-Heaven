import React from 'react';
import './slidebar.css';
import { Link } from 'react-router-dom';
import logopanier from '../../assets/iconshop.png';
import add_product_icon from '../../assets/product_list.png';
import order_img from '../../assets/orderimg.png'

function Slidebar(props) {
    return (
        <div className='slidebar'>
            <Link to='/addproduct' style={{ textDecoration: "none" }}>
                <div className="slidebar-item">
                    <img className='panier' src={logopanier} alt="Panier Icon" />
                    <p>Add Product</p>
                </div>
            </Link>
            <Link to='/listproduct' style={{ textDecoration: "none" }}>
                <div className="slidebar-item">
                    <img className='list' src={add_product_icon} alt="Product List Icon" />
                    <p>List Products</p>
                </div>
            </Link>
            <Link to='/order' style={{textDecoration:"none"}}>
            <div className="slidebar-item">
                <img className='order-img' src={order_img} alt="" />
                <p>Orders</p>

            </div>
            </Link>
        </div>
    );
}

export default Slidebar;
