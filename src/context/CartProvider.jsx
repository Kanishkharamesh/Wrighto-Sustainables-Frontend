// import React, { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     setCartItems((prevItems) => [...prevItems, product]);
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prevItems) => prevItems.filter(item => item._id !== productId));
//   };

//   const clearCart = () => {
//     setCartItems([]);

//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };


// import React, { createContext, useContext, useState } from "react";
// import { useAuth } from "./AuthProvider"; // adjust path if needed
// import { useEffect } from "react";
// import axios from "axios";

// const CartContext = createContext();


// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const { isLoggedIn, loading } = useAuth();

//   const addToCart = async (product) => {
//     try {
//       // Add the product to the local state
//       setCartItems((prevItems) => {
//         const updatedCart = [...prevItems, product];
//         updateCartInBackend(updatedCart); // Call the backend sync function
//         return updatedCart;
//       });
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/user/cart", {
//           withCredentials: true,
//         });
//         if (response.data.cart) {
//           setCartItems(response.data.cart);
//         }
//       } catch (error) {
//         console.error("Failed to fetch cart from backend:", error);
//       }
//     };

//     if (!loading && isLoggedIn) {
//       fetchCart();
//     }
//   }, [isLoggedIn, loading]);


//   const removeFromCart = (productId) => {
//     const updatedCart = cartItems.filter((item) => item._id !== productId);
//     setCartItems(updatedCart);
//     updateCartInBackend(updatedCart); // Sync the updated cart with backend
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     updateCartInBackend([]); // Clear the cart in the backend as well
//   };

//   const updateCartInBackend = async (cart) => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/user/cart",
//         { cart },
//         { withCredentials: true }
//       );
//     } catch (error) {
//       console.error("Failed to update cart in backend:", error);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider"; // adjust path if needed
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isLoggedIn, loading } = useAuth();
  const addToCart = async (product) => {
    try {
      setCartItems((prevItems) => [...prevItems, product]);

      await axios.post(
        "http://localhost:5000/api/user/cart",
        {
          productId: product._id,
          quantity: product.quantity || 1,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/cart", {
          withCredentials: true,
        });
        if (response.data.cart && response.data.cart.length > 0) {
          setCartItems(response.data.cart);
        } else {
          console.log("Cart is empty.");
        }
      } catch (error) {
        console.error("Failed to fetch cart from backend:", error);
      }
    };

    if (!loading && isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn, loading]);

  // const removeFromCart = (productId) => {
  //   const updatedCart = cartItems.filter((item) => item._id !== productId);
  //   setCartItems(updatedCart);
  //   updateCartInBackend(updatedCart); // Sync the updated cart with backend
  // };
  const removeFromCart = async (productId) => {
    try {
      // Optimistically update the UI by removing the product from the cart
      const updatedCart = cartItems.filter((item) => item._id !== productId);
      setCartItems(updatedCart);

      // Make DELETE request to remove the product from the backend
      await axios.delete(`http://localhost:5000/api/user/cart/remove/${productId}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };


  const clearCart = async () => {
    try {
      // Optimistically clear the cart in the frontend
      setCartItems([]);

      // Make DELETE request to clear the cart in the backend
      await axios.delete("http://localhost:5000/api/user/cart/clear", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };


  // const updateCartInBackend = async (cart) => {
  //   try {
  //     await axios.post(
  //       "http://localhost:5000/api/user/cart",
  //       { cart },
  //       { withCredentials: true }
  //     );
  //   } catch (error) {
  //     console.error("Failed to update cart in backend:", error);
  //   }
  // };

  const updateCartInBackend = async (cart) => {
    try {
      const cartData = cart.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }));
      await axios.post(
        "http://localhost:5000/api/user/cart",
        { cart: cartData },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to update cart in backend:", error);
    }
  };
  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
