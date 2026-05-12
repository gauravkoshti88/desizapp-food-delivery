import { useState } from 'react';
import Logo from '../assets/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/slices/userSlice.js';
import { FcBusinessman } from "react-icons/fc";
import { FcShop } from "react-icons/fc";
import { FcShipped } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase.js';
import axios from 'axios';
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners";
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Register() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)
    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(serverUrl + "/api/auth/user/register", { fullname, email, password, role, phone }, { withCredentials: true });
      console.log(response.data);
      dispatch(setUserData(response.data.user));
      e.target.reset();
      setRole("user");
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast(`${error.response.data.error}`, {
        position: "top-right",
        style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
        autoClose: 3000,
      });
    }
  }

  const handleRegisterWithGoogle = async () => {
    if (!phone) {
      return toast(`Mobile no is required !`, {
        position: "top-right",
        style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
        autoClose: 3000,
      });
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    try {
      const response = await axios.post(serverUrl + "/api/auth/user/google-auth", {
        fullname: result.user.displayName,
        email: result.user.email,
        role,
        phone
      }, { withCredentials: true })
      dispatch(setUserData(response.data));
    } catch (error) {
      toast.error("Google Register Failed ❌", {
        position: "top-right",
        style: { backgroundColor: "orange", color: "white", fontWeight: "bold" }
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-orange-400/20 via-amber-400/20 to-red-400/20 px-6 pb-10">

      {/* Logo Header */}
      <header className="mb-5 text-center">
        <div className="flex justify-center cursor-pointer group" onClick={() => navigate("/")}>
          <img
            src={Logo}
            alt="DesiZapp Logo"
            className="w-32 sm:w-36 hover:scale-105 transition-all duration-300 drop-shadow-xl filter"
          />
        </div>
        <p className="text-lg text-slate-900 font-semibold bg-white/90 px-6 py-3 rounded-2xl shadow-lg">
          Create your account. Unlock offers. Dine better.
        </p>
      </header>

      {/* Simple Register Card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-5 border border-orange-200">

        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
          Create Account
        </h2>

        {/* Google Button */}
        <button className="w-full mb-5 flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-orange-300 rounded-2xl px-4 py-3 transition-all duration-300 hover:shadow-lg hover:scale-105" onClick={handleRegisterWithGoogle}>
          <FcGoogle size={22} />
          <span className="font-semibold text-slate-800">Sign Up with Google</span>
        </button>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Full Name</label>
            <input
              name="fullname"
              type="text"
              placeholder="Enter full name"
              required
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 bg-white/80 backdrop-blur-sm text-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              required
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 bg-white/80 backdrop-blur-sm text-lg"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Phone</label>
            <input
              name="phone"
              type="text"
              maxLength={10}
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10 digit number"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 bg-white/80 backdrop-blur-sm text-lg"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 bg-white/80 backdrop-blur-sm text-lg pr-10"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-slate-600 hover:text-orange-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </span>
            </div>
          </div>

          {/* Role Selection - Simple */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-3">Choose Role</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "user", label: "Customer", icon: <FcBusinessman size={24} /> },
                { value: "foodPartner", label: "Restaurant", icon: <FcShop size={28} /> },
                { value: "deliveryBoy", label: "Delivery", icon: <FcShipped size={28} /> }
              ].map(({ value, label, icon }) => (
                <div
                  key={value}
                  className={`p-2 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg flex flex-col items-center ${role === value
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400 shadow-md scale-105'
                    : 'bg-white border-slate-200 hover:border-orange-300 text-slate-800'
                    }`}
                  onClick={() => setRole(value)}
                >
                  <span className="text-2xl mb-2">{icon}</span>
                  <span className="font-bold text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white py-2 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-orange-400/50 active:scale-101"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color='white' /> : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-2 text-center text-lg text-slate-700 font-semibold pt-6 border-t border-orange-100">
          Already have account?{" "}
          <Link to="/login" className="text-orange-600 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
  );
}

export default Register;