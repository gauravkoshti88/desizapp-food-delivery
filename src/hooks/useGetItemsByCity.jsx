import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from "../App"
import { setItemsInCity } from '../redux/slices/userSlice'

function useGetItemsByCity() {
  const dispatch = useDispatch()
  const { city } = useSelector(state => state.user)

  function shuffleArray(array) {
    return array
      .map(item => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(serverUrl + `/api/food/get-fooditems-by-city/${city}`, { withCredentials: true });
        const shuffled = shuffleArray(response.data);
        dispatch(setItemsInCity(shuffled));
      } catch (error) {
        dispatch(setItemsInCity(null))
      }
    }
    fetchItems();
  }, [city])
}

export default useGetItemsByCity
