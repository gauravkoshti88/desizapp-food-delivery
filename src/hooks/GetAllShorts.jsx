import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App';
import { setShortsData } from '../redux/slices/userSlice';

const GetAllShorts = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state=>state.user)
  useEffect(()=>{
    const fetchShorts = async()=>{
        try {
            const response = await axios.get(serverUrl+"/api/food/all-items",{withCredentials:true})
            dispatch(setShortsData(response.data))
        } catch (error) {
            dispatch(setShortsData(null))
        }
    }
    fetchShorts()
  },[dispatch, userData])
}

export default GetAllShorts
