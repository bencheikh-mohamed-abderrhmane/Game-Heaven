import React, { useContext, useState } from "react";
import "./navbar.css";
import icon from "../assets/iconshop.png";
import logo from "../assets/logoshop.png";
import wishlist_icon from '../assets/wishlist.png';
import { Link, useNavigate } from "react-router-dom";
import { Shopcontext } from '../../context/Shopcontext';

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItem } = useContext(Shopcontext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img className="image-logo" src={logo} alt="Shop Logo" />
        <p>shopper</p>
      </div>
      <div className={`burger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <li onClick={() => setMenu("shop")}>
          <Link className="nav-link" to="/" onClick={toggleMenu}>shop</Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link className="nav-link" to="/mens" onClick={toggleMenu}>men</Link>
          {menu === "mens" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link className="nav-link" to="/womens" onClick={toggleMenu}>women</Link>
          {menu === "womens" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link className="nav-link" to="/kids" onClick={toggleMenu}>kid</Link>
          {menu === "kids" ? <hr /> : null}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <button className="login" onClick={handleLogout}>LogOut</button>
        ) : (
          <Link to='/login'><button className="login">Login</button></Link>
        )}
        <Link to='/wishlist'>
          <img className="wish-icon" src={wishlist_icon} alt="Wishlist Icon" />
        </Link>
        <Link to='/cart'>
          <img className="nav-login-cart-img" src={icon} alt="Cart Icon" />
        </Link>
        <div className="nav-cart-count">{getTotalItem()}</div>
      </div>
    </nav>
  );
}

export default Navbar;
