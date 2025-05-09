import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AdminCancelledOrders.css'; // Make sure this file exists and is styled

const AdminCancelledOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCancelledOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders/cancel', {
                    withCredentials: true, // Ensure credentials are passed
                });
                setOrders(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch cancelled orders');
            } finally {
                setLoading(false);
            }
        };

        fetchCancelledOrders();
    }, []);

    if (loading) return <p className="admin-cancelled-orders-loading">Loading cancelled orders...</p>;
    if (error) return <p className="admin-cancelled-orders-error" style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="admin-cancelled-orders-container">
            <h2 className="admin-cancelled-orders-title">Cancelled Orders</h2>
            <div className="breadcrumbs">
                <Link to="/admin">Admin Dashboard</Link> &gt; <span>Cancelled Order</span>
            </div>
            <br></br>
            <div className="admin-cancelled-orders-list">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div className="admin-cancelled-orders-card" key={order._id}>
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Customer:</strong> {order.user?.firstname} {order.user?.lastname}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                            <p><strong>Total Amount:</strong> ₹{order.grandTotal?.toFixed(2)}</p>

                            {order.shippingAddress && (
                                <div className="admin-cancelled-orders-shipping-info">
                                    <p><strong>Shipping To:</strong></p>
                                    <p>{order.shippingAddress.fullName}</p>
                                    <p>{order.shippingAddress.addressLine}, {order.shippingAddress.city}</p>
                                    <p>{order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                                    <p>Phone: {order.shippingAddress.phone}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="admin-cancelled-orders-no-orders">No cancelled orders found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminCancelledOrders;
