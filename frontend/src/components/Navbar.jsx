// src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src="/globe-alt-solid.svg" alt="logo" style={{ width: '28px', height: '28px', filter: 'invert(1)' }} />
        ShopCU
      </Link>

      <div className="nav-links">
        <button onClick={toggleTheme} className="btn-theme-toggle">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/cart">Cart ({cartCount})</Link>
            <Link to="/orders">My Orders</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
