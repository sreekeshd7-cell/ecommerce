import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import API from "../api/axios";

const Cart = () => {
  const { cart, fetchCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const total = (cart || []).reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      await API.post("/orders/place", {
        shippingAddress: {
          address: "123 Main St",
          city: "Delhi",
          postalCode: "110001",
        },
        paymentMethod: "Razorpay",
      });

      await clearCart();
      toast.success("Order placed successfully! 🎉");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/")}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div key={item.product?._id || item._id} className="cart-item">
          <img
            src={item.product?.image || "/placeholder.png"}
            alt={item.product?.name || "Product"}
          />

          <div>
            <h3>{item.product?.name || "Unnamed Product"}</h3>
            <p>
              ₹{item.product?.price || 0} × {item.quantity}
            </p>
            <p>
              <strong>
                ₹{((item.product?.price || 0) * item.quantity).toLocaleString()}
              </strong>
            </p>
          </div>

          <button
            onClick={() => removeFromCart(item.product?._id)}
            className="btn-remove"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="cart-summary">
        <h2>Total: ₹{total.toLocaleString()}</h2>

        <button
          onClick={handleCheckout}
          className="btn-checkout"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
