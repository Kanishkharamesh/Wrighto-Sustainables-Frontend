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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: '',
    slug: '',
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
    productDimensions: {
      length: '',
      width: '',
      height: '',
    },
    closureType: '',
    isDishwasherSafe: false,
    materialTypeFree: '',
    itemWeight: '',
    itemVolume: '',
    productCareInstructions: '',
    isMicrowaveable: false,
    itemForm: '',
    images: '',
  });

  const [errors, setErrors] = useState({});
  const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('productDimensions')) {
      const dimensionKey = name.split('.')[1];
      setProductData((prev) => ({
        ...prev,
        productDimensions: {
          ...prev.productDimensions,
          [dimensionKey]: value,
        },
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    // Real-time validation
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let fieldErrors = { ...errors };

    // Required fields
    const requiredFields = ['name', 'pricePerPiece', 'minOrderQty', 'quantityInStock'];
    if (requiredFields.includes(name) && !value.trim()) {
      fieldErrors[name] = 'This field is required.';
    } else {
      delete fieldErrors[name];
    }

    // Numeric fields
    const numericFields = ['pricePerPiece', 'minOrderQty', 'quantityInStock', 'itemWeight'];
    if (numericFields.includes(name)) {
      if (value && (isNaN(value) || parseFloat(value) < 0)) {
        fieldErrors[name] = 'Enter a valid positive number.';
      } else {
        delete fieldErrors[name];
      }
    }

    // Dimensions
    if (name.includes('productDimensions')) {
      if (value && (isNaN(value) || parseFloat(value) < 0)) {
        fieldErrors[name] = 'Must be a valid positive number.';
      } else {
        delete fieldErrors[name];
      }
    }

    // Image URLs
    if (name === 'images') {
      const urls = value.split(',').map((i) => i.trim()).filter(Boolean);
      const invalid = urls.find((url) => !urlRegex.test(url));
      if (invalid) {
        fieldErrors[name] = 'One or more image URLs are invalid.';
      } else {
        delete fieldErrors[name];
      }
    }

    setErrors(fieldErrors);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    const requiredFields = ['name', 'pricePerPiece', 'minOrderQty', 'quantityInStock'];
    requiredFields.forEach((field) => {
      if (!productData[field]) {
        formErrors[field] = 'This field is required.';
      }
    });

    const numericFields = ['pricePerPiece', 'minOrderQty', 'quantityInStock', 'itemWeight'];
    numericFields.forEach((field) => {
      const val = productData[field];
      if (val && (isNaN(val) || parseFloat(val) < 0)) {
        formErrors[field] = 'Enter a valid positive number.';
      }
    });

    const dimensions = productData.productDimensions;
    Object.keys(dimensions).forEach((key) => {
      const val = dimensions[key];
      if (val && (isNaN(val) || parseFloat(val) < 0)) {
        formErrors[`productDimensions.${key}`] = 'Must be a valid positive number.';
      }
    });

    const urls = productData.images.split(',').map(i => i.trim()).filter(Boolean);
    urls.forEach((url, index) => {
      if (!urlRegex.test(url)) {
        formErrors.images = `Image URL #${index + 1} is invalid.`;
      }
    });

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    try {
      const sendData = {
        ...productData,
        color: productData.color.split(',').map(i => i.trim()).filter(Boolean),
        usage: productData.usage.split(',').map(i => i.trim()).filter(Boolean),
        features: productData.features.split(',').map(i => i.trim()).filter(Boolean),
        materialTypeFree: productData.materialTypeFree.split(',').map(i => i.trim()).filter(Boolean),
        productCareInstructions: productData.productCareInstructions.split(',').map(i => i.trim()).filter(Boolean),
        images: urls,
      };

      await axios.post('https://wrighto-sustainables-backend.onrender.com/api/product/', sendData, { withCredentials: true });
      alert('Product added successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to add product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h2>Add Product</h2>

      {/* Example Input Group */}
      <div className="form-group">
        <label>Name *</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      {/* Repeat the above pattern for other fields */}
      {/* pricePerPiece example: */}
      <div className="form-group">
        <label>Price Per Piece *</label>
        <input
          type="number"
          name="pricePerPiece"
          value={productData.pricePerPiece}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.pricePerPiece ? 'input-error' : ''}
        />
        {errors.pricePerPiece && <p className="error-text">{errors.pricePerPiece}</p>}
      </div>

      {/* productDimensions.length */}
      <div className="form-group">
        <label>Length (cm)</label>
        <input
          type="number"
          name="productDimensions.length"
          value={productData.productDimensions.length}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors['productDimensions.length'] ? 'input-error' : ''}
        />
        {errors['productDimensions.length'] && (
          <p className="error-text">{errors['productDimensions.length']}</p>
        )}
      </div>

      {/* Image URLs */}
      <div className="form-group">
        <label>Image URLs (comma-separated)</label>
        <input
          type="text"
          name="images"
          value={productData.images}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.images ? 'input-error' : ''}
        />
        {errors.images && <p className="error-text">{errors.images}</p>}
      </div>

      {/* Submit */}
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
