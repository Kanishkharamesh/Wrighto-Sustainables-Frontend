import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart, faHeart, faMapMarkerAlt, faUserShield,
  faCalendarAlt, faClock, faStar, faGift
} from '@fortawesome/free-solid-svg-icons';
import './Overview.css';

const Overview = () => {
  const [user, setUser] = useState({});
  const [orderCount, setOrderCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [addressCount, setAddressCount] = useState(0);

  // useEffect(() => {
  //   const fetchOverviewData = async () => {
  //     try {
  //       const userRes = await axios.get('http://localhost:5000/api/user/me', { withCredentials: true });
  //       setUser(userRes.data);

  //       const ordersRes = await axios.get('http://localhost:5000/api/orders/user-orders', { withCredentials: true });
  //       setOrderCount(ordersRes.data.length);

  //       const wishlistRes = await axios.get(`http://localhost:5000/api/wishlist/user/${userRes.data._id}`);
  //       setWishlistCount(wishlistRes.data.length);

  //       const addressRes = await axios.get(`http://localhost:5000/api/address/user/${userRes.data._id}`);
  //       setAddressCount(addressRes.data.length);
  //     } catch (err) {
  //       console.error('Failed to load overview data:', err);
  //     }
  //   };

  //   fetchOverviewData();
  // }, []);

  useEffect(() => {
      const fetchOverviewData = async () => {
        try {
          const userRes = await axios.get('https://wrighto-sustainables-backend.onrender.com/api/user/me', { withCredentials: true });
          setUser(userRes.data);
    
          const ordersRes = await axios.get('https://wrighto-sustainables-backend.onrender.com/api/orders/user-orders', { withCredentials: true });
          setOrderCount(ordersRes.data.length);
    
          const wishlistRes = await axios.get(`https://wrighto-sustainables-backend.onrender.com/api/wishlist/user/${userRes.data._id}`);
          setWishlistCount(wishlistRes.data.length);
    
          const addressRes = await axios.get(`https://wrighto-sustainables-backend.onrender.com/api/address/user/${userRes.data._id}`);
          setAddressCount(addressRes.data.length);
        } catch (err) {
          console.error('Failed to load overview data:', err);
        }
      };
    
      fetchOverviewData();
    }, []);
    
  const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '';
  const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '';

  return (
    <div className="overview-container">
      <div className="overview-header">
        <div className="overview-avatar">
          {user.firstname?.[0]}{user.lastname?.[0]}
        </div>
        <div>
          <h2>{user.firstname} {user.lastname}</h2>
          <p>{user.email}</p>
          <p><FontAwesomeIcon icon={faCalendarAlt} /> Joined: {joinedDate}</p>
          <p><FontAwesomeIcon icon={faUserShield} /> Role: {user.role}</p>
        </div>
      </div>

      <div className="overview-stats">
        <div className="stat-card">
          <FontAwesomeIcon icon={faShoppingCart} />
          <h3>{orderCount}</h3>
          <p>Orders</p>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faHeart} />
          <h3>{wishlistCount}</h3>
          <p>Wishlist</p>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <h3>{addressCount}</h3>
          <p>Addresses</p>
        </div>
      </div>

      <div className="overview-extras">
        <div><FontAwesomeIcon icon={faStar} /> <strong>Membership:</strong> {user.membership || 'Basic'}</div>
        <div><FontAwesomeIcon icon={faGift} /> <strong>Reward Points:</strong> {user.points || 0}</div>
        <div><FontAwesomeIcon icon={faClock} /> <strong>Last Login:</strong> {lastLogin || 'N/A'}</div>
      </div>
    </div>
  );
};

export default Overview;
