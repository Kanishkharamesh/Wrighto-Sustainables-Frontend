import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Order.css";

const Order = () => {
    const [user, setUser] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loading, setLoading] = useState(true);
    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
    });

    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/api/user/me", { withCredentials: true });
                setUser(res.data);
                setShippingAddress(prev => ({
                    ...prev,
                    fullName: `${res.data.firstname} ${res.data.lastname}`,
                    phone: res.data.mobile
                }));
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading || !product) return <div>Loading...</div>;
    if (!product) return <div>No product found.</div>;

    const subtotal = product.pricePerPiece * quantity;
    const shipping = subtotal > 500 ? 0 : 40;
    const total = subtotal + shipping;
    const gstRate = 0.18; // 18% GST
    const gstAmount = subtotal * gstRate;
    const deliveryCharge = shipping;
    const grandTotal = subtotal + gstAmount + deliveryCharge;

    const handleConfirmOrder = async () => {
        if (
            !shippingAddress.fullName ||
            !shippingAddress.phone ||
            !shippingAddress.addressLine ||
            !shippingAddress.city ||
            !shippingAddress.state ||
            !shippingAddress.pincode
        ) {
            alert("Please fill all address fields.");
            return;
        }

        try {
            const payload = {
                items: [
                    {
                        product: product._id,
                        quantity,
                        price: product.pricePerPiece,
                    },
                ],
                shippingAddress,
                paymentMethod,
                totalAmount: total,
                grandTotal,
                gstAmount,
                deliveryCharge,
            };

            const res = await axios.post("https://wrighto-sustainables-backend.onrender.com/api/orders/place", payload, {
                withCredentials: true,
            });

            alert("Order placed successfully!");
            navigate("/order-success"); // or redirect to success page
        } catch (err) {
            console.error("Order placement failed:", err);
            alert("Failed to place order. Try again.");
        }
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="user-order-container">
            <br />
            <h2>Place Your Order</h2>

            {/* Product Summary */}
            <div className="user-order-section">
                <h3>Order Summary</h3>
                <p>Subtotal: ₹{subtotal}</p>
                <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>
                <p>Shipping: {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</p>
                <p><strong>Grand Total: ₹{grandTotal.toFixed(2)}</strong></p>
                <div className="user-order-product-summary">
                    <img src={product.images?.[0]} alt={product.name} />
                    <div>
                        <p><strong>{product.name}</strong></p>
                        <p>Price: ₹{product.pricePerPiece}</p>
                        <label>Quantity:
                            <input
                                type="number"
                                value={quantity}
                                min={1}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </label>
                        <p>Total: ₹{subtotal}</p>
                        {product.packSize && <p>Pack Size: {product.packSize}</p>}
                        {product.capacity && <p>Capacity: {product.capacity}</p>}
                        {product.size && <p>Size: {product.size}</p>}
                    </div>
                </div>
            </div>

            {/* Product Specifications */}
            {(product.color || product.materialTypeFree || product.itemWeight) && (
                <div className="user-order-section">
                    <h3>Product Specifications</h3>
                    {product.color && <p>Color: {product.color}</p>}
                    {product.materialTypeFree && <p>Material Type Free: {product.materialTypeFree}</p>}
                    <p>Dishwasher Safe: {product.isDishwasherSafe ? "Yes" : "No"}</p>
                    <p>Microwaveable: {product.isMicrowaveable ? "Yes" : "No"}</p>
                    {product.itemWeight && <p>Item Weight: {product.itemWeight}</p>}
                    {product.productDimensions && (
                        <p>
                            Dimensions: {product.productDimensions.length} x {product.productDimensions.width} x {product.productDimensions.height} (L x W x H)
                        </p>
                    )}
                </div>
            )}

            {/* Shipping Address */}
            <div className="user-order-section">
                <h3>Shipping Address</h3>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={shippingAddress.fullName}
                    onChange={handleAddressChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={shippingAddress.phone}
                    onChange={handleAddressChange}
                />
                <textarea
                    name="addressLine"
                    placeholder="Full Address"
                    value={shippingAddress.addressLine}
                    onChange={handleAddressChange}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                />
                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={shippingAddress.pincode}
                    onChange={handleAddressChange}
                />
            </div>

            {/* Emphasized Order Summary */}
            <div className="user-order-section emphasized-total">
                <h3>Order Summary</h3>
                <p>Subtotal: ₹{subtotal}</p>
                <p>Shipping: {shipping === 0 ? "Free" : `₹${shipping}`}</p>
                <p><strong>Total: ₹{total}</strong></p>
                {/* Adding emphasis */}
                <div className="total-cost-emphasis">
                    <p><strong>Grand Total: ₹{grandTotal.toFixed(2)}</strong></p>
                    <p className="highlighted-text">This is the final amount you need to pay!</p>
                </div>
            </div>

            {/* Payment Method */}
            <div className="user-order-section">
                <h3>Payment Method</h3>
                <label>
                    <input
                        type="radio"
                        name="payment"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Cash on Delivery
                </label>
                <label>
                    <input
                        type="radio"
                        name="payment"
                        value="UPI"
                        checked={paymentMethod === "UPI"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        disabled
                    />
                    UPI (Coming Soon)
                </label>
            </div>

            {/* Actions */}
            <div className="user-order-actions">
                <button onClick={() => navigate("/cart")}>Back to Cart</button>
                <button className="user-order-confirm" onClick={handleConfirmOrder}>
                    Confirm Order
                </button>
            </div>

            {/* Terms */}
            <div className="user-order-section info">
                <p>Expected Delivery: 4-7 business days.</p>
                <p>By placing your order, you agree to our <a href="/terms">Terms & Conditions</a>.</p>
            </div>
        </div>
    );
};

export default Order;
