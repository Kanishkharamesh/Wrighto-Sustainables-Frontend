// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Documents.css';

// const Documents = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const res = await axios.get('http://localhost:5000/api/user/orders/my', {
//                     withCredentials: true,
//                 });
//                 setOrders(res.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Failed to fetch orders:", error);
//                 setLoading(false);
//             }
//         };
//         fetchOrders();
//     }, []);

//     if (loading) return <p>Loading invoices...</p>;
//     if (orders.length === 0) return <p>No invoices found.</p>;

//     return (
//         <div className="documents-container">
//             <h2>Your Invoices</h2>
//             {orders.map((order) => (
//                 <div key={order._id} className="invoice-card">
//                     <h3><i className="fas fa-file-invoice"></i> Invoice #{order._id.slice(-6).toUpperCase()}</h3>
//                     <p><i className="fas fa-calendar-alt"></i> <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
//                     <p><i className="fas fa-credit-card"></i> <strong>Payment:</strong> {order.paymentMethod} - {order.paymentStatus}</p>
//                     <p><i className="fas fa-map-marker-alt"></i> <strong>Ship To:</strong> {order.shippingAddress.fullName}, {order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>

//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Product</th>
//                                 <th>Qty</th>
//                                 <th>Price (₹)</th>
//                                 <th>Subtotal (₹)</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {order.items.map((item) => (
//                                 <tr key={item.product._id}>
//                                     <td>{item.product.name}</td>
//                                     <td>{item.quantity}</td>
//                                     <td>{item.price}</td>
//                                     <td>{item.quantity * item.price}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     <div className="invoice-summary">
//                         <p><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>
//                         <p><strong>GST (18%):</strong> ₹{order.gstAmount.toFixed(2)}</p>
//                         <p><strong>Delivery:</strong> ₹{order.deliveryCharge.toFixed(2)}</p>
//                         <p><strong>Grand Total:</strong> ₹{order.grandTotal.toFixed(2)}</p>
//                     </div>

//                     <button className="download-btn">
//                         <i className="fas fa-download" style={{ marginRight: '5px' }}></i>
//                         Download PDF
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Documents;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Documents.css';
import { jsPDF } from 'jspdf';

const Documents = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('https://wrighto-sustainables-backend.onrender.com/api/user/orders/my', {
                    withCredentials: true,
                });
                setOrders(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const downloadPDF = (order) => {
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(18);
        doc.text(`Invoice #${order._id.slice(-6).toUpperCase()}`, 20, 20);

        // Add order details
        doc.setFontSize(12);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 20, 30);
        doc.text(`Payment: ${order.paymentMethod} - ${order.paymentStatus}`, 20, 40);
        doc.text(`Ship To: ${order.shippingAddress.fullName}, ${order.shippingAddress.addressLine}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`, 20, 50);

        // Add table headers
        doc.text('Product', 20, 60);
        doc.text('Qty', 90, 60);
        doc.text('Price (₹)', 120, 60);
        doc.text('Subtotal (₹)', 160, 60);

        // Add table rows
        let yPosition = 70;
        order.items.forEach(item => {
            doc.text(item.product.name, 20, yPosition);
            doc.text(item.quantity.toString(), 90, yPosition);
            doc.text(item.price.toString(), 120, yPosition);
            doc.text((item.quantity * item.price).toString(), 160, yPosition);
            yPosition += 10;
        });

        // Add summary
        doc.text(`Total: ₹${order.totalAmount.toFixed(2)}`, 20, yPosition);
        yPosition += 10;
        doc.text(`GST (18%): ₹${order.gstAmount.toFixed(2)}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Delivery: ₹${order.deliveryCharge.toFixed(2)}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Grand Total: ₹${order.grandTotal.toFixed(2)}`, 20, yPosition);

        // Download the PDF
        doc.save(`Invoice_${order._id.slice(-6).toUpperCase()}.pdf`);
    };

    if (loading) return <p>Loading invoices...</p>;
    if (orders.length === 0) return <p>No invoices found.</p>;

    return (
        <div className="documents-container">
            <h2>Your Invoices</h2>
            {orders.map((order) => (
                <div key={order._id} className="invoice-card">
                    <button className="download-btn" onClick={() => downloadPDF(order)}>
                        <i className="fas fa-download" style={{ marginRight: '5px' }}></i>
                        Download PDF
                    </button>
                    <h3><i className="fas fa-file-invoice"></i> Invoice #{order._id.slice(-6).toUpperCase()}</h3>
                    <p><i className="fas fa-calendar-alt"></i> <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    <p><i className="fas fa-credit-card"></i> <strong>Payment:</strong> {order.paymentMethod} - {order.paymentStatus}</p>
                    <p><i className="fas fa-map-marker-alt"></i> <strong>Ship To:</strong> {order.shippingAddress.fullName}, {order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>

                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Price (₹)</th>
                                <th>Subtotal (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item) => (
                                <tr key={item.product._id}>
                                    <td>{item.product.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity * item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="invoice-summary">
                        <p><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                        <p><strong>GST (18%):</strong> ₹{order.gstAmount.toFixed(2)}</p>
                        <p><strong>Delivery:</strong> ₹{order.deliveryCharge.toFixed(2)}</p>
                        <p><strong>Grand Total:</strong> ₹{order.grandTotal.toFixed(2)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Documents;
