import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    };
    fetch();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    try {
      await addToCart(product._id);
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart");
    }
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="category">Category: {product.category}</p>
        <p className="description">{product.description}</p>
        <p className="price">₹{product.price.toLocaleString()}</p>
        <p className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
        </p>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="btn-cart"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
