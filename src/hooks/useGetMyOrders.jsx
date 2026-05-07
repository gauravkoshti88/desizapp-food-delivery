import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyOrders } from '../redux/slices/userSlice';

function useGetMyOrders() {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
    const fetchOrders = async () => {
      
        const response = await axios.get(serverUrl + "/api/order/my-orders", { withCredentials: true })
        dispatch(setMyOrders(response.data))
    }
    fetchOrders()
  }, [userData])
}

export default useGetMyOrders
