import Logo from '../assets/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/slices/userSlice';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { serverUrl } from '../App';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { Bounce, toast, ToastContainer } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true)
    try {
      const response = await axios.post(serverUrl + "/api/auth/user/login", { email, password }, { withCredentials: true });
      dispatch(setUserData(response.data.user));
      setLoading(false)
    } catch (error) {
      toast.error(`${error.response.data.error}`, {
        position: "top-right",
        style: { backgroundColor: "orange", color: "white", fontWeight: "bold" }
      });
      setLoading(false)
    }
  }

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    try {
      const response = await axios.post(serverUrl + "/api/auth/user/google-auth", {
        email: result.user.email,
      }, { withCredentials: true })
      dispatch(setUserData(response.data));
    } catch (error) {
      toast.error(`User Not Found`, {
        position: "top-right",
        style: { backgroundColor: "orange", color: "white", fontWeight: "bold" }
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-orange-400/20 via-amber-400/20 to-red-400/20 px-6 py-5">
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
      {/* Logo Header */}
      <header className="mb-10 text-center">
        <div className="flex justify-center cursor-pointer group" onClick={() => navigate("/")}>
          <img
            src={Logo}
            alt="DesiZapp Logo"
            className="w-32 sm:w-36 hover:scale-105 transition-all duration-300 drop-shadow-xl filter"
          />
        </div>
        <p className="text-lg text-slate-900 font-semibold bg-white/90 px-6 py-3 rounded-2xl shadow-lg">
          Login to enjoy delicious food deliveries
        </p>
      </header>

      {/* Simple Login Card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-orange-200">

        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
          Welcome Back
        </h2>

        {/* Google Button */}
        <button className="w-full mb-6 flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-orange-300 rounded-2xl px-4 py-3 transition-all duration-300 hover:shadow-lg hover:scale-105" onClick={handleLoginWithGoogle}>
          <FcGoogle size={22} />
          <span className="font-semibold text-slate-800">Continue with Google</span>
        </button>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
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

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-300 bg-white/80 backdrop-blur-sm text-lg"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center text-sm text-slate-700">
              <input type="checkbox" className="mr-2 w-4 h-4 accent-orange-500" required />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-orange-600 hover:text-orange-700 font-semibold text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white py-2 rounded-2xl font-bold text-lg shadow-xl active:scale-98 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color='white' /> : "Log In"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-5 text-center text-lg text-slate-700 font-semibold pt-6 border-t border-orange-100">
          Don't have account?{" "}
          <Link to="/register" className="text-orange-600 font-bold hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;