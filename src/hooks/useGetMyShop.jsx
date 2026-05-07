import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App';
import { setShopData } from '../redux/slices/shopSlice';

function useGetMyShop() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const response = await axios.get(serverUrl+"/api/shop/my-shop",{withCredentials:true});
                dispatch(setShopData(response.data))
            } catch (error) {
                dispatch(setShopData(null))
            }
        }
        fetchShop();
    }, [dispatch])
}

export default useGetMyShop
