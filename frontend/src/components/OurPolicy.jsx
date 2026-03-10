import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 text-center py-20 px-4 sm:px-0'>

      <div className='bg-white border border-[#e6e4d9] rounded-[2rem] p-10 md:p-14 hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md'>
        <img src={assets.exchange_icon} className='w-14 m-auto mb-6 opacity-80' alt="" />
        <h3 className='text-xl md:text-2xl font-bold mb-3 text-gray-900'>Easy Exchange</h3>
        <p className='text-gray-500 font-medium'>We offer a hassle-free exchange policy for all items.</p>
      </div>

      <div className='bg-white border border-[#e6e4d9] rounded-[2rem] p-10 md:p-14 hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md'>
        <img src={assets.quality_icon} className='w-14 m-auto mb-6 opacity-80' alt="" />
        <h3 className='text-xl md:text-2xl font-bold mb-3 text-gray-900'>7 Days Return</h3>
        <p className='text-gray-500 font-medium'>We provide a 7-day return policy for peace of mind.</p>
      </div>

      <div className='bg-white border border-[#e6e4d9] rounded-[2rem] p-10 md:p-14 hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md'>
        <img src={assets.support_icon} className='w-14 m-auto mb-6 opacity-80' alt="" />
        <h3 className='text-xl md:text-2xl font-bold mb-3 text-gray-900'>Best Support</h3>
        <p className='text-gray-500 font-medium'>We provide 24/7 world-class customer support.</p>
      </div>

    </div>
  )
}

export default OurPolicy