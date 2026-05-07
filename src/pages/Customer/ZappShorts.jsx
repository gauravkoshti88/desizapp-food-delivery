import React, { useEffect, useState, useRef } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { serverUrl } from '../../App';
import ShortsCard from '../../components/Customer/ShortsCard'

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
      const res = await axios.get(serverUrl+`/api/food/all-items?page=${page}&limit=10`,{withCredentials:true})

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
        <FaArrowLeftLong className='text-white w-6.25 h-6.25 cursor-pointer active:scale-95' onClick={() => navigate("/home")} />
        <h1 className="text-white font-semibold text-[20px]">Shorts</h1>
      </div>

      <div
        className='h-[99vh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide'
        onScroll={(e) => {
          const scrollTop = e.target.scrollTop;
          const index = Math.round(scrollTop / window.innerHeight);
          setActiveIndex(index);
        }}
      >
        {shortsData.map((shorts, index) => (
          <div className='h-screen snap-start' key={index}>
            {activeIndex === index && <ShortsCard shorts={shorts} />}
          </div>
        ))}

        {/* Loader */}
        {hasMore && (
          <div ref={loaderRef} className="flex justify-center py-4 text-white">
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ZappShorts);