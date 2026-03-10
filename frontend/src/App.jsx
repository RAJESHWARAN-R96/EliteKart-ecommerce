import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

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
import { Search } from 'lucide-react'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AdminLayout from './pages/AdminLayout'
import AdminAddProduct from './pages/AdminAddProduct'
import AdminQueries from './pages/AdminQueries'

const App = () => {
  const location = useLocation();
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');

  useEffect(() => {
    localStorage.setItem('adminToken', adminToken)
  }, [adminToken])

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={isAdminRoute ? '' : "px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"}>
      <ToastContainer position="bottom-right" />

      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <SearchBar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login setAdminToken={setAdminToken} />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookie-settings" element={<CookieSettings />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout adminToken={adminToken} setAdminToken={setAdminToken} />}>
          <Route index element={<Navigate to="add-product" replace />} />
          <Route path="add-product" element={<AdminAddProduct adminToken={adminToken} />} />
          <Route path="queries" element={<AdminQueries adminToken={adminToken} />} />
        </Route>
      </Routes>

      {!isAdminRoute && location.pathname !== '/login' && <Footer />}
    </div>
  )
}

export default App