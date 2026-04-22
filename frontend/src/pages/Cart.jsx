import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import API from "../api/axios";

const Cart = () => {
  const { cart, fetchCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );

  const handleRazorpayCheckout = async () => {
    // ── Guard: check Razorpay script is loaded ──────────────
    if (!window.Razorpay) {
      toast.error("Payment system not loaded. Please refresh the page.");
      return;
    }

    // ── Guard: check env key exists ─────────────────────────
    if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
      toast.error("Razorpay key missing. Check your .env file.");
      return;
    }

    try {
      // ✅ Fixed URL — removed extra /api prefix
      const { data: rzpOrder } = await API.post("/payment/create-order", {
        amount: total,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: rzpOrder.amount,
        currency: "INR",
        name: "ShopEasy",
        order_id: rzpOrder.id,

        handler: async function (response) {
          try {
            // Place order after successful payment
            await API.post("/orders/place", {
              shippingAddress: {
                address: "123 Main St",
                city: "Delhi",
                postalCode: "110001",
              },
              paymentMethod: "Razorpay",
            });

            await clearCart();
            toast.success("Payment successful! Order placed 🎉");
            navigate("/orders");
          } catch (err) {
            // Payment went through but order failed
            toast.error("Order saving failed. Contact support.");
          }
        },

        // ✅ Handle user closing the payment popup
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled.");
          },
        },

        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);

      // ✅ Handle payment errors (card declined, etc.)
      rzp.on("payment.failed", function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
      });

      rzp.open();
    } catch (err) {
      // ✅ Better error message from server
      toast.error(
        err.response?.data?.message || "Payment failed. Please try again.",
      );
    }
  };

  if (cart.length === 0)
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/")}>Shop Now</button>
      </div>
    );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div key={item.product?._id} className="cart-item">
          <img src={item.product?.image} alt={item.product?.name} />
          <div>
            <h3>{item.product?.name}</h3>
            <p>
              ₹{item.product?.price} × {item.quantity}
            </p>
            <p>
              <strong>
                ₹{(item.product?.price * item.quantity).toLocaleString()}
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
        <button onClick={handleRazorpayCheckout} className="btn-checkout">
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default Cart;
