import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getStoredCart = () => {
  try {
    const storedCart = localStorage.getItem("desizapp_cart");

    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
};

const calculateTotal = (cartItems) => {
  return cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );
};

const initialCartItems = getStoredCart();

const userSlice = createSlice({
  name: "user",

  initialState: {
    userData: null,
    city: null,
    state: null,
    currentAddress: null,
    shopsInCity: null,
    itemsInCity: null,
    cartItems: initialCartItems,
    totalAmount: calculateTotal(initialCartItems),
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

      const existing = state.cartItems.find((item) => item.id === cartItem.id);

      if (existing) {
        existing.quantity += cartItem.quantity;
      } else {
        state.cartItems.push(cartItem);
      }

      state.totalAmount = calculateTotal(state.cartItems);

      localStorage.setItem("desizapp_cart", JSON.stringify(state.cartItems));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.cartItems.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity;
      }

      state.totalAmount = calculateTotal(state.cartItems);

      localStorage.setItem("desizapp_cart", JSON.stringify(state.cartItems));
    },

    removeToCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );

      state.totalAmount = calculateTotal(state.cartItems);

      localStorage.setItem("desizapp_cart", JSON.stringify(state.cartItems));
    },

    setCartItems: (state, action) => {
      const cartItems = Array.isArray(action.payload) ? action.payload : [];

      state.cartItems = cartItems;
      state.totalAmount = calculateTotal(cartItems);

      localStorage.setItem("desizapp_cart", JSON.stringify(cartItems));
    },

    setMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },

    addMyOrder: (state, action) => {
      state.myOrders = [action.payload, ...state.myOrders];
    },

    updateOrderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;

      const order = state.myOrders.find((o) => o._id == orderId);

      if (order) {
        if (order.shopOrders && order.shopOrders.shop._id == shopId) {
          order.shopOrders.status = status;
        }
      }
    },

    updateRealtimeOrderStatus: (state, action) => {
      const { orderId, shopId, status, assignTo, acceptedAt } = action.payload;

      const order = state.myOrders.find((o) => o._id == orderId);

      if (order && Array.isArray(order.shopOrders)) {
        const shopOrder = order.shopOrders.find((so) => so.shop._id == shopId);

        if (shopOrder) {
          shopOrder.status = status;

          if (assignTo) {
            shopOrder.assignDeliveryBoy = assignTo;
          }

          if (acceptedAt) {
            shopOrder.acceptedAt = acceptedAt;
          }
        }
      }
    },

    updateDeliveredStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;

      const order = state.myOrders.find((o) => o._id == orderId);

      if (order) {
        const shopOrder = order.shopOrders.find((so) => so._id == shopId);

        if (shopOrder) {
          shopOrder.status = status;
          shopOrder.deliveredAt = Date.now();
        }
      }
    },

    setSearchItems: (state, action) => {
      state.searchItems = action.payload;
    },

    setSocketConnected: (state, action) => {
      state.connected = action.payload;
    },

    setShortsData: (state, action) => {
      state.shortsData = action.payload;
    },

    appendShortsData: (state, action) => {
      state.shortsData = [...(state.shortsData || []), ...action.payload];
    },
  },
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
  setCartItems,
  setMyOrders,
  addMyOrder,
  updateOrderStatus,
  updateRealtimeOrderStatus,
  updateDeliveredStatus,
  setSearchItems,
  setShortsData,
  appendShortsData,
} = userSlice.actions;

export default userSlice.reducer;
