import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#fbfaf5] pt-20 pb-8 border-t border-[#e6e4d9]'>
      <div className='flex flex-col md:grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-14 mb-16'>

        {/* Brand Section */}
        <div className='flex flex-col items-start'>
          <img src={assets.logo_new} className='mb-6 w-36 object-contain' alt="Forever Logo" />
          <p className='w-full md:w-4/5 text-gray-600 text-base leading-relaxed mb-8'>
            EliteKart exists to empower your lifestyle with premium quality, convenience, and unparalleled customer service. Experience the new standard of e-commerce today.
          </p>
          <div className='flex items-center gap-4'>
            <div className='w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#96c138] hover:border-[#96c138] hover:text-white transition-all cursor-pointer text-gray-600'>
              <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/>
              </svg>
            </div>
            <div className='w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#96c138] hover:border-[#96c138] hover:text-white transition-all cursor-pointer text-gray-600'>
              <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'/>
              </svg>
            </div>
            <div className='w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#96c138] hover:border-[#96c138] hover:text-white transition-all cursor-pointer text-gray-600'>
              <svg className='w-4 h-4 fill-none stroke-current stroke-2' viewBox='0 0 24 24' strokeLinecap='round' strokeLinejoin='round'>
                <rect width='20' height='20' x='2' y='2' rx='5' ry='5'/>
                <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'/>
                <line x1='17.5' x2='17.51' y1='6.5' y2='6.5'/>
              </svg>
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider'>Company</h3>
          <ul className='flex flex-col gap-3 text-gray-600 font-medium'>
            <li><Link to='/' className='hover:text-[#96c138] transition-colors'>Home</Link></li>
            <li><Link to='/about' className='hover:text-[#96c138] transition-colors'>About us</Link></li>
            <li><Link to='/delivery' className='hover:text-[#96c138] transition-colors'>Delivery</Link></li>
            <li><Link to='/privacy-policy' className='hover:text-[#96c138] transition-colors'>Privacy policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider'>Get In Touch</h3>
          <ul className='flex flex-col gap-3 text-gray-600 font-medium'>
            <li className='hover:text-[#96c138] cursor-pointer transition-colors'>+1 (415) 555-0132</li>
            <li className='hover:text-[#96c138] cursor-pointer transition-colors'>admin@elitekart.com</li>
            <li className='mt-2 text-sm text-gray-500 leading-relaxed'>
              54709 Willms Station, Suite 350 <br />
              Washington, USA
            </li>
          </ul>
        </div>

      </div>

      <div className='border-t border-[#e6e4d9] pt-8 flex flex-col md:flex-row items-center justify-between gap-4'>
        <p className='text-sm text-gray-500 font-medium text-center md:text-left'>
          Copyright © 2024 Forever. All Rights Reserved.
        </p>
        <div className='flex gap-6 text-sm text-gray-500 font-medium'>
          <Link to='/terms' className='hover:text-[#96c138] cursor-pointer transition-colors'>Terms of Service</Link>
          <Link to='/cookie-settings' className='hover:text-[#96c138] cursor-pointer transition-colors'>Cookie Settings</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer