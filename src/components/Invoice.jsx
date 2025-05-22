import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Invoice.css';

const Invoice = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [productData, setProductData] = useState({});

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`https://wrighto-sustainables-backend.onrender.com/api/orders/order/${orderId}`, {
                    withCredentials: true
                });
                setOrder(res.data);
                setOrder(res.data);

                // Fetch product details for each item
                const productIds = res.data.items.map(item => item.product._id || item.product);
                const uniqueIds = [...new Set(productIds)];

                const productPromises = uniqueIds.map(id =>
                    axios.get(`/api/product/${id}`).then(res => ({ id, data: res.data }))
                );

                const productResults = await Promise.all(productPromises);

                const productMap = {};
                productResults.forEach(({ id, data }) => {
                    productMap[id] = data;
                });

                setProductData(productMap);
            } catch (err) {
                console.error('Failed to fetch order:', err);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (!order) return <p>Loading invoice...</p>;

    return (
        <div className="invoice-container">
            <div className="breadcrumbs">
                <Link to="/admin/orders">All Orders</Link> &gt; <span>Invoice</span>
            </div>
            <br></br>
            {/* Invoice Header Section */}
            <section className="invoice-header">
                <h2>INVOICE</h2>
                <p><strong>Invoice ID:</strong> {order._id}</p>
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                <p><strong>Delivery Status:</strong> {order.deliveryStatus || 'Pending'}</p>
            </section>

            {/* Customer Details */}
            <section>
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> {order.user?.firstname} {order.user?.lastname}</p>
                <p><strong>Email:</strong> {order.user?.email}</p>
                <p><strong>Mobile:</strong> {order.user?.mobile}</p>
                <p><strong>Shipping Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
                {order.billingAddress && (
                    <p><strong>Billing Address:</strong> {order.billingAddress?.address}, {order.billingAddress?.city}, {order.billingAddress?.state} - {order.billingAddress?.pincode}</p>
                )}
            </section>

            {/* Order Items */}
            <section>
                <h3>Order Items</h3>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>SKU/ID</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, index) => {
                            const productId = item.product._id || item.product;
                            const product = productData[productId];

                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <img
                                            src={product?.images?.[0] || 'https://via.placeholder.com/50'}
                                            alt={product?.name || 'Product'}
                                            width="40"
                                            height="40"
                                        />
                                        <span>{product?.name || 'Unnamed Product'}</span>
                                    </td>
                                    <td>{productId}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.price}</td>
                                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>

            {/* Price Summary */}
            <section>
                <h3>Pricing Breakdown</h3>
                <p><strong>Subtotal:</strong> ₹{order.totalAmount}</p>
                <p><strong>GST (18%):</strong> ₹{order.gstAmount}</p>
                <p><strong>Delivery Charges:</strong> ₹{order.deliveryCharge}</p>
                {order.discount && (
                    <p><strong>Discount:</strong> -₹{order.discount}</p>
                )}
                <h4><strong>Grand Total:</strong> ₹{order.grandTotal}</h4>
            </section>

            {/* Logistics */}
            <section>
                <h3>Logistics Info</h3>
                <p><strong>Delivery Method:</strong> {order.deliveryMethod || 'Standard'}</p>
                <p><strong>Tracking Number:</strong> {order.trackingNumber || 'Not Assigned'}</p>
                <p><strong>Expected Delivery:</strong> {order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toLocaleDateString() : 'TBD'}</p>
            </section>

            {/* Metadata */}
            <section>
                <h3>Invoice Metadata</h3>
                <p><strong>Generated By:</strong> Admin Panel</p>
                <p><strong>Invoice Generated On:</strong> {new Date().toLocaleString()}</p>
                {order.adminNotes && <p><strong>Admin Notes:</strong> {order.adminNotes}</p>}
                <button onClick={() => window.print()}>🖨️ Print Invoice</button>
            </section>

            {/* Optional Extras */}
            <section>
                <h3>Additional Info</h3>
                {order.items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                        {item.productImage && <img src={item.productImage} alt={item.productName} width="50" />}
                        <span>{item.productName}</span>
                    </div>
                ))}
                <div style={{ marginTop: '10px' }}>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${order._id}&size=100x100`} alt="QR Code" />
                </div>
                <p style={{ marginTop: '20px' }}>Signature: _____________________</p>
                <button style={{ marginTop: '10px' }}>Mark as Fulfilled</button>
                <button style={{ marginLeft: '10px' }}>Issue Refund</button>
            </section>
        </div>
    );
};

export default Invoice;
