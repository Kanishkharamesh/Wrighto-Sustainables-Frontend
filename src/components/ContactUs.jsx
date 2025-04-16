import React from 'react';
import './ContactUs.css';
import Header from '../components/Header.jsx';

function ContactUs({ darkMode, toggleDarkMode, language, setLanguage }) {
    return (
        <div className={`contactus-container ${darkMode ? 'dark-mode' : ''}`}>
            <Header
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                language={language}
                setLanguage={setLanguage}
            />

            <section className="contactus-hero">
                <h1>Get in Touch</h1>
                <p>We’d love to hear from you. Reach out with any questions, feedback, or custom orders.</p>
            </section>

            <section className="contactus-details">
                <div className="contactus-info">
                    <h2>Contact Details</h2>
                    <p>📍 230/5A, Ponnapuram Road, Thalakkarai Village, Pollachi, 642005</p>
                    <p>📧 sales1wrighto@gmail.com</p>
                    <p>📞 +91 98946 24022</p>
                </div>

                <div className="contactus-form">
                    <h2>Send a Message</h2>
                    <form>
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <textarea placeholder="Your Message" rows="5" required />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default ContactUs;
