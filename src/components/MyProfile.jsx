import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './MyProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, faPenToSquare, faKey, faBoxOpen,
    faHeart, faChartLine, faGear, faShieldHalved,
    faFileInvoice, faCircleQuestion 
} from '@fortawesome/free-solid-svg-icons';

import Overview from './Overview';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import Orders from './Orders';
import Preferences from './Preferences';
import Activity from './Activity';
import Settings from './Settings';
import Security from './Security';
import Documents from './Documents';
import Support from './Support';

const MyProfile = ({ darkMode }) => {
    // Load active tab from localStorage or set to 'overview' if not found
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialTab = queryParams.get('tab') || 'overview';
    const storedTab = localStorage.getItem('activeTab') || 'overview';
    const [activeTab, setActiveTab] = useState(storedTab);
    const [userData, setUserData] = useState(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const res = await axios.get('https://wrighto-sustainables-backend.onrender.com/api/user/me', {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //                 },
    //             });
    //             setUserData(res.data);
    //         } catch (error) {
    //             console.error('Failed to fetch user data:', error);
    //         }
    //     };
    //     fetchUserData();
    // }, []);
    useEffect(() => {
  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        'https://wrighto-sustainables-backend.onrender.com/api/user/me',
        {
          withCredentials: true, // <--- This is KEY for cookies
        }
      );
      setUserData(res.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  fetchUserData();
}, []);


    if (!userData) return <div className="my-profile-loading">Loading...</div>;

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab);  // Save the active tab in localStorage
    };

    return (
        <div className={`my-profile-container ${darkMode ? 'dark-mode' : ''}`}>
            <div className="my-profile-layout">
                <div className="my-profile-sidebar">
                    <button onClick={() => handleTabChange('overview')} className={activeTab === 'overview' ? 'my-profile-active' : ''}>
                        <FontAwesomeIcon icon={faUser} /> Overview
                    </button>
                    <button onClick={() => handleTabChange('edit')} className={activeTab === 'edit' ? 'my-profile-active' : ''}>
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
                    </button>
                    <button onClick={() => handleTabChange('password')} className={activeTab === 'password' ? 'my-profile-active' : ''}>
                        <FontAwesomeIcon icon={faKey} /> Change Password
                    </button>
                    <button onClick={() => handleTabChange('orders')} className={activeTab === 'orders' ? 'my-profile-active' : ''}>
                        <FontAwesomeIcon icon={faBoxOpen} /> My Orders
                    </button>
                    <button onClick={() => handleTabChange('preferences')} className={activeTab === 'preferences' ? 'my-profile-active' : ''}>
                        <FontAwesomeIcon icon={faHeart} /> Preferences
                    </button>
                    <button onClick={() => handleTabChange('activity')} className={activeTab === 'activity' ? 'my-profile-active' : ''}>
                        <FontAwesomeIcon icon={faChartLine} /> Activity
                    </button>
                    <button onClick={() => handleTabChange('settings')} className={activeTab === 'settings' ? 'my-profile-active' : ''}>
                        <FontAwesomeIcon icon={faGear} /> Account Settings
                    </button>
                    <button onClick={() => handleTabChange('security')} className={activeTab === 'security' ? 'my-profile-active' : ''}>
                        <FontAwesomeIcon icon={faShieldHalved} /> Security
                    </button>
                    <button onClick={() => handleTabChange('documents')} className={activeTab === 'documents' ? 'my-profile-active' : ''}>
                        <FontAwesomeIcon icon={faFileInvoice} /> Documents & Billing
                    </button>
                    <button onClick={() => handleTabChange('support')} className={activeTab === 'support' ? 'my-profile-active' : ''}>
                        <FontAwesomeIcon icon={faCircleQuestion} /> Support
                    </button>
                </div>

                <div className="my-profile-content">
                    {activeTab === 'overview' && <Overview userData={userData} />}
                    {activeTab === 'edit' && <EditProfile userData={userData} />}
                    {activeTab === 'password' && <ChangePassword />}
                    {activeTab === 'orders' && <Orders />}
                    {activeTab === 'preferences' && <Preferences />}
                    {activeTab === 'activity' && <Activity />}
                    {activeTab === 'settings' && <Settings />}
                    {activeTab === 'security' && <Security />}
                    {activeTab === 'documents' && <Documents />}
                    {activeTab === 'support' && <Support />}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
