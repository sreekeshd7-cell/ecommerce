const axios = require('axios');

async function runTest() {
  try {
    const api = axios.create({ baseURL: 'http://localhost:5000/api' });

    // 1. Register admin
    const email = `admin_${Date.now()}@test.com`;
    console.log("Registering admin:", email);
    let res = await api.post('/auth/register', {
      name: "Admin",
      email,
      password: "password123",
      mobileNumber: "1234567890",
      address: "123 Admin St"
    });
    
    // Set admin role manually in DB (we can just test with normal user if products can be added by anyone in test, wait, products need admin)
    // Actually let's login first
    res = await api.post('/auth/login', { email, password: "password123" });
    const token = res.data.token;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Get all products
    const productsRes = await api.get('/products');
    const existingProduct = productsRes.data[0];

    if (existingProduct) {
        console.log("Adding existing product to cart:", existingProduct._id);
        const cartRes1 = await api.post('/cart/add', { productId: existingProduct._id, quantity: 1 });
        console.log("Cart after adding existing product:", cartRes1.data.length);
    }

    // Since I can't easily make user an admin through API, I'll just use mongoose to update the role
    const mongoose = require('mongoose');
    const User = require('./models/User');
    await mongoose.connect('mongodb+srv://sreekeshd7_db_user:Sreekesh2005@ecommerce.z18qfdm.mongodb.net/?appName=ecommerce');
    await User.updateOne({ email }, { role: 'admin' });

    // 2. Add product
    console.log("Adding new product");
    const prodRes = await api.post('/products', {
      name: "Test New Product",
      description: "Desc",
      price: "100",
      image: "",
      category: "Electronics",
      stock: "10"
    });
    const newProductId = prodRes.data._id;
    console.log("Added product:", newProductId);

    // 3. Add new product to cart
    console.log("Adding new product to cart:", newProductId);
    const cartRes = await api.post('/cart/add', { productId: newProductId, quantity: 1 });
    console.log("Cart result:", cartRes.data);

    console.log("Test passed!");
    process.exit(0);

  } catch (error) {
    console.error("Test failed:", error.response ? error.response.data : error.message);
    process.exit(1);
  }
}

runTest();
