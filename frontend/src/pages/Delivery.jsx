import React from 'react'
import { MapPin, Globe, ShoppingCart, Package, Truck, Box, Check, Phone, Clock } from 'lucide-react'

const Delivery = () => {
    return (
        <div className="bg-white font-sans text-gray-800 -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] overflow-x-hidden">
            {/* Hero Section */}
            <div
                className="relative w-full h-[700px] md:h-[700px] bg-cover bg-center flex flex-col justify-center"
                style={{ backgroundImage: "url('/delivery_hero_bg.png')" }}
            >
                {/* Floating Contact Widgets */}
                <div className="absolute top-0 left-0 w-full pt-6 md:pt-10 flex flex-col sm:flex-row gap-2 sm:gap-6 z-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] justify-center md:justify-start">
                    <div className="flex items-center gap-2 md:gap-3 bg-white/30 backdrop-blur-md px-4 md:px-5 py-2 md:py-3 rounded-full border border-white/50 text-gray-900 shadow-lg w-max mx-auto md:mx-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-400 bg-white/60 flex items-center justify-center">
                            <Phone size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs text-gray-800 font-bold uppercase tracking-wider mb-0">Call 24/7:</p>
                            <p className="text-xs md:text-sm font-black m-0 tracking-widest">+1 (415) 555-0132</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 bg-white/30 backdrop-blur-md px-4 md:px-5 py-2 md:py-3 rounded-full border border-white/50 text-gray-900 shadow-lg w-max mx-auto md:mx-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-400 bg-white/60 flex items-center justify-center">
                            <Clock size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs text-gray-800 font-bold uppercase tracking-wider mb-0">Open Hours:</p>
                            <p className="text-xs md:text-sm font-black m-0 tracking-widest">Weekdays 8.00-18.00</p>
                        </div>
                    </div>
                </div>

                {/* Gradients to make the text on the right readable despite a bright image */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 md:from-white/20 via-white/80 to-white/95 mix-blend-lighten"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent md:bg-none"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-white/90 hidden md:block"></div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex justify-center md:justify-end mt-20 md:mt-0">
                    <div className="w-full sm:w-4/5 md:w-1/2 lg:w-5/12 text-center md:text-left bg-white/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 md:p-0 rounded-3xl border border-white/40 md:border-none shadow-xl md:shadow-none">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-800 tracking-tight mb-2 uppercase drop-shadow-sm">FIND OUT WHY WE'RE</h3>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 md:mb-6 uppercase text-gray-900 leading-none drop-shadow-sm">
                            <span className="text-[#96c138]">#1</span> DELIVERY CO.
                        </h1>
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-medium">
                            <strong className="text-gray-900">EliteKart Delivery</strong> is a premium logistics team with experts and professionals, who cater to customer needs with safety, care, and speed. <br className="hidden md:block" /><br className="hidden md:block" /> Call us now: <strong className="text-gray-900 tracking-wider whitespace-nowrap">+1 (415) 555-0132</strong>
                        </p>
                        <button className="w-full md:w-auto bg-[#96c138] hover:bg-[#86ad32] text-white px-8 py-4 rounded font-bold uppercase tracking-wider transition-colors shadow-lg shadow-[#96c138]/30">
                            TRACK ORDER
                        </button>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm mb-2">Welcome To</p>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-4 md:mb-6">Our Services</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                        With an elite logistics team, we provide the following services at affordable rates to suit your pocket and soothe your mind.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 gap-y-12 md:gap-y-16">
                    {/* Service 1 */}
                    <div className="text-center flex flex-col items-center group">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg shadow-xl shadow-gray-200 border border-gray-100 flex items-center justify-center text-[#96c138] mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                            <MapPin size={24} className="md:w-7 md:h-7" />
                        </div>
                        <h4 className="font-extrabold text-base md:text-lg text-gray-900 uppercase tracking-wide mb-2 md:mb-3">Local Delivery</h4>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed px-2 md:px-4">We'll happily transport your items from our warehouse directly to your neighborhood.</p>
                    </div>
                    {/* Service 2 */}
                    <div className="text-center flex flex-col items-center group">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg shadow-xl shadow-gray-200 border border-gray-100 flex items-center justify-center text-[#96c138] mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                            <Globe size={24} className="md:w-7 md:h-7" />
                        </div>
                        <h4 className="font-extrabold text-base md:text-lg text-gray-900 uppercase tracking-wide mb-2 md:mb-3">National Shipping</h4>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed px-2 md:px-4">EliteKart will make your long distance order deliveries smooth and stress-free.</p>
                    </div>
                    {/* Service 3 */}
                    <div className="text-center flex flex-col items-center group">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg shadow-xl shadow-gray-200 border border-gray-100 flex items-center justify-center text-[#96c138] mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                            <ShoppingCart size={24} className="md:w-7 md:h-7" />
                        </div>
                        <h4 className="font-extrabold text-base md:text-lg text-gray-900 uppercase tracking-wide mb-2 md:mb-3">Bundle Kits</h4>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed px-2 md:px-4">We offer several different product bundles so you don't have to worry about the details.</p>
                    </div>
                    {/* Service 4 */}
                    <div className="text-center flex flex-col items-center group">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg shadow-xl shadow-gray-200 border border-gray-100 flex items-center justify-center text-[#96c138] mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                            <Package size={24} className="md:w-7 md:h-7" />
                        </div>
                        <h4 className="font-extrabold text-base md:text-lg text-gray-900 uppercase tracking-wide mb-2 md:mb-3">Secure Storage</h4>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed px-2 md:px-4">Sometimes you just can't take everything at once. We offer secure hold-at-location services.</p>
                    </div>
                    {/* Service 5 */}
                    <div className="text-center flex flex-col items-center group">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg shadow-xl shadow-gray-200 border border-gray-100 flex items-center justify-center text-[#96c138] mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                            <Box size={24} className="md:w-7 md:h-7" />
                        </div>
                        <h4 className="font-extrabold text-base md:text-lg text-gray-900 uppercase tracking-wide mb-2 md:mb-3">Premium Packaging</h4>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed px-2 md:px-4">We have all the packing supplies, including reinforced boxes, packing tape and bubble wrap.</p>
                    </div>
                    {/* Service 6 */}
                    <div className="text-center flex flex-col items-center group">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg shadow-xl shadow-gray-200 border border-gray-100 flex items-center justify-center text-[#96c138] mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                            <Truck size={24} className="md:w-7 md:h-7" />
                        </div>
                        <h4 className="font-extrabold text-base md:text-lg text-gray-900 uppercase tracking-wide mb-2 md:mb-3">Loading / Unloading</h4>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed px-2 md:px-4">We allow our customers to utilize white-glove truck loading layout and unloading.</p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 relative border-t border-gray-200 pb-16 md:pb-0 font-sans mt-8 md:mt-0">
                {/* Simulated faint brick pattern using CSS radial gradient */}
                <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-12 md:py-16 flex flex-col md:flex-row gap-8 md:gap-12 items-center relative z-10">

                    <div className="w-full md:w-1/2 pt-4 md:pt-10 text-center md:text-left">
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-sm mb-2 flex flex-col sm:flex-row items-center md:items-baseline justify-center md:justify-start gap-1 md:gap-2">
                            <span className="text-[#96c138] text-5xl md:text-6xl font-black leading-none drop-shadow-sm">HI</span>
                            <span className="relative sm:bottom-4 whitespace-nowrap">WELCOME TO THE</span>
                        </p>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-6 md:mb-8">BEST MOVERS</h2>

                        <p className="text-gray-500 leading-relaxed mb-4 md:mb-6 font-medium text-sm md:text-lg">
                            You may see many delivery companies, so why choose us? Let us tell you our special features...
                        </p>

                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 text-justify md:text-left mx-auto md:mx-0 max-w-md md:max-w-none">
                            <strong className="text-gray-900">EliteKart</strong> located in Washington; one of the major hubs. We are a one-stop solution to all your moving problems. From packing to relocating, we offer all that you have in mind when you think of premium moving.
                        </p>

                        <div className="space-y-3 md:space-y-4 max-w-sm mx-auto md:mx-0 text-left">
                            <div className="flex items-center gap-3 bg-white md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none shadow-sm md:shadow-none border border-gray-100 md:border-none">
                                <Check size={20} className="text-[#96c138] flex-shrink-0" />
                                <span className="text-gray-600 text-xs md:text-sm font-medium">Your requirement is our wish</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none shadow-sm md:shadow-none border border-gray-100 md:border-none">
                                <Check size={20} className="text-[#96c138] flex-shrink-0" />
                                <span className="text-gray-600 text-xs md:text-sm font-medium">Moving is quick and easy</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none shadow-sm md:shadow-none border border-gray-100 md:border-none">
                                <Check size={20} className="text-[#96c138] flex-shrink-0" />
                                <span className="text-gray-600 text-xs md:text-sm font-medium">We are highly affordable</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0 px-4 md:px-0">
                        <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md mx-auto">
                            <div className="absolute -inset-4 bg-[#96c138]/20 rounded-full blur-2xl md:blur-3xl opacity-50"></div>
                            <img
                                src="/delivery_worker.png"
                                alt="Delivery Worker"
                                className="w-full object-cover rounded-3xl md:rounded-[2rem] shadow-xl md:shadow-2xl shadow-gray-400/50 border-4 md:border-[6px] border-white relative z-10 transform hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Delivery
