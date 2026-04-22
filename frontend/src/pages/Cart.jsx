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

  const handleCheckout = async () => {
    try {
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
      toast.error("Failed to place order");
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
              <strong>₹{item.product?.price * item.quantity}</strong>
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
        <button onClick=
        {
const handleRazorpayCheckout = async () => {
  const { data: rzpOrder } = await API.post('/api/payment/create-order', { amount: total });

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: rzpOrder.amount,
    currency: 'INR',
    name: 'ShopEasy',
    order_id: rzpOrder.id,
    handler: async function (response) {
      // Payment success — place the order
      await API.post('/orders/place', {
        shippingAddress: { address: '123 Main St', city: 'Delhi', postalCode: '110001' },
        paymentMethod: 'Razorpay',
      });
      await clearCart();
      toast.success('Payment successful! Order placed 🎉');
      navigate('/orders');
    },
    theme: { color: '#3399cc' },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
        }
className="btn-checkout">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
