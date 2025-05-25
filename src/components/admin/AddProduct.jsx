// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import './AddProduct.css'; // optional CSS styling if you want

// const AddProduct = () => {
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState({
//     name: '',
//     description: '',
//     pricePerPiece: '',
//     capacity: '',
//     size: '',
//     plasticType: '',
//     shape: '',
//     color: '',
//     hasLid: false,
//     usage: '',
//     features: '',
//     packSize: '',
//     minOrderQty: '',
//     productDimensions: { length: '', width: '', height: '' },
//     closureType: '',
//     isDishwasherSafe: false,
//     materialTypeFree: '',
//     itemWeight: '',
//     itemVolume: '',
//     productCareInstructions: '',
//     isMicrowaveable: false,
//     itemForm: '',
//     images: '',
//     quantityInStock: '',
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name.includes('productDimensions.')) {
//       const dimensionField = name.split('.')[1];
//       setProductData((prev) => ({
//         ...prev,
//         productDimensions: {
//           ...prev.productDimensions,
//           [dimensionField]: value,
//         },
//       }));
//     } else if (type === 'checkbox') {
//       setProductData((prev) => ({ ...prev, [name]: checked }));
//     } else {
//       setProductData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const sendData = {
//         ...productData,
//         color: productData.color.split(',').map((item) => item.trim()),
//         usage: productData.usage.split(',').map((item) => item.trim()),
//         features: productData.features.split(',').map((item) => item.trim()),
//         materialTypeFree: productData.materialTypeFree.split(',').map((item) => item.trim()),
//         productCareInstructions: productData.productCareInstructions.split(',').map((item) => item.trim()),
//         images: productData.images.split(',').map((item) => item.trim()),
//       };

//       await axios.post('https://wrighto-sustainables-backend.onrender.com/api/product/', sendData, {
//         withCredentials: true,
//       });

//       alert('Product added successfully!');
//       navigate('/admin/dashboard'); // redirect after success
//     } catch (error) {
//       console.error('Failed to add product:', error);
//       alert('Failed to add product. Please try again.');
//     }
//   };

//   return (
//     <div className="add-product-page">
//       <h2>Add a product</h2>
//       <div className="breadcrumbs">
//         <Link to="/admin">Admin Dashboard</Link> &gt; <span>Add a Product</span>
//       </div>
//       <br></br>
//       <br></br>
//       <form onSubmit={handleSubmit} className="add-product-form">
//         <input type="text" name="name" placeholder="Name" value={productData.name} onChange={handleChange} required />
//         <textarea name="description" placeholder="Description" value={productData.description} onChange={handleChange} />
//         <input type="number" name="pricePerPiece" placeholder="Price Per Piece" value={productData.pricePerPiece} onChange={handleChange} required />
//         <input type="text" name="capacity" placeholder="Capacity" value={productData.capacity} onChange={handleChange} />
//         <input type="text" name="size" placeholder="Size" value={productData.size} onChange={handleChange} />
//         <input type="text" name="plasticType" placeholder="Plastic Type" value={productData.plasticType} onChange={handleChange} />
//         <input type="text" name="shape" placeholder="Shape" value={productData.shape} onChange={handleChange} />
//         <input type="text" name="color" placeholder="Colors (comma separated)" value={productData.color} onChange={handleChange} />
//         <input type="text" name="usage" placeholder="Usage (comma separated)" value={productData.usage} onChange={handleChange} />
//         <input type="text" name="features" placeholder="Features (comma separated)" value={productData.features} onChange={handleChange} />
//         <input type="text" name="packSize" placeholder="Pack Size" value={productData.packSize} onChange={handleChange} />
//         <input type="number" name="minOrderQty" placeholder="Minimum Order Quantity" value={productData.minOrderQty} onChange={handleChange} />
//         <input type="number" name="quantityInStock" placeholder="Stock available" value={productData.quantityInStock} onChange={handleChange} required />

//         <div className="dimensions">
//           <input type="number" name="productDimensions.length" placeholder="Length (cm)" value={productData.productDimensions.length} onChange={handleChange} />
//           <input type="number" name="productDimensions.width" placeholder="Width (cm)" value={productData.productDimensions.width} onChange={handleChange} />
//           <input type="number" name="productDimensions.height" placeholder="Height (cm)" value={productData.productDimensions.height} onChange={handleChange} />
//         </div>

//         <input type="text" name="closureType" placeholder="Closure Type" value={productData.closureType} onChange={handleChange} />
//         <input type="text" name="materialTypeFree" placeholder="Material Type Free (comma separated)" value={productData.materialTypeFree} onChange={handleChange} />
//         <input type="number" name="itemWeight" placeholder="Item Weight (g)" value={productData.itemWeight} onChange={handleChange} />
//         <input type="text" name="itemVolume" placeholder="Item Volume (ml/kg)" value={productData.itemVolume} onChange={handleChange} />
//         <input type="text" name="productCareInstructions" placeholder="Care Instructions (comma separated)" value={productData.productCareInstructions} onChange={handleChange} />
//         <input type="text" name="itemForm" placeholder="Item Form (Box/Cup)" value={productData.itemForm} onChange={handleChange} />
//         {/* <input type="text" name="images" placeholder="Image URLs (comma separated)" value={productData.images} onChange={handleChange} /> */}
//         <div style={{ width: '100%' }}>
//           <input
//             type="text"
//             name="images"
//             placeholder="Image URLs (comma separated)"
//             value={productData.images}
//             onChange={handleChange}
//             style={{ width: '100%' }}
//           />
//         </div>
//         <br></br>
//         <div className="toggle-switches">
//           <div className="toggle-switch-group">
//             <span className="switch-label">Has Lid Closure</span>
//             <label className="switch">
//               <input type="checkbox" name="hasLid" checked={productData.hasLid} onChange={handleChange} />
//               <span className="slider round"></span>
//             </label>
//           </div>

//           <div className="toggle-switch-group">
//             <span className="switch-label">Dishwasher Safe</span>
//             <label className="switch">
//               <input type="checkbox" name="isDishwasherSafe" checked={productData.isDishwasherSafe} onChange={handleChange} />
//               <span className="slider round"></span>
//             </label>
//           </div>

//           <div className="toggle-switch-group">
//             <span className="switch-label">Microwaveable</span>
//             <label className="switch">
//               <input type="checkbox" name="isMicrowaveable" checked={productData.isMicrowaveable} onChange={handleChange} />
//               <span className="slider round"></span>
//             </label>
//           </div>
//         </div>
//         <button type="submit" className="submit-btn">Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    pricePerPiece: '',
    capacity: '',
    size: '',
    plasticType: '',
    shape: '',
    color: '',
    hasLid: false,
    usage: '',
    features: '',
    packSize: '',
    minOrderQty: '',
    productDimensions: { length: '', width: '', height: '' },
    closureType: '',
    isDishwasherSafe: false,
    materialTypeFree: '',
    itemWeight: '',
    itemVolume: '',
    productCareInstructions: '',
    isMicrowaveable: false,
    itemForm: '',
    images: '',
    quantityInStock: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('productDimensions.')) {
      const dimensionField = name.split('.')[1];
      setProductData((prev) => ({
        ...prev,
        productDimensions: {
          ...prev.productDimensions,
          [dimensionField]: value,
        },
      }));
    } else if (type === 'checkbox') {
      setProductData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isNegative = (val) => val !== '' && parseFloat(val) < 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Front-end validation
    const requiredFields = ['name', 'pricePerPiece', 'minOrderQty', 'quantityInStock'];
    for (let field of requiredFields) {
      if (!productData[field]) {
        alert(`Please fill out the "${field}" field.`);
        return;
      }
    }

    // Check for negative values
    const numericFields = [
      'pricePerPiece',
      'minOrderQty',
      'quantityInStock',
      'productDimensions.length',
      'productDimensions.width',
      'productDimensions.height',
      'itemWeight',
    ];
    for (let field of numericFields) {
      const val =
        field.includes('.') ? productData.productDimensions[field.split('.')[1]] : productData[field];
      if (isNegative(val)) {
        alert(`Field "${field}" cannot have negative values.`);
        return;
      }
    }

    try {
      const sendData = {
        ...productData,
        color: productData.color.split(',').map((item) => item.trim()),
        usage: productData.usage.split(',').map((item) => item.trim()),
        features: productData.features.split(',').map((item) => item.trim()),
        materialTypeFree: productData.materialTypeFree.split(',').map((item) => item.trim()),
        productCareInstructions: productData.productCareInstructions.split(',').map((item) => item.trim()),
        images: productData.images.split(',').map((item) => item.trim()),
      };

      await axios.post(
        'https://wrighto-sustainables-backend.onrender.com/api/product/',
        sendData,
        { withCredentials: true }
      );

      alert('Product added successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add a product</h2>
      <div className="breadcrumbs">
        <Link to="/admin">Admin Dashboard</Link> &gt; <span>Add a Product</span>
      </div>
      <br />
      <form onSubmit={handleSubmit} className="add-product-form">
        <input type="text" name="name" placeholder="Name" value={productData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={productData.description} onChange={handleChange} />
        <input type="number" name="pricePerPiece" placeholder="Price Per Piece" value={productData.pricePerPiece} onChange={handleChange} required min="0" />
        <input type="text" name="capacity" placeholder="Capacity" value={productData.capacity} onChange={handleChange} />
        <input type="text" name="size" placeholder="Size" value={productData.size} onChange={handleChange} />
        <input type="text" name="plasticType" placeholder="Plastic Type" value={productData.plasticType} onChange={handleChange} />
        <input type="text" name="shape" placeholder="Shape" value={productData.shape} onChange={handleChange} />
        <input type="text" name="color" placeholder="Colors (comma separated)" value={productData.color} onChange={handleChange} />
        <input type="text" name="usage" placeholder="Usage (comma separated)" value={productData.usage} onChange={handleChange} />
        <input type="text" name="features" placeholder="Features (comma separated)" value={productData.features} onChange={handleChange} />
        <input type="text" name="packSize" placeholder="Pack Size" value={productData.packSize} onChange={handleChange} />
        <input type="number" name="minOrderQty" placeholder="Minimum Order Quantity" value={productData.minOrderQty} onChange={handleChange} required min="0" />
        <input type="number" name="quantityInStock" placeholder="Stock available" value={productData.quantityInStock} onChange={handleChange} required min="0" />
        <div className="dimensions">
          <input type="number" name="productDimensions.length" placeholder="Length (cm)" value={productData.productDimensions.length} onChange={handleChange} min="0" />
          <input type="number" name="productDimensions.width" placeholder="Width (cm)" value={productData.productDimensions.width} onChange={handleChange} min="0" />
          <input type="number" name="productDimensions.height" placeholder="Height (cm)" value={productData.productDimensions.height} onChange={handleChange} min="0" />
        </div>
        <input type="text" name="closureType" placeholder="Closure Type" value={productData.closureType} onChange={handleChange} />
        <input type="text" name="materialTypeFree" placeholder="Material Type Free (comma separated)" value={productData.materialTypeFree} onChange={handleChange} />
        <input type="number" name="itemWeight" placeholder="Item Weight (g)" value={productData.itemWeight} onChange={handleChange} min="0" />
        <input type="text" name="itemVolume" placeholder="Item Volume (ml/kg)" value={productData.itemVolume} onChange={handleChange} />
        <input type="text" name="productCareInstructions" placeholder="Care Instructions (comma separated)" value={productData.productCareInstructions} onChange={handleChange} />
        <input type="text" name="itemForm" placeholder="Item Form (Box/Cup)" value={productData.itemForm} onChange={handleChange} />
        <div style={{ width: '100%' }}>
          <input type="text" name="images" placeholder="Image URLs (comma separated)" value={productData.images} onChange={handleChange} style={{ width: '100%' }} />
        </div>
        <br />
        <div className="toggle-switches">
          <div className="toggle-switch-group">
            <span className="switch-label">Has Lid Closure</span>
            <label className="switch">
              <input type="checkbox" name="hasLid" checked={productData.hasLid} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="toggle-switch-group">
            <span className="switch-label">Dishwasher Safe</span>
            <label className="switch">
              <input type="checkbox" name="isDishwasherSafe" checked={productData.isDishwasherSafe} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="toggle-switch-group">
            <span className="switch-label">Microwaveable</span>
            <label className="switch">
              <input type="checkbox" name="isMicrowaveable" checked={productData.isMicrowaveable} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
