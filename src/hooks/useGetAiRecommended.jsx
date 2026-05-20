import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App';

function useGetAiRecommended() {
    const { userData } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAiRecommended = async () => {
            try {
                const response = await axios.get(serverUrl + "/api/ai/ai-recommended-foods", { withCredentials: true });
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAiRecommended();
    }, [userData])
}

export default useGetAiRecommended
