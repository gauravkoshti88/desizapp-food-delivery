import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { serverUrl } from '../../App';
import { IoIosArrowRoundBack, IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setShopData } from '../../redux/slices/shopSlice';

export default function EditFoodItem() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { itemId } = useParams();
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        dishname: "",
        category: "",
        price: "",
        foodType: "",
        image: null,
        video: null,
    });

    // Refs for file inputs
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);

    // Generic change handler
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    useEffect(() => {
        const getItem = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    serverUrl + `/api/food/get-item/${itemId}`,
                    { withCredentials: true }
                );
                setFormData({
                    dishname: response.data.dishname || "",
                    category: response.data.category || "",
                    price: response.data.price || "",
                    foodType: response.data.foodType || "",
                });
                setLoading(false)
            } catch (error) {
                setLoading(false);
            }
        };
        getItem();
    }, [itemId]);

    const handleEdit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const image = e.target.image.files[0];
        const video = e.target.video.files[0];

        const fd = new FormData();
        fd.append("dishname", formData.dishname);
        fd.append("category", formData.category);
        fd.append("price", formData.price);
        fd.append("foodType", formData.foodType);
        if (image) fd.append("image", image);
        if (video) fd.append("video", video);

        try {
            const response = await axios.put(
                serverUrl + `/api/food/edit-item/${itemId}`,
                fd,
                { withCredentials: true }
            );
            navigate(-1)
            dispatch(setShopData(response.data));
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 px-4">
            {/* Back Button */}
            <div
                onClick={() => navigate("/home")}
                className="p-2 bg-orange-50 hover:bg-orange-100 rounded-xl hover:scale-105 transition-all duration-200 shadow-md absolute top-3 left-3"
            >
                <IoIosArrowRoundBack size={24} className="text-orange-600" />
            </div>

            {/* Form Container */}
            <div className="max-w-md mx-auto mt-10 sm:mt-0">
                <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-3 lg:mb-5">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-xl mb-5 mx-auto">
                            <IoMdArrowRoundBack className="text-white w-7 h-7 transform -rotate-180" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 via-gray-800 to-orange-600 bg-clip-text mb-2">
                            Edit Food Item
                        </h2>
                    </div>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleEdit}>
                        {/* Food Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                🍽️ Food Name *
                            </label>
                            <input
                                name="dishname"
                                type="text"
                                required
                                value={formData.dishname}
                                onChange={handleChange}
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
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all bg-gray-50 hover:border-orange-300"
                            >
                                <option value="">Select</option>
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
                                value={formData.foodType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all bg-gray-50 hover:border-orange-300"
                            >
                                <option value="">Select</option>
                                <option value="Veg">Veg</option>
                                <option value="Non-Veg">Non-Veg</option>
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
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all bg-gray-50 hover:border-orange-300"
                                placeholder="299"
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label htmlFor='image' className="block text-sm font-medium text-slate-700 mb-1">
                                🖼️ Image
                            </label>
                            <input
                                name="image"
                                type="file"
                                accept="image/*"
                                ref={imageInputRef}
                                className="w-full px-3 py-2 border-2 border-dashed border-slate-300 rounded-xl bg-orange-50 hover:border-orange-400 hover:bg-orange-100 transition-all cursor-pointer file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-orange-500 file:text-xs file:text-white"
                            />
                        </div>

                        {/* Video */}
                        <div>
                            <label htmlFor='image' className="block text-sm font-medium text-slate-700 mb-1">
                                🎥 Video
                            </label>
                            <input
                                name="video"
                                type="file"
                                accept="video/*"
                                ref={videoInputRef}
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
                                "Save Item"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}