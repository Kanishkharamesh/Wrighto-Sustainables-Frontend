import React from 'react';
import './AboutUs.css';
import Header from '../components/Header.jsx';
import UserHeader from '../components/UserHeader';
import { useAuth } from '../context/AuthProvider';

function AboutUs({ darkMode, toggleDarkMode, language, setLanguage }) {
    const { isLoggedIn } = useAuth();
    return (
        <div className={`aboutus-container ${darkMode ? 'dark-mode' : ''}`}>
            {isLoggedIn ? (
                <UserHeader
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    language={language}
                    setLanguage={setLanguage}
                />
            ) : (
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    language={language}
                    setLanguage={setLanguage}
                />
            )}

            <section className="aboutus-hero">
                <h1>About Wrighto Sustainables</h1>
                <p>Leading the way in eco-friendly packaging innovation and sustainability.</p>
            </section>

            <section className="aboutus-content">
                <h2>Our Mission</h2>
                <p>We are committed to delivering high-quality, sustainable food packaging solutions that reduce waste and protect the environment. Our products are designed to be eco-conscious, practical, and affordable for businesses and consumers alike.</p>

                <h2>Our Journey</h2>
                <p>Founded in Pollachi, Tamil Nadu, Wrighto Sustainables was born from the need to make a positive environmental impact. We specialize in recyclable and reusable plastic packaging, helping reduce plastic pollution and increase awareness about conscious consumption.</p>

                <h2>Why Choose Us?</h2>
                <ul>
                    <li>Eco-friendly and recyclable materials</li>
                    <li>Transparent manufacturing and fair pricing</li>
                    <li>Reliable bulk ordering and delivery</li>
                    <li>Real-time inventory and customer support</li>
                </ul>

                <h2>Contact Us</h2>
                <p>📍 230/5A, Ponnapuram road, Thalakkarai village, Pollachi, 642005</p>
                <p>📧 sales1wrighto@gmail.com</p>
                <p>📞 +91 98946 24022</p>
            </section>
        </div>
    );
}

export default AboutUs;
