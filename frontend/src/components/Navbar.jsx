// src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src="/globe-alt-solid.svg" alt="logo" style={{ width: '28px', height: '28px', filter: 'invert(1)' }} />
        ShopCU
      </Link>

      <div style={{ position: "relative", display: "flex", gap: "10px", alignItems: "center" }}>
        <button onClick={toggleTheme} className="btn-theme-toggle">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn-theme-toggle">
          Menu ☰
        </button>

        {isMenuOpen && (
          <div className="dropdown-menu">
            <Link to="/" onClick={closeMenu}>Home</Link>

            {user ? (
              <>
                <Link to="/profile" onClick={closeMenu}>My Profile</Link>
                <Link to="/cart" onClick={closeMenu}>Cart ({cartCount})</Link>
                <Link to="/orders" onClick={closeMenu}>My Orders</Link>
                {user.role === "admin" && <Link to="/admin" onClick={closeMenu}>Admin</Link>}
                <button onClick={() => { closeMenu(); handleLogout(); }} className="btn-logout" style={{ marginTop: '10px' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>Login</Link>
                <Link to="/register" onClick={closeMenu}>Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
