import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice.js'
import shopReducer from './slices/shopSlice.js'
import mapReducer from './slices/mapSlice.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        shop: shopReducer,
        map: mapReducer
    }
})