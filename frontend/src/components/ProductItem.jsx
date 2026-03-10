import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContextInstance'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {

  const { currency } = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer group flex flex-col h-full bg-white rounded-2xl p-4 border border-[#e6e4d9] hover:shadow-lg transition-all duration-300' to={`/product/${id}`}>
      <div className='overflow-hidden rounded-xl bg-gray-100 aspect-[3/4] mb-4'>
        <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' src={image[0]} alt={name} />
      </div>
      <div className='flex flex-col flex-1 justify-between'>
        <p className='pt-1 pb-2 text-base font-bold text-gray-900 leading-tight group-hover:text-[#96c138] transition-colors'>{name}</p>
        <p className='text-lg font-black text-[#1e4b3e]'>{currency}{price}</p>
      </div>
    </Link>
  )
}

export default ProductItem