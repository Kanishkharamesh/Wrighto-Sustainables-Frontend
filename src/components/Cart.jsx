import React, { useEffect } from "react";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faShoppingCart,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, setCartItems } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "https://wrighto-sustainables-backend.onrender.com/api/user/cart",
          {
            withCredentials: true,
          }
        );
        setCartItems(response.data.cart || []);
        console.log("Fetched cart from backend:", response.data.cart);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    if (isLoggedIn && cartItems.length === 0) {
      fetchCart();
    }
  }, [isLoggedIn]);

  const handleOrderNow = (item) => {
    navigate("/order", { state: { product: item } });
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.pricePerPiece, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-footer">
        <p>Total: ₹{totalAmount.toFixed(2)}</p>
        <button className="cart-clear-btn" onClick={clearCart}>
          <FontAwesomeIcon icon={faTimesCircle} /> Clear Cart
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <div className="cart-item-info">
                  <img
                    src={item.images && item.images[0]}
                    alt={item.name}
                    width="50"
                    height="50"
                  />
                  {item.name} - ₹{item.pricePerPiece.toFixed(2)}
                </div>
                <div className="cart-item-actions">
                  <button
                    className="cart-order-btn"
                    onClick={() => handleOrderNow(item)}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} /> Order Now
                  </button>
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Cart;
