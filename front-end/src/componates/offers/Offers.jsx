import React from 'react';
import './offers.css'
import exclusive from '../assets/exculsive.jpg'
import { Link } from 'react-router-dom';


function Offers(props) {
    return (
        <div className='offers'>
            <div className="offers-left">
                <h2>EXCLUSIVE</h2>
                <h2>Offers For you </h2>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <Link to="/offerspage">
                    <button>Check now</button></Link>
            </div>
            <div className="offers right">
                <img className='offers-img' src={exclusive} alt="" />

            </div>
            
        </div>
    );
}

export default Offers ;