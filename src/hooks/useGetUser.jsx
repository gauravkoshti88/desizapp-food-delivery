import React, { useEffect } from 'react'
import { serverUrl } from '../App';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/slices/userSlice';

function useGetUser() {
    const dispatch = useDispatch();
    // const { userData } = useSelector(state => state.user);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(serverUrl + "/api/user/get-user", { withCredentials: true });    
                dispatch(setUserData(response.data));
            } catch (error) {
                dispatch(setUserData(null))
            }
        }
        fetchUser();
    }, [])
}

export default useGetUser
