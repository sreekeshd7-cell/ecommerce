import { useEffect, useState } from "react";
import API from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await API.get("/orders/myorders");
      setOrders(data);
    };
    fetch();
  }, []);

  if (orders.length === 0) return <div className="loading">No orders yet.</div>;

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <span>Order ID: {order._id.slice(-8).toUpperCase()}</span>
            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>
          {order.orderItems.map((item, i) => (
            <div key={i} className="order-item">
              <span>{item.name}</span>
              <span>x{item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <p className="order-total">
            <strong>Total: ₹{order.totalAmount}</strong>
          </p>
          <p className="order-date">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
