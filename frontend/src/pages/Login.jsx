import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextInstance'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = ({ setAdminToken }) => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, backendUrl } = useContext(ShopContext)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          if (response.data.role === 'admin') {
            setAdminToken(response.data.token)
            // App.jsx handles localStorage mirroring for adminToken via useEffect
            navigate('/admin')
          } else {
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
          }
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#fbfaf5] pt-14 pb-24 min-h-[80vh] flex items-center justify-center'>

      <form onSubmit={onSubmitHandler} className='flex flex-col w-full sm:max-w-md bg-white rounded-[2rem] p-8 sm:p-12 border border-[#e6e4d9] shadow-sm gap-6'>

        <div className='mb-6'>
          <h2 className="text-4xl md:text-5xl font-black text-gray-950 uppercase tracking-tighter text-center">
            {currentState}
          </h2>
        </div>

        {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full outline-none py-3 border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:border-[#96c138] transition-colors text-lg' placeholder='Name' required />}

        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full outline-none py-3 border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:border-[#96c138] transition-colors text-lg' placeholder='Email address' required />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full outline-none py-3 border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:border-[#96c138] transition-colors text-lg' placeholder='Password' required />

        <div className='w-full flex justify-between text-base font-medium text-gray-700 mt-2'>
          <p className='cursor-pointer hover:text-black transition-colors'>Forgot your password?</p>
          {
            currentState === 'Login'
              ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer text-[#96c138] hover:text-[#86af32] transition-colors font-bold'>Create account</p>
              : <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-[#96c138] hover:text-[#86af32] transition-colors font-bold'>Login Here</p>
          }
        </div>

        <button type="submit" className='w-full bg-[#96c138] text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#86af32] transition-colors shadow-md mt-4'>
          {currentState === 'Login' ? 'SIGN IN' : 'SIGN UP'}
        </button>
      </form>
    </div>
  )
}

export default Login