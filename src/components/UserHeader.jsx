import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import axios from 'axios';
import './UserHeader.css';

function UserHeader({ darkMode, toggleDarkMode, language, setLanguage }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                //const response = await axios.get('/api/user/me', {
                //withCredentials: true,
                //});
                const token = localStorage.getItem('token');
                const res = await axios.get("http://localhost:5000/api/user/me", {
                    withCredentials: true,
                });
                setUser(res.data);
            } catch (err) {
                console.log('Not logged in');
            }
        };

        fetchUser();

        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/api/user/logout', {}, { withCredentials: true });
            setUser(null);
            navigate('/logout');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <header className="user-homepage-header">
            <h1>Wrighto Sustainables</h1>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/product">Products</RouterLink>
                <HashLink smooth to="/#blog">Blog</HashLink>
                <RouterLink to="/about">About Us</RouterLink>
                <RouterLink to="/contact">Contact Us</RouterLink>
            </nav>

            <div className="user-header-actions">
                <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                    {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                </button>

                <div className="language-selector" ref={dropdownRef}>
                    <button className="lang-btn" onClick={() => setDropdownOpen(dropdownOpen === 'lang' ? null : 'lang')}>
                        <i className="fas fa-globe"></i>
                    </button>
                    {dropdownOpen === 'lang' && (
                        <div className="lang-dropdown">
                            <button onClick={() => setLanguage('English')}>🇬🇧 EN</button>
                            <button onClick={() => setLanguage('Tamil')}>🇮🇳 TA</button>
                            <button onClick={() => setLanguage('Hindi')}>🇮🇳 HI</button>
                        </div>
                    )}
                </div>

                <div className="user-dropdown" ref={dropdownRef}>
                    <button className="user-dropdown-btn" onClick={() => setDropdownOpen(dropdownOpen === 'user' ? null : 'user')}>
                        {user ? user.firstname : 'Account'} <i className="fas fa-user"></i>
                    </button>

                    {dropdownOpen === 'user' && (
                        <div className="user-dropdown-menu">
                            {user ? (
                                <>
                                    <RouterLink to="/my-profile">My Profile</RouterLink>
                                    <RouterLink to="/orders">Orders</RouterLink>
                                    <button onClick={handleLogout}>Logout</button>
                                </>
                            ) : (
                                <>
                                    <RouterLink to="/login">Login</RouterLink>
                                    <RouterLink to="/signup">Sign Up</RouterLink>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default UserHeader;
