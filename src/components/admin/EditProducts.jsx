import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit } from '@fortawesome/free-solid-svg-icons';
import './EditProduct.css';

const EditProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://wrighto-sustainables-backend.onrender.com/api/product');
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

    // Handle selecting a product for editing
    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`https://wrighto-sustainables-backend.onrender.com/api/product/${id}`);
            const product = response.data;
            if (!product.productDimensions) {
                product.productDimensions = { length: '', width: '', height: '' };
            }
            setSelectedProduct(product); // Set the product to edit
        } catch (err) {
            console.log('Error fetching product for edit:', err);
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setSelectedProduct({ ...selectedProduct, [name]: checked });
        } else if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setSelectedProduct(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else if (Array.isArray(selectedProduct[name])) {
            setSelectedProduct({ ...selectedProduct, [name]: value.split(',').map(item => item.trim()) });
        } else {
            setSelectedProduct({ ...selectedProduct, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`https://wrighto-sustainables-backend.onrender.com/api/product/${selectedProduct._id}`, selectedProduct, {
            withCredentials: true 
        })
            .then((res) => {
                alert('Product updated successfully!');
                setSelectedProduct(null);
            })
            .catch((err) => {
                console.log('Error updating product:', err);
            });
    };

    return (
        <div className="edit-product-page">
            <h2>Edit Product</h2>
            <div className="breadcrumbs">
                    <Link to="/admin">Admin Dashboard</Link> &gt; <span>Edit Product</span>
            </div>
            {/* Display list of all products */}
            <div className="product-list">
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="product-item">
                            <h3 className="product-name">{product.name}</h3>
                            <button onClick={() => handleEdit(product._id)} className="edit-page-button">
                                <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                            {/* Show edit form directly below the selected product */}
                            {selectedProduct && selectedProduct._id === product._id && (
                                <div className="edit-form-wrapper">
                                    <form onSubmit={handleSubmit} className="edit-product-form">
                                        <input type="text" name="name" value={selectedProduct.name} onChange={handleChange} placeholder="Name" required />
                                        <textarea name="description" value={selectedProduct.description} onChange={handleChange} placeholder="Description" />
                                        <input type="number" name="pricePerPiece" value={selectedProduct.pricePerPiece} onChange={handleChange} placeholder="Price Per Piece" required />
                                        <input type="text" name="capacity" value={selectedProduct.capacity} onChange={handleChange} placeholder="Capacity" />
                                        <input type="text" name="size" value={selectedProduct.size} onChange={handleChange} placeholder="Size" />
                                        <input type="text" name="plasticType" value={selectedProduct.plasticType} onChange={handleChange} placeholder="Plastic Type" />
                                        <input type="text" name="shape" value={selectedProduct.shape} onChange={handleChange} placeholder="Shape" />
                                        <input type="text" name="color" value={selectedProduct.color.join(', ')} onChange={handleChange} placeholder="Colors (comma separated)" />

                                        <label>
                                            <input type="checkbox" name="hasLid" checked={selectedProduct.hasLid} onChange={handleChange} />
                                            Has Lid
                                        </label>

                                        <input type="text" name="usage" value={selectedProduct.usage.join(', ')} onChange={handleChange} placeholder="Usage (comma separated)" />
                                        <input type="text" name="features" value={selectedProduct.features.join(', ')} onChange={handleChange} placeholder="Features (comma separated)" />
                                        <input type="text" name="packSize" value={selectedProduct.packSize} onChange={handleChange} placeholder="Pack Size" />
                                        <input type="number" name="minOrderQty" value={selectedProduct.minOrderQty} onChange={handleChange} placeholder="Min Order Qty" />
                                        <input type="number" name="quantityInStock" value={selectedProduct.quantityInStock} onChange={handleChange} placeholder="Stock Available" />

                                        {/* Nested dimensions */}
                                        <input type="number" name="productDimensions.length" value={selectedProduct.productDimensions.length} onChange={handleChange} placeholder="Length (cm)" />
                                        <input type="number" name="productDimensions.width" value={selectedProduct.productDimensions.width} onChange={handleChange} placeholder="Width (cm)" />
                                        <input type="number" name="productDimensions.height" value={selectedProduct.productDimensions.height} onChange={handleChange} placeholder="Height (cm)" />

                                        <input type="text" name="closureType" value={selectedProduct.closureType} onChange={handleChange} placeholder="Closure Type" />

                                        <label>
                                            <input type="checkbox" name="isDishwasherSafe" checked={selectedProduct.isDishwasherSafe} onChange={handleChange} />
                                            Dishwasher Safe
                                        </label>

                                        <input type="text" name="materialTypeFree" value={selectedProduct.materialTypeFree.join(', ')} onChange={handleChange} placeholder="Material Free (comma separated)" />
                                        <input type="number" name="itemWeight" value={selectedProduct.itemWeight} onChange={handleChange} placeholder="Item Weight (grams)" />
                                        <input type="text" name="itemVolume" value={selectedProduct.itemVolume} onChange={handleChange} placeholder="Item Volume" />
                                        <input type="text" name="productCareInstructions" value={selectedProduct.productCareInstructions.join(', ')} onChange={handleChange} placeholder="Care Instructions (comma separated)" />

                                        <label>
                                            <input type="checkbox" name="isMicrowaveable" checked={selectedProduct.isMicrowaveable} onChange={handleChange} />
                                            Microwaveable
                                        </label>

                                        <input type="text" name="itemForm" value={selectedProduct.itemForm} onChange={handleChange} placeholder="Item Form" />
                                        <input type="text" name="images" value={selectedProduct.images.join(', ')} onChange={handleChange} placeholder="Images (comma separated URLs)" />

                                        <button type="submit" className="save-button">
                                            <FontAwesomeIcon icon={faSave} /> Save Changes
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EditProducts;
