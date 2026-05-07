import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {serverUrl} from "../App"
import { setShopInCity } from '../redux/slices/userSlice'

function useGetShopByCity() {
  const dispatch = useDispatch()
  const {city} = useSelector(state=>state.user)

  useEffect(()=>{
    const fetchShop = async () => {
        try {
            const response = await axios.get(serverUrl+`/api/shop/get-shop-by-city/${city}`,{withCredentials:true});
            dispatch(setShopInCity(response.data))
        } catch (error) {
            dispatch(setShopInCity(null))
        }
    }
    fetchShop();
  },[city])
}

export default useGetShopByCity
