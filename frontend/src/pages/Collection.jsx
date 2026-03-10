import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContextInstance';
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const ToggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const ToggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#fbfaf5] pt-12 pb-20'>

      <div className='flex flex-col sm:flex-row gap-8 sm:gap-14 pt-10'>
        {/* Filter Options */}
        <div className='min-w-60 bg-white rounded-[2rem] p-6 lg:p-8 border border-[#e6e4d9] h-fit sticky top-24 shadow-sm'>
          <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-2xl font-black uppercase tracking-tighter flex items-center justify-between cursor-pointer text-gray-950 mb-6'>
            FILTERS
            <img className={`h-4 sm:hidden transition-all ${showFilter ? 'rotate-90' : ''}`} src={assets.right_arrow_icon} alt="Toggle Filters" />
          </p>

          {/* Category Filter */}
          <div className={`mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-4 text-sm font-bold text-gray-900 uppercase tracking-widest'>CATEGORIES</p>
            <div className='flex flex-col gap-3 text-base font-medium text-gray-700'>
              <p className='flex gap-3 items-center'>
                <input className='w-4 h-4 accent-[#96c138]' type="checkbox" value={'Men'} onChange={ToggleCategory} /> Men
              </p>
              <p className='flex gap-3 items-center'>
                <input className='w-4 h-4 accent-[#96c138]' type="checkbox" value={'Women'} onChange={ToggleCategory} /> Women
              </p>
              <p className='flex gap-3 items-center'>
                <input className='w-4 h-4 accent-[#96c138]' type="checkbox" value={'Kids'} onChange={ToggleCategory} /> Children
              </p>
            </div>
          </div>

          <hr className='my-6 border-[#e6e4d9]' />

          {/* Type Filter */}
          <div className={`${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-4 text-sm font-bold text-gray-900 uppercase tracking-widest'>TYPE</p>
            <div className='flex flex-col gap-3 text-base font-medium text-gray-700'>
              <p className='flex gap-3 items-center'>
                <input className='w-4 h-4 accent-[#96c138]' type="checkbox" value={'Topwear'} onChange={ToggleSubCategory} /> Topwear
              </p>
              <p className='flex gap-3 items-center'>
                <input className='w-4 h-4 accent-[#96c138]' type="checkbox" value={'Bottomwear'} onChange={ToggleSubCategory} /> Bottomwear
              </p>
              <p className='flex gap-3 items-center'>
                <input className='w-4 h-4 accent-[#96c138]' type="checkbox" value={'Winterwear'} onChange={ToggleSubCategory} /> Winterwear
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='flex-1'>

          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center text-base sm:text-2xl mb-12 gap-4'>
            <h2 className="text-5xl md:text-6xl font-black text-gray-950 uppercase tracking-tighter">
              ALL COLLECTIONS
            </h2>
            {/* Product Sort */}
            <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-[#e6e4d9] rounded-full text-sm font-medium px-4 py-3 bg-white focus:outline-none focus:border-[#96c138] cursor-pointer'>
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Map Products */}
          <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {
              filterProducts.map((item, index) => (
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
              ))
            }
          </div>
        </div>

      </div>
    </div>
  );
}

export default Collection;