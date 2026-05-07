import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        shopData: null,
    },
    reducers: {
        setShopData:(state, actiom)=>{
            state.shopData=actiom.payload
        }
    }
})

export const {setShopData}= shopSlice.actions

export default shopSlice.reducer;