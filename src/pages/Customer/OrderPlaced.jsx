import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  // One entrance sequence: the check pops in, then the text follows.
  // With reduced motion, everything just appears.
  const fadeUp = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { y: 16, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 0.45, delay },
        };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-10">
      <main className="w-full max-w-md rounded-2xl border border-stone-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-12">
        <motion.div
          initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50"
        >
          <FaCircleCheck
            className="h-12 w-12 text-green-500"
            aria-hidden="true"
          />
        </motion.div>

        <motion.h1
          {...fadeUp(0.25)}
          className="text-3xl font-extrabold text-stone-900 sm:text-4xl"
        >
          Order placed
        </motion.h1>

        <motion.p
          {...fadeUp(0.35)}
          className="mx-auto mt-3 max-w-sm text-base text-stone-600 sm:text-lg"
        >
          We'll notify you once your order is ready for delivery.
        </motion.p>

        <motion.div
          {...fadeUp(0.45)}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <button
            onClick={() => navigate("/my-orders")}
            className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          >
            View my orders
          </button>
          <button
            onClick={() => navigate("/home")}
            className="rounded-lg border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700 transition hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2"
          >
            Continue shopping
          </button>
        </motion.div>
      </main>
    </div>
  );
}

export default OrderPlaced;
