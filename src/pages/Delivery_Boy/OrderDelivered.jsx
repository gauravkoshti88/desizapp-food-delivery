import React, { useState } from "react";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import BoxImage from '../../assets/DaliveryBoy/box.png';
import OrderSuccess from "../../components/DeliveryBoy/OrderSuccess";

function OrderDelivered() {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);

  if (showSuccess) {
    return <OrderSuccess />; // show success screen instead
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white flex items-center px-4 py-4">
        <ArrowLeftIcon className="w-6 h-6 mr-2 cursor-pointer" onClick={() => navigate('/delivery-boy/navigate-to-customer')} />
        <h2 className="text-xl font-bold flex-1 text-center">Order Delivered</h2>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
        {/* Success Icon */}
        <div className="flex flex-col items-center space-y-4">
          <CheckCircleIcon className="w-18 h-18 text-green-600" />
          <div className="w-26 h-26 bg-green-400 p-2 rounded-lg flex items-center justify-center">
            <img src={BoxImage} alt="Box" className="w-24 h-22" />
          </div>
          <p className="text-xl font-semibold text-gray-800">Great! Order Delivered</p>
        </div>

        {/* Order Details */}
        <div className="w-full bg-gray-100 rounded-lg p-4 space-y-2">
          <p className="text-gray-700 text-base">
            <span className="font-semibold">Order ID:</span> #ORD9845
          </p>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">Customer:</span> Neha Sharma
          </p>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">Earnings:</span> ₹120
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 space-y-4">
        <button className="w-full bg-green-600 text-white py-3 rounded-md text-lg font-bold hover:bg-green-700 transition" onClick={() => setShowSuccess(true)}>
          Mark as Delivered
        </button>
        <p className="text-center text-sm text-blue-600 cursor-pointer hover:underline">
          Need Help?
        </p>
      </footer>
    </div>
  );
}

export default OrderDelivered;