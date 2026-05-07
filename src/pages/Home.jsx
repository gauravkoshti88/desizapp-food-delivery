import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CustomerDashboard from '../components/CustomerDashboard'
import FoodPartnerDashboard from '../components/FoodPartnerDashboard'
import DeliveryBoyDashboard from '../components/DeliveryBoyDashboard'
import { Bounce, ToastContainer } from 'react-toastify';

function Home() {
  const { userData } = useSelector(state => state.user);

  return (
    <div className='w-[100vw] min-h-[100vh] flex flex-col items-center bg-amber-50'>
      {userData.role == "user" && <CustomerDashboard />}
      {userData.role == "foodPartner" && <FoodPartnerDashboard />}
      {userData.role == "deliveryBoy" && <DeliveryBoyDashboard />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  )
}

export default Home
