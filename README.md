# EliteKart E-Commerce Platform

A modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). EliteKart provides a seamless shopping experience for users along with a secure administrative portal for inventory and query management.

## 🌟 Features

### User Features
- **Authentication**: Secure registration and login with JWT.
- **Product Catalog**: Browse, sort, and filter through high-quality clothing and accessories.
- **Cart & Checkout**: Dynamic shopping cart with live state synchronization.
- **User Dashboard**: Manage profile details, view order history, and track shipments.
- **Modern UI/UX**: Clean, responsive layout utilizing Tailwind CSS, interactive elements, and optimized mobile views.
- **Privacy Controls**: Built-in Terms of Service and Cookie Settings management.

### Admin Features
- **Role-Based Routing**: Secure dual-login system separating customer and administrator access.
- **Product Management**: Add new products with multi-image Cloudinary uploads, set prices, and manage inventory directly from the dashboard.
- **Customer Queries**: Read and resolve contact form submissions from the public storefront.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Context API
- Lucide React (Icons)
- React Toastify (Notifications)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JSON Web Tokens (JWT) for secure routing
- Bcrypt (Password Hashing)
- Multer & Cloudinary (Multipart Image Uploads)
- Stripe / Razorpay (Payment Gateway Integration)

## 🚀 Running the Project Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
You will also need:
- A MongoDB Connection URI (e.g., MongoDB Atlas)
- A Cloudinary Account (for image hosting)

### 1. Clone the Repository
```bash
git clone https://github.com/RAJESHWARAN-R96/EliteKart-ecommerce.git
cd EliteKart-ecommerce
```

### 2. Environment Variables Setup
Create a `.env` file inside the `backend` folder and add your specific keys:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@elitekart.com
ADMIN_PASSWORD=your_secure_admin_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
# STRIPE_SECRET_KEY=your_stripe_secret
```

Create a `.env` file inside the `frontend` folder to point to the backend:
```env
VITE_BACKEND_URL=http://localhost:4000
```

### 3. Install Dependencies & Start

**Terminal 1: Start the Backend server**
```bash
cd backend
npm install
npm run server
```

**Terminal 2: Start the Frontend Vite app**
```bash
cd frontend
npm install
npm run dev
```

The application will now be running at `http://localhost:5173`. Use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` you configured in the backend `.env` file to log in to the secure dashboard.

## 📝 License
This project is open-source and available under the standard MIT License.
