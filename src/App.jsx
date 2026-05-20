import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
import useGetMyShop from "./hooks/useGetMyShop";
import CreateShop from "./pages/Food_Partner/CreateShop";
import AddFoodItem from "./pages/Food_Partner/AddFoodItem";
import EditFoodItem from "./pages/Food_Partner/EditFoodItem";
import useGetShopByCity from "./hooks/useGetShopByCity";
import useGetUser from "./hooks/useGetUser";
import useGetItemsByCity from "./hooks/useGetItemsByCity";
import CartPage from './pages/Customer/CartPage'
import CheckoutPage from "./pages/Customer/CheckoutPage";
import OrderPlaced from "./pages/Customer/OrderPlaced";
import MyOrders from "./pages/Customer/MyOrders";
import useGetMyOrders from "./hooks/useGetMyOrders";
import useUpdateLocation from "./hooks/useUpdateLocation";
import InternalServerError from "./pages/InternalServerError";
import TrackOrder from "./pages/Customer/TrackOrder";
import Shop from "./pages/Customer/Shop";
import OrderSuccess from "./components/DeliveryBoy/OrderSuccess";
import { useEffect } from "react";
import ZappShorts from "./pages/Customer/ZappShorts";
import { initSocket } from "./utils/socketService";
import { registerSocketEvents } from "./listeners/socketListeners";
import NotFound from './pages/NotFound'
import EditProfile from "./pages/EditProfile";
import DeliveredOrders from "./pages/Delivery_Boy/DeliveredOrders";
import { lazy, Suspense } from "react";
import ShopEarning from "./pages/Food_Partner/ShopEarning";
import useGetAiRecommended from "./hooks/useGetAiRecommended";

const Grocery = lazy(() => import("./pages/Customer/Grocery"));

export const serverUrl = import.meta.env.VITE_API_URL

function App() {
  const { userData } = useSelector(state => state.user);
  const dispatch = useDispatch();
  useGetUser()
  useGetCity()
  useGetMyShop()
  useGetShopByCity()
  useGetItemsByCity()
  useGetMyOrders()
  useUpdateLocation()
  // useGetAiRecommended()

  useEffect(() => {
    const socket = initSocket(serverUrl);
    registerSocketEvents({ dispatch })
    socket.on("connect", () => {
      if (userData) {
        socket.emit("identity", { userId: userData._id })
      }
    })
    return () => {
      socket.disconnect();
    }
  }, [userData?._id])

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/server-error" element={<InternalServerError />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/register" element={!userData ? <Register /> : <Navigate to="/home" />} />
      <Route path="/login" element={!userData ? <Login /> : <Navigate to="/home" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/home" element={userData ? <Home /> : <Navigate to="/login" />} />

      <Route path="/create-edit-shop" element={userData ? <CreateShop /> : <Navigate to="/login" />} />

      <Route path="/add-food-item" element={userData ? <AddFoodItem /> : <Navigate to="/login" />} />

      <Route path="/edit-food-item/:itemId" element={userData ? <EditFoodItem /> : <Navigate to="/login" />} />

      <Route path="/cart" element={userData ? <CartPage /> : <Navigate to="/login" />} />

      <Route path="/checkout" element={userData ? <CheckoutPage /> : <Navigate to="/login" />} />

      <Route path="/order-placed" element={userData ? <OrderPlaced /> : <Navigate to="/login" />} />

      <Route path="/my-orders" element={userData ? <MyOrders /> : <Navigate to="/login" />} />

      <Route path="/track-order/:orderId" element={userData ? <TrackOrder /> : <Navigate to="/login" />} />

      <Route path="/shop/:shopId" element={userData ? <Shop /> : <Navigate to="/login" />} />

      <Route path="/order-delivered" element={userData ? <OrderSuccess /> : <Navigate to="/login" />} />

      <Route
        path="/grocery"
        element={
          userData ? (
            <React.Suspense fallback={<div>Loading...</div>}>
              <Grocery />
            </React.Suspense>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="/zapp-shorts" element={userData ? <ZappShorts /> : <Navigate to="/login" />} />

      <Route path="/edit-profile" element={userData ? <EditProfile /> : <Navigate to="/login" />} />

      <Route path="/delivered-orders" element={userData ? <DeliveredOrders /> : <Navigate to="/login" />} />

      <Route path="/shop-earning" element={userData ? <ShopEarning /> : <Navigate to="/login" />} />

    </Routes>
  )
}

export default App;