import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Reusable/Navbar";
import categories from "../categories.js";
import CategoryCard from "./Customer/CategoryCard.jsx";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import FoodCard from "./Customer/FoodCard";
import { useNavigate } from "react-router-dom";
import ZappShortsImg from "../assets/ZappShorts.png";
import ZappGroceryImg from "../assets/ZappGrocery2.png";
import Footer from "./Welcome/Footer.jsx";

/* Horizontal scroller with arrow buttons (arrows show on sm+ only; touch users swipe). */
function ScrollRow({ children }) {
  const ref = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [children]);

  const scroll = (direction) =>
    ref.current?.scrollBy({
      left: direction === "left" ? -240 : 240,
      behavior: "smooth",
    });

  const arrowClass =
    "absolute top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-md transition hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:flex";

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className={`${arrowClass} -left-3`}
        >
          <FaChevronLeft size={14} />
        </button>
      )}
      <div
        ref={ref}
        className="flex snap-x gap-3 overflow-x-auto scroll-smooth px-1 py-2 [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      {canScrollRight && (
        <button
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className={`${arrowClass} -right-3`}
        >
          <FaChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">{children}</h2>
  );
}

function EmptyNote({ title, message }) {
  return (
    <div className="w-full rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-10 text-center">
      <h3 className="text-lg font-bold text-stone-800">{title}</h3>
      <p className="mt-1 text-sm text-stone-500">{message}</p>
    </div>
  );
}

function CustomerDashboard() {
  const { city, shopsInCity, itemsInCity, searchItems } = useSelector(
    (state) => state.user,
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  // Derived from the store, so the filter stays correct when items reload.
  const updatedItemList =
    !selectedCategory || selectedCategory === "All"
      ? itemsInCity
      : (itemsInCity || []).filter((i) => i.category === selectedCategory);

  const promoTiles = [
    { img: ZappGroceryImg, label: "Zapp Grocery", path: "/grocery" },
    { img: ZappShortsImg, label: "Zapp Shorts", path: "/zapp-shorts" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-stone-100 text-stone-900">
      <Navbar />

      {/* pt-* clears the fixed navbar; adjust if your navbar height differs */}
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 pb-24 pt-36 sm:space-y-10 sm:px-6 sm:pb-10 md:pt-24 lg:px-8">
        {/* Search results */}
        {searchItems && (
          <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
            <SectionHeading>Search results</SectionHeading>
            {searchItems.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {searchItems.map((food, index) => (
                  <FoodCard food={food} key={index + "_" + food._id} />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-stone-500">
                No items found. Try another keyword.
              </p>
            )}
          </section>
        )}

        {/* Promo tiles */}
        <section
          aria-label="Quick links"
          className="grid grid-cols-2 gap-3 sm:gap-5"
        >
          {promoTiles.map((tile) => (
            <button
              key={tile.path}
              onClick={() => navigate(tile.path)}
              aria-label={tile.label}
              className="flex h-20 items-center justify-center overflow-hidden rounded-2xl bg-purple-600 px-3 shadow-sm transition hover:bg-purple-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 active:scale-[0.98] sm:h-24"
            >
              <img
                src={tile.img}
                alt=""
                className="h-full max-w-full object-contain"
              />
            </button>
          ))}
        </section>

        {/* Categories */}
        <section className="space-y-3">
          <SectionHeading>Discover flavors you'll love</SectionHeading>
          <ScrollRow>
            {categories.map((cate, index) => {
              const selected = selectedCategory === cate.category;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(cate.category)}
                  aria-pressed={selected}
                  className={`shrink-0 snap-start rounded-xl border-2 p-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                    selected
                      ? "border-orange-500 bg-orange-50"
                      : "border-transparent hover:border-orange-200 hover:bg-white"
                  }`}
                >
                  <CategoryCard name={cate.category} image={cate.image} />
                </button>
              );
            })}
          </ScrollRow>
        </section>

        {/* Shops */}
        <section className="space-y-3">
          <SectionHeading>
            Best shops in <span className="text-orange-600">{city}</span>
          </SectionHeading>
          {shopsInCity && shopsInCity.length > 0 ? (
            <ScrollRow>
              {shopsInCity.map((shop, index) => (
                <div key={index} className="shrink-0 snap-start">
                  <CategoryCard
                    image={shop.image.url}
                    name={shop.restaurantName}
                    onClick={() => navigate(`/shop/${shop._id}`)}
                  />
                </div>
              ))}
            </ScrollRow>
          ) : (
            <EmptyNote
              title="No shops available"
              message={`No shops are listed in ${city || "your city"} yet. Check back soon.`}
            />
          )}
        </section>

        {/* Food items */}
        <section className="space-y-4">
          <SectionHeading>
            {selectedCategory && selectedCategory !== "All"
              ? selectedCategory
              : "Food items"}
          </SectionHeading>
          {updatedItemList && updatedItemList.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {updatedItemList.map((food, index) => (
                <FoodCard food={food} key={index + "_" + food._id} />
              ))}
            </div>
          ) : (
            <EmptyNote
              title="No food items found"
              message="Pick another category above to see more options."
            />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CustomerDashboard;
