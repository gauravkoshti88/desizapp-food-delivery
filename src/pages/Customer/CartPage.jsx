import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import CartItemCard from "../../components/Customer/CartItemCard";

const CartPage = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const itemCount = cartItems.length;
  const isEmpty = itemCount === 0;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <button
            onClick={() => navigate("/home")}
            aria-label="Back to home"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <IoIosArrowRoundBack size={28} />
          </button>
          <h1 className="text-lg font-bold sm:text-xl">Your cart</h1>
          {!isEmpty && (
            <span className="ml-auto rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-32 sm:px-6 lg:pb-10">
        {isEmpty ? (
          /* Empty state */
          <div className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-2xl border border-stone-200 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <FiShoppingBag size={28} />
            </div>
            <h2 className="text-xl font-bold">Your cart is empty</h2>
            <p className="mt-2 text-sm text-stone-500">
              Browse shops and add items to see them here.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="mt-6 rounded-lg bg-orange-500 px-6 py-2.5 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
              Browse shops
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
            {/* Items */}
            <section
              aria-label="Cart items"
              className="space-y-4 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm sm:p-5"
            >
              {cartItems.map((item, idx) => (
                <CartItemCard item={item} key={item._id + "-" + idx} />
              ))}
            </section>

            {/* Summary: sidebar on desktop */}
            <aside className="hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-24 lg:block">
              <h2 className="text-lg font-bold">Order summary</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-stone-600">
                  <dt>Items ({itemCount})</dt>
                  <dd>₹{totalAmount}</dd>
                </div>
              </dl>
              <div className="my-4 border-t border-stone-200" />
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-extrabold text-orange-600">
                  ₹{totalAmount}
                </span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                Proceed to checkout
              </button>
            </aside>
          </div>
        )}
      </main>

      {/* Summary: sticky bottom bar on mobile/tablet */}
      {!isEmpty && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-200 bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center gap-4">
            <div className="min-w-0">
              <p className="text-xs text-stone-500">Total</p>
              <p className="text-xl font-extrabold text-orange-600">
                ₹{totalAmount}
              </p>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="ml-auto flex-1 rounded-lg bg-orange-500 py-3 font-semibold text-white transition active:bg-orange-600 sm:max-w-xs sm:flex-none sm:px-8"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
