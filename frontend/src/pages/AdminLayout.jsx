import React from 'react'
import { Outlet, Navigate, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const AdminLayout = ({ adminToken, setAdminToken }) => {
    if (!adminToken) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            {/* Admin Header */}
            <div className='flex items-center justify-between py-4 border-b bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] absolute top-0 left-0 right-0 z-50'>
                <div className='flex items-center gap-3'>
                    <img src={assets.logo_new} className='w-32 sm:w-40' alt="Logo" />
                    <span className='text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-[#1e4b3e] border border-emerald-200 px-2.5 py-0.5 rounded-full'>
                        Admin Panel
                    </span>
                </div>
                <button
                    onClick={() => setAdminToken('')}
                    className='bg-gray-700 text-white px-5 py-2 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-black transition-colors cursor-pointer'>
                    Logout
                </button>
            </div>

            {/* Admin Content Area */}
            <div className='flex flex-col md:flex-row w-full pt-20 h-full flex-grow'>
                {/* Desktop & Tablet Sidebar */}
                <div className='w-full md:w-[22%] lg:w-[18%] md:min-h-screen md:border-r border-b md:border-b-0 bg-white pt-4 md:pt-8'>
                    <div className='flex flex-row md:flex-col gap-2 md:gap-3 text-sm px-2 md:px-0 md:pr-0 overflow-x-auto'>
                        {/* Manage Products Link */}
                        <NavLink
                            to="/admin/products"
                            className={({ isActive }) => `flex items-center gap-3 border border-gray-300 md:border-r-0 px-3.5 py-2.5 rounded-lg md:rounded-l-lg md:rounded-r-none cursor-pointer transition-colors whitespace-nowrap ${isActive ? 'bg-[#96c138]/15 border-[#96c138] text-[#1e4b3e] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                            <svg className='w-5 h-5 shrink-0 text-current' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' />
                            </svg>
                            <p>Manage Products</p>
                        </NavLink>

                        {/* Add Product Link */}
                        <NavLink
                            to="/admin/add-product"
                            className={({ isActive }) => `flex items-center gap-3 border border-gray-300 md:border-r-0 px-3.5 py-2.5 rounded-lg md:rounded-l-lg md:rounded-r-none cursor-pointer transition-colors whitespace-nowrap ${isActive ? 'bg-[#96c138]/15 border-[#96c138] text-[#1e4b3e] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                            <svg className='w-5 h-5 shrink-0 text-current' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
                            </svg>
                            <p>Add Product</p>
                        </NavLink>

                        {/* Queries Link */}
                        <NavLink
                            to="/admin/queries"
                            className={({ isActive }) => `flex items-center gap-3 border border-gray-300 md:border-r-0 px-3.5 py-2.5 rounded-lg md:rounded-l-lg md:rounded-r-none cursor-pointer transition-colors whitespace-nowrap ${isActive ? 'bg-[#96c138]/15 border-[#96c138] text-[#1e4b3e] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                            <svg className='w-5 h-5 shrink-0 text-current' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
                            </svg>
                            <p>Queries</p>
                        </NavLink>
                    </div>
                </div>

                {/* Main Content */}
                <div className='w-full md:w-[78%] lg:w-[82%] mx-auto ml-0 md:ml-6 my-6 md:my-8 text-gray-600 text-base h-full bg-white p-4 sm:p-8 rounded-xl shadow-xs border border-gray-200'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
