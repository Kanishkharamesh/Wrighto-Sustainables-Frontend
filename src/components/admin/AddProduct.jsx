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
  });

  const [errors, setErrors] = useState({});
  const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('productDimensions.')) {
      const key = name.split('.')[1];
      setProductData((prev) => ({
        ...prev,
        productDimensions: {
          ...prev.productDimensions,
          [key]: value,
        },
      }));
      validateField(name, value);
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
      validateField(name, type === 'checkbox' ? checked : value);
    }
  };

  const validateField = (name, value) => {
    const fieldErrors = { ...errors };

    const required = ['name', 'pricePerPiece', 'minOrderQty'];
    if (required.includes(name) && !value) {
      fieldErrors[name] = 'Required field';
    } else {
      delete fieldErrors[name];
    }

    const numeric = [
      'pricePerPiece', 'minOrderQty', 'capacity', 'itemWeight', 'itemVolume', 'packSize'
    ];
    if (numeric.includes(name)) {
      if (value && (isNaN(value) || parseFloat(value) < 0)) {
        fieldErrors[name] = 'Must be a valid positive number';
      } else {
        delete fieldErrors[name];
      }
    }

    if (name.startsWith('productDimensions.')) {
      if (value && (isNaN(value) || parseFloat(value) < 0)) {
        fieldErrors[name] = 'Invalid dimension';
      } else {
        delete fieldErrors[name];
      }
    }

    if (name === 'images') {
      const urls = value.split(',').map((url) => url.trim());
      const invalidUrl = urls.find((url) => !urlRegex.test(url));
      if (invalidUrl) {
        fieldErrors[name] = 'One or more image URLs are invalid';
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

    // Validate required fields
    ['name', 'pricePerPiece', 'minOrderQty'].forEach((key) => {
      if (!productData[key]) formErrors[key] = 'Required field';
    });

    // Validate numeric fields
    ['pricePerPiece', 'minOrderQty', 'capacity', 'itemWeight', 'itemVolume', 'packSize'].forEach((key) => {
      const val = productData[key];
      if (val && (isNaN(val) || parseFloat(val) < 0)) {
        formErrors[key] = 'Invalid number';
      }
    });

    // Validate dimensions
    Object.entries(productData.productDimensions).forEach(([key, val]) => {
      if (val && (isNaN(val) || parseFloat(val) < 0)) {
        formErrors[`productDimensions.${key}`] = 'Invalid dimension';
      }
    });

    // Validate image URLs
    const urls = productData.images.split(',').map((i) => i.trim());
    urls.forEach((url) => {
      if (!urlRegex.test(url)) {
        formErrors.images = 'One or more image URLs are invalid';
      }
    });

    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

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

  const renderInput = (label, name, type = 'text') => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={name.includes('productDimensions') ? productData.productDimensions[name.split('.')[1]] : productData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors[name] ? 'input-error' : ''}
      />
      {errors[name] && <p className="error-text">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h2>Add Product</h2>

      {renderInput('Name*', 'name')}
      {renderInput('Slug', 'slug')}
      {renderInput('Description', 'description')}
      {renderInput('Price Per Piece*', 'pricePerPiece', 'number')}
      {renderInput('Capacity', 'capacity', 'number')}
      {renderInput('Size', 'size')}
      {renderInput('Plastic Type', 'plasticType')}
      {renderInput('Shape', 'shape')}
      {renderInput('Color (comma separated)', 'color')}
      {renderInput('Usage (comma separated)', 'usage')}
      {renderInput('Features (comma separated)', 'features')}
      {renderInput('Pack Size', 'packSize', 'number')}
      {renderInput('Minimum Order Quantity*', 'minOrderQty', 'number')}

      {/* Dimensions */}
      {renderInput('Length (cm)', 'productDimensions.length', 'number')}
      {renderInput('Width (cm)', 'productDimensions.width', 'number')}
      {renderInput('Height (cm)', 'productDimensions.height', 'number')}

      {renderInput('Closure Type', 'closureType')}
      {renderInput('Material Type Free (comma separated)', 'materialTypeFree')}
      {renderInput('Item Weight (g)', 'itemWeight', 'number')}
      {renderInput('Item Volume (ml)', 'itemVolume', 'number')}
      {renderInput('Care Instructions (comma separated)', 'productCareInstructions')}
      {renderInput('Item Form', 'itemForm')}
      {renderInput('Image URLs (comma separated)*', 'images')}

      {/* Checkboxes */}
      <div className="form-group checkbox-group">
        <label><input type="checkbox" name="hasLid" checked={productData.hasLid} onChange={handleChange} /> Has Lid</label>
        <label><input type="checkbox" name="isDishwasherSafe" checked={productData.isDishwasherSafe} onChange={handleChange} /> Dishwasher Safe</label>
        <label><input type="checkbox" name="isMicrowaveable" checked={productData.isMicrowaveable} onChange={handleChange} /> Microwaveable</label>
      </div>

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
