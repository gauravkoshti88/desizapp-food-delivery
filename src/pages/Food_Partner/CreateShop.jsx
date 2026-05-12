import axios from "axios";
import { useState, useRef } from "react";
import { FaTrash, FaUtensils } from "react-icons/fa";
import { serverUrl } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { setShopData } from "../../redux/slices/shopSlice";
import { ClipLoader } from "react-spinners";
import { IoIosArrowRoundBack, IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function CreateShop() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const { shopData } = useSelector(state => state.shop);
  const { city, state, currentAddress } = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    restaurantName: shopData?.restaurantName || "",
    city: city,
    state: state,
    image: shopData?.image?.url || null,
    address: shopData?.address || currentAddress,
    imagePreview: ""
  });

  // Ref for file input
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
        imagePreview: URL.createObjectURL(file), // create preview URL
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handleDeleteImage = () => {
    setFormData({ ...formData, image: null, imagePreview: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // clear the file input
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("restaurantName", formData.restaurantName);
      data.append("city", formData.city);
      data.append("state", formData.state);
      data.append("address", formData.address);
      data.append("image", formData.image); // file object

      const response = await axios.post(`${serverUrl}/api/shop/create-edit`, data, { withCredentials: true });
      dispatch(setShopData(response.data));
      navigate(-1)
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-5 bg-white shadow-lg rounded-xl p-5 mb-10">
      <div
        onClick={() => navigate("/home")}
        className="p-2 bg-orange-50 hover:bg-orange-100 rounded-xl hover:scale-105 transition-all duration-200 shadow-md absolute top-3 left-3"
      >
        <IoIosArrowRoundBack size={24} className="text-orange-600" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <FaUtensils className="text-[#ff4d2d] w-14 h-14 sm:w-20 sm:h-20 mb-2 bg-amber-200 p-3 rounded-3xl" />
        <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
          {shopData ? "Edit Shop" : "Create Shop"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Restaurant Name */}
        <div>
          <label htmlFor="restaurantName" className="block text-sm font-medium text-slate-700">
            Restaurant Name
          </label>
          <input
            id="restaurantName"
            name="restaurantName"
            type="text"
            value={formData.restaurantName}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Enter restaurant name"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-slate-700">
            Shop Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required={!shopData?.image}
          />
        </div>

        {/* Image Preview Box */}
        <div className="w-full h-52 bg-amber-100 rounded-2xl flex items-center justify-center overflow-hidden relative">
          {formData.image ? (
            <>
              <img
                src={formData.imagePreview || formData.image}
                alt="Shop Preview"
                className="w-full h-full object-cover rounded-2xl"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-red-500 text-white p-3 rounded-full shadow hover:bg-red-600 transition-all"
              >
                <FaTrash size={20} />
              </button>
            </>
          ) : (
            <span className="text-slate-600 text-sm">No image uploaded</span>
          )}
        </div>

        {/* City & State */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="city" className="block text-sm font-medium text-slate-700">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Enter city"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="state" className="block text-sm font-medium text-slate-700">
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Enter state"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-slate-700">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Enter full address"
            rows="3"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={20} />
          ) : (
            shopData ? "Save" : "Create"
          )}
        </button>
      </form>
    </div>
  );
}