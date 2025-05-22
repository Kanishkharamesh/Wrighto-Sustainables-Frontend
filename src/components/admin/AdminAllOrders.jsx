import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Papa from 'papaparse';
import './AdminOrders.css';

const AdminAllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrdersAndProducts = async () => {
            try {
                const response = await axios.get('https://wrighto-sustainables-backend.onrender.com/api/orders/all', {
                    withCredentials: true,
                });
                const allOrders = response.data;
                setOrders(allOrders);

                const productIds = allOrders.reduce((acc, order) => {
                    order.items.forEach((item) => {
                        const productId = item.product._id || item.product;
                        if (!acc.includes(productId)) {
                            acc.push(productId);
                        }
                    });
                    return acc;
                }, []);

                const productResponses = await Promise.all(
                    productIds.map((id) =>
                        axios
                            .get(`https://wrighto-sustainables-backend.onrender.com/api/product/${id}`)
                            .then((res) => ({ [id]: res.data }))
                            .catch((err) => {
                                console.error(`Error fetching product ${id}:`, err);
                                return null;
                            })
                    )
                );

                const mergedProductData = productResponses.reduce((acc, product) => {
                    if (product) {
                        Object.assign(acc, product);
                    }
                    return acc;
                }, {});
                setProductData(mergedProductData);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersAndProducts();
    }, []);

    // Handle status change
    const handleStatusChange = async (orderId, status) => {
        try {
            await axios.put(`https://wrighto-sustainables-backend.onrender.com/api/orders/${orderId}/status`, { status }, {
                withCredentials: true,
            });
            setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order)); // Update status in state
        } catch (err) {
            console.error("Error updating order status:", err);
        }
    };

    //CANCEL ORDER
    const handleCancelOrder = async (orderId) => {
        try {
            const res = await axios.patch(`https://wrighto-sustainables-backend.onrender.com/api/orders/cancel/${orderId}`, {}, { withCredentials: true });
            alert(res.data.message);
            // Optionally refresh orders list here
        } catch (err) {
            alert('Failed to cancel order: ' + err.response?.data?.message || err.message);
        }
    };

    // Filter/search functionality
    const filteredOrders = orders.filter((order) => {
        return (
            order.user?.firstname.toLowerCase().includes(search.toLowerCase()) ||
            order.user?.lastname.toLowerCase().includes(search.toLowerCase()) ||
            order._id.toLowerCase().includes(search.toLowerCase())
        );
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const displayedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

    // CSV export logic using PapaParse
    const exportToCSV = () => {
        const csv = Papa.unparse(filteredOrders); // Convert orders to CSV
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'orders.csv';
        link.click();
    };

    if (loading) return <p style={{ textAlign: 'center' }}>Loading orders...</p>;
    if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

    return (
        <div className="orders-container">
            <h2 className="orders-page-title" style={{ whiteSpace: 'nowrap' }}>
                Customer Orders
            </h2>
            <div className="breadcrumbs">
                <Link to="/admin">Admin Dashboard</Link> &gt; <span>Customer Orders</span>
            </div>
            <br />
            <input
                type="text"
                placeholder="Search by Order ID, Customer Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="admin-order-search-bar"
            />
            <button className="export-csv-btn" onClick={exportToCSV}>Export as CSV</button>
            <br />
            {displayedOrders.length === 0 ? (
                <p className="orders-page-no-orders">No orders found.</p>
            ) : (
                displayedOrders.map((order) => (
                    <div
                        className="admin-orders-page-order-card"
                        key={order._id}
                        style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}
                    >
                        <p><strong>Order ID:</strong> {order._id}</p>
                        <p><strong>Customer:</strong> {order.user?.firstname} {order.user?.lastname}</p>
                        <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                        <p>
                            <strong>Status:</strong>{' '}
                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                                {order.status}
                            </span>
                        </p>
                        <p><strong>Payment:</strong> {order.paymentMethod}</p>
                        <p>
                            <strong>Payment Status:</strong>{' '}
                            <span className={`status-badge ${order.paymentStatus.toLowerCase()}`}>
                                {order.paymentStatus}
                            </span>
                        </p>
                        <p><strong>Grand Total:</strong> ₹{order.grandTotal}</p>
                        <ul className="orders-page-order-items-list">
                            {order.items.map((item, index) => {
                                const productId = item.product._id || item.product;
                                const product = productData[productId];

                                return (
                                    <li className="orders-page-order-item" key={index}>
                                        <img
                                            src={product?.images?.[0] || 'https://via.placeholder.com/60'}
                                            alt={product?.name || 'Product'}
                                            width="60"
                                            height="60"
                                        />
                                        <span>
                                            {product?.name || 'Unnamed Product'} × {item.quantity} - ₹{item.price}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                        <p><strong>Shipping:</strong> {order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                        <a href={`mailto:${order.user?.email}`} className="contact-customer">Contact Customer</a>
                        <div className="admin-button-group">
                            <button className="invoice-admin-button" onClick={() => navigate(`/invoice/${order._id}`)}>View Invoice</button>
                            {/* <button className="cancel-admin-button" onClick={() => navigate(`/cancel/${order._id}`)}>Cancel Order</button> */}
                            <button className="cancel-admin-button" onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>
                        </div>
                    </div>
                ))
            )}
            <div className="pagination">
                <button className='order-admin-page-btn1'
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button className='order-admin-page-btn2'
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminAllOrders;
