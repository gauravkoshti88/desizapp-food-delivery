import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import blankProfile from '../assets/blank-profile.png'
import axios from 'axios';
import {serverUrl} from '../App'
import { setUserData } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

function EditProfile() {
  const { userData } = useSelector(state => state.user)
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    profileImage: null,
    imagePreview: ""
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (userData) {
      setFormData({
        fullname: userData.fullname || "",
        email: userData.email || "",
        phone: userData.phone || "",
        profileImage: null,
        imagePreview: userData.profileImage?.url || blankProfile
      });
    }
  }, [userData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append('fullname', formData.fullname);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      if (formData.profileImage) {
        data.append('profileImage', formData.profileImage);
      }
   
      const response = await axios.post(serverUrl + '/api/user/edit-profile', data, { withCredentials: true });
    
      dispatch(setUserData(response.data));
      toast("Profile Updated Successfully ✅", {
        position: "top-right",
        style: { backgroundColor: "orange", color: "white" },
      });
      navigate("/home")
    } catch (error) {
      setIsLoading(false)
      toast("Failed to update profile", {
        position: "top-right",
        style: { backgroundColor: "orange", color: "white" },
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (response.ok) {
        alert('Password changed successfully!');
        setShowPasswordModal(false);
        setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        throw new Error('Password change failed');
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100 mt-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
          Edit Profile
        </h2>
      </div>

      <form onSubmit={handleProfileSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <img
              src={formData.imagePreview || blankProfile}
              alt="Profile"
              className="w-28 h-28 rounded-3xl ring-4 ring-orange-100 shadow-2xl object-cover border-4 border-white"
            />
            <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2 rounded-3xl shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 hover:scale-110">
              <FaPlus />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                name="profileImage"
              />
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={(e) => setFormData(prev => ({ ...prev, fullname: e.target.value }))}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all duration-300 shadow-sm"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all duration-300 shadow-sm"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              name="phone"
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all duration-300 shadow-sm"
              placeholder="+91 12345 67890"
            />
          </div>
        </div>

        {/* Change Password Button */}
        <button
          type="button"
          onClick={() => setShowPasswordModal(true)}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          disabled={isLoading}
        >
          🔐 Change Password
        </button>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-2xl hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            onClick={() => navigate("/home")}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md mx-auto rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Change Password
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Old Password</label>
                <input
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all duration-300"
                  placeholder="Enter old password"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all duration-300"
                  placeholder="Enter new password"
                />
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Changing...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;