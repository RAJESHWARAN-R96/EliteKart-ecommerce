import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextInstance'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Cart = () => {

  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }

  }, [cartItems, products])

  return (
    <div className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#fbfaf5] pt-14 pb-24 min-h-[80vh]'>

      <div className='mb-12'>
        <h2 className="text-4xl md:text-5xl font-black text-gray-950 uppercase tracking-tighter">
          YOUR CART
        </h2>
      </div>

      <div className='flex flex-col lg:flex-row gap-10'>
        {/* Cart Items List */}
        <div className='flex-1'>
          {
            cartData.length === 0 ? <div className='bg-white rounded-2xl p-10 text-center border border-[#e6e4d9]'>
              <p className='text-xl text-gray-500 font-medium'>Your cart is empty.</p>
            </div> :
              cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);

                if (!productData) return null;

                return (
                  <div key={index} className='bg-white rounded-2xl p-4 sm:p-6 border border-[#e6e4d9] mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-md transition-shadow'>
                    <div className='flex items-start gap-6 flex-1'>
                      <img className='w-20 sm:w-24 rounded-lg object-cover bg-gray-100 aspect-[3/4]' src={productData.image[0]} alt={productData.name} />
                      <div className='flex flex-col justify-between h-full py-1'>
                        <div>
                          <p className='text-lg sm:text-xl font-bold text-gray-900'>{productData.name}</p>
                          <p className='mt-2 inline-block px-3 py-1 bg-[#f4f5f5] text-gray-700 font-medium text-sm rounded-md border border-[#e6e4d9]'>Size: <span className='font-bold'>{item.size}</span></p>
                        </div>
                        <p className='text-xl font-black text-[#1e4b3e] mt-4'>{currency}{productData.price}</p>
                      </div>
                    </div>

                    <div className='flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-10 border-t sm:border-t-0 pt-4 sm:pt-0 border-[#e6e4d9] mt-2 sm:mt-0'>
                      <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border-2 border-[#e6e4d9] rounded-lg max-w-20 px-3 py-2 text-lg font-medium outline-none focus:border-[#96c138] text-center' type="number" min={1} defaultValue={item.quantity} />
                      <div onClick={() => updateQuantity(item._id, item.size, 0)} className='w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center cursor-pointer transition-colors group'>
                        <img className='w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity' src={assets.cross_icon} alt="Remove item" />
                      </div>
                    </div>
                  </div>
                )
              })
          }
        </div>

        {/* Cart Totals Sidebar */}
        <div className='w-full lg:w-[400px] xl:w-[450px] shrink-0'>
          <div className='bg-white rounded-[2rem] p-8 border border-[#e6e4d9] sticky top-24 shadow-sm'>
            <h3 className='text-3xl font-black text-gray-950 uppercase tracking-tight mb-8'>
              CART TOTALS
            </h3>

            <div className='flex flex-col gap-5 text-gray-700 font-medium text-lg'>
              <div className='flex justify-between items-center'>
                <p>Subtotal</p>
                <p className='font-bold text-gray-900'>{currency} {
                  cartData.reduce((acc, item) => {
                    const productInfo = products.find((product) => product._id === item._id);
                    return acc + (productInfo ? productInfo.price * item.quantity : 0);
                  }, 0)
                }.00</p>
              </div>
              <hr className='border-[#e6e4d9]' />
              <div className='flex justify-between items-center'>
                <p>Shipping Fee</p>
                <p className='font-bold text-gray-900'>{currency} {cartData.length === 0 ? 0 : 10}.00</p>
              </div>
              <hr className='border-[#e6e4d9]' />
              <div className='flex justify-between items-center text-xl'>
                <p className='font-bold text-gray-900'>Total</p>
                <p className='font-black text-[#1e4b3e] text-2xl'>{currency} {
                  cartData.length === 0 ? 0 : cartData.reduce((acc, item) => {
                    const productInfo = products.find((product) => product._id === item._id);
                    return acc + (productInfo ? productInfo.price * item.quantity : 0);
                  }, 0) + 10
                }.00</p>
              </div>
            </div>

            <Link to='/place-order' className='block mt-10'>
              <button disabled={cartData.length === 0} className='w-full bg-[#96c138] text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#86af32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md'>
                PROCEED TO CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart