import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrdersList.css";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://wrighto-sustainables-backend.onrender.com/api/orders/my", { withCredentials: true });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="orders-list-container">
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.quantity} × {item.product?.name || "Product"} @ ₹{item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
