import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row bg-[#e6e4d9] rounded-[2rem] overflow-hidden mb-20'>

      {/* Hero Left Side - Text Content */}
      <div className='w-full sm:w-1/2 flex items-center justify-center p-12 sm:p-16 lg:p-24 bg-[#f4f5f5]'>
        <div className='text-[#1e4b3e]'>

          <div className='flex items-center gap-3 mb-4'>
            <p className='w-10 md:w-14 h-[3px] bg-[#96c138]'></p>
            <p className='font-bold text-sm md:text-base tracking-widest uppercase text-gray-500'>OUR BESTSELLERS</p>
          </div>

          <h1 className='text-6xl sm:text-7xl lg:text-[6rem] font-black leading-none mb-8 tracking-tighter'>
            Latest <br /> Arrivals
          </h1>

          <div className='flex items-center gap-4 group cursor-pointer'>
            <p className='font-bold text-base md:text-lg text-[#1e4b3e] group-hover:text-[#96c138] transition-colors'>SHOP NOW</p>
            <p className='w-10 md:w-14 h-[2px] bg-[#1e4b3e] group-hover:bg-[#96c138] transition-colors'></p>
          </div>

        </div>
      </div>

      {/* Hero Right Side - Image */}
      <div className='w-full sm:w-1/2 relative min-h-[400px]'>
        <img className='absolute inset-0 w-full h-full object-cover' src={assets.hero_img} alt="Latest Arrivals Hero" />
      </div>

    </div>
  );
}

export default Hero;