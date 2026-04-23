import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import API from "../api/axios";

const Cart = () => {
  const { cart, fetchCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const total = (cart || []).reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );

  const handleRazorpayCheckout = async () => {
    try {
      setLoading(true);

      const { data: rzpOrder } = await API.post("/payment/create-order", {
        amount: total * 100,
      });

      if (!window.Razorpay) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: rzpOrder.amount,
        currency: "INR",
        name: "ShopCU",
        order_id: rzpOrder.id,

        handler: async function (response) {
          try {
            await API.post("/payment/verify", response);

            await API.post("/orders/place", {
              shippingAddress: address,
              paymentMethod: "Razorpay",
            });

            await clearCart();
            toast.success("Payment successful! Order placed 🎉");
            navigate("/orders");
          } catch (err) {
            console.error(err);
            toast.error("Payment verification failed");
          }
        },

        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },

        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Failed to initiate payment");
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

        <div className="address-form">
          <h3>Shipping Address</h3>
          <input
            type="text"
            placeholder="Address"
            value={address.address}
            onChange={(e) =>
              setAddress({ ...address, address: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
            required
          />
        </div>

        <button
          onClick={handleRazorpayCheckout}
          className="btn-checkout"
          disabled={
            loading || !address.address || !address.city || !address.postalCode
          }
        >
          {loading ? "Processing..." : "Pay with Razorpay"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
