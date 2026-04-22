// src/context/AuthContext.jsx
// Makes login state available to ALL components in the app

import { createContext, useContext, useState } from "react";

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider — wrap your app with this
export const AuthProvider = ({ children }) => {
  // Load user from localStorage (persists across page refresh)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("userInfo");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
