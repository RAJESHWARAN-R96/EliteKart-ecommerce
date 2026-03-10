import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextInstance'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#fbfaf5] pt-14 pb-24 min-h-[80vh]'>

      <div className='mb-12'>
        <h2 className="text-4xl md:text-5xl font-black text-gray-950 uppercase tracking-tighter">
          YOUR ORDERS
        </h2>
      </div>

      <div className='flex flex-col gap-6'>
        {
          orderData.length === 0 ? <div className='bg-white rounded-2xl p-10 text-center border border-[#e6e4d9]'>
            <p className='text-xl text-gray-500 font-medium'>You have no orders yet.</p>
          </div> :

            orderData.map((item, index) => (
              <div key={index} className='bg-white rounded-2xl p-6 border border-[#e6e4d9] flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:shadow-md transition-shadow'>
                <div className='flex items-start gap-6'>
                  <img className='w-24 sm:w-28 rounded-lg object-cover bg-gray-100 aspect-[3/4]' src={item.image && item.image[0]} alt="" />
                  <div className='flex flex-col justify-between py-1 h-full'>
                    <p className='text-xl sm:text-2xl font-bold text-gray-900'>{item.name}</p>

                    <div className='flex flex-wrap items-center gap-4 mt-3 text-gray-700 font-medium'>
                      <p className='text-[#1e4b3e] font-black text-xl'>{currency}{item.price}</p>
                      <p className='bg-[#f4f5f5] px-3 py-1 rounded-md border border-[#e6e4d9] text-sm'>Qty: <span className='font-bold'>{item.quantity}</span></p>
                      <p className='bg-[#f4f5f5] px-3 py-1 rounded-md border border-[#e6e4d9] text-sm'>Size: <span className='font-bold'>{item.size}</span></p>
                    </div>

                    <div className='mt-4 text-sm text-gray-600 font-medium space-y-1'>
                      <p>Date: <span className='text-gray-900 font-bold'>{new Date(item.date).toDateString()}</span></p>
                      <p>Payment: <span className='text-gray-900 font-bold uppercase'>{item.paymentMethod}</span></p>
                    </div>
                  </div>
                </div>

                <div className='md:w-1/3 flex flex-col items-end gap-4'>
                  <div className='flex items-center gap-3 bg-[#fdfdfc] px-4 py-2 rounded-lg border border-[#e6e4d9]'>
                    <p className='min-w-3 h-3 rounded-full bg-[#96c138]'></p>
                    <p className='text-base font-bold text-gray-800'>{item.status}</p>
                  </div>
                  <button onClick={loadOrderData} className='w-full md:w-auto mt-2 bg-transparent text-gray-900 font-bold px-6 py-3 border-2 border-gray-900 rounded-xl hover:bg-gray-900 hover:text-white transition-colors'>
                    Track Order
                  </button>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default Orders