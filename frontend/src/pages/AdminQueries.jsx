import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContextInstance'
import { toast } from 'react-toastify'

const AdminQueries = ({ adminToken }) => {
    const { backendUrl } = useContext(ShopContext)
    const [queries, setQueries] = useState([])

    const fetchQueries = async () => {
        try {
            if (!adminToken) return null;

            const response = await axios.get(backendUrl + '/api/contact/list', {
                headers: { token: adminToken }
            })

            if (response.data.success) {
                setQueries(response.data.contacts.reverse())
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchQueries()
    }, [adminToken])

    return (
        <div className='flex flex-col w-full h-full'>
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>Customer Queries</h2>

            {queries.length === 0 ? (
                <div className='flex flex-col items-center justify-center h-64 text-gray-500'>
                    <p className='text-lg'>No queries found.</p>
                </div>
            ) : (
                <div className='flex flex-col gap-4 overflow-y-auto pr-2'>
                    {queries.map((query, index) => (
                        <div key={index} className='border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-sm'>
                            <div className='flex justify-between items-start mb-2'>
                                <div>
                                    <h3 className='font-bold text-lg text-gray-900'>{query.name}</h3>
                                    <a href={`mailto:${query.email}`} className='text-sm text-[#96c138] hover:underline'>{query.email}</a>
                                </div>
                                <span className='text-xs text-gray-500 bg-white px-3 py-1 border rounded-full font-medium'>
                                    {new Date(query.date).toLocaleDateString()}
                                </span>
                            </div>
                            <p className='text-sm font-semibold text-gray-700 mt-4 mb-1'>{query.subject}</p>
                            <div className='bg-white p-4 rounded border border-gray-100 mt-2 text-gray-600 text-sm whitespace-pre-wrap leading-relaxed'>
                                {query.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminQueries
