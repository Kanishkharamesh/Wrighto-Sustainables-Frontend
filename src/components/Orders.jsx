// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Orders.css';
// import axios from 'axios';

// const Orders = () => {
//     const [orders, setOrders] = useState([]);
//     const [productImages, setProductImages] = useState({});
//     const [reviews, setReviews] = useState({}); // To manage reviews state
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios
//             .get('http://localhost:5000/api/orders/user-orders', { withCredentials: true })
//             .then((res) => {
//                 setOrders(res.data);

//                 const productIds = res.data.reduce((acc, order) => {
//                     order.items.forEach((item) => {
//                         const productId = item.product._id || item.product;
//                         if (!acc.includes(productId)) {
//                             acc.push(productId);
//                         }
//                     });
//                     return acc;
//                 }, []);

//                 Promise.all(
//                     productIds.map((productId) =>
//                         axios
//                             .get(`http://localhost:5000/api/product/product-image/${productId}`)
//                             .then((response) => ({ [productId]: response.data.image }))
//                             .catch((error) => {
//                                 console.error('Error fetching product image:', error);
//                                 return null;
//                             })
//                     )
//                 )
//                     .then((results) => {
//                         const imagesData = results.reduce((acc, product) => {
//                             if (product) {
//                                 acc = { ...acc, ...product };
//                             }
//                             return acc;
//                         }, {});
//                         setProductImages(imagesData);
//                     })
//                     .catch((err) => {
//                         console.error('Error fetching product images in bulk:', err);
//                     });
//             })
//             .catch((err) => {
//                 console.error('Error fetching orders', err);
//             });
//     }, []);

//     const handleReviewChange = (productId, field, value) => {
//         setReviews((prevReviews) => ({
//             ...prevReviews,
//             [productId]: {
//                 ...prevReviews[productId],
//                 [field]: value,
//             },
//         }));
//     };

//     const submitReview = (productId, reviewData) => {
//         axios
//             .post(
//                 `http://localhost:5000/api/reviews/${productId}`,
//                 reviewData,
//                 { withCredentials: true }
//             )
//             .then((res) => {
//                 alert('Review submitted successfully!');
//                 setReviews((prevReviews) => ({
//                     ...prevReviews,
//                     [productId]: {
//                         rating: '',
//                         comment: '',
//                     },
//                 }));
//             })
//             .catch((err) => {
//                 console.error('Error submitting review:', err);
//                 alert('Failed to submit review. Please try again.');
//             });
//     };

//     return (
//         <div className="orders-page-container">
//             <h2 className="orders-page-title" style={{ marginLeft: '30px', marginTop: '10px' }}>
//                 My Orders
//             </h2>
//             {orders.length === 0 ? (
//                 <p className="orders-page-no-orders">You haven’t placed any orders yet.</p>
//             ) : (
//                 orders.map((order) => (
//                     <div key={order._id} className="orders-page-order-card">
//                         <p><strong>Order ID:</strong> {order._id}</p>
//                         <p><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>
//                         <p><strong>Status:</strong> {order.status}</p>
//                         <p><strong>Subtotal:</strong> ₹{order.totalAmount.toFixed(2)}</p>
//                         <p><strong>GST:</strong> ₹{(order.gstAmount || 0).toFixed(2)}</p>
//                         <p><strong>Delivery:</strong> ₹{(order.deliveryCharge || 0).toFixed(2)}</p>
//                         <p><strong>Grand Total:</strong> ₹{(order.grandTotal || order.totalAmount).toFixed(2)}</p>
//                         <div>
//                             <strong>Items:</strong>
//                             <ul className="orders-page-order-items-list">
//                                 {order.items.map((item, index) => {
//                                     const image = productImages[item.product._id || item.product];

//                                     if (!image) {
//                                         return <li key={index}>Loading product image...</li>;
//                                     }

//                                     return (
//                                         <li key={index} className="orders-page-order-item">
//                                             <img
//                                                 src={image || 'https://via.placeholder.com/60'}
//                                                 alt="Product"
//                                                 width="50"
//                                                 height="50"
//                                                 className="product-img"
//                                             />
//                                             <span>{item.product.name || 'Unnamed Product'}</span>

//                                             {/* Review Section moved to the bottom */}
//                                             <div className="review-section">
//                                                 <h4>Leave a Review</h4>
//                                                 <label>Rating:</label>
//                                                 <select
//                                                     value={reviews[item.product._id]?.rating || ''}
//                                                     onChange={(e) => handleReviewChange(item.product._id, 'rating', e.target.value)}
//                                                 >
//                                                     <option value="">Select Rating</option>
//                                                     {[1, 2, 3, 4, 5].map((star) => (
//                                                         <option key={star} value={star}>
//                                                             {star} Star{star > 1 ? 's' : ''}
//                                                         </option>
//                                                     ))}
//                                                 </select>

//                                                 <label>Comment:</label>
//                                                 <textarea
//                                                     value={reviews[item.product._id]?.comment || ''}
//                                                     onChange={(e) => handleReviewChange(item.product._id, 'comment', e.target.value)}
//                                                     placeholder="Write your review here"
//                                                 />

//                                                 <button
//                                                     className="review-submit-btn"
//                                                     onClick={() =>
//                                                         submitReview(item.product._id, {
//                                                             rating: reviews[item.product._id]?.rating,
//                                                             comment: reviews[item.product._id]?.comment,
//                                                         })
//                                                     }
//                                                 >
//                                                     Submit Review
//                                                 </button>
//                                             </div>
//                                         </li>
//                                     );
//                                 })}
//                             </ul>
//                         </div>
//                     </div>
//                 ))
//             )}
//         </div >
//     );
// };

// export default Orders;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Orders.css';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [productImages, setProductImages] = useState({});
    const [reviews, setReviews] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('https://wrighto-sustainables-backend.onrender.com/api/orders/user-orders', { withCredentials: true })
            .then((res) => {
                setOrders(res.data);

                const productIds = res.data.reduce((acc, order) => {
                    order.items.forEach((item) => {
                        const productId = item.product?._id || item.product;
                        if (productId && !acc.includes(productId)) {
                            acc.push(productId);
                        }
                    });
                    return acc;
                }, []);

                Promise.all(
                    productIds.map((productId) =>
                        axios
                            .get(`'https://wrighto-sustainables-backend.onrender.com/api/product/product-image/${productId}`)
                            .then((response) => ({ [productId]: response.data.image }))
                            .catch((error) => {
                                console.error('Error fetching product image:', error);
                                return null;
                            })
                    )
                )
                    .then((results) => {
                        const imagesData = results.reduce((acc, product) => {
                            if (product) {
                                acc = { ...acc, ...product };
                            }
                            return acc;
                        }, {});
                        setProductImages(imagesData);
                    })
                    .catch((err) => {
                        console.error('Error fetching product images in bulk:', err);
                    });
            })
            .catch((err) => {
                console.error('Error fetching orders', err);
            });
    }, []);

    const handleReviewChange = (productId, field, value) => {
        setReviews((prevReviews) => ({
            ...prevReviews,
            [productId]: {
                ...prevReviews[productId],
                [field]: value,
            },
        }));
    };

    const submitReview = (productId, reviewData) => {
        axios
            .post(
                `https://wrighto-sustainables-backend.onrender.com/api/reviews/${productId}`,
                reviewData,
                { withCredentials: true }
            )
            .then((res) => {
                alert('Review submitted successfully!');
                setReviews((prevReviews) => ({
                    ...prevReviews,
                    [productId]: {
                        rating: '',
                        comment: '',
                    },
                }));
            })
            .catch((err) => {
                console.error('Error submitting review:', err);
                alert('Failed to submit review. Please try again.');
            });
    };

    return (
        <div className="orders-page-container">
            <h2 className="orders-page-title" style={{ marginLeft: '30px', marginTop: '10px' }}>
                My Orders
            </h2>
            {orders.length === 0 ? (
                <p className="orders-page-no-orders">You haven’t placed any orders yet.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="orders-page-order-card">
                        <p><strong>Order ID:</strong> {order._id}</p>
                        <p><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Subtotal:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                        <p><strong>GST:</strong> ₹{(order.gstAmount || 0).toFixed(2)}</p>
                        <p><strong>Delivery:</strong> ₹{(order.deliveryCharge || 0).toFixed(2)}</p>
                        <p><strong>Grand Total:</strong> ₹{(order.grandTotal || order.totalAmount).toFixed(2)}</p>
                        <div>
                            <strong>Items:</strong>
                            <ul className="orders-page-order-items-list">
                                {order.items.map((item, index) => {
                                    const product = item.product;
                                    const productId = product?._id || product;
                                    const productExists = product && typeof product === 'object';
                                    const image = productImages[productId];

                                    return (
                                        <li key={index} className="orders-page-order-item">
                                            <img
                                                src={image || 'https://via.placeholder.com/60'}
                                                alt="Product"
                                                width="50"
                                                height="50"
                                                className="product-img"
                                            />
                                            <span>{productExists ? product.name : 'Product Deleted'}</span>

                                            {productExists && (
                                                <div className="review-section">
                                                    <h4>Leave a Review</h4>
                                                    <label>Rating:</label>
                                                    <select
                                                        value={reviews[productId]?.rating || ''}
                                                        onChange={(e) =>
                                                            handleReviewChange(productId, 'rating', e.target.value)
                                                        }
                                                    >
                                                        <option value="">Select Rating</option>
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <option key={star} value={star}>
                                                                {star} Star{star > 1 ? 's' : ''}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <label>Comment:</label>
                                                    <textarea
                                                        value={reviews[productId]?.comment || ''}
                                                        onChange={(e) =>
                                                            handleReviewChange(productId, 'comment', e.target.value)
                                                        }
                                                        placeholder="Write your review here"
                                                    />

                                                    <button
                                                        className="review-submit-btn"
                                                        onClick={() =>
                                                            submitReview(productId, {
                                                                rating: reviews[productId]?.rating,
                                                                comment: reviews[productId]?.comment,
                                                            })
                                                        }
                                                    >
                                                        Submit Review
                                                    </button>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;
