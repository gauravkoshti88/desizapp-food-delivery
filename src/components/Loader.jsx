import React from "react";

/**
 * Centered loader in the DesiZapp orange theme.
 *
 * Props:
 *  - fullScreen: true  -> covers the whole viewport and centers (default)
 *                false -> centers inside its parent (parent needs a height)
 *  - size:       "sm" | "md" | "lg"  (default "md")
 *  - text:       label under the spinner; pass "" to hide it
 */
const SIZES = {
  sm: { ring: "h-8 w-8 border-[3px]", dot: "h-2 w-2", text: "text-xs" },
  md: { ring: "h-14 w-14 border-4", dot: "h-3 w-3", text: "text-sm" },
  lg: { ring: "h-20 w-20 border-[5px]", dot: "h-4 w-4", text: "text-base" },
};

const Loader = ({ fullScreen = true, size = "md", text = "Loading..." }) => {
  const s = SIZES[size] ?? SIZES.md;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen
          ? "fixed inset-0 z-[100] bg-orange-50"
          : "h-full min-h-[12rem] w-full"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Spinning ring */}
        <div
          className={`${s.ring} rounded-full border-orange-200 border-t-orange-500
                      border-r-amber-500 animate-spin motion-reduce:animate-none`}
        />
        {/* Pulsing center dot */}
        <span
          className={`${s.dot} absolute rounded-full bg-gradient-to-r from-orange-500
                      to-red-500 animate-pulse`}
        />
      </div>

      {text ? (
        <p className={`${s.text} font-medium tracking-wide text-orange-700`}>
          {text}
        </p>
      ) : (
        <span className="sr-only">Loading</span>
      )}
    </div>
  );
};

export default Loader;
