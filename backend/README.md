# E-Commerce Backend

This is the backend API for the e-commerce application. It is built with **Node.js** and **Express.js**, serving as a RESTful API to handle authentication, product management, cart operations, order processing, and payment integration.

## Tech Stack

*   **Runtime Environment:** Node.js
*   **Web Framework:** Express.js
*   **Database:** MongoDB
*   **ODM:** Mongoose
*   **Authentication:** JSON Web Tokens (JWT) & bcryptjs (password hashing)
*   **Payment Gateway:** Razorpay
*   **Environment Variables:** dotenv
*   **CORS:** cors

## Project Structure

The codebase is organized into several key directories:

*   **`/models`**: Mongoose schemas defining the structure of the MongoDB collections.
    *   `User.js`: Schema for user accounts, roles, and credentials.
    *   `Product.js`: Schema for product inventory, pricing, and details.
    *   `Order.js`: Schema for storing finalized order information and payment status.
*   **`/routes`**: Defines the API endpoints and connects them to the appropriate controllers.
    *   `authRoutes.js`: Endpoints for registration, login, and user profile.
    *   `productRoutes.js`: Endpoints for fetching, creating, updating, and deleting products.
    *   `cartRoutes.js`: Endpoints for managing the user's shopping cart.
    *   `orderRoutes.js`: Endpoints for viewing past orders.
    *   `paymentRoutes.js`: Endpoints to initiate and verify Razorpay payments.
*   **`/controllers`**: Contains the core business logic for each route.
*   **`/middleware`**: Custom Express middleware functions (e.g., verifying JWT tokens to protect routes).
*   **`/config`**: Configuration files, such as database connection setup.
*   **`server.js`**: The entry point of the application, configuring Express, connecting to the database, and starting the server.

## How It Works

1.  **Database Connection:** On startup, the application connects to a MongoDB database (local or cloud) using the connection string defined in the `.env` file.
2.  **RESTful API:** The server exposes various endpoints (e.g., `/api/products`, `/api/auth/login`) that the frontend interacts with.
3.  **Authentication & Authorization:** Routes that require a logged-in user are protected by a JWT middleware. The middleware extracts the token from the request header, verifies it, and attaches the user information to the request object. Certain actions (like adding products) are further restricted to `admin` roles.
4.  **Payment Processing Flow:**
    *   The frontend requests to checkout.
    *   The backend (via `paymentRoutes`) creates an order with Razorpay using their SDK.
    *   The frontend uses the returned Razorpay order ID to open the payment gateway.
    *   Upon completion, Razorpay sends payment details back to the frontend, which forwards them to the backend for verification using a secure signature.
    *   If verified, the backend saves the order in the database and clears the user's cart.

## Setup and Running Locally

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Set up environment variables by creating a `.env` file in the root of the backend directory. You will need:
    *   `PORT`: The port the server will run on (e.g., 5000).
    *   `MONGO_URI`: Your MongoDB connection string.
    *   `JWT_SECRET`: A secret string for signing JWT tokens.
    *   `RAZORPAY_KEY_ID`: Your Razorpay Key ID.
    *   `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret.
3.  Start the server:
    ```bash
    # For production/standard run
    npm start
    
    # For development (uses nodemon to restart on file changes)
    npm run dev
    ```
