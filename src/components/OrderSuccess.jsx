import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="order-success-container">
            <i className="fas fa-check-circle success-icon"></i>
            <h2>Thank You!</h2>
            <p>Your order has been placed successfully.</p>
            <p>You’ll receive an update when your order ships.</p>
            <div className="success-buttons">
                <button onClick={() => navigate("/")}>
                    <i className="fas fa-home"></i> Go to Homepage
                </button>
                <button onClick={() => navigate('/my-profile?tab=orders')}>
                    <i className="fas fa-box"></i> View My Orders
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;