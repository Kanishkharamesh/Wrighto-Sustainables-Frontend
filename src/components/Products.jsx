// import React, { useState } from 'react';
// import './Products.css'; // Import your optional CSS
// import Header from '../components/Header.jsx';

// const products = [
//   {
//     name: "Disposable Plastic Cups 250ml With Lid",
//     image: "https://5.imimg.com/data5/ANDROID/Default/2023/2/FF/FV/GT/44289338/product-jpeg.jpg",
//     price: 5,
//     category: "Disposable Cups & Glasses"
//   },
//   {
//     name: "Clear Plastic Cup",
//     image: "https://www.monouso-direct.com/60915-large_default/plastic-cup-pp-clear-330ml-o79cm-1250-units.jpg",
//     price: 3.8,
//     category: "Disposable Cups & Glasses"
//   },
//   {
//     name: "350 ml PP Injection Cup",
//     image: "https://5.imimg.com/data5/SELLER/Default/2023/7/325887184/QQ/NT/AO/97005120/pp-injection-cup.jpg",
//     price: 5,
//     category: "Disposable Cups & Glasses"
//   },
//   {
//     name: "250ml Plastic Disposable Cup",
//     image: "https://www.restokart.com/media/uploads/product/250_Ml_White_Paper_Glass.png",
//     price: 3,
//     category: "Disposable Cups & Glasses"
//   },
//   {
//     name: "Transparent 250ml Disposable Glass",
//     image: "https://5.imimg.com/data5/SELLER/Default/2023/3/295026209/CF/XC/MA/45013664/250ml-disposable-plastic-glass-500x500.jpg",
//     price: 2.5,
//     category: "Disposable Cups & Glasses"
//   },
//   {
//     name: "Small Round Transparent Sauce Container 25ml",
//     image: "https://m.media-amazon.com/images/I/41lts1gYRfL._AC_UF1000,1000_QL80_.jpg",
//     price: 1,
//     category: "Specialty & Small-Scale Containers"
//   },
//   {
//     name: "Milky White Disposable Plastic Food Container 500ml",
//     image: "https://homecareshoppe.com/wp-content/uploads/2023/10/500ml-ice-cream-container-500x500-1.png",
//     price: 3.6,
//     category: "Disposable Food Containers"
//   },
//   {
//     name: "600 ML Flat PP Disposable Food Container",
//     image: "https://5.imimg.com/data5/SELLER/Default/2022/9/EH/PX/AC/4553118/600ml-flat-plastic-food-container-500x500.JPG",
//     price: 5.2,
//     category: "Disposable Food Containers"
//   },
//   {
//     name: "1000ml Rectangle Plastic Food Container",
//     image: "https://neeyog.com/wp-content/uploads/2019/01/1000ml-Rectangle-Food-Container-1.jpg",
//     price: 7.2,
//     category: "Disposable Food Containers"
//   },
//   {
//     name: "Rectangle 200ml Disposable Plastic Food Container",
//     image: "https://5.imimg.com/data5/SELLER/Default/2025/3/499460764/FC/IO/EP/241244519/650ml-rectangular-plastic-food-container-500x500.jpeg",
//     price: 3.5,
//     category: "Disposable Food Containers"
//   },
//   {
//     name: "750ml Eco-Friendly Meal Box",
//     image: "https://m.media-amazon.com/images/I/41xYm-lx0wL.jpg",
//     price: 10.25,
//     category: "Disposable Food Containers"
//   },
//   {
//     name: "500ml Reusable Rectangle Plastic Containers with Lids – Pack of 25",
//     image: "https://5.imimg.com/data5/SELLER/Default/2023/8/331701227/XR/JC/OV/193855300/re-16-rect-container-with-lid-500x500.jpg",
//     price: 13.16,
//     category: "Reusable Food Containers"
//   },
//   {
//     name: "650ml Black Reusable Food Container with Lid",
//     image: "https://upkgs.com/wp-content/uploads/2024/03/Re-32-Rectangular-Black-Container.jpg",
//     price: 12.5,
//     category: "Reusable Food Containers"
//   },
//   {
//     name: "Plastic Forth Round Sauce Cups (50ml)",
//     image: "https://5.imimg.com/data5/SELLER/Default/2023/11/359809538/HN/PJ/UC/47610904/50-ml-sauce-cup-with-hinge-lid-500x500.jpeg",
//     price: 1.5,
//     category: "Specialty & Small-Scale Containers"
//   }
// ];

// const Products = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [language, setLanguage] = useState('English');

//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   return (
//     <div className={`products-page ${darkMode ? 'dark-mode' : ''}`}>
//       <Header
//         darkMode={darkMode}
//         toggleDarkMode={toggleDarkMode}
//         language={language}
//         setLanguage={setLanguage}
//       />
//       <h1 className="products-heading">Our Products</h1>
//       <div className="product-grid">
//         {products.map((product, index) => (
//           <div className="product-card" key={index}>
//             <img src={product.image} alt={product.name} className="product-img" />
//             <h4>{product.name}</h4>
//             <p>₹{product.price.toFixed(2)}</p>
//             <button className="product-btn">Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';
import Header from '../components/Header.jsx';

const Products = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

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

  return (
    <div className={`products-page ${darkMode ? 'dark-mode' : ''}`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        language={language}
        setLanguage={setLanguage}
      />
      <h1 className="products-heading">Our Products</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="product-grid">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <img
                src={product.images && product.images[0]}
                alt={product.name}
                className="product-img"
              />
              <h4>{product.name}</h4>
              <p>₹{product.pricePerPiece?.toFixed(2)}</p>
              <button className="product-btn">Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
