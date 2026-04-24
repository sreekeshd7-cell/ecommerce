const axios = require('axios');

async function runTest() {
  try {
    const api = axios.create({ baseURL: 'http://localhost:5000/api' });

    // Login as admin
    const email = 'admin_1777007273102@test.com'; // User created in previous test
    const res = await api.post('/auth/login', { email, password: "password123" });
    const token = res.data.token;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Create payment order with huge amount
    console.log("Creating payment order...");
    const paymentRes = await api.post('/payment/create-order', { amount: 565000 });
    console.log("Payment order response:", paymentRes.data);

    process.exit(0);
  } catch (error) {
    console.error("Test failed:", error.response ? error.response.data : error.message);
    process.exit(1);
  }
}

runTest();
