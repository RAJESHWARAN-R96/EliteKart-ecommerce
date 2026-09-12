import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { ArrowRight } from 'lucide-react'
import { ShopContext } from '../context/ShopContextInstance'
import axios from 'axios'
import { toast } from 'react-toastify'

const Contact = () => {
  const { backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!agreed) {
        toast.error("Please agree to the privacy policy");
        return;
      }
      const response = await axios.post(backendUrl + '/api/contact/submit', {
        name,
        email,
        subject: "General Inquiry",
        message
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setEmail('');
        setMessage('');
        setAgreed(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#fbfaf5] pt-12 pb-1'>
      {/* Header */}
      <h1 className="text-5xl md:text-7xl font-bold mb-12 text-gray-950 uppercase tracking-tighter">
        CONTACT US
      </h1>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-24">
        {/* Left Column: Info */}
        <div className="lg:w-1/2 flex flex-col gap-8 pt-4">
          <p className="text-gray-800 max-w-md font-medium text-lg leading-relaxed">
            EliteKart conveniently located at the Willms Station area. You can contact us via e-mail, phone or simply walk-in.
          </p>

          <div className="mt-4">
            <div className="flex items-start gap-2 group cursor-pointer mb-2 w-max">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                54709 Willms Station, Suite 350,<br /> Washington, USA
              </h3>
              <ArrowRight className="text-[#96c138] transition-transform group-hover:translate-x-1 mt-1 shrink-0" size={28} strokeWidth={3} />
            </div>
            <p className="text-gray-600 font-medium">Monday – Friday | 10:00 am-5:30 pm</p>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-center gap-2 group cursor-pointer w-max">
              <span className="text-2xl font-bold text-gray-900">+1 (415) 555-0132</span>
              <ArrowRight className="text-[#96c138] transition-transform group-hover:translate-x-1" size={28} strokeWidth={3} />
            </div>

            <div className="flex items-center gap-2 group cursor-pointer w-max">
              <span className="text-2xl font-bold text-gray-900">admin@elitekart.com</span>
              <ArrowRight className="text-[#96c138] transition-transform group-hover:translate-x-1" size={28} strokeWidth={3} />
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-4">
            <div className="bg-gray-200 p-2 hover:bg-gray-300 cursor-pointer transition-colors">
              <Facebook size={24} className="text-gray-800" fill="currentColor" />
            </div>
            <div className="bg-gray-200 p-2 hover:bg-gray-300 cursor-pointer transition-colors border border-gray-400">
              <Instagram size={24} className="text-gray-800" />
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:w-1/2">
          <div className="border border-[#e6e4d9] bg-white p-8 md:p-12 h-full">
            <p className="text-lg font-medium text-gray-800 mb-10">Chat with us or fill out this form:</p>

            <form onSubmit={onSubmitHandler} className="flex flex-col gap-8">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border-0 border-b border-[#e6e4d9] focus:outline-none focus:border-[#96c138] focus:ring-0 text-gray-800 pb-3 placeholder-gray-400 text-base transition-colors rounded-none"
                required
              />

              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-0 border-b border-[#e6e4d9] focus:outline-none focus:border-[#96c138] focus:ring-0 text-gray-800 pb-3 placeholder-gray-400 text-base transition-colors rounded-none"
                required
              />

              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Describe your project/inquiry"
                className="w-full bg-transparent border-0 border-b border-[#e6e4d9] focus:outline-none focus:border-[#96c138] focus:ring-0 text-gray-800 pb-3 placeholder-gray-400 text-base resize-none h-24 transition-colors rounded-none"
                required
              ></textarea>

              <div className="flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 text-[#96c138] focus:ring-[#96c138] border-[#e6e4d9] rounded"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-gray-500">
                  By submitting this form, you agree to our <Link to="/privacy-policy" className="text-[#96c138] hover:text-[#86af32] hover:underline font-medium transition-colors">Privacy Policy</Link>.
                </label>
              </div>

              <button
                type="submit"
                className="bg-[#96c138] hover:bg-[#86af32] text-white font-semibold text-lg px-10 py-3 w-max transition-colors mt-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-32 mb-20">
        <h2 className="text-5xl md:text-7xl font-bold mb-12 text-gray-950 uppercase tracking-tighter">
          HOW TO FIND US
        </h2>

        <div className="w-full h-[400px] md:h-[500px] bg-gray-200 relative mb-4 overflow-hidden border border-[#e6e4d9]">
          <img
            src={assets.map}
            alt="Map pointing to store location"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute bottom-6 left-6 bg-[#96c138] text-white px-5 py-2 font-medium cursor-pointer hover:bg-[#86af32] transition-colors">
            Open in google maps
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Placeholders for building images from asset folder */}
          <div className="w-full h-56 bg-gray-200 overflow-hidden">
            <img src={assets.store0} className="w-full h-full object-cover transition-all duration-500" alt="Building exterior" />
          </div>
          <div className="w-full h-56 bg-gray-200 overflow-hidden">
            <img src={assets.store1} className="w-full h-full object-cover transition-all duration-500" alt="Building interior" />
          </div>
          <div className="w-full h-56 bg-gray-200 overflow-hidden">
            <img src={assets.store2} className="w-full h-full object-cover transition-all duration-500" alt="Store front" />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact