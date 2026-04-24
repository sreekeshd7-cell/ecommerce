import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const MockPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState("Processing Payment...");

  useEffect(() => {
    const processPayment = async () => {
      const { address, total } = location.state || {};

      if (!address) {
        toast.error("Invalid payment request");
        navigate("/cart");
        return;
      }

      try {
        // Simulate a 2 second payment delay
        setTimeout(async () => {
          setStatus("Payment Successful! Placing Order...");
          
          await API.post("/orders/place", {
            shippingAddress: address,
            paymentMethod: "Mock Payment",
          });

          await clearCart();
          toast.success("Payment successful! Order placed 🎉");
          navigate("/orders");
        }, 2000);
      } catch (error) {
        console.error("Order placement failed:", error);
        setStatus("Payment Failed!");
        toast.error("Failed to place order.");
        setTimeout(() => navigate("/cart"), 2000);
      }
    };

    processPayment();
  }, [location, navigate, clearCart]);

  return (
    <div className="mock-payment-container" style={{ textAlign: "center", padding: "100px 20px" }}>
      <h2>Secure Payment Gateway</h2>
      <div className="spinner" style={{ margin: "20px auto", border: "4px solid #f3f3f3", borderTop: "4px solid #3498db", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite" }}></div>
      <h3>{status}</h3>
      <p>Do not refresh this page.</p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default MockPayment;
