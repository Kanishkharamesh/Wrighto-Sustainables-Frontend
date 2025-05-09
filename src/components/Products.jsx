import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Products.css';
import Header from '../components/Header.jsx';
import UserHeader from '../components/UserHeader';
import { useAuth } from '../context/AuthProvider';
import { useCart } from "../context/CartProvider"; // <-- Import it

const Products = () => {
    const { isLoggedIn, loading } = useAuth(); // Now using the loading state
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('English');
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart, cartItems, removeFromCart } = useCart(); // <-- use the hook
    const navigate = useNavigate();

    const toggleDarkMode = () => setDarkMode(!darkMode);

    // Check if the product is in the cart
    const isInCart = (productId) => {
        return cartItems.some((item) => item._id === productId);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/product');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError('Failed to load products.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, [cartItems]); // Re-fetch products if cartItems change

    if (loading) {
        return <p>Loading...</p>; // Show loading state if auth is still being checked
    }

    return (
        <div className={`products-page ${darkMode ? 'dark-mode' : ''}`}>
            {isLoggedIn ? (
                <UserHeader
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    language={language}
                    setLanguage={setLanguage}
                />
            ) : (
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    language={language}
                    setLanguage={setLanguage}
                />
            )}
            <h1 className="products-heading">Our Products</h1>

            {loadingProducts ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="product-grid">
                    {products.map((product, index) => (
                        <div className="product-card" key={index} onClick={() => navigate(`/product/${product._id}`)} style={{ cursor: 'pointer' }}>
                            <img
                                src={product.images && product.images[0]}
                                alt={product.name}
                                className="product-img"
                            />
                            <h4>{product.name}</h4>
                            {/* <p>₹{product.pricePerPiece?.toFixed(2)}</p> */}

                            <div className="price-stock-container">
                                <p className="price">₹{product.pricePerPiece?.toFixed(2)}</p>
                                <span className={`stock-status ${product.quantityInStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                    {product.quantityInStock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                                </span>
                            </div>
                            {/* Show the cart-related buttons only when the user is logged in */}
                            {isLoggedIn ? (
                                <>
                                    {product.quantityInStock > 0 ? (
                                        isInCart(product._id) ? (
                                            <button
                                                className="product-btn remove-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFromCart(product._id);
                                                }}
                                            >
                                                Uncart
                                            </button>
                                        ) : (
                                            <button
                                                className="product-btn add-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(product);
                                                }}
                                            >
                                                Add to Cart
                                            </button>
                                        )
                                    ) : (
                                        <button className="product-btn out-of-stock-btn" disabled>
                                            Out of Stock
                                        </button>
                                    )}
                                </>
                            ) : (
                                <button
                                    className="product-btn login-redirect-btn"
                                    onClick={(e) => {
                                        e.stopPropagation(); // <-- Prevent card click
                                        navigate('/login');
                                    }}
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
};

export default Products;
