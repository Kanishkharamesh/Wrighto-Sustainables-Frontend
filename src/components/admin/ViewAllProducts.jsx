// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import './ViewAllProducts.css';


// const ViewAllProducts = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [selectedProductId, setSelectedProductId] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const res = await axios.get('http://localhost:5000/api/product'); // Updated backend route
//                 setProducts(res.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch products. Please try again later.');
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const handleViewDetails = (productId) => {
//         if (selectedProductId === productId) {
//             setSelectedProductId(null);
//         } else {
//             setSelectedProductId(productId);
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div className="admin-products-container">
//             <h2>All Products</h2>
//             <div className="breadcrumbs">
//                 <Link to="/admin">Admin Dashboard</Link> &gt; <span>All Product</span>
//             </div>

//             <div className="admin-products-list">
//                 {products.length > 0 ? (
//                     products.map((product) => (
//                         <div key={product._id} className="admin-product-card">
//                             <div className="admin-product-summary">
//                                 <h3>{product.name}</h3>
//                                 <button
//                                     className="admin-view-details-btn"
//                                     onClick={() => handleViewDetails(product._id)}
//                                 >
//                                     {selectedProductId === product._id ? 'Hide Details' : 'View'}
//                                 </button>
//                             </div>

//                             {selectedProductId === product._id && (
//                                 <div className="admin-product-details">
//                                     {product.images && product.images.length > 0 && (
//                                         <img
//                                             src={product.images[0]}
//                                             alt={product.name}
//                                             className="admin-product-image"
//                                         />
//                                     )}
//                                     <p><strong>Description:</strong> {product.description || 'N/A'}</p>
//                                     <p className="admin-product-price"><strong>Price:</strong> ₹{product.pricePerPiece}</p>
//                                     <p><strong>Capacity:</strong> {product.capacity || 'N/A'}</p>
//                                     <p><strong>Size:</strong> {product.size || 'N/A'}</p>
//                                     <p><strong>Plastic Type:</strong> {product.plasticType || 'N/A'}</p>
//                                     <p><strong>Shape:</strong> {product.shape || 'N/A'}</p>
//                                     <p><strong>Colors:</strong> {product.color?.length ? product.color.join(', ') : 'N/A'}</p>
//                                     <p><strong>Usage:</strong> {product.usage?.length ? product.usage.join(', ') : 'N/A'}</p>
//                                     <p><strong>Features:</strong> {product.features?.length ? product.features.join(', ') : 'N/A'}</p>
//                                     <p><strong>Has Lid:</strong> {product.hasLid ? 'Yes' : 'No'}</p>
//                                     <p><strong>Dimensions:</strong> {product.productDimensions?.length || product.productDimensions?.width || product.productDimensions?.height ? `${product.productDimensions.length || 0} x ${product.productDimensions.width || 0} x ${product.productDimensions.height || 0} cm` : 'N/A'}</p>
//                                     <p><strong>Closure Type:</strong> {product.closureType || 'N/A'}</p>
//                                     <p><strong>Dishwasher Safe:</strong> {product.isDishwasherSafe ? 'Yes' : 'No'}</p>
//                                     <p><strong>Material Type Free:</strong> {product.materialTypeFree?.length ? product.materialTypeFree.join(', ') : 'N/A'}</p>
//                                     <p><strong>Weight:</strong> {product.itemWeight != null ? `${product.itemWeight} grams` : 'N/A'}</p>
//                                     <p><strong>Volume:</strong> {product.itemVolume || 'N/A'}</p>
//                                     <p><strong>Care Instructions:</strong> {product.productCareInstructions?.length ? product.productCareInstructions.join(', ') : 'N/A'}</p>
//                                     <p><strong>Microwaveable:</strong> {product.isMicrowaveable ? 'Yes' : 'No'}</p>
//                                     <p><strong>Form:</strong> {product.itemForm || 'N/A'}</p>
//                                     <p><strong>Pack Size:</strong> {product.packSize || 'N/A'}</p>
//                                     <p><strong>Minimum Order Quantity:</strong> {product.minOrderQty != null ? product.minOrderQty : 'N/A'}</p>
//                                     <p><strong>Quantity In Stock:</strong> {product.quantityInStock != null ? product.quantityInStock : 'N/A'}</p>
//                                 </div>
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <p>No products available at the moment.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ViewAllProducts;

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ViewAllProducts.css';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const ViewAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('https://wrighto-sustainables-backend.onrender.com/api/product');
                setProducts(res.data);
                setFilteredProducts(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products. Please try again later.');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = [...products];
        if (search.trim()) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.slug?.toLowerCase().includes(search.toLowerCase()) ||
                p.plasticType?.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (sortKey === 'price') {
            filtered.sort((a, b) => a.pricePerPiece - b.pricePerPiece);
        } else if (sortKey === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortKey === 'stock') {
            filtered.sort((a, b) => (b.quantityInStock || 0) - (a.quantityInStock || 0));
        }
        setFilteredProducts(filtered);
    }, [search, sortKey, products]);

    const handleViewDetails = (productId) => {
        setSelectedProductId(prev => (prev === productId ? null : productId));
    };

    const exportToJSON = () => {
        const blob = new Blob([JSON.stringify(filteredProducts, null, 2)], {
            type: 'application/json',
        });
        saveAs(blob, 'products.json');
    };

    const exportToCSV = () => {
        const csvData = filteredProducts.map(product => ({
            ProductName: product.name,
            Status: product.quantityInStock === 0
                ? 'Out of Stock'
                : product.quantityInStock < 10
                    ? 'Low Stock'
                    : 'In Stock',
            ProductID: product._id,
            // Add other fields here if needed
        }));

        const csvContent = [
            ['Product Name', 'Status', 'Product ID'], // header row
            ...csvData.map(item => [item.ProductName, item.Status, item.ProductID]),
        ]
            .map(row => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'products.csv');
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredProducts);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Products');
        XLSX.writeFile(wb, 'products.xlsx');
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (loading) {
        return (
            <div className="skeleton-loader">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton-card" />
                ))}
            </div>
        );
    }
    if (error) return <div>{error}</div>;

    return (
        <div className="admin-products-container">
            <h2>All Products</h2>
            <div className="breadcrumbs">
                <Link to="/admin">Admin Dashboard</Link> &gt; <span>All Product</span>
            </div>

            <div className="admin-controls">
                <input
                    type="text"
                    placeholder="Search by name, slug, type..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
                    <option value="">Sort By</option>
                    <option value="price">Price</option>
                    <option value="name">Name</option>
                    <option value="stock">Stock</option>
                </select>
                <button
                    className="admin-export-buttons"
                    onClick={exportToJSON}
                    title="JSON Export: Export the filtered product data in JSON format for backup, analysis, or external processing."
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                    }}
                >
                    Export JSON
                    <div
                        style={{
                            visibility: 'hidden',
                            position: 'absolute',
                            backgroundColor: '#333',
                            color: '#fff',
                            textAlign: 'center',
                            borderRadius: '4px',
                            padding: '8px',
                            fontSize: '12px',
                            width: '220px',
                            zIndex: 1,
                            bottom: '125%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                        }}
                        className="tooltip"
                    >
                        Export the filtered product data in JSON format for backup, analysis, or external processing.
                    </div>
                </button>

                <button
                    className="admin-export-buttons"
                    onClick={exportToCSV}
                    title="CSV Export: This function creates a CSV format from the filtered products, including a header row and the necessary product data."
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                    }}
                >
                    Export CSV
                    <div
                        style={{
                            visibility: 'hidden',
                            position: 'absolute',
                            backgroundColor: '#333',
                            color: '#fff',
                            textAlign: 'center',
                            borderRadius: '4px',
                            padding: '8px',
                            fontSize: '12px',
                            width: '220px',
                            zIndex: 1,
                            bottom: '125%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                        }}
                        className="tooltip"
                    >
                        CSV Export: This function creates a CSV format from the filtered products, including a header row and the necessary product data.
                    </div>
                </button>

                <button
                    className="admin-export-buttons"
                    onClick={exportToExcel}
                    title="Excel Export: Using the xlsx library, this function converts the filtered products into an Excel sheet and allows it to be downloaded as an .xlsx file."
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                    }}
                >
                    Export Excel
                    <div
                        style={{
                            visibility: 'hidden',
                            position: 'absolute',
                            backgroundColor: '#333',
                            color: '#fff',
                            textAlign: 'center',
                            borderRadius: '4px',
                            padding: '8px',
                            fontSize: '12px',
                            width: '220px',
                            zIndex: 1,
                            bottom: '125%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                        }}
                        className="tooltip"
                    >
                        Excel Export: Using the xlsx library, this function converts the filtered products into an Excel sheet and allows it to be downloaded as an .xlsx file.
                    </div>
                </button>

            </div>

            <div className="admin-products-list">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div key={product._id} className="admin-product-card">
                            <div className="admin-product-summary-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Status</th>
                                            <th>Product ID</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{product.name}</td>
                                            <td className="product-status">
                                                {product.quantityInStock === 0
                                                    ? '🔴 Out of Stock'
                                                    : product.quantityInStock < 10
                                                        ? '🟠 Low Stock'
                                                        : '🟢 In Stock'}
                                            </td>
                                            <td>{product._id}</td>
                                            <td>
                                                <button
                                                    className="admin-view-details-btn"
                                                    onClick={() => handleViewDetails(product._id)}
                                                >
                                                    {selectedProductId === product._id
                                                        ? 'Hide Details'
                                                        : 'View'}
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {selectedProductId === product._id && (
                                <div className="admin-product-details">
                                    {product.images?.length > 0 && (
                                        <img src={product.images[0]} alt={product.name} className="admin-product-image" />
                                    )}
                                    <table className="product-table">
                                        <tbody>
                                            <tr>
                                                <td><strong>Description:</strong></td>
                                                <td>{product.description || 'N/A'}</td>
                                                <td><strong>Price:</strong></td>
                                                <td>₹{product.pricePerPiece}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Capacity:</strong></td>
                                                <td>{product.capacity || 'N/A'}</td>
                                                <td><strong>Size:</strong></td>
                                                <td>{product.size || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Plastic Type:</strong></td>
                                                <td>{product.plasticType || 'N/A'}</td>
                                                <td><strong>Shape:</strong></td>
                                                <td>{product.shape || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Colors:</strong></td>
                                                <td>{product.color?.length ? product.color.join(', ') : 'N/A'}</td>
                                                <td><strong>Usage:</strong></td>
                                                <td>{product.usage?.length ? product.usage.join(', ') : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Features:</strong></td>
                                                <td>{product.features?.length ? product.features.join(', ') : 'N/A'}</td>
                                                <td><strong>Has Lid:</strong></td>
                                                <td>{product.hasLid ? 'Yes' : 'No'}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Dimensions:</strong></td>
                                                <td>{product.productDimensions?.length || product.productDimensions?.width || product.productDimensions?.height ? `${product.productDimensions.length || 0} x ${product.productDimensions.width || 0} x ${product.productDimensions.height || 0} cm` : 'N/A'}</td>
                                                <td><strong>Closure Type:</strong></td>
                                                <td>{product.closureType || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Dishwasher Safe:</strong></td>
                                                <td>{product.isDishwasherSafe ? 'Yes' : 'No'}</td>
                                                <td><strong>Material Type Free:</strong></td>
                                                <td>{product.materialTypeFree?.length ? product.materialTypeFree.join(', ') : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Weight:</strong></td>
                                                <td>{product.itemWeight != null ? `${product.itemWeight} grams` : 'N/A'}</td>
                                                <td><strong>Volume:</strong></td>
                                                <td>{product.itemVolume || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Care Instructions:</strong></td>
                                                <td>{product.productCareInstructions?.length ? product.productCareInstructions.join(', ') : 'N/A'}</td>
                                                <td><strong>Microwaveable:</strong></td>
                                                <td>{product.isMicrowaveable ? 'Yes' : 'No'}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Form:</strong></td>
                                                <td>{product.itemForm || 'N/A'}</td>
                                                <td><strong>Pack Size:</strong></td>
                                                <td>{product.packSize || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Minimum Order Quantity:</strong></td>
                                                <td>{product.minOrderQty != null ? product.minOrderQty : 'N/A'}</td>
                                                <td><strong>Quantity In Stock:</strong></td>
                                                <td>{product.quantityInStock != null ? product.quantityInStock : 'N/A'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No products available at the moment.</p>
                )}
            </div>

            <div className="pagination">
                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx}
                        className={currentPage === idx + 1 ? 'active' : ''}
                        onClick={() => setCurrentPage(idx + 1)}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};
export default ViewAllProducts;