// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './MyProfile.css'; // Optional external styling

// const MyProfile = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get('/api/user/me', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         setUserData(res.data);
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   if (!userData) return <div>Loading...</div>;

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const updateProfile = async () => {
//     try {
//       await axios.put('/api/user/update-profile', userData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       alert('Profile updated!');
//     } catch (error) {
//       alert('Update failed!');
//     }
//   };

//   return (
//     <div className="profile-container">
//       <h2>My Profile</h2>
//       <div className="tab-buttons">
//         <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'active' : ''}>Overview</button>
//         <button onClick={() => setActiveTab('edit')} className={activeTab === 'edit' ? 'active' : ''}>Edit Profile</button>
//         <button onClick={() => setActiveTab('password')} className={activeTab === 'password' ? 'active' : ''}>Change Password</button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'overview' && (
//           <div className="overview">
//             <p><strong>Name:</strong> {userData.firstname} {userData.lastname}</p>
//             <p><strong>Email:</strong> {userData.email}</p>
//             <p><strong>Mobile:</strong> {userData.mobile}</p>
//           </div>
//         )}

//         {activeTab === 'edit' && (
//           <div className="edit-profile">
//             <input type="text" name="firstname" value={userData.firstname} onChange={handleChange} placeholder="First Name" />
//             <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} placeholder="Last Name" />
//             <input type="text" name="mobile" value={userData.mobile} onChange={handleChange} placeholder="Mobile" />
//             <button onClick={updateProfile}>Save Changes</button>
//           </div>
//         )}

//         {activeTab === 'password' && (
//           <div className="change-password">
//             <input type="password" placeholder="Current Password" />
//             <input type="password" placeholder="New Password" />
//             <input type="password" placeholder="Confirm New Password" />
//             <button>Change Password</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProfile;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './MyProfile.css'; // Optional external styling

// const MyProfile = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get('/api/user/me', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         setUserData(res.data);
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   if (!userData) return <div className="loading">Loading...</div>;

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const updateProfile = async () => {
//     try {
//       await axios.put('/api/user/update-profile', userData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       alert('Profile updated!');
//     } catch (error) {
//       alert('Update failed!');
//     }
//   };

//   return (
//     <div className="profile-container">
//       <h2>My Profile</h2>
//       <div className="tab-buttons">
//         <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'active' : ''}>Overview</button>
//         <button onClick={() => setActiveTab('edit')} className={activeTab === 'edit' ? 'active' : ''}>Edit Profile</button>
//         <button onClick={() => setActiveTab('password')} className={activeTab === 'password' ? 'active' : ''}>Change Password</button>
//         <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>My Orders</button>
//         <button onClick={() => setActiveTab('preferences')} className={activeTab === 'preferences' ? 'active' : ''}>Preferences</button>
//         <button onClick={() => setActiveTab('activity')} className={activeTab === 'activity' ? 'active' : ''}>Activity</button>
//         <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>Account Settings</button>
//         <button onClick={() => setActiveTab('security')} className={activeTab === 'security' ? 'active' : ''}>Security</button>
//         <button onClick={() => setActiveTab('documents')} className={activeTab === 'documents' ? 'active' : ''}>Documents & Billing</button>
//         <button onClick={() => setActiveTab('support')} className={activeTab === 'support' ? 'active' : ''}>Support</button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'overview' && (
//           <div className="overview">
//             <p><strong>Name:</strong> {userData.firstname} {userData.lastname}</p>
//             <p><strong>Email:</strong> {userData.email}</p>
//             <p><strong>Mobile:</strong> {userData.mobile}</p>
//             <p><strong>Account Type:</strong> {userData.role}</p>
//           </div>
//         )}

//         {activeTab === 'edit' && (
//           <div className="edit-profile">
//             <input type="text" name="firstname" value={userData.firstname} onChange={handleChange} placeholder="First Name" />
//             <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} placeholder="Last Name" />
//             <input type="text" name="mobile" value={userData.mobile} onChange={handleChange} placeholder="Mobile" />
//             <button onClick={updateProfile}>Save Changes</button>
//           </div>
//         )}

//         {activeTab === 'password' && (
//           <div className="change-password">
//             <input type="password" placeholder="Current Password" />
//             <input type="password" placeholder="New Password" />
//             <input type="password" placeholder="Confirm New Password" />
//             <button>Change Password</button>
//           </div>
//         )}

// {/* Additional Tabs (Orders, Preferences, Activity, etc.) */}
// {activeTab === 'orders' && (
//   <div className="orders">
//     <h3>My Orders</h3>
//     <p>Pending, Shipped, Delivered, Cancelled Orders...</p>
//   </div>
// )}

// {activeTab === 'preferences' && (
//   <div className="preferences">
//     <p>Saved Addresses, Payment Methods, Wishlist...</p>
//   </div>
// )}

// {activeTab === 'activity' && (
//   <div className="activity">
//     <p>Product Reviews, Q&A, Blog Comments...</p>
//   </div>
// )}

// {activeTab === 'settings' && (
//   <div className="settings">
//     <p>Language Preference, Theme Toggle, Notification Preferences...</p>
//   </div>
// )}

// {activeTab === 'security' && (
//   <div className="security">
//     <p>Two-factor Authentication, Last Login Info...</p>
//   </div>
// )}

// {activeTab === 'documents' && (
//   <div className="documents">
//     <p>Download Invoices, Billing History...</p>
//   </div>
// )}

// {activeTab === 'support' && (
//   <div className="support">
//     <p>Raise a Ticket, FAQs/Help Center...</p>
//   </div>
// )}
//       </div>
//     </div>
//   );
// };

// export default MyProfile;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './MyProfile.css'; // Optional external styling
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEdit, faKey, faShoppingCart, faCog, faShieldAlt, faFileInvoice, faHeadset } from '@fortawesome/free-solid-svg-icons';

// const MyProfile = () => {
//     const [activeTab, setActiveTab] = useState('overview');
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const res = await axios.get('/api/user/me', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 setUserData(res.data);
//             } catch (error) {
//                 console.error('Failed to fetch user data:', error);
//             }
//         };
//         fetchUserData();
//     }, []);

//     if (!userData) return <div className="loading">Loading...</div>;

//     const handleChange = (e) => {
//         setUserData({ ...userData, [e.target.name]: e.target.value });
//     };

//     const updateProfile = async () => {
//         try {
//             await axios.put('/api/user/update-profile', userData, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             alert('Profile updated!');
//         } catch (error) {
//             alert('Update failed!');
//         }
//     };

//     return (
//         <div className="profile-container">
//             <h2>My Profile</h2>
//             <div className="tab-buttons">
//                 <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'active' : ''}>
//                     <FontAwesomeIcon icon={faUser} /> Overview
//                 </button>
//                 <button onClick={() => setActiveTab('edit')} className={activeTab === 'edit' ? 'active' : ''}>
//                     <FontAwesomeIcon icon={faEdit} /> Edit Profile
//                 </button>
//                 <button onClick={() => setActiveTab('password')} className={activeTab === 'password' ? 'active' : ''}>
//                     <FontAwesomeIcon icon={faKey} /> Change Password
//                 </button>
//                 <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>
//                     <FontAwesomeIcon icon={faShoppingCart} /> My Orders
//                 </button>
//                 <button onClick={() => setActiveTab('preferences')} className={activeTab === 'preferences' ? 'active' : ''}>
//                     <FontAwesomeIcon icon={faCog} /> Preferences
//                 </button>
//                 <button onClick={() => setActiveTab('activity')} className={activeTab === 'activity' ? 'active' : ''}>
//                     <FontAwesomeIcon icon={faHeadset} /> Activity
//                 </button>
//                 <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>
//                     <FontAwesomeIcon icon={faShieldAlt} /> Account Settings
//                 </button>
//                 <button onClick={() => setActiveTab('documents')} className={activeTab === 'documents' ? 'active' : ''}>
//                     <FontAwesomeIcon icon={faFileInvoice} /> Documents & Billing
//                 </button>
//                 <button onClick={() => setActiveTab('support')} className={activeTab === 'support' ? 'active' : ''}>
//                     <FontAwesomeIcon icon={faHeadset} /> Support
//                 </button>
//             </div>

//             <div className="tab-content">
//                 {activeTab === 'overview' && (
//                     <div className="overview">
//                         <p><strong>Name:</strong> {userData.firstname} {userData.lastname}</p>
//                         <p><strong>Email:</strong> {userData.email}</p>
//                         <p><strong>Mobile:</strong> {userData.mobile}</p>
//                         <p><strong>Account Type:</strong> {userData.role}</p>
//                     </div>
//                 )}

//                 {/* Other Tab Contents */}

//                 {activeTab === 'orders' && (
//                     <div className="orders">
//                         <h3>My Orders</h3>
//                         <p>Pending, Shipped, Delivered, Cancelled Orders...</p>
//                     </div>
//                 )}

//                 {activeTab === 'preferences' && (
//                     <div className="preferences">
//                         <p>Saved Addresses, Payment Methods, Wishlist...</p>
//                     </div>
//                 )}

//                 {activeTab === 'activity' && (
//                     <div className="activity">
//                         <p>Product Reviews, Q&A, Blog Comments...</p>
//                     </div>
//                 )}

//                 {activeTab === 'settings' && (
//                     <div className="settings">
//                         <p>Language Preference, Theme Toggle, Notification Preferences...</p>
//                     </div>
//                 )}

//                 {activeTab === 'security' && (
//                     <div className="security">
//                         <p>Two-factor Authentication, Last Login Info...</p>
//                     </div>
//                 )}

//                 {activeTab === 'documents' && (
//                     <div className="documents">
//                         <p>Download Invoices, Billing History...</p>
//                     </div>
//                 )}

//                 {activeTab === 'support' && (
//                     <div className="support">
//                         <p>Raise a Ticket, FAQs/Help Center...</p>
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// };

// export default MyProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser, faEdit, faKey, faShoppingCart, faCog,
    faShieldAlt, faFileInvoice, faHeadset
} from '@fortawesome/free-solid-svg-icons';

const MyProfile = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('/api/user/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUserData(res.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
        fetchUserData();
    }, []);

    if (!userData) return <div className="profile-container loading">Loading...</div>;

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const updateProfile = async () => {
        try {
            await axios.put('/api/user/update-profile', userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Profile updated!');
        } catch (error) {
            alert('Update failed!');
        }
    };

    return (
        <div className="profile-page">
            <h2>My Profile</h2>
            <div className="profile-container">
                <div className="profile-tabs">
                    <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'active' : ''}>
                        <FontAwesomeIcon icon={faUser} /> Overview
                    </button>
                    <button onClick={() => setActiveTab('edit')} className={activeTab === 'edit' ? 'active' : ''}>
                        <FontAwesomeIcon icon={faEdit} /> Edit Profile
                    </button>
                    <button onClick={() => setActiveTab('password')} className={activeTab === 'password' ? 'active' : ''}>
                        <FontAwesomeIcon icon={faKey} /> Change Password
                    </button>
                    <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>
                        <FontAwesomeIcon icon={faShoppingCart} /> My Orders
                    </button>
                    <button onClick={() => setActiveTab('preferences')} className={activeTab === 'preferences' ? 'active' : ''}>
                        <FontAwesomeIcon icon={faCog} /> Preferences
                    </button>
                    <button onClick={() => setActiveTab('activity')} className={activeTab === 'activity' ? 'active' : ''}>
                        <FontAwesomeIcon icon={faHeadset} /> Activity
                    </button>
                    <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>
                        <FontAwesomeIcon icon={faShieldAlt} /> Account Settings
                    </button>
                    <button onClick={() => setActiveTab('documents')} className={activeTab === 'documents' ? 'active' : ''}>
                        <FontAwesomeIcon icon={faFileInvoice} /> Documents & Billing
                    </button>
                    <button onClick={() => setActiveTab('support')} className={activeTab === 'support' ? 'active' : ''}>
                        <FontAwesomeIcon icon={faHeadset} /> Support
                    </button>
                </div>

                <div className="profile-content tab-content">
                    {activeTab === 'overview' && (
                        <div className="overview">
                            <p><strong>Name:</strong> {userData.firstname} {userData.lastname}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Mobile:</strong> {userData.mobile}</p>
                            <p><strong>Account Type:</strong> {userData.role}</p>
                        </div>
                    )}

                    {activeTab === 'edit' && (
                        <div className="edit-profile">
                            <input type="text" name="firstname" value={userData.firstname} onChange={handleChange} placeholder="First Name" />
                            <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} placeholder="Last Name" />
                            <input type="text" name="mobile" value={userData.mobile} onChange={handleChange} placeholder="Mobile" />
                            <button onClick={updateProfile}>Update Profile</button>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <div className="change-password">
                            <input type="password" placeholder="Old Password" />
                            <input type="password" placeholder="New Password" />
                            <button>Change Password</button>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="orders">
                            <h3>My Orders</h3>
                            <p>Pending, Shipped, Delivered, Cancelled Orders...</p>
                        </div>
                    )}

                    {activeTab === 'preferences' && (
                        <div className="preferences">
                            <p>Saved Addresses, Payment Methods, Wishlist...</p>
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="activity">
                            <p>Product Reviews, Q&A, Blog Comments...</p>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="settings">
                            <p>Language Preference, Theme Toggle, Notification Preferences...</p>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="documents">
                            <p>Download Invoices, Billing History...</p>
                        </div>
                    )}

                    {activeTab === 'support' && (
                        <div className="support">
                            <p>Raise a Ticket, FAQs/Help Center...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
