// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AdminOrderStatus.css';  // Add appropriate styles

// const AdminOrderStatus = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/orders/all', {
//                     withCredentials: true,
//                 });
//                 setOrders(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to fetch orders');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, []);

//     const handleStatusChange = async (orderId, newStatus) => {
//         try {
//             // Optimistically update the UI first
//             setOrders(orders.map(order =>
//                 order._id === orderId ? { ...order, status: newStatus } : order
//             ));

//             // Send the updated status to the backend
//             await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus }, {
//                 withCredentials: true,
//             });
//         } catch (err) {
//             console.error("Error updating order status:", err);
//             // Optionally, revert to previous status if there's an error
//             setOrders(orders.map(order =>
//                 order._id === orderId ? { ...order, status: order.status } : order
//             ));
//         }
//     };

//     if (loading) return <p>Loading orders...</p>;
//     if (error) return <p style={{ color: 'red' }}>{error}</p>;

//     return (
//         <div className="order-status-container">
//             <h2>Update Order Status</h2>
//             <p>Manage the status of customer orders here.</p>
//             <div className="order-list">
//                 {orders.map(order => (
//                     <div className="order-card" key={order._id}>
//                         <p><strong>Order ID:</strong> {order._id}</p>
//                         <p><strong>Customer:</strong> {order.user?.firstname} {order.user?.lastname}</p>
//                         <p><strong>Status:</strong> {order.status}</p>
//                         <select
//                             value={order.status}
//                             onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                         >
//                             <option value="Pending">Pending</option>
//                             <option value="Processing">Processing</option>
//                             <option value="Shipped">Shipped</option>
//                             <option value="Delivered">Delivered</option>
//                             <option value="Cancelled">Cancelled</option>
//                         </select>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AdminOrderStatus;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AdminOrderStatus.css';

// const AdminOrderStatus = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/orders/all', {
//                     withCredentials: true,
//                 });
//                 setOrders(response.data);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to fetch orders');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, []);

//     const handleStatusChange = async (orderId, newStatus) => {
//         try {
//             setOrders(prevOrders =>
//                 prevOrders.map(order =>
//                     order._id === orderId ? { ...order, status: newStatus } : order
//                 )
//             );

//             await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
//                 status: newStatus,
//             }, {
//                 withCredentials: true,
//             });
//         } catch (err) {
//             console.error("Error updating order status:", err);
//         }
//     };

//     if (loading) return <p>Loading orders...</p>;
//     if (error) return <p style={{ color: 'red' }}>{error}</p>;

//     return (
//         <div className="admin-update-status-order-container">
//             <h2>Manage Customer Orders</h2>
//             <div className="breadcrumbs">
//                 <Link to="/admin">Admin Dashboard</Link> &gt; <span>Manage Order</span>
//             </div>
//             <br></br>
//             <div className="admin-update-status-order-list">
//                 {orders.map(order => (
//                     <div className="admin-update-status-order-card" key={order._id}>
//                         <p><strong>Order ID:</strong> {order._id}</p>
//                         <p><strong>Customer:</strong> {order.user?.firstname} {order.user?.lastname}</p>
//                         <p><strong>Status:</strong> {order.status}</p>
//                         <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
//                         <p><strong>Total Amount:</strong> ₹{order.grandTotal?.toFixed(2)}</p>

//                         {order.shippingAddress && (
//                             <div className="admin-update-status-order-shipping-info">
//                                 <p><strong>Shipping To:</strong></p>
//                                 <p>{order.shippingAddress.fullName}</p>
//                                 <p>{order.shippingAddress.addressLine}, {order.shippingAddress.city}</p>
//                                 <p>{order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
//                                 <p>Phone: {order.shippingAddress.phone}</p>
//                             </div>
//                         )}

//                         <label htmlFor={`status-${order._id}`}><strong>Update Status:</strong></label>
//                         <select
//                             id={`status-${order._id}`}
//                             value={order.status}
//                             onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                         >
//                             <option value="Pending">Pending</option>
//                             <option value="Processing">Processing</option>
//                             <option value="Shipped">Shipped</option>
//                             <option value="Delivered">Delivered</option>
//                             <option value="Cancelled">Cancelled</option>
//                         </select>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AdminOrderStatus;


const AdminOrderStatus = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders/all', {
                    withCredentials: true,
                });
                setOrders(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );

            await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
                status: newStatus,
            }, {
                withCredentials: true,
            });
        } catch (err) {
            console.error("Error updating order status:", err);
        }
    };

    const handlePaymentStatusChange = async (orderId, newStatus) => {
        try {
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, paymentStatus: newStatus } : order
                )
            );

            await axios.put(`http://localhost:5000/api/orders/payment-status/${orderId}`, {
                paymentStatus: newStatus,
            }, {
                withCredentials: true,
            });
        } catch (err) {
            console.error("Error updating payment status:", err);
        }
    };

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="admin-update-status-order-container">
            <h2>Manage Customer Orders</h2>
            <div className="breadcrumbs">
                <Link to="/admin">Admin Dashboard</Link> &gt; <span>Manage Order</span>
            </div>
            <br />
            <div className="admin-update-status-order-list">
                {orders.map(order => (
                    <div className="admin-update-status-order-card" key={order._id}>
                        <p><strong>Order ID:</strong> {order._id}</p>
                        <p><strong>Customer:</strong> {order.user?.firstname} {order.user?.lastname}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                        <p><strong>Total Amount:</strong> ₹{order.grandTotal?.toFixed(2)}</p>

                        {order.shippingAddress && (
                            <div className="admin-update-status-order-shipping-info">
                                <p><strong>Shipping To:</strong></p>
                                <p>{order.shippingAddress.fullName}</p>
                                <p>{order.shippingAddress.addressLine}, {order.shippingAddress.city}</p>
                                <p>{order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                                <p>Phone: {order.shippingAddress.phone}</p>
                            </div>
                        )}

                        <label htmlFor={`status-${order._id}`}><strong>Update Order Status:</strong></label>
                        <select
                            id={`status-${order._id}`}
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                        <label htmlFor={`payment-${order._id}`}><strong>Update Payment Status:</strong></label>
                        <select
                            id={`payment-${order._id}`}
                            value={order.paymentStatus}
                            onChange={(e) => handlePaymentStatusChange(order._id, e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Failed">Failed</option>
                            <option value="Refunded">Refunded</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrderStatus;