import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextInstance'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'

const Login = ({ adminToken, setAdminToken }) => {
  const [currentState, setCurrentState] = useState('Login') // 'Login' | 'Sign Up'
  const { token, setToken, backendUrl } = useContext(ShopContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (adminToken) {
      navigate('/admin', { replace: true })
    } else if (token) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [token, adminToken, navigate, location])

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
        if (response.data.success) {
          toast.success('Account created successfully!')
          setToken(response.data.token)
        } else {
          toast.error(response.data.message || 'Registration failed')
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password })
        if (response.data.success) {
          if (response.data.role === 'admin') {
            toast.success('Welcome Admin!')
            setAdminToken(response.data.token)
            navigate('/admin', { replace: true })
          } else {
            toast.success('Login successful!')
            setToken(response.data.token)
            const from = location.state?.from?.pathname || '/'
            navigate(from, { replace: true })
          }
        } else {
          toast.error(response.data.message || 'Invalid credentials')
        }
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message || 'An error occurred during authentication')
    } finally {
      setLoading(false)
    }
  }

  const fillAdminCredentials = () => {
    setEmail('admin@elitekart.com')
    setPassword('adminpassword123')
    setCurrentState('Login')
    toast.info('Filled Admin credentials')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f8faf6] via-[#f3f6ec] to-[#eaf1dd] flex flex-col justify-center items-center px-4 py-12'>
      {/* Brand Header */}
      <div className='text-center mb-8 flex flex-col items-center'>
        <img
          src={assets.logo_new}
          className='w-44 sm:w-52 mb-3 cursor-pointer drop-shadow-sm'
          alt='EliteKart Logo'
        />
        <p className='text-gray-600 text-sm sm:text-base max-w-sm'>
          Welcome! Please sign in to access your shopping dashboard & collection.
        </p>
      </div>

      {/* Auth Card */}
      <div className='w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#e2ebd3] shadow-xl'>
        {/* Toggle Tabs */}
        <div className='flex p-1 bg-gray-100 rounded-2xl mb-8'>
          <button
            type='button'
            onClick={() => setCurrentState('Login')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              currentState === 'Login'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            type='button'
            onClick={() => setCurrentState('Sign Up')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              currentState === 'Sign Up'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Title */}
        <div className='mb-6'>
          <h2 className='text-2xl font-black text-gray-900 tracking-tight'>
            {currentState === 'Login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className='text-gray-500 text-xs sm:text-sm mt-1'>
            {currentState === 'Login'
              ? 'Enter your credentials to continue shopping'
              : 'Sign up to discover exclusive collections & deals'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
          {currentState === 'Sign Up' && (
            <div>
              <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
                Full Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type='text'
                className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#96c138] focus:bg-white transition-all text-sm'
                placeholder='John Doe'
                required
              />
            </div>
          )}

          <div>
            <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type='email'
              className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#96c138] focus:bg-white transition-all text-sm'
              placeholder='you@example.com'
              required
            />
          </div>

          <div>
            <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1'>
              Password
            </label>
            <div className='relative'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? 'text' : 'password'}
                className='w-full px-4 py-3 pr-11 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#96c138] focus:bg-white transition-all text-sm'
                placeholder='••••••••'
                required
                minLength={8}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1'
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18' />
                  </svg>
                ) : (
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                  </svg>
                )}
              </button>
            </div>
            {currentState === 'Sign Up' && (
              <p className='text-[11px] text-gray-500 mt-1'>Password must be at least 8 characters</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-[#96c138] hover:bg-[#86af32] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2'
          >
            {loading ? (
              <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
            ) : (
              <span>{currentState === 'Login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        {/* Quick Demo Hint */}
        <div className='mt-6 pt-6 border-t border-gray-100 flex flex-col items-center gap-2'>
          <p className='text-xs text-gray-500'>Need admin dashboard access?</p>
          <button
            type='button'
            onClick={fillAdminCredentials}
            className='text-xs font-semibold text-[#86af32] hover:text-[#6f9227] hover:underline'
          >
            Use Demo Admin Credentials
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login