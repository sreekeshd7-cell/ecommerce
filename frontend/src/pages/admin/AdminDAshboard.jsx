import { Link } from "react-router-dom";

const AdminDashboard = () => (
  <div className="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <div className="admin-cards">
      <Link to="/admin/products" className="admin-card">
        <h2>📦 Manage Products</h2>
        <p>Add, edit, or delete products</p>
      </Link>
    </div>
  </div>
);

export default AdminDashboard;
