import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage';
import Products from './components/Products';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import UserHomePage from './components/UserHomePage';
import ProtectedRoute from "./components/ProtectedRoute";
import MyProfile from './components/MyProfile';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product" element={<Products />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/userhomepage"
                        element={<UserHomePage />}   
                    />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
