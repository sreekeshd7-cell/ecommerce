// src/components/ProductCard.jsx

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    try {
      await addToCart(product._id);
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="price">₹{product.price.toLocaleString()}</p>
      </Link>
      <button onClick={handleAddToCart} className="btn-cart">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
