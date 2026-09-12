import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContextInstance'
import { assets } from '../assets/assets'

const AdminManageProducts = ({ adminToken }) => {
    const { backendUrl, currency, getProductsData } = useContext(ShopContext)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    // Delete modal state
    const [productToDelete, setProductToDelete] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(false)

    // Edit modal state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [editName, setEditName] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editPrice, setEditPrice] = useState('')
    const [editCategory, setEditCategory] = useState('Men')
    const [editSubCategory, setEditSubCategory] = useState('Topwear')
    const [editBestseller, setEditBestseller] = useState(false)
    const [editSizes, setEditSizes] = useState([])
    const [existingImages, setExistingImages] = useState([])
    const [newImage1, setNewImage1] = useState(null)
    const [newImage2, setNewImage2] = useState(null)
    const [newImage3, setNewImage3] = useState(null)
    const [newImage4, setNewImage4] = useState(null)
    const [saveLoading, setSaveLoading] = useState(false)

    const fetchAdminProducts = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${backendUrl}/api/product/list?t=${Date.now()}`)
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message || 'Failed to load products')
            }
        } catch (error) {
            console.error('Error fetching products:', error)
            toast.error(error.message || 'Failed to fetch products')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAdminProducts()
    }, [backendUrl])

    // Filter products by search and category
    const filteredProducts = products.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.subCategory && item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    // Open Edit Modal
    const handleOpenEdit = (product) => {
        setEditingProduct(product)
        setEditName(product.name || '')
        setEditDescription(product.description || '')
        setEditPrice(product.price || '')
        setEditCategory(product.category || 'Men')
        setEditSubCategory(product.subCategory || 'Topwear')
        setEditBestseller(Boolean(product.bestseller))
        setEditSizes(Array.isArray(product.sizes) ? [...product.sizes] : [])
        setExistingImages(Array.isArray(product.image) ? [...product.image] : [])
        setNewImage1(null)
        setNewImage2(null)
        setNewImage3(null)
        setNewImage4(null)
        setIsEditModalOpen(true)
    }

    // Toggle size selection in edit form
    const toggleEditSize = (size) => {
        setEditSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
    }

    // Remove an existing image from editing product
    const handleRemoveExistingImage = (indexToRemove) => {
        setExistingImages(prev => prev.filter((_, idx) => idx !== indexToRemove))
    }

    // Submit product update
    const handleUpdateProduct = async (e) => {
        e.preventDefault()
        if (!editingProduct) return

        if (existingImages.length === 0 && !newImage1 && !newImage2 && !newImage3 && !newImage4) {
            toast.warning('Product must have at least one image.')
            return
        }

        setSaveLoading(true)
        try {
            const formData = new FormData()
            formData.append('id', editingProduct._id)
            formData.append('name', editName)
            formData.append('description', editDescription)
            formData.append('price', editPrice)
            formData.append('category', editCategory)
            formData.append('subCategory', editSubCategory)
            formData.append('bestseller', editBestseller)
            formData.append('sizes', JSON.stringify(editSizes))
            formData.append('existingImages', JSON.stringify(existingImages))

            if (newImage1) formData.append('image1', newImage1)
            if (newImage2) formData.append('image2', newImage2)
            if (newImage3) formData.append('image3', newImage3)
            if (newImage4) formData.append('image4', newImage4)

            const response = await axios.post(
                `${backendUrl}/api/product/update`,
                formData,
                { headers: { token: adminToken } }
            )

            if (response.data.success) {
                toast.success(response.data.message || 'Product updated successfully!')
                setIsEditModalOpen(false)
                setEditingProduct(null)
                // Refresh local product list and global context
                await fetchAdminProducts()
                if (getProductsData) getProductsData()
            } else {
                toast.error(response.data.message || 'Failed to update product')
            }
        } catch (error) {
            console.error('Update product error:', error)
            toast.error(error.message || 'Error updating product')
        } finally {
            setSaveLoading(false)
        }
    }

    // Execute product deletion
    const handleConfirmDelete = async () => {
        if (!productToDelete) return
        setDeleteLoading(true)

        try {
            const response = await axios.post(
                `${backendUrl}/api/product/remove`,
                { id: productToDelete._id },
                { headers: { token: adminToken } }
            )

            if (response.data.success) {
                toast.success(response.data.message || 'Product removed successfully')
                setProducts(prev => prev.filter(p => p._id !== productToDelete._id))
                setProductToDelete(null)
                if (getProductsData) getProductsData()
            } else {
                toast.error(response.data.message || 'Failed to delete product')
            }
        } catch (error) {
            console.error('Delete product error:', error)
            toast.error(error.message || 'Failed to remove product')
        } finally {
            setDeleteLoading(false)
        }
    }

    return (
        <div className='flex flex-col w-full'>
            {/* Top Bar / Header */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200'>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>Manage Products</h2>
                    <p className='text-sm text-gray-500 mt-0.5'>
                        View, edit, or delete existing products from your store catalog.
                    </p>
                </div>
                <Link
                    to='/admin/add-product'
                    className='inline-flex items-center gap-2 bg-[#96c138] hover:bg-[#86af32] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M12 4v16m8-8H4' />
                    </svg>
                    Add Product
                </Link>
            </div>

            {/* Filter & Search Bar */}
            <div className='flex flex-col md:flex-row gap-4 my-6 items-center justify-between'>
                <div className='relative w-full md:w-80'>
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search by product name...'
                        className='w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#96c138] bg-gray-50/50'
                    />
                    <svg className='w-4 h-4 absolute left-3.5 top-3 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                    </svg>
                </div>

                <div className='flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0'>
                    {['All', 'Men', 'Women', 'Kids', 'Children'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${selectedCategory === cat ? 'bg-[#96c138] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            {cat}
                        </button>
                    ))}
                    <span className='ml-2 text-xs font-semibold text-gray-400'>
                        {filteredProducts.length} items
                    </span>
                </div>
            </div>

            {/* Product List Content */}
            {loading ? (
                <div className='flex flex-col items-center justify-center py-24'>
                    <div className='w-10 h-10 border-4 border-[#96c138] border-t-transparent rounded-full animate-spin'></div>
                    <p className='text-sm text-gray-500 mt-4'>Loading products...</p>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300'>
                    <svg className='w-12 h-12 text-gray-400 mb-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
                    </svg>
                    <p className='text-gray-600 font-semibold'>No products found</p>
                    <p className='text-xs text-gray-400 mt-1'>Try adjusting your search query or category filter</p>
                </div>
            ) : (
                <div className='overflow-x-auto border border-gray-200 rounded-xl shadow-xs'>
                    <table className='min-w-full divide-y divide-gray-200 bg-white text-left text-sm'>
                        <thead className='bg-gray-50/75 text-xs uppercase font-semibold text-gray-500'>
                            <tr>
                                <th scope='col' className='px-4 py-3.5'>Product</th>
                                <th scope='col' className='px-4 py-3.5'>Category</th>
                                <th scope='col' className='px-4 py-3.5'>Sizes</th>
                                <th scope='col' className='px-4 py-3.5'>Price</th>
                                <th scope='col' className='px-4 py-3.5 text-center'>Bestseller</th>
                                <th scope='col' className='px-4 py-3.5 text-right'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {filteredProducts.map((product) => {
                                const mainImg = (product.image && product.image[0]) || assets.upload_area
                                return (
                                    <tr key={product._id} className='hover:bg-gray-50/60 transition-colors'>
                                        {/* Product Thumbnail & Name */}
                                        <td className='px-4 py-3.5 flex items-center gap-3'>
                                            <img
                                                src={mainImg}
                                                alt={product.name}
                                                className='w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0 bg-gray-50'
                                            />
                                            <div className='max-w-xs'>
                                                <p className='font-semibold text-gray-900 truncate'>{product.name}</p>
                                                <p className='text-xs text-gray-400 truncate mt-0.5'>{product.description}</p>
                                            </div>
                                        </td>

                                        {/* Category & SubCategory */}
                                        <td className='px-4 py-3.5 whitespace-nowrap'>
                                            <div className='flex flex-col gap-1 items-start'>
                                                <span className='px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200'>
                                                    {product.category}
                                                </span>
                                                <span className='text-xs text-gray-400'>
                                                    {product.subCategory}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Sizes */}
                                        <td className='px-4 py-3.5 whitespace-nowrap'>
                                            <div className='flex flex-wrap gap-1 max-w-[120px]'>
                                                {product.sizes && product.sizes.map((s, idx) => (
                                                    <span key={idx} className='text-[10px] font-semibold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded'>
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>

                                        {/* Price */}
                                        <td className='px-4 py-3.5 whitespace-nowrap font-bold text-gray-900'>
                                            {currency} {product.price}
                                        </td>

                                        {/* Bestseller Badge */}
                                        <td className='px-4 py-3.5 whitespace-nowrap text-center'>
                                            {product.bestseller ? (
                                                <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200'>
                                                    ★ Yes
                                                </span>
                                            ) : (
                                                <span className='text-xs text-gray-400'>No</span>
                                            )}
                                        </td>

                                        {/* Action Buttons */}
                                        <td className='px-4 py-3.5 whitespace-nowrap text-right'>
                                            <div className='inline-flex items-center gap-1.5'>
                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => handleOpenEdit(product)}
                                                    title='Edit Product'
                                                    className='inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1e4b3e] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors cursor-pointer'>
                                                    <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
                                                    </svg>
                                                    Edit
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => setProductToDelete(product)}
                                                    title='Delete Product'
                                                    className='inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors cursor-pointer'>
                                                    <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                                    </svg>
                                                    Remove
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ================= EDIT MODAL ================= */}
            {isEditModalOpen && editingProduct && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto'>
                    <div className='bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100 animate-in fade-in zoom-in-95 duration-150'>
                        <div className='flex items-center justify-between pb-4 border-b border-gray-200'>
                            <div>
                                <h3 className='text-xl font-bold text-gray-900'>Edit Product</h3>
                                <p className='text-xs text-gray-500 mt-0.5'>Update details or images for this product.</p>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className='text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer'>
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleUpdateProduct} className='mt-5 flex flex-col gap-4'>
                            {/* Product Images Section */}
                            <div>
                                <p className='text-xs font-bold text-gray-700 uppercase tracking-wide mb-2'>
                                    Current Images (Click ✕ to remove)
                                </p>
                                <div className='flex flex-wrap gap-2.5'>
                                    {existingImages.map((imgUrl, idx) => (
                                        <div key={idx} className='relative group'>
                                            <img
                                                src={imgUrl}
                                                alt=''
                                                className='w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-xs'
                                            />
                                            <button
                                                type='button'
                                                onClick={() => handleRemoveExistingImage(idx)}
                                                className='absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700 shadow-sm cursor-pointer'>
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Add/Replace New Images */}
                            <div>
                                <p className='text-xs font-bold text-gray-700 uppercase tracking-wide mb-2'>
                                    Upload New Images (Optional)
                                </p>
                                <div className='grid grid-cols-4 gap-2'>
                                    {[
                                        { state: newImage1, setter: setNewImage1, id: 'edit_img1' },
                                        { state: newImage2, setter: setNewImage2, id: 'edit_img2' },
                                        { state: newImage3, setter: setNewImage3, id: 'edit_img3' },
                                        { state: newImage4, setter: setNewImage4, id: 'edit_img4' }
                                    ].map((slot, index) => (
                                        <label key={slot.id} htmlFor={slot.id} className='cursor-pointer flex flex-col items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#96c138] transition-colors relative overflow-hidden bg-gray-50'>
                                            {slot.state ? (
                                                <img
                                                    src={URL.createObjectURL(slot.state)}
                                                    alt='New Preview'
                                                    className='w-full h-full object-cover'
                                                />
                                            ) : (
                                                <div className='flex flex-col items-center text-gray-400'>
                                                    <svg className='w-5 h-5 mb-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
                                                    </svg>
                                                    <span className='text-[10px] font-medium'>Slot {index + 1}</span>
                                                </div>
                                            )}
                                            <input
                                                type='file'
                                                id={slot.id}
                                                hidden
                                                accept='image/*'
                                                onChange={(e) => slot.setter(e.target.files[0])}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Product Name */}
                            <div>
                                <label className='block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1'>Product Name</label>
                                <input
                                    type='text'
                                    required
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className='w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#96c138]'
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className='block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1'>Description</label>
                                <textarea
                                    required
                                    rows='3'
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    className='w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#96c138] resize-none'
                                />
                            </div>

                            {/* Category, SubCategory, Price in row */}
                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                                <div>
                                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1'>Category</label>
                                    <select
                                        value={editCategory}
                                        onChange={(e) => setEditCategory(e.target.value)}
                                        className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#96c138] bg-white'>
                                        <option value='Men'>Men</option>
                                        <option value='Women'>Women</option>
                                        <option value='Kids'>Kids</option>
                                        <option value='Children'>Children</option>
                                    </select>
                                </div>

                                <div>
                                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1'>Sub Category</label>
                                    <select
                                        value={editSubCategory}
                                        onChange={(e) => setEditSubCategory(e.target.value)}
                                        className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#96c138] bg-white'>
                                        <option value='Topwear'>Topwear</option>
                                        <option value='Bottomwear'>Bottomwear</option>
                                        <option value='Winterwear'>Winterwear</option>
                                    </select>
                                </div>

                                <div>
                                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1'>Price ({currency})</label>
                                    <input
                                        type='number'
                                        required
                                        min='1'
                                        value={editPrice}
                                        onChange={(e) => setEditPrice(e.target.value)}
                                        className='w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#96c138]'
                                    />
                                </div>
                            </div>

                            {/* Sizes Selector */}
                            <div>
                                <label className='block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5'>Sizes</label>
                                <div className='flex gap-2'>
                                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => {
                                        const isSelected = editSizes.includes(size)
                                        return (
                                            <button
                                                type='button'
                                                key={size}
                                                onClick={() => toggleEditSize(size)}
                                                className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${isSelected ? 'bg-[#96c138] text-white border-[#96c138]' : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'}`}>
                                                {size}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Bestseller Checkbox */}
                            <div className='flex items-center gap-2 pt-1'>
                                <input
                                    type='checkbox'
                                    id='edit_bestseller'
                                    checked={editBestseller}
                                    onChange={(e) => setEditBestseller(e.target.checked)}
                                    className='w-4 h-4 accent-[#96c138] cursor-pointer'
                                />
                                <label htmlFor='edit_bestseller' className='text-sm text-gray-700 font-medium cursor-pointer'>
                                    Mark as Bestseller
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className='flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-200'>
                                <button
                                    type='button'
                                    onClick={() => setIsEditModalOpen(false)}
                                    className='px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer'>
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    disabled={saveLoading}
                                    className='inline-flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-[#96c138] hover:bg-[#86af32] rounded-lg transition-colors shadow-sm disabled:opacity-50 cursor-pointer'>
                                    {saveLoading && (
                                        <div className='w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                    )}
                                    {saveLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ================= DELETE CONFIRMATION MODAL ================= */}
            {productToDelete && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4'>
                    <div className='bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150'>
                        <div className='w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4'>
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                            </svg>
                        </div>
                        <h4 className='text-lg font-bold text-gray-900 text-center'>Remove Product</h4>
                        <p className='text-sm text-gray-500 text-center mt-2'>
                            Are you sure you want to remove <span className='font-semibold text-gray-800'>"{productToDelete.name}"</span>? This product will be permanently deleted from the store.
                        </p>
                        <div className='flex items-center justify-center gap-3 mt-6'>
                            <button
                                type='button'
                                onClick={() => setProductToDelete(null)}
                                className='px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer'>
                                Cancel
                            </button>
                            <button
                                type='button'
                                disabled={deleteLoading}
                                onClick={handleConfirmDelete}
                                className='inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm disabled:opacity-50 cursor-pointer'>
                                {deleteLoading && (
                                    <div className='w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                )}
                                {deleteLoading ? 'Removing...' : 'Yes, Remove Product'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminManageProducts
