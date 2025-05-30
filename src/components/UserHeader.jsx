// import React, { useState, useEffect, useRef } from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { HashLink } from 'react-router-hash-link';
// import axios from 'axios';
// import './UserHeader.css';

// function UserHeader({ darkMode, toggleDarkMode, language, setLanguage }) {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [user, setUser] = useState(null);
//     const dropdownRef = useRef(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 //const response = await axios.get('/api/user/me', {
//                 //withCredentials: true,
//                 //});
//                 // const token = localStorage.getItem('token');
//                 const res = await axios.get("http://localhost:5000/api/user/me", {
//                     withCredentials: true,
//                 });
//                 setUser(res.data);
//             } catch (err) {
//                 console.log('Not logged in');
//             }
//         };

//         fetchUser();

//         const handleClickOutside = (e) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//                 setDropdownOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);


//     // const handleLogout = async () => {
//     //     try {
//     //         await axios.post('/api/user/logout', {}, { withCredentials: true });
//     //         setUser(null);
//     //         navigate('/');
//     //     } catch (err) {
//     //         console.error('Logout failed:', err);
//     //     }
//     // };
//     const handleLogout = async () => {
//         try {
//             await axios.post('/api/user/logout', {}, { withCredentials: true });
//             // Clear local/session storage
//             localStorage.removeItem("authtoken");
//             localStorage.removeItem("user");
//             sessionStorage.removeItem("authToken");

//             // Update AuthContext if using
//             setUser(null);
//             setIsLoggedIn(false);
//             navigate('/');
//         } catch (err) {
//             console.error('Logout failed:', err);
//         }
//     };

//     return (
//         <header className="user-homepage-header">
//             <h1>Wrighto Sustainables</h1>
//             <nav>
//                 <RouterLink to="/userhomepage">Home</RouterLink>
//                 <RouterLink to="/product">Products</RouterLink>
//                 <HashLink smooth to="/#blog">Blog</HashLink>
//                 <RouterLink to="/about">About Us</RouterLink>
//                 <RouterLink to="/contact">Contact Us</RouterLink>
//             </nav>

//             <div className="user-header-actions">
//                 <button className="dark-mode-toggle" onClick={toggleDarkMode}>
//                     {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
//                 </button>

//                 <div className="language-selector" ref={dropdownRef}>
//                     <button className="lang-btn" onClick={() => setDropdownOpen(dropdownOpen === 'lang' ? null : 'lang')}>
//                         <i className="fas fa-globe"></i>
//                     </button>
//                     {dropdownOpen === 'lang' && (
//                         <div className="lang-dropdown">
//                             <button onClick={() => setLanguage('English')}>🇬🇧 EN</button>
//                             <button onClick={() => setLanguage('Tamil')}>🇮🇳 TA</button>
//                             <button onClick={() => setLanguage('Hindi')}>🇮🇳 HI</button>
//                         </div>
//                     )}
//                 </div>

//                 <div className="user-dropdown" ref={dropdownRef}>
//                     <button className="user-dropdown-btn" onClick={() => setDropdownOpen(dropdownOpen === 'user' ? null : 'user')}>
//                         {user ? user.firstname : 'Account'} <i className="fas fa-user"></i>
//                     </button>

//                     {dropdownOpen === 'user' && (
//                         <div className="user-dropdown-menu">
//                             {user ? (
//                                 <>
//                                     <RouterLink to="/my-profile">My Profile</RouterLink>
//                                     <RouterLink to="/orders">Orders</RouterLink>
//                                     <button onClick={handleLogout}>Logout</button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <RouterLink to="/login">Login</RouterLink>
//                                     <RouterLink to="/signup">Sign Up</RouterLink>
//                                 </>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// }

// export default UserHeader;


import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import axios from 'axios';
import './UserHeader.css';
import { useAuth } from "../context/AuthProvider";

function UserHeader({ darkMode, toggleDarkMode, language, setLanguage }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // const [user, setUser] = useState(null);
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useAuth();
    const [loading, setLoading] = useState(true); // Add loading state
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("https://wrighto-sustainables-backend.onrender.com/api/user/me", {
                    withCredentials: true,
                });
                setUser(res.data); // if you return user in response
                setIsLoggedIn(true);
          
            } catch (err) {
                console.log('Not logged in');
            } finally {
                setLoading(false); // Set loading to false when the request is done
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
            await axios.post('https://wrighto-sustainables-backend.onrender.com/api/user/logout', {}, { withCredentials: true });
            // Clear local/session storage
            localStorage.removeItem("authtoken");
            localStorage.removeItem("user");
            sessionStorage.removeItem("authToken");
            setUser(null);
            setIsLoggedIn(false);

            // Update AuthContext if using
            setUser(null);
            navigate('/');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner or skeleton loader
    }

    return (
        <header className="user-homepage-header">
            <h1>Wrighto Sustainables</h1>
            <nav>
                <RouterLink to="/userhomepage">Home</RouterLink>
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
                                    <RouterLink to="/cart">Cart</RouterLink>
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
