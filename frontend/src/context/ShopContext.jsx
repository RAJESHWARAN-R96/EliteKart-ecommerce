import { useState, useEffect } from "react";
import { ShopContext } from "./ShopContextInstance";
import axios from 'axios';
import { toast } from 'react-toastify';

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    // Global States
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Please select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
                toast.success('Item added to cart!');
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        } else {
            toast.success('Item added to cart locally!');
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error("Error in getCartCount:", error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getProductsData = async () => {
        try {
            const timestamp = new Date().getTime()
            const response = await axios.get(backendUrl + '/api/product/list?t=' + timestamp)
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
            getUserCart(token)
        } else {
            localStorage.removeItem('token')
            setCartItems({})
        }
    }, [token])


    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,
        backendUrl, setToken, token, setCartItems, getProductsData
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;