import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App';

function useUpdateLocation() {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);

    useEffect(() => {
        const updateLocation = async (lat, long) => {
            try {
                const response = await axios.post(serverUrl + "/api/user/update-location", { lat, long }, { withCredentials: true });  
            } catch (error) {
                console.log(error);
            }
        }
        navigator.geolocation.watchPosition((pos) => {
            updateLocation(pos.coords.latitude, pos.coords.longitude)
        })
    }, [userData])
}

export default useUpdateLocation
