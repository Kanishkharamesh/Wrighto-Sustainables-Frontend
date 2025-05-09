import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ViewAllProducts.css';


const ViewAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/product'); // Updated backend route
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products. Please try again later.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleViewDetails = (productId) => {
        if (selectedProductId === productId) {
            setSelectedProductId(null);
        } else {
            setSelectedProductId(productId);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="admin-products-container">
            <h2>All Products</h2>
            <div className="breadcrumbs">
                <Link to="/admin">Admin Dashboard</Link> &gt; <span>All Product</span>
            </div>

            <div className="admin-products-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="admin-product-card">
                            <div className="admin-product-summary">
                                <h3>{product.name}</h3>
                                <button
                                    className="admin-view-details-btn"
                                    onClick={() => handleViewDetails(product._id)}
                                >
                                    {selectedProductId === product._id ? 'Hide Details' : 'View'}
                                </button>
                            </div>

                            {selectedProductId === product._id && (
                                <div className="admin-product-details">
                                    {product.images && product.images.length > 0 && (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="admin-product-image"
                                        />
                                    )}
                                    <p><strong>Description:</strong> {product.description || 'N/A'}</p>
                                    <p className="admin-product-price"><strong>Price:</strong> ₹{product.pricePerPiece}</p>
                                    <p><strong>Capacity:</strong> {product.capacity || 'N/A'}</p>
                                    <p><strong>Size:</strong> {product.size || 'N/A'}</p>
                                    <p><strong>Plastic Type:</strong> {product.plasticType || 'N/A'}</p>
                                    <p><strong>Shape:</strong> {product.shape || 'N/A'}</p>
                                    <p><strong>Colors:</strong> {product.color?.length ? product.color.join(', ') : 'N/A'}</p>
                                    <p><strong>Usage:</strong> {product.usage?.length ? product.usage.join(', ') : 'N/A'}</p>
                                    <p><strong>Features:</strong> {product.features?.length ? product.features.join(', ') : 'N/A'}</p>
                                    <p><strong>Has Lid:</strong> {product.hasLid ? 'Yes' : 'No'}</p>
                                    <p><strong>Dimensions:</strong> {product.productDimensions?.length || product.productDimensions?.width || product.productDimensions?.height ? `${product.productDimensions.length || 0} x ${product.productDimensions.width || 0} x ${product.productDimensions.height || 0} cm` : 'N/A'}</p>
                                    <p><strong>Closure Type:</strong> {product.closureType || 'N/A'}</p>
                                    <p><strong>Dishwasher Safe:</strong> {product.isDishwasherSafe ? 'Yes' : 'No'}</p>
                                    <p><strong>Material Type Free:</strong> {product.materialTypeFree?.length ? product.materialTypeFree.join(', ') : 'N/A'}</p>
                                    <p><strong>Weight:</strong> {product.itemWeight != null ? `${product.itemWeight} grams` : 'N/A'}</p>
                                    <p><strong>Volume:</strong> {product.itemVolume || 'N/A'}</p>
                                    <p><strong>Care Instructions:</strong> {product.productCareInstructions?.length ? product.productCareInstructions.join(', ') : 'N/A'}</p>
                                    <p><strong>Microwaveable:</strong> {product.isMicrowaveable ? 'Yes' : 'No'}</p>
                                    <p><strong>Form:</strong> {product.itemForm || 'N/A'}</p>
                                    <p><strong>Pack Size:</strong> {product.packSize || 'N/A'}</p>
                                    <p><strong>Minimum Order Quantity:</strong> {product.minOrderQty != null ? product.minOrderQty : 'N/A'}</p>
                                    <p><strong>Quantity In Stock:</strong> {product.quantityInStock != null ? product.quantityInStock : 'N/A'}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No products available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default ViewAllProducts;
