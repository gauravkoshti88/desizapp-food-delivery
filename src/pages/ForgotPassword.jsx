import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App'
import Logo from '../assets/logo.png';
import { ClipLoader } from 'react-spinners';

function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState()
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true)
    try {
      const response = await axios.post(serverUrl + "/api/auth/user/send-otp", { email }, { withCredentials: true })
      setLoading(false);
      setStep(2);
    } catch (error) {
      setLoading(false);
    }
  }

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(serverUrl + "/api/auth/user/verify-otp", { email, otp }, { withCredentials: true })
      setLoading(false);
      setStep(3)
    } catch (error) {
      setLoading(false);
    }
  }

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(serverUrl + "/api/auth/user/reset-password", { email, newPassword }, { withCredentials: true })
      setLoading(false);
      navigate("/login")
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4
          bg-gradient-to-br from-orange-400/20 via-amber-400/20 to-red-400/20">

      <div className="w-full max-w-md mx-auto">

        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src={Logo}
            alt="DesiZapp Logo"
            className="w-32 mx-auto hover:scale-105 transition-all duration-300 drop-shadow-xl filter mx-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-orange-200">

          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-8 pb-6 border-b border-orange-100">
            <button
              onClick={() => navigate("/login")}
              className="p-2 bg-orange-50 hover:bg-orange-100 rounded-xl hover:scale-105 transition-all duration-200 shadow-md"
            >
              <IoIosArrowRoundBack size={24} className="text-orange-600" />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Forgot Password
            </h1>
          </div>

          {/* Step 1: Email */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <button
                onClick={handleSendOtp}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                disabled={loading}
              >
                {loading?<ClipLoader size={20}/>:"Send OTP"}
              </button>
            </div>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <div className="space-y-4 text-center">
              <div>
                <label htmlFor="otp" className="block text-sm font-semibold text-slate-800 mb-2">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 bg-white/80 backdrop-blur-sm text-center text-lg font-semibold tracking-wider"
                />
              </div>
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                disabled={loading}
              >
                {loading?<ClipLoader/>:"Verify OTP"}
              </button>
            </div>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-slate-800 mb-2">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 bg-white/80 backdrop-blur-sm"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-800 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 bg-white/80 backdrop-blur-sm"
                />
              </div>

              {newPassword !== confirmPassword && newPassword && confirmPassword && (
                <p className="text-red-500 font-semibold text-center bg-red-50 px-3 py-2 rounded-xl border border-red-200">
                  Passwords do not match
                </p>
              )}

              <button
                onClick={handleResetPassword}
                disabled={newPassword !== confirmPassword || !newPassword || !confirmPassword}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:scale-100  disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading?<ClipLoader/>:"Reset Password"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword