import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const AdminLayout = ({ adminToken, setAdminToken }) => {
    if (!adminToken) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            {/* Admin Header */}
            <div className='flex items-center justify-between py-4 border-b bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] absolute top-0 left-0 right-0 z-50'>
                <img src={assets.logo_new} className='w-32 sm:w-40' alt="Logo" />
                <button
                    onClick={() => setAdminToken('')}
                    className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-black transition-colors'>
                    Logout
                </button>
            </div>

            {/* Admin Content Area */}
            <div className='flex w-full pt-20 h-full flex-grow'>
                {/* Sidebar */}
                <div className='w-[18%] min-h-screen border-r bg-white pt-8 hidden md:block'>
                    <div className='flex flex-col gap-4 text-[15px]'>
                        <a href="/admin/add-product" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l cursor-pointer hover:bg-gray-50'>
                            <img className='w-5 h-5' src={assets.add_icon} alt="" />
                            <p className='hidden md:block'>Add Items</p>
                        </a>
                        <a href="/admin/queries" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l cursor-pointer hover:bg-gray-50'>
                            <img className='w-5 h-5' src={assets.order_icon} alt="" />
                            <p className='hidden md:block'>Queries</p>
                        </a>
                    </div>
                </div>

                {/* Main Content */}
                <div className='w-full md:w-[82%] mx-auto ml-0 sm:ml-5 my-8 text-gray-600 text-base h-full bg-white p-8 rounded shadow-sm border border-gray-200'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
