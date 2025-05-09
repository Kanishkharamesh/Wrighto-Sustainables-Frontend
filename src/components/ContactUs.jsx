import React, { useState } from 'react'; // Import useState
import axios from 'axios'; // Import axios
import './ContactUs.css';
import Header from '../components/Header.jsx';
import UserHeader from '../components/UserHeader';
import { useAuth } from '../context/AuthProvider';

function ContactUs({ darkMode, toggleDarkMode, language, setLanguage }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/contact', {
                name, email, message
            }, {
                withCredentials: true  // Make sure credentials are included (if needed)
            });
            alert('Message sent successfully!');
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            alert('Failed to send message. Please try again.');
        }
    };

    const { isLoggedIn } = useAuth();

    return (
        <div className={`contactus-container ${darkMode ? 'dark-mode' : ''}`}>
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
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default ContactUs;
