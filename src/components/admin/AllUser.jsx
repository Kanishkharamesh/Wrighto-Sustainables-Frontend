import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './AllUser.css';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://wrighto-sustainables-backend.onrender.com/api/user/admin/all-users');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError('Failed to load users.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="all-user-admin-page">
            <h2 className="all-user-admin-heading">All Registered Users</h2>
            <div className="breadcrumbs">
                <Link to="/admin">Admin Dashboard</Link> &gt; <span>All Users</span>
            </div>
            <br></br>
            {loading ? (
                <p className="all-user-admin-loading">Loading users...</p>
            ) : error ? (
                <p className="all-user-admin-error">{error}</p>
            ) : (
                <div className="all-user-admin-list">
                    {users.map(user => (
                        <div key={user._id} className="all-user-admin-card">
                            <FontAwesomeIcon icon={faUser} className="all-user-admin-icon" />
                            <h3 className="all-user-admin-name">{user.firstName} {user.lastName}</h3>
                            <p className="all-user-admin-email">Email: {user.email}</p>
                            <p className="all-user-admin-mobile">Mobile: {user.mobile}</p>
                            <p className="all-user-admin-status">
                                Status: {user.isActive ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllUsers;
