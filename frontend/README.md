# E-Commerce Frontend

This is the frontend portion of the e-commerce application, built using **React** and **Vite**. It provides a responsive and dynamic user interface for customers to browse products, manage their cart, and securely complete purchases.

## Tech Stack

*   **Framework:** React 19
*   **Build Tool:** Vite
*   **Routing:** React Router DOM
*   **State Management/Context:** React Context API
*   **HTTP Client:** Axios (for communicating with the backend API)
*   **Notifications:** React Toastify
*   **Styling:** Vanilla CSS (`index.css`, `App.css`)

## Project Structure

The source code is located in the `src/` directory, organized into several key components:

*   **`/assets`**: Contains static assets like images and icons.
*   **`/components`**: Reusable UI components.
    *   `Navbar.jsx`: The main navigation bar.
    *   `ProductCard.jsx`: Displays individual product summaries.
    *   `ProtectedRoute.jsx` / `AdminRoute.jsx`: Higher-order components to restrict access based on user authentication and roles.
*   **`/pages`**: The main views corresponding to different routes.
    *   `Home.jsx`: The landing page displaying product listings.
    *   `ProductDetail.jsx`: Detailed view for a specific product.
    *   `Cart.jsx`: The user's shopping cart and checkout initiation.
    *   `Login.jsx` & `Register.jsx`: Authentication pages.
    *   `Profile.jsx`: User profile management.
    *   `Orders.jsx`: Order history for the user.
    *   `MockPayment.jsx`: A simulation interface for payment processing.
    *   `/admin`: Contains pages specific to the admin dashboard (e.g., managing inventory).
*   **`/context`**: Global state management, primarily for user authentication (`AuthContext`).
*   **`/api`**: Centralized Axios configurations and API helper functions.

## How It Works

1.  **Authentication:** Users can register and log in. The JWT token received from the backend is stored (typically in `localStorage`) and used for subsequent authenticated requests. The `AuthContext` makes the user's state available throughout the app.
2.  **Browsing & Cart:** The frontend fetches product data from the backend. Users can add products to their cart. The cart state is managed and synced with the backend.
3.  **Checkout Flow:** When a user checks out, the frontend communicates with the backend to initiate a payment via Razorpay. It handles the payment success/failure callbacks and updates the UI accordingly.
4.  **Routing:** `react-router-dom` handles navigation between different pages without reloading the browser. Protected routes ensure that only logged-in users or admins can access specific areas.

## Setup and Running Locally

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Set up environment variables (create a `.env` file based on your configuration, e.g., pointing to the backend API URL).
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Build for production:
    ```bash
    npm run build
    ```
