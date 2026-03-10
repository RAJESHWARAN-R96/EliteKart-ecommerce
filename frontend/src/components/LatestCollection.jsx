import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextInstance'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products])

  return (
    <div className='my-10'>
      <div className='text-center py-16'>
        <h2 className="text-5xl md:text-7xl font-black mb-6 text-gray-950 uppercase tracking-tighter">
          LATEST COLLECTIONS
        </h2>
        <p className='w-3/4 m-auto text-sm md:text-lg text-gray-600 font-medium leading-relaxed max-w-2xl'>
          Explore our newest arrivals featuring the latest trends in fashion. Discover premium quality pieces curated to elevate your everyday wardrobe.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection