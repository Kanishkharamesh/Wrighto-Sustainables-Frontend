// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './ProductDetail.css';
// import { useAuth } from '../context/AuthProvider';
// import { useCart } from '../context/CartProvider';
// import { useNavigate } from 'react-router-dom';

// const ProductDetail = () => {
//     const { id } = useParams();
//     const { isLoggedIn } = useAuth();
//     const { addToCart, cartItems, removeFromCart } = useCart();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const isInCart = (productId) => {
//         return cartItems.some((item) => item._id === productId);
//     };

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/product/${id}`);
//                 setProduct(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error(err);
//                 setError("Failed to load product details.");
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [id]);


//     if (loading) return <p>Loading product details...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div className="product-detail-container">
//             <img src={product.images?.[0]} alt={product.name} className="detail-image" />

//             <div className="detail-info">
//                 <h2>{product.name}</h2>
//                 <div className="price-stock-container">
//                     <p className="price"><strong>₹{product.pricePerPiece?.toFixed(2)}</strong></p>
//                     <span
//                         className={`stock-status ${product.quantityInStock > 0 ? 'in-stock' : 'out-of-stock'}`}
//                     >
//                         {product.quantityInStock > 0 ? 'In Stock' : 'Out of Stock'}
//                     </span>
//                 </div>
//                 <div className="quick-highlights">
//                     <p><strong>Capacity:</strong> {product.capacity}</p>
//                     <p><strong>Pack Size:</strong> {product.packSize}</p>
//                     <p><strong>Features:</strong> {product.features?.join(', ')}</p>
//                     <p><strong>Usage:</strong> {product.usage?.join(', ')}</p>
//                 </div>
//                 <div className="action-buttons">
//                     {isLoggedIn ? (
//                         isInCart(product._id) ? (
//                             <button
//                                 className="add-to-cart"
//                                 onClick={() => removeFromCart(product._id)}
//                             >
//                                 Uncart
//                             </button>
//                         ) : (
//                             <button
//                                 className="add-to-cart"
//                                 onClick={() => addToCart(product)}
//                             >
//                                 🛒 Add to Cart
//                             </button>
//                         )
//                     ) : (
//                         <p>Please log in to add this item to your cart.</p>
//                     )}

//                     {isLoggedIn && (
//                         <button
//                             className="buy-now"
//                             onClick={() => {
//                                 addToCart(product);
//                                 navigate('/order', { state: { product } });
//                             }}
//                         >
//                             Buy Now
//                         </button>
//                     )}

//                 </div>
//                 <details className="more-info">
//                     <summary>More Details</summary>
//                     <p><strong>Description:</strong> {product.description}</p>
//                     <p><strong>Color:</strong> {product.color?.join(', ')}</p>
//                     <p><strong>Shape:</strong> {product.shape}</p>
//                     <p><strong>Plastic Type:</strong> {product.plasticType}</p>
//                     <p><strong>Has Lid:</strong> {product.hasLid ? 'Yes' : 'No'}</p>
//                     <p><strong>Microwaveable:</strong> {product.isMicrowaveable ? 'Yes' : 'No'}</p>
//                     <p><strong>Dishwasher Safe:</strong> {product.isDishwasherSafe ? 'Yes' : 'No'}</p>
//                     <p><strong>Closure Type:</strong> {product.closureType}</p>
//                     <p><strong>Material Type Free:</strong> {product.materialTypeFree?.join(', ')}</p>
//                     <p><strong>Item Form:</strong> {product.itemForm}</p>
//                     <p><strong>Quantity in Stock:</strong> {product.quantityInStock}</p>
//                     <p><strong>Item Weight:</strong> {product.itemWeight}g</p>
//                     <p><strong>Item Volume:</strong> {product.itemVolume}</p>
//                     <p><strong>Product Dimensions (cm):</strong> {product.productDimensions &&
//                         `${product.productDimensions.length} x ${product.productDimensions.width} x ${product.productDimensions.height}`}</p>
//                     <p><strong>Product Care Instructions:</strong> {product.productCareInstructions?.join(', ')}</p>
//                 </details>
//             </div>
//         </div>
//     );
// };

// export default ProductDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import { useAuth } from '../context/AuthProvider';
import { useCart } from '../context/CartProvider';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const { isLoggedIn } = useAuth();
    const { addToCart, cartItems, removeFromCart } = useCart();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]); // State for reviews
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const isInCart = (productId) => {
        return cartItems.some((item) => item._id === productId);
    };

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load product details.");
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/reviews/${id}`);
                setReviews(res.data);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            }
        };

        fetchReviews();
    }, [id]);

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="product-detail-container">
            <img src={product.images?.[0]} alt={product.name} className="detail-image" />

            <div className="detail-info">
                <h2>{product.name}</h2>
                <div className="price-stock-container">
                    <p className="price"><strong>₹{product.pricePerPiece?.toFixed(2)}</strong></p>
                    <span
                        className={`stock-status ${product.quantityInStock > 0 ? 'in-stock' : 'out-of-stock'}`}
                    >
                        {product.quantityInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
                <div className="quick-highlights">
                    <p><strong>Capacity:</strong> {product.capacity}</p>
                    <p><strong>Pack Size:</strong> {product.packSize}</p>
                    <p><strong>Features:</strong> {product.features?.join(', ')}</p>
                    <p><strong>Usage:</strong> {product.usage?.join(', ')}</p>
                </div>
                <div className="action-buttons">
                    {isLoggedIn ? (
                        isInCart(product._id) ? (
                            <button
                                className="add-to-cart"
                                onClick={() => removeFromCart(product._id)}
                            >
                                Uncart
                            </button>
                        ) : (
                            <button
                                className="add-to-cart"
                                onClick={() => addToCart(product)}
                            >
                                🛒 Add to Cart
                            </button>
                        )
                    ) : (
                        <p>Please log in to add this item to your cart.</p>
                    )}

                    {isLoggedIn && (
                        <button
                            className="buy-now"
                            onClick={() => {
                                addToCart(product);
                                navigate('/order', { state: { product } });
                            }}
                        >
                            Buy Now
                        </button>
                    )}

                </div>
                <details className="more-info">
                    <summary>More Details</summary>
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Color:</strong> {product.color?.join(', ')}</p>
                    <p><strong>Shape:</strong> {product.shape}</p>
                    <p><strong>Plastic Type:</strong> {product.plasticType}</p>
                    <p><strong>Has Lid:</strong> {product.hasLid ? 'Yes' : 'No'}</p>
                    <p><strong>Microwaveable:</strong> {product.isMicrowaveable ? 'Yes' : 'No'}</p>
                    <p><strong>Dishwasher Safe:</strong> {product.isDishwasherSafe ? 'Yes' : 'No'}</p>
                    <p><strong>Closure Type:</strong> {product.closureType}</p>
                    <p><strong>Material Type Free:</strong> {product.materialTypeFree?.join(', ')}</p>
                    <p><strong>Item Form:</strong> {product.itemForm}</p>
                    <p><strong>Quantity in Stock:</strong> {product.quantityInStock}</p>
                    <p><strong>Item Weight:</strong> {product.itemWeight}g</p>
                    <p><strong>Item Volume:</strong> {product.itemVolume}</p>
                    <p><strong>Product Dimensions (cm):</strong> {product.productDimensions &&
                        `${product.productDimensions.length} x ${product.productDimensions.width} x ${product.productDimensions.height}`}</p>
                    <p><strong>Product Care Instructions:</strong> {product.productCareInstructions?.join(', ')}</p>
                </details>

                {/* Displaying Reviews */}
                <div className="reviews-section">
                    <h3>Customer Reviews</h3>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review._id} className="review-card">
                                <div className="rating">
                                    <span>Rating:</span>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                    <i className="far fa-star"></i>
                                </div>
                                <p><strong>{review.user.name}</strong></p>
                                <p>Rating: {review.rating}</p>
                                <p>{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
