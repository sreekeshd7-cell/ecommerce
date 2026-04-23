import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts(); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/products", form);
      toast.success("Product added!");
      setForm({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
      });
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success("Product deleted!");
      fetchProducts();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="admin-products">
      <h1>Manage Products</h1>

      {/* Add Product Form */}
      <div className="add-product-form">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          {["name", "description", "price", "image", "category", "stock"].map(
            (field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange}
                required
                type={["price", "stock"].includes(field) ? "number" : "text"}
              />
            ),
          )}
          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* Products Table */}
      <div className="products-table">
        <h2>All Products ({products.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                </td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
