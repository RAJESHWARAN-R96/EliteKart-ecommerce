import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextInstance'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center py-16'>
                <h2 className="text-5xl md:text-7xl font-black mb-6 text-gray-950 uppercase tracking-tighter">
                    BEST SELLERS
                </h2>
                <p className="w-3/4 m-auto text-sm md:text-lg text-gray-600 font-medium leading-relaxed max-w-2xl">
                    Discover our most coveted pieces, handpicked by our community. These top-rated styles define modern elegance and unmatched quality.
                </p>
            </div>
            <div className='grid grid cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller;