import React, { useContext, useState } from "react";
import "./navbar.css";
import icon from "../assets/iconshop.png";
import logo from "../assets/logoshop.png";
import { Link } from "react-router-dom";
import wishlist_icon from '../assets/wishlist.png'
import { Shopcontext } from '../../context/Shopcontext'

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const { getTotalItem } = useContext(Shopcontext);

  const handleLogout = () => {
    localStorage.removeItem('auth-token'); // Correction de l'erreur de syntaxe
    window.location.replace('/');
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>shopper</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: 'none' }} to='/'>shop</Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link style={{ textDecoration: 'none' }} to='/mens'>men</Link>
          {menu === "mens" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link style={{ textDecoration: 'none' }} to='/womens'>women</Link>
          {menu === "womens" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link style={{ textDecoration: 'none' }} to='/kids'>kid</Link>
          {menu === "kids" ? <hr /> : null}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <button onClick={handleLogout}>LogOut</button> // Utilisation de la fonction `handleLogout`
        ) : (
          <Link to='/login'><button>Login</button></Link>
        )}
        <Link to='/wishlist'><img className="wish-icon" src={wishlist_icon} alt="" /></Link>
        <Link to='/cart'><img className="nav-login-cart-img" src={icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalItem()}</div>
      </div>
    </div>
  );
}

export default Navbar;
