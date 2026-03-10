import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContextInstance'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();
  const { backendUrl, token, cartItems, setCartItems, currency, products, delivery_fee } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  // Calculate Subtotal dynamically
  let subtotal = 0;
  for (const items in cartItems) {
    for (const item in cartItems[items]) {
      if (cartItems[items][item] > 0) {
        const productInfo = products.find((product) => product._id === items);
        if (productInfo) {
          subtotal += productInfo.price * cartItems[items][item];
        }
      }
    }
  }

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {

      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: subtotal + delivery_fee
      }

      switch (method) {
        // API Calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
            toast.success('Order placed successfully!')
          } else {
            toast.error(response.data.message)
          }
          break;
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;
        default:
          break;
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#fbfaf5] pt-14 pb-24 min-h-[80vh]'>

      <div className='flex flex-col lg:flex-row justify-between gap-10 lg:gap-14'>
        {/* ------------- Left Side (Form) ---------------- */}
        <div className='flex flex-col gap-6 w-full lg:max-w-[600px]'>

          <div className='mb-6'>
            <h2 className="text-3xl md:text-4xl font-black text-gray-950 uppercase tracking-tighter">
              DELIVERY INFORMATION
            </h2>
          </div>

          <div className='bg-white rounded-[2rem] p-8 sm:p-10 border border-[#e6e4d9] shadow-sm flex flex-col gap-6'>
            <div className='flex flex-col sm:flex-row gap-6'>
              <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='w-full sm:flex-1 outline-none py-3 border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:border-[#96c138] transition-colors text-lg' type="text" placeholder='First name' />
              <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='w-full sm:flex-1 outline-none py-3 border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:border-[#96c138] transition-colors text-lg' type="text" placeholder='Last name' />
            </div>

            <input required onChange={onChangeHandler} name='email' value={formData.email} className='w-full outline-none py-3 border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:border-[#96c138] transition-colors text-lg' type="email" placeholder='Email address' />
            <input required onChange={onChangeHandler} name='street' value={formData.street} className='w-full outline-none py-3 border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:border-[#96c138] transition-colors text-lg' type="text" placeholder='Street address' />

            <div className='flex flex-col sm:flex-row gap-6'>
              <input required onChange={onChangeHandler} name='city' value={formData.city} className='w-full sm:flex-1 outline-none py-3 border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:border-[#96c138] transition-colors text-lg' type="text" placeholder='City' />
              <input onChange={onChangeHandler} name='state' value={formData.state} className='w-full sm:flex-1 outline-none py-3 border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:border-[#96c138] transition-colors text-lg' type="text" placeholder='State / Province' />
            </div>

            <div className='flex flex-col sm:flex-row gap-6'>
              <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='w-full sm:flex-1 outline-none py-3 border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:border-[#96c138] transition-colors text-lg' type="number" placeholder='Zip / Postal code' />
              <input required onChange={onChangeHandler} name='country' value={formData.country} className='w-full sm:flex-1 outline-none py-3 border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:border-[#96c138] transition-colors text-lg' type="text" placeholder='Country' />
            </div>

            <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='w-full outline-none py-3 border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:border-[#96c138] transition-colors text-lg' type="number" placeholder='Phone number' />
          </div>
        </div>

        {/* ------------- Right Side (Totals & Payment) ---------------- */}
        <div className='w-full lg:w-[400px] xl:w-[450px] shrink-0 lg:mt-[5.5rem]'>

          <div className='bg-white rounded-[2rem] p-8 border border-[#e6e4d9] sticky top-24 shadow-sm'>
            {/* Cart Totals section */}
            <h3 className='text-3xl font-black text-gray-950 uppercase tracking-tight mb-8'>
              CART TOTALS
            </h3>

            <div className='flex flex-col gap-5 text-gray-700 font-medium text-lg mb-10'>
              <div className='flex justify-between items-center'>
                <p>Subtotal</p>
                <p className='font-bold text-gray-900'>{currency} {subtotal}.00</p>
              </div>
              <hr className='border-[#e6e4d9]' />
              <div className='flex justify-between items-center'>
                <p>Shipping Fee</p>
                <p className='font-bold text-gray-900'>{currency} {subtotal === 0 ? 0 : delivery_fee}.00</p>
              </div>
              <hr className='border-[#e6e4d9]' />
              <div className='flex justify-between items-center text-xl'>
                <p className='font-bold text-gray-900'>Total</p>
                <p className='font-black text-[#1e4b3e] text-2xl'>{currency} {subtotal === 0 ? 0 : subtotal + delivery_fee}.00</p>
              </div>
            </div>

            {/* Payment Method section */}
            <h3 className='text-2xl font-black text-gray-950 uppercase tracking-tight mb-6'>
              PAYMENT METHOD
            </h3>

            <div className='flex flex-col gap-4 mb-10'>
              <div onClick={() => setMethod('stripe')} className={`flex items-center gap-4 border-2 p-4 rounded-xl cursor-pointer transition-all ${method === 'stripe' ? 'border-[#96c138] bg-[#fbfaf5]' : 'border-[#e6e4d9] hover:border-gray-400'}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'stripe' ? 'border-[#96c138]' : 'border-gray-400'}`}>
                  {method === 'stripe' && <div className='w-2.5 h-2.5 bg-[#96c138] rounded-full'></div>}
                </div>
                <p className='text-gray-900 text-lg font-bold'>STRIPE</p>
              </div>

              <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-4 border-2 p-4 rounded-xl cursor-pointer transition-all ${method === 'razorpay' ? 'border-[#96c138] bg-[#fbfaf5]' : 'border-[#e6e4d9] hover:border-gray-400'}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'razorpay' ? 'border-[#96c138]' : 'border-gray-400'}`}>
                  {method === 'razorpay' && <div className='w-2.5 h-2.5 bg-[#96c138] rounded-full'></div>}
                </div>
                <p className='text-gray-900 text-lg font-bold'>RAZORPAY</p>
              </div>

              <div onClick={() => setMethod('cod')} className={`flex items-center gap-4 border-2 p-4 rounded-xl cursor-pointer transition-all ${method === 'cod' ? 'border-[#96c138] bg-[#fbfaf5]' : 'border-[#e6e4d9] hover:border-gray-400'}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'cod' ? 'border-[#96c138]' : 'border-gray-400'}`}>
                  {method === 'cod' && <div className='w-2.5 h-2.5 bg-[#96c138] rounded-full'></div>}
                </div>
                <p className='text-gray-900 text-lg font-bold'>CASH ON DELIVERY</p>
              </div>
            </div>

            <button type='submit' className='w-full bg-[#96c138] text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#86af32] transition-colors shadow-md'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder