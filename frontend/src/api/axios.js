// src/api/axios.js
// Pre-configured axios instance — all API calls go through this

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:5000/api
});

// Interceptor: automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
