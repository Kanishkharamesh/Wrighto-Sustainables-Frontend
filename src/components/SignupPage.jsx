import React, { useState } from 'react';
import './SignupPage.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

function SignupPage() {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('English');
    const toggleDarkMode = () => setDarkMode(!darkMode);
    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post(
                'https://wrighto-sustainables-backend.onrender.com/api/user/register',
                {
                    firstname,
                    lastname,
                    email,
                    mobile,
                    password
                },
                {
                    withCredentials: true
                }
            );
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className={`signup-container ${darkMode ? 'dark-mode' : ''}`}>  {/* APPLY DARK MODE CLASS */}
            <Header
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                language={language}
                setLanguage={setLanguage}
            />
            <div className="signup-card">
                <h2>Create Account</h2>
                <form onSubmit={handleSignup}>
                    <div className="input-row">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password-signup"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="signup-button">Sign Up</button>
                    <div className="social-login">
                        <button type="button" className="social-button">
                            <FontAwesomeIcon icon={faGoogle} /> Google
                        </button>
                        <button type="button" className="social-button">
                            <FontAwesomeIcon icon={faFacebookF} /> Facebook
                        </button>
                    </div>
                    <p className="login-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;