// src/components/Header.jsx
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Header.css';

function Header({ darkMode, toggleDarkMode, language, setLanguage }) {
    return (
        <header className="homepage-header">
            <h1>Wrighto Sustainables</h1>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/product">Products</RouterLink>
                <HashLink smooth to="/#blog">Blog</HashLink>
                <RouterLink to="/about">About Us</RouterLink>
                <RouterLink to="/contact">Contact Us</RouterLink>
                <RouterLink to="/login">Login</RouterLink>
                <RouterLink to="/signup">SignUp</RouterLink>
            </nav>

            <div className="header-actions">
                <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                    {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                </button>
                <select onChange={(e) => setLanguage(e.target.value)} value={language}>
                    <option value="English">English</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Hindi">Hindi</option>
                </select>
            </div>
        </header>
    );
}

export default Header;
