import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './DeleteProducts.css';

const DeleteProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch all products
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
    }, []);

    // Handle deleting a product
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/api/product/${id}`, {
                    withCredentials: true,
                });
                alert('Product deleted successfully!');
                setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
            } catch (err) {
                console.error('Error deleting product:', err);
                alert('Failed to delete product.');
            }
        }
    };

    return (
        <div className="delete-product-page">
            <h2 className="delete-product-heading">Delete Products</h2>
            <div className="breadcrumbs">
                <Link to="/admin">Admin Dashboard</Link> &gt; <span>Delete Product</span>
            </div>
            <br></br>
            <br></br>
            <div className="delete-product-list">
                {loading ? (
                    <p className="delete-product-message">Loading products...</p>
                ) : error ? (
                    <p className="delete-product-error">{error}</p>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="delete-product-item">
                            {/* Product Image */}
                            {product.images && product.images.length > 0 && (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="delete-product-image"
                                />
                            )}

                            {/* Product Name */}
                            <h3 className="delete-product-name">{product.name}</h3>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="delete-product-button"
                            >
                                <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                        </div>

                    ))
                )}
            </div>
        </div>
    );
};

export default DeleteProducts;
