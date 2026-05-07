import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { serverUrl } from '../../App';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { setShopData } from '../../redux/slices/shopSlice';
import { toast } from 'react-toastify';

export default function AddFoodItem() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true)
        let dishname = e.target.dishname.value;
        let category = e.target.category.value;
        let price = e.target.price.value;
        let foodType = e.target.foodType.value;
        const image = e.target.image.files[0];
        const video = e.target.video.files[0];

        const formData = new FormData();
        formData.append("dishname", dishname);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("foodType", foodType);
        if (image) formData.append("image", image);
        if (video) formData.append("video", video);

        try {
            const response = await axios.post(serverUrl + "/api/food/add-item", formData, { withCredentials: true });
            setLoading(false);
            dispatch(setShopData(response.data));
            e.target.reset()
            toast(`Food Item Added ✅`, {
                position: "top-right",
                style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
            });
            navigate("/home")
        } catch (error) {
            setLoading(false);
            toast(`${error.response.data.error}`, {
                position: "top-right",
                style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
            });
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 px-4">
            {/* Back Button */}
            <button
                className="fixed top-6 left-6 bg-white p-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 z-50"
                onClick={() => navigate("/home")}
            >
                <IoMdArrowRoundBack className="text-slate-700 w-5 h-5" />
            </button>

            {/* Form Container */}
            <div className="max-w-md mx-auto mt-10 sm:mt-0">
                <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-3 lg:mb-5">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-xl mb-5 mx-auto">
                            <IoMdArrowRoundBack className="text-white w-7 h-7 transform -rotate-180" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 via-gray-800 to-orange-600 bg-clip-text mb-2">
                            Add Food Item
                        </h2>
                    </div>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleUpload}>
                        {/* Food Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                🍽️ Food Name *
                            </label>
                            <input
                                name="dishname"
                                type="text"
                                required
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all bg-gray-50 hover:border-orange-300"
                                placeholder="Food name"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                🏷️ Category *
                            </label>
                            <select
                                name="category"
                                required
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all bg-gray-50 hover:border-orange-300"
                            >
                                <option value="">Select</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Burger">Burger</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Drink">Drink</option>
                                <option value="Sandwich">Sandwich</option>
                                <option value="Salad">Salad</option>
                                <option value="Fast-Food">Fast Food</option>
                                <option value="South-Indian">South Indian</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        {/* Food Type */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                🥬 Food Type *
                            </label>
                            <select
                                name="foodType"
                                required
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all bg-gray-50 hover:border-orange-300"
                            >
                                <option value="">Select</option>
                                <option value="Veg">Veg</option>
                                <option value="Non-Veg">Non-Veg</option>
                                <option value="Cold">Cold</option>
                                <option value="Drink">Drink</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                💰 Price (₹) *
                            </label>
                            <input
                                name="price"
                                type="number"
                                min="0"
                                required
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all bg-gray-50 hover:border-orange-300"
                                placeholder="299"
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                🖼️ Image
                            </label>
                            <input
                                name="image"
                                type="file"
                                accept="image/*"
                                className="w-full px-3 py-2 border-2 border-dashed border-slate-300 rounded-xl bg-orange-50 hover:border-orange-400 hover:bg-orange-100 transition-all cursor-pointer file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-orange-500 file:text-xs file:text-white"
                            />
                        </div>

                        {/* Video */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                🎥 Video
                            </label>
                            <input
                                name="video"
                                type="file"
                                accept="video/*"
                                className="w-full px-3 py-2 border-2 border-dashed border-slate-300 rounded-xl bg-orange-50 hover:border-orange-400 hover:bg-orange-100 transition-all cursor-pointer file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-orange-500 file:text-xs file:text-white"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <ClipLoader size={20} />
                            ) : (
                                "Add Item"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}