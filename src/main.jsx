// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import './index.css'
// import App from './App.jsx'
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import ReactDOM from 'react-dom/client';
// import React from 'react';

// AOS.init();

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>,
// // )

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//       <AuthProvider>
//           <App />
//       </AuthProvider>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartProvider';

AOS.init();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </AuthProvider>
    </React.StrictMode>
);
