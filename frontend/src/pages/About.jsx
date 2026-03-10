import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#fbfaf5] pt-12 pb-1'>
      {/* Header */}
      <h1 className="text-5xl md:text-7xl font-bold mb-12 text-gray-950 uppercase tracking-tighter">
        ABOUT US
      </h1>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-24">
        {/* Left Column: Image */}
        <div className="lg:w-1/2">
          <div className="w-full h-auto aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-full bg-gray-200 overflow-hidden border border-[#e6e4d9] lg:min-h-[400px] rounded-[2rem]">
            <img src={assets.aboutus} className="w-full h-full object-cover transition-all duration-500" alt="About us" />
          </div>
        </div>

        {/* Right Column: Text */}
        <div className="lg:w-1/2 flex flex-col gap-8 pt-4">
          <p className="text-gray-800 text-lg leading-relaxed font-medium">
            EliteKart was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </p>
          <p className="text-gray-600 text-base leading-relaxed">
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
          </p>

          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-32 mb-20 bg-[#f4f5f5] py-12 md:py-20 px-6 md:px-16 rounded-[2.5rem] relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none flex flex-col leading-none opacity-[0.04]">
          <span className="text-[150px] md:text-[280px] font-black text-[#1e4b3e] whitespace-nowrap -ml-8 tracking-tighter">Why Choose</span>
          <span className="text-[150px] md:text-[280px] font-black text-[#1e4b3e] whitespace-nowrap -ml-24 tracking-tighter">Forever?</span>
          <span className="text-[150px] md:text-[280px] font-black text-[#1e4b3e] whitespace-nowrap overflow-visible -ml-4 tracking-tighter">Why Choose</span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-[5rem] font-black mb-16 text-black tracking-tighter leading-none">
            Why Choose <br /> EliteKart?
          </h2>

          <div className="flex flex-col gap-8">
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-stretch min-h-[300px]">
              <div className="w-full md:w-1/2 rounded-[2rem] overflow-hidden">
                <img src={assets.about1} alt="Quality" className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 bg-white rounded-[2rem] p-10 md:p-14 flex flex-col justify-center">
                <h3 className="text-[1.75rem] font-black text-black mb-4 tracking-tight">Quality Assurance:</h3>
                <p className="text-gray-800 text-sm md:text-base font-medium leading-relaxed max-w-md">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-stretch min-h-[300px]">
              <div className="w-full md:w-1/2 rounded-[2rem] overflow-hidden">
                <img src={assets.about2} alt="Convenience" className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 bg-white rounded-[2rem] p-10 md:p-14 flex flex-col justify-center">
                <h3 className="text-[1.75rem] font-black text-black mb-4 tracking-tight">Convenience:</h3>
                <p className="text-gray-800 text-sm md:text-base font-medium leading-relaxed max-w-md">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-stretch min-h-[300px]">
              <div className="w-full md:w-1/2 rounded-[2rem] overflow-hidden">
                <img src={assets.about3} alt="Service" className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 bg-white rounded-[2rem] p-10 md:p-14 flex flex-col justify-center">
                <h3 className="text-[1.75rem] font-black text-black mb-4 tracking-tight">Exceptional Service:</h3>
                <p className="text-gray-800 text-sm md:text-base font-medium leading-relaxed max-w-md">Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About