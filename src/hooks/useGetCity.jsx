import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCity, setCurrentAddress, setState } from '../redux/slices/userSlice';
import { setAddress, setLocation } from '../redux/slices/mapSlice';

function useGetCity() {
  const dispatch = useDispatch();
  const {userData} = useSelector(state=> state.user);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(async(position)=>{
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiKey = import.meta.env.VITE_GEO_API

        const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)

        const finalAddress = response.data.results[0].formatted
        
        dispatch(setCity(response?.data?.results[0].city));
        dispatch(setState(response.data.results[0].state));
        dispatch(setCurrentAddress(finalAddress));
        dispatch(setLocation({lat:latitude,long:longitude}));
        dispatch(setAddress(finalAddress));
    })
  },[userData])
}

export default useGetCity
