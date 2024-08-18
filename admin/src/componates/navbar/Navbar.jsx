import React from 'react';
import './navbar.css'
import navlogo from '../../assets/logoshop.png'
import navprofile from '../../assets/nav-profile.jpg'

function Navbar(props) {
    return (
        <div className='navbar'>
           <p> <img src={navlogo} alt="" className="nav-logo" />(Admin panel)</p>
         <img className='profile' src={navprofile} alt="" />   
        </div>
    );
}

export default Navbar;