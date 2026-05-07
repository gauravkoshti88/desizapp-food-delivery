import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    city: null,
    state: null,
    currentAddress: null,
    shopsInCity: null,
    itemsInCity: null,
    cartItems: [],
    totalAmount: 0,
    myOrders: [],
    searchItems: null,
    connected: false,
    shortsData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setShopInCity: (state, action) => {
      state.shopsInCity = action.payload;
    },
    setItemsInCity: (state, action) => {
      state.itemsInCity = action.payload;
    },
    addToCart: (state, action) => {
      const cartItem = action.payload;
      const existing = state.cartItems.find(i => i.id === cartItem.id);
      if (existing) {
        existing.quantity += cartItem.quantity;
      } else {
        state.cartItems.push(cartItem);
      }
      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    removeToCart: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    setMyOrders: (state, action) => {
      state.myOrders = action.payload
    },
    addMyOrder: (state, action) => {
      state.myOrders = [action.payload, ...state.myOrders]
    },
    updateOrderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;
      const order = state.myOrders.find(o => o._id == orderId);
      if (order) {
        if (order.shopOrders && order.shopOrders.shop._id == shopId) {
          order.shopOrders.status = status
        }
      }
    },
    updateRealtimeOrderStatus: (state, action) => {
      const { orderId, shopId, status, assignTo, acceptedAt } = action.payload;
      const order = state.myOrders.find(o => o._id == orderId);

      if (order && Array.isArray(order.shopOrders)) {
        const shopOrder = order.shopOrders.find(so => so.shop._id == shopId);
        if (shopOrder) {
          shopOrder.status = status;
          if (assignTo) shopOrder.assignDeliveryBoy = assignTo;
          if (acceptedAt) shopOrder.acceptedAt = acceptedAt;
        }
      }
    },
    updateDeliveredStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;
      const order = state.myOrders.find(o => o._id == orderId);
      if (order) {
        const shopOrder = order.shopOrders.find(so => so._id == shopId);
        if (shopOrder) {
          shopOrder.status = status;
          shopOrder.deliveredAt = Date.now(); // optional: delivered time bhi set kar lo
        }
      }
    },
    setSearchItems: (state, action) => {
      state.searchItems = action.payload
    },
    setSocketConnected: (state, action) => {
      state.connected = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setShortsData: (state, action) => {
      state.shortsData = action.payload;
    },
    appendShortsData: (state, action) => {
      state.shortsData = [...state.shortsData, ...action.payload];
    }

  }
});

export const {
  setUserData,
  setCity,
  setState,
  setSocketConnected,
  setCurrentAddress,
  setShopInCity,
  setItemsInCity,
  addToCart,
  updateQuantity,
  removeToCart,
  setMyOrders,
  addMyOrder,
  updateOrderStatus,
  updateRealtimeOrderStatus,
  updateDeliveredStatus,
  setSearchItems,
  setCartItems,
  setShortsData,
  appendShortsData,
} = userSlice.actions;

export default userSlice.reducer;