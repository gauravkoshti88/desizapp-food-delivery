import React, { useEffect, useRef, useState } from "react";
import { GoUnmute, GoMute } from "react-icons/go";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import { IoIosShareAlt } from "react-icons/io";
import { IoPlay } from "react-icons/io5";

const railButton =
  "flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 active:scale-95";

const ShortsCard = ({ shorts }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shorts?.dishname,
          text: `${shorts?.dishname} from ${shorts?.restaurantName}`,
          url: window.location.href,
        });
      } catch (e) {
        /* user cancelled */
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMute;
    }
  }, [isMute]);

  return (
    <div className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-black lg:w-[26rem]">
      {/* Loader until the video is ready */}
      {!isLoaded && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-black"
          role="status"
          aria-label="Loading video"
        >
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      )}

      {/* Video (kept in the layout while loading so autoplay isn't blocked) */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMute}
        loop
        playsInline
        src={shorts.videoUrl}
        className={`h-full w-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onClick={handleClick}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={() => setIsLoaded(true)}
      />

      {isLoaded && (
        <>
          {/* Paused indicator */}
          {!isPlaying && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 text-white">
                <IoPlay size={30} className="ml-1" />
              </span>
            </div>
          )}

          {/* Action rail */}
          <div className="absolute bottom-28 right-3 flex flex-col items-center gap-3 sm:bottom-32">
            <button
              onClick={() => setIsMute((m) => !m)}
              aria-label={isMute ? "Unmute" : "Mute"}
              className={railButton}
            >
              {isMute ? <GoMute size={22} /> : <GoUnmute size={22} />}
            </button>
            <button
              onClick={() => setLiked((l) => !l)}
              aria-label={liked ? "Unlike" : "Like"}
              aria-pressed={liked}
              className={railButton}
            >
              {liked ? (
                <AiFillLike size={24} className="text-orange-400" />
              ) : (
                <AiOutlineLike size={24} />
              )}
            </button>
            <button aria-label="Comments" className={railButton}>
              <LiaCommentSolid size={24} />
            </button>
            <button
              onClick={handleShare}
              aria-label="Share"
              className={railButton}
            >
              <IoIosShareAlt size={24} />
            </button>
          </div>

          {/* Bottom info */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-16 sm:px-5">
            <div className="flex items-center gap-3 pr-16">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white/80">
                <img
                  src={shorts?.shopImage?.url}
                  alt={shorts?.ownerFullname}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-bold text-white">
                  {shorts?.restaurantName}
                </p>
                <p className="truncate text-xs text-white/70">
                  {shorts?.ownerFullname}
                </p>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 pr-16 text-sm font-medium text-white">
              {shorts?.dishname}
            </p>
          </div>

          {/* Progress bar */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
            <div
              className="h-full bg-orange-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ShortsCard;
