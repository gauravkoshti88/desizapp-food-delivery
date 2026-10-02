import React from "react";

function CategoryCard({ name, image, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Browse ${name}`}
      className="group relative aspect-[4/3] w-28 shrink-0 snap-start overflow-hidden
                 rounded-2xl bg-orange-100 text-left shadow-md ring-1 ring-orange-200
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/30
                 hover:ring-2 hover:ring-[#ff4d2d]
                 active:scale-95
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d2d]
                 focus-visible:ring-offset-2
                 motion-reduce:transition-none motion-reduce:hover:translate-y-0
                 sm:w-36 md:w-44 lg:w-52"
    >
      {/* Image */}
      <img
        src={image}
        alt=""
        loading="lazy"
        draggable={false}
        className="h-full w-full object-cover transition-transform duration-500 ease-out
                   group-hover:scale-110 motion-reduce:transition-none
                   motion-reduce:group-hover:scale-100"
      />

      {/* Dark gradient so the text is readable on any photo */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5
                   bg-gradient-to-t from-black/75 via-black/30 to-transparent"
      />

      {/* Name */}
      <span
        className="absolute inset-x-0 bottom-0 truncate px-3 pb-2 text-xs font-semibold
                   text-white drop-shadow sm:text-sm md:text-base"
      >
        {name}
      </span>

      {/* Accent bar that grows on hover */}
      <span
        className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-orange-500
                   to-red-500 transition-all duration-300 group-hover:w-full
                   motion-reduce:transition-none"
      />
    </button>
  );
}

export default CategoryCard;

/*
  Parent row (horizontal scroll, snaps on mobile, hides scrollbar):

  <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 py-3
                  sm:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {categories.map((c) => (
      <CategoryCard key={c.name} name={c.name} image={c.image} onClick={() => ...} />
    ))}
  </div>
*/
