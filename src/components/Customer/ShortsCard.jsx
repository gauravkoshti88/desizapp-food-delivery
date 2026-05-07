import React, { useEffect, useRef, useState } from 'react'
import { GoUnmute, GoMute } from "react-icons/go";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import { IoIosShareAlt } from "react-icons/io";

const ShortsCard = ({ shorts }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); 

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    }
  };

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMute;
    }
  }, [isMute]);

  return (
    <div className="w-full lg:w-104 h-screen flex items-center justify-center bg-black relative overflow-hidden">
      
      {/* Loader until video/image ready */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMute}
        loop
        playsInline
        src={shorts.videoUrl}
        className={`w-full h-full object-cover ${!isLoaded ? "hidden" : "block"}`}
        onClick={handleClick}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={() => setIsLoaded(true)} // ✅ mark loaded
      />

      {/* Bottom Info (only show when loaded) */}
      {isLoaded && (
        <div className="absolute bottom-0 w-full h-28 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-6 py-4 flex flex-col justify-end pointer-events-auto">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 border-4 border-white/80 rounded-full overflow-hidden shadow-2xl ring-2 ring-orange-400/50">
              <img
                src={shorts?.shopImage?.url}
                alt={shorts?.ownerFullname}
                className="w-full h-full object-cover"
                onLoad={() => setIsLoaded(true)} // ✅ image loaded
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white font-bold text-lg truncate">{shorts?.ownerFullname}</p>
              <p className="text-orange-400 font-semibold text-sm truncate">{shorts?.restaurantName}</p>
              <p className="text-white/90 text-sm truncate">{shorts?.dishname}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-1">
            <button className="p-2 bg-black/50 rounded-xl"><AiOutlineLike className="w-6 h-6 text-white" /></button>
            <button className="p-2 bg-black/50 rounded-xl"><LiaCommentSolid className="w-6 h-6 text-white" /></button>
            <button className="p-2 bg-black/50 rounded-xl"><IoIosShareAlt className="w-6 h-6 text-white" /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortsCard;
