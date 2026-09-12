import React, { useState, useEffect, useContext } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { ShopContext } from './context/ShopContextInstance'

import Home from './pages/Home'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Contact from './pages/Contact'
import About from './pages/About'
import Delivery from './pages/Delivery'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookieSettings from './pages/CookieSettings'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AdminLayout from './pages/AdminLayout'
import AdminAddProduct from './pages/AdminAddProduct'
import AdminManageProducts from './pages/AdminManageProducts'
import AdminQueries from './pages/AdminQueries'

const App = () => {
  const location = useLocation();
  const { token } = useContext(ShopContext);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem('adminToken', adminToken)
    } else {
      localStorage.removeItem('adminToken')
    }
  }, [adminToken])

  const isAuthenticated = Boolean(token || adminToken);
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={isAdminRoute ? '' : "px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"}>
      <ToastContainer position="bottom-right" />

      {isAuthenticated && !isAdminRoute && !isLoginPage && <Navbar />}
      {isAuthenticated && !isAdminRoute && !isLoginPage && <SearchBar />}

      <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<Login adminToken={adminToken} setAdminToken={setAdminToken} />} />

        {/* Protected Customer Routes */}
        <Route path="/" element={<ProtectedRoute adminToken={adminToken}><Home /></ProtectedRoute>} />
        <Route path="/collection" element={<ProtectedRoute adminToken={adminToken}><Collection /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute adminToken={adminToken}><Product /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute adminToken={adminToken}><Cart /></ProtectedRoute>} />
        <Route path="/place-order" element={<ProtectedRoute adminToken={adminToken}><PlaceOrder /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute adminToken={adminToken}><Orders /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute adminToken={adminToken}><Profile /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute adminToken={adminToken}><About /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute adminToken={adminToken}><Contact /></ProtectedRoute>} />
        <Route path="/delivery" element={<ProtectedRoute adminToken={adminToken}><Delivery /></ProtectedRoute>} />
        <Route path="/privacy-policy" element={<ProtectedRoute adminToken={adminToken}><PrivacyPolicy /></ProtectedRoute>} />
        <Route path="/terms" element={<ProtectedRoute adminToken={adminToken}><TermsOfService /></ProtectedRoute>} />
        <Route path="/cookie-settings" element={<ProtectedRoute adminToken={adminToken}><CookieSettings /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout adminToken={adminToken} setAdminToken={setAdminToken} />}>
          <Route index element={<Navigate to="products" replace />} />
          <Route path="products" element={<AdminManageProducts adminToken={adminToken} />} />
          <Route path="add-product" element={<AdminAddProduct adminToken={adminToken} />} />
          <Route path="queries" element={<AdminQueries adminToken={adminToken} />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>

      {isAuthenticated && !isAdminRoute && !isLoginPage && <Footer />}
    </div>
  )
}

export default App