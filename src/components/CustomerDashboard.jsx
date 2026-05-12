import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Reusable/Navbar'
import categories from '../categories.js'
import CategoryCard from './Customer/CategoryCard.jsx'
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import FoodCard from './Customer/FoodCard'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import ZappShortsImg from '../assets/ZappShorts.png'
import ZappGroceryImg from '../assets/ZappGrocery2.png'
import Footer from './Welcome/Footer.jsx';

function CustomerDashboard() {
  const categoryScrollRef = useRef();
  const shopScrollRef = useRef();
  const { city, shopsInCity, itemsInCity, searchItems } = useSelector(state => state.user)
  const [showLeftCateBtn, setShowLeftCateBtn] = useState(false);
  const [showRightCateBtn, setShowRightCateBtn] = useState(false);
  const [showLeftShopBtn, setShowLeftShopBtn] = useState(false);
  const [showRightShopBtn, setShowRightShopBtn] = useState(false);
  const [updatedItemList, setUpdatedItemList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate()

  const handleFilterByCategory = (category) => {
    setSelectedCategory(category);
    if (category == "All") {
      setUpdatedItemList(itemsInCity)
    } else {
      const filteredList = itemsInCity.filter(i => i.category === category);
      setUpdatedItemList(filteredList)
    }
  }

  useEffect(() => {
    setUpdatedItemList(itemsInCity)
  }, [itemsInCity])

  const updateButton = (ref, setShowLeft, setShowRight) => {
    const element = ref.current;
    if (element) {
      setShowLeft(element.scrollLeft > 0);
      setShowRight(element.scrollLeft + element.clientWidth < element.scrollWidth);
    }
  };

  const scrollHandler = (ref, direction) => {
    if (ref?.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };


  useEffect(() => {
  const categoryEl = categoryScrollRef.current;
  const shopEl = shopScrollRef.current;

  if (categoryEl) {
    updateButton(categoryScrollRef, setShowLeftCateBtn, setShowRightCateBtn);

    const handleScroll = () => {
      updateButton(categoryScrollRef, setShowLeftCateBtn, setShowRightCateBtn);
    };

    categoryEl.addEventListener("scroll", handleScroll);

    return () => {
      categoryEl.removeEventListener("scroll", handleScroll);
    };
  }

  if (shopEl) {
    updateButton(shopScrollRef, setShowLeftShopBtn, setShowRightShopBtn);

    const handleShopScroll = () => {
      updateButton(shopScrollRef, setShowLeftShopBtn, setShowRightShopBtn);
    };

    shopEl.addEventListener("scroll", handleShopScroll);

    return () => {
      shopEl.removeEventListener("scroll", handleShopScroll);
    };
  }
}, []);


  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />

      {searchItems && (
        <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px] bg-white shadow-md rounded-xl mt-35 sm:mt-35 md:mt-20 lg:mt-20'>
          <h1 className='text-2xl sm:text-3xl font-semibold border-b border-gray-200 text-gray-500'>Search Results</h1>
          {searchItems.length > 0 ? (
            <div className='w-full h-auto flex flex-wrap gap-6 justify-center'>
              {searchItems.map((food, index) => (
                <FoodCard food={food} key={index + "_" + food._id} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-lg italic mt-4">
              No items found for your search. Try another keyword!
            </p>
          )}
        </div>
      )}

      <div className='hidden md:flex w-full gap-10 justify-center mt-20 md:mt-30'>
        <div
          className='w-1/4 h-20 flex justify-center items-center bg-purple-500 rounded-3xl shadow-sm 
               hover:bg-purple-600 hover:shadow-2xl active:scale-95 transition-all duration-300 cursor-pointer'
          onClick={() => navigate("/grocery")}
        >
          <img src={ZappGroceryImg} alt="" className='w-60 h-45' />
        </div>
        <div
          className='w-1/4 h-20 flex justify-center items-center bg-purple-500 rounded-3xl shadow-sm 
               hover:bg-purple-600 hover:shadow-2xl active:scale-95 transition-all duration-300 cursor-pointer'
          onClick={() => navigate("/zapp-shorts")}
        >
          <img src={ZappShortsImg} alt="" className='w-60 h-45' />
        </div>
      </div>

      {/* For Categorys */}
      <div className="w-full flex flex-col gap-5 items-start p-[10px] mt-20 md:mt-5 px-5 md:px-10">
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-500'>Discover flavors you’ll lover</h1>
        <div className='w-full relative'>
          {showLeftCateBtn && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-3xl shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(categoryScrollRef, "left")}
            >
              <FaChevronLeft />
            </button>
          )}

          <div className='w-full flex overflow-x-auto gap-4 pb-2 p-2' ref={categoryScrollRef}>
            {categories.map((cate, index) => (
              <div
                key={index}
                onClick={() => handleFilterByCategory(cate.category)}
                className={`cursor-pointer rounded-xl transition-all duration-300 ease-in-out
                  ${selectedCategory === cate.category
                    ? "border-2 border-orange-500 shadow-lg shadow-orange-300 scale-105 bg-gradient-to-r from-orange-50 to-orange-100"
                    : "border border-transparent hover:border-orange-200 hover:scale-105"
                  }`}
              >
                <CategoryCard
                  name={cate.category}
                  image={cate.image}
                />
              </div>
            ))}
          </div>
          {showRightCateBtn && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-3xl shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(categoryScrollRef, "right")}
            >
              <FaChevronRight />
            </button>
          )}

        </div>
      </div>
      {/* For Shops */}
      <div className="w-full flex flex-col gap-5 items-start p-[10px] px-5 md:px-10">
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-500'>
          Best Shop in <span className='text-orange-600'>{city}</span>
        </h1>
        {shopsInCity && shopsInCity.length > 0 ? (
          <div className='w-full relative'>
            <div className='w-full flex overflow-x-auto gap-4 pb-2' ref={shopScrollRef}>
              {shopsInCity.map((shop, index) => (
                <CategoryCard
                  image={shop.image.url}
                  name={shop.restaurantName}
                  key={index}
                  onClick={() => navigate(`/shop/${shop._id}`)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-gray-600">No Shops Available</h2>
            <p className="text-gray-500 mt-2">
              Currently no shops are listed in {city}. Please check back later!
            </p>
          </div>
        )}
      </div>

      {/* For All FoodItems */}
      <div className='w-full flex flex-col gap-5 items-start p-[10px] px-5 md:px-10'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-500'>
          Food Items
        </h1>
        {updatedItemList && updatedItemList.length > 0 ? (
          <div className="w-full h-auto grid gap-5 pb-25 sm:pb-5 
                grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {updatedItemList.map((food, index) => (
              <FoodCard food={food} key={index + "_" + food._id} />
            ))}
          </div>
        ) : (
          <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-gray-600">No Food Items Found</h2>
            <p className="text-gray-500 mt-2">
              Explore categories above to discover delicious options!
            </p>
          </div>
        )}
      </div>

      <div className='w-full'>
        <Footer />
      </div>
    </div>
  )
}

export default CustomerDashboard