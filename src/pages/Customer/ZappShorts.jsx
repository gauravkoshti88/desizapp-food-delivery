import React, { useEffect, useState, useRef } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { serverUrl } from '../../App';
import ShortsCard from '../../components/Customer/ShortsCard'
import { IoIosArrowRoundBack } from 'react-icons/io';

const ZappShorts = () => {
  const navigate = useNavigate();
  const [shortsData, setShortsData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const loaderRef = useRef(null);


  // Fetch shorts
  const fetchShorts = async () => {
    try {
      const res = await axios.get(serverUrl + `/api/food/all-items?page=${page}&limit=10`, { withCredentials: true })

      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setShortsData(prev => [...prev, ...res.data]);
      }
    } catch (err) {
      navigate("/server-error")
    }
  };

  useEffect(() => {
    fetchShorts();
  }, [page]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore]);

  useEffect(() => {
    if (shortsData.length > 0 && activeIndex >= shortsData.length) {
      setActiveIndex(shortsData.length - 1);
    }
  }, [shortsData, activeIndex]);

  return (
    <div className='w-full min-h-screen bg-black overflow-hidden flex justify-center items-center'>
      <div className="w-full h-20 flex items-center gap-5 px-5 fixed top-2.5 left-2.5 z-[100]" >
        <div
          onClick={() => navigate("/home")}
          className="px-1 bg-orange-50 hover:bg-orange-100 rounded-xl hover:scale-105 transition-all duration-200 shadow-md absolute top-1 left-1"
        >
          <IoIosArrowRoundBack size={24} className="text-orange-600" />
          
        </div>
        
      </div>

      <div
        className='h-[99vh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide'
        onScroll={(e) => {
          const scrollTop = e.target.scrollTop;
          const index = Math.round(scrollTop / window.innerHeight);
          setActiveIndex(index);
        }}
      >
        {shortsData.length > 0 ? (
          shortsData.map((shorts, index) => (
            <div className='h-screen snap-start' key={index}>
              {activeIndex === index && <ShortsCard shorts={shorts} />}
            </div>
          ))
        ) : (
          <div className="w-full h-[80vh] flex flex-col justify-center items-center 
                    bg-gray-900 text-white rounded-xl p-8 m-5 shadow-lg">
            <h2 className="text-2xl font-bold mb-3">No Shorts Available</h2>
            <p className="text-gray-300 mb-6 text-center">
              Looks like there are no food shorts to show right now.
              Please check back later or explore other sections.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 
                   rounded-lg text-white font-semibold transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        )}

        {/* Loader */}
        {hasMore && shortsData.length > 0 && (
          <div ref={loaderRef} className="flex justify-center py-4 text-white">
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ZappShorts);