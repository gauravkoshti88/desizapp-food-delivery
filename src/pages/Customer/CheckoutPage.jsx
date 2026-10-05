import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { FaLocationDot, FaCreditCard } from "react-icons/fa6";
import { TbCurrentLocation } from "react-icons/tb";
import { MdDeliveryDining } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";

import { setAddress, setLocation } from "../../redux/slices/mapSlice";
import { addMyOrder, setCartItems } from "../../redux/slices/userSlice";
import { serverUrl } from "../../App";
import HomeLoc from "../../assets/DaliveryBoy/homeLoc.png";

function RecenterMap({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location?.lat && location?.long) {
      map.setView([location.lat, location.long], 16, {
        animate: true,
      });
    }
  }, [location?.lat, location?.long, map]);

  return null;
}

const customerIcon = new L.Icon({
  iconUrl: HomeLoc,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50],
});

function CheckoutPage() {
  const { location, address } = useSelector((state) => state.map);

  const { cartItems, totalAmount, userData } = useSelector(
    (state) => state.user,
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const apiKey = import.meta.env.VITE_GEO_API;

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const safeTotalAmount = Number(totalAmount) || 0;

  const deliveryFee = safeTotalAmount > 500 ? 0 : 45;
  const totalWithDeliveryFee = safeTotalAmount + deliveryFee;

  const hasLocation = Boolean(
    location?.lat !== null &&
    location?.lat !== undefined &&
    location?.long !== null &&
    location?.long !== undefined,
  );

  const isEmpty = safeCartItems.length === 0;

  const showError = (message) => {
    toast.error(message, {
      position: "top-right",
    });
  };

  const showSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
    });
  };

  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;

    dispatch(
      setLocation({
        lat,
        long: lng,
      }),
    );

    getAddressByLatLng(lat, lng);
  };

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`,
      );

      const formattedAddress = response.data?.results?.[0]?.formatted || "";

      if (!formattedAddress) {
        throw new Error("Address not found.");
      }

      dispatch(setAddress(formattedAddress));
      setAddressInput(formattedAddress);
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      dispatch(setAddress(null));
    }
  };

  const getLatLngByAddress = async () => {
    const trimmedAddress = addressInput.trim();

    if (!trimmedAddress) {
      showError("Please enter your delivery address.");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          trimmedAddress,
        )}&apiKey=${apiKey}`,
      );

      const result = response.data?.features?.[0];

      if (!result) {
        throw new Error("Location not found.");
      }

      const { lat, lon } = result.properties;

      if (
        lat === undefined ||
        lon === undefined ||
        lat === null ||
        lon === null
      ) {
        throw new Error("Invalid location received.");
      }

      dispatch(
        setLocation({
          lat,
          long: lon,
        }),
      );

      dispatch(setAddress(trimmedAddress));
    } catch (error) {
      console.error("Address search error:", error);

      dispatch(
        setLocation({
          lat: null,
          long: null,
        }),
      );

      showError("Unable to find this address.");
    }
  };

  const getCurrentLocation = () => {
    const latitude = userData?.location?.coordinates?.[1];
    const longitude = userData?.location?.coordinates?.[0];

    if (
      latitude === undefined ||
      longitude === undefined ||
      latitude === null ||
      longitude === null
    ) {
      showError("Current location is not available.");
      return;
    }

    dispatch(
      setLocation({
        lat: latitude,
        long: longitude,
      }),
    );

    getAddressByLatLng(latitude, longitude);
  };

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return;

    if (isEmpty) {
      showError("Your cart is empty.");
      return;
    }

    if (!addressInput.trim()) {
      showError("Please enter your delivery address.");
      return;
    }

    if (!hasLocation) {
      showError("Please select a valid delivery location.");
      return;
    }

    if (
      location?.lat === null ||
      location?.lat === undefined ||
      location?.long === null ||
      location?.long === undefined
    ) {
      showError("Please select a valid delivery location.");
      return;
    }

    try {
      setIsPlacingOrder(true);

      const response = await axios.post(
        serverUrl + "/api/order/place-order",
        {
          cartItems: safeCartItems,
          deliveryAddress: {
            text: addressInput.trim(),
            latitude: location.lat,
            longitude: location.long,
          },
          paymentMethod,
          totalAmount: totalWithDeliveryFee,
        },
        {
          withCredentials: true,
        },
      );

      if (!response.data) {
        throw new Error("Invalid order response.");
      }

      if (paymentMethod === "COD") {
        dispatch(addMyOrder(response.data));
        dispatch(setCartItems([]));

        showSuccess("Order placed successfully.");

        navigate("/order-placed");
        return;
      }

      const razorpayOrder = response.data?.razorpayOrder;
      const orderId = response.data?.orderId;

      if (!razorpayOrder?.id || !orderId) {
        throw new Error("Invalid Razorpay order response.");
      }

      setIsPlacingOrder(false);

      openRazorpay(orderId, razorpayOrder);
    } catch (error) {
      console.error("Place order error:", error);

      showError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Unable to place order.",
      );

      setIsPlacingOrder(false);
    }
  };

  const openRazorpay = (orderId, razorpayOrder) => {
    if (!window.Razorpay) {
      showError("Razorpay SDK is not loaded. Please refresh the page.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: razorpayOrder.amount,

      currency: razorpayOrder.currency || "INR",

      name: "DesiZapp",

      description: "Food Order Payment",

      order_id: razorpayOrder.id,

      prefill: {
        name: userData?.fullname || "",
        email: userData?.email || "",
        contact: userData?.phone || "",
      },

      handler: async function (paymentResponse) {
        try {
          setIsPlacingOrder(true);

          if (!paymentResponse?.razorpay_payment_id) {
            throw new Error("Razorpay payment ID is missing.");
          }

          const verifyResponse = await axios.post(
            serverUrl + "/api/order/verify-payment",
            {
              orderId,
              razorpayPaymentId: paymentResponse.razorpay_payment_id,
            },
            {
              withCredentials: true,
            },
          );

          if (!verifyResponse.data?.success) {
            throw new Error(
              verifyResponse.data?.message || "Payment verification failed.",
            );
          }

          const verifiedOrder = verifyResponse.data?.order;

          if (!verifiedOrder) {
            throw new Error(
              "Payment verified but order data was not returned.",
            );
          }

          dispatch(addMyOrder(verifiedOrder));
          dispatch(setCartItems([]));

          showSuccess("Payment successful. Order placed.");

          navigate("/order-placed");
        } catch (error) {
          console.error("Payment verification error:", error);

          showError(
            error.response?.data?.message ||
              "Payment was received, but order verification is still processing. Please check your order status.",
          );
        } finally {
          setIsPlacingOrder(false);
        }
      },

      modal: {
        ondismiss: function () {
          setIsPlacingOrder(false);

          toast.info("Payment window closed.", {
            position: "top-right",
          });
        },
      },

      theme: {
        color: "#f97316",
      },
    };

    try {
      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("Razorpay payment failed:", response?.error);

        setIsPlacingOrder(false);

        showError(
          response?.error?.description || "Payment failed. Please try again.",
        );
      });

      razorpay.open();
    } catch (error) {
      console.error("Razorpay initialization error:", error);

      setIsPlacingOrder(false);

      showError("Unable to open Razorpay. Please try again.");
    }
  };

  useEffect(() => {
    setAddressInput(address || "");
  }, [address]);

  const placeOrderLabel =
    paymentMethod === "COD" ? "Place order" : "Pay & place order";

  const paymentOptions = [
    {
      id: "COD",
      title: "Cash on delivery",
      note: "Pay when your food arrives",
      icons: (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
          <MdDeliveryDining className="text-xl text-green-600" />
        </span>
      ),
    },
    {
      id: "ONLINE",
      title: "UPI / Credit / Debit card",
      note: "Pay securely online",
      icons: (
        <span className="flex shrink-0 -space-x-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 ring-2 ring-white">
            <FaMobileAlt className="text-lg text-purple-700" />
          </span>

          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 ring-2 ring-white">
            <FaCreditCard className="text-lg text-blue-700" />
          </span>
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <header className="sticky top-0 z-[1000] border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <button
            onClick={() => navigate("/cart")}
            aria-label="Back to cart"
            disabled={isPlacingOrder}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IoIosArrowRoundBack size={28} />
          </button>

          <h1 className="text-lg font-bold sm:text-xl">Checkout</h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-32 sm:px-6 lg:pb-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-6">
            <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <FaLocationDot className="text-orange-600" />
                Delivery location
              </h2>

              <div className="mb-3 flex gap-2">
                <input
                  type="text"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      getLatLngByAddress();
                    }
                  }}
                  placeholder="Enter your delivery address"
                  disabled={isPlacingOrder}
                  className="min-w-0 flex-1 rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:bg-stone-100"
                />

                <button
                  onClick={getLatLngByAddress}
                  aria-label="Search address"
                  disabled={isPlacingOrder}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <IoIosSearch size={20} />
                </button>

                <button
                  onClick={getCurrentLocation}
                  aria-label="Use my current location"
                  disabled={isPlacingOrder}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-stone-800 text-white transition hover:bg-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <TbCurrentLocation size={20} />
                </button>
              </div>

              <div className="relative z-0 h-56 w-full overflow-hidden rounded-xl border border-stone-200 sm:h-72 lg:h-80">
                <MapContainer
                  className="h-full w-full"
                  center={
                    hasLocation
                      ? [location.lat, location.long]
                      : [20.5937, 78.9629]
                  }
                  zoom={hasLocation ? 16 : 5}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <RecenterMap location={location} />

                  {hasLocation && (
                    <Marker
                      position={[location.lat, location.long]}
                      draggable={!isPlacingOrder}
                      eventHandlers={{
                        dragend: onDragEnd,
                      }}
                      icon={customerIcon}
                    />
                  )}
                </MapContainer>
              </div>

              <p className="mt-2 text-xs text-stone-500">
                Drag the pin to fine-tune your delivery spot.
              </p>
            </section>

            <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="mb-4 text-lg font-bold">Payment method</h2>

              <div
                role="radiogroup"
                aria-label="Payment method"
                className="grid gap-3 sm:grid-cols-2"
              >
                {paymentOptions.map((opt) => {
                  const selected = paymentMethod === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setPaymentMethod(opt.id)}
                      disabled={isPlacingOrder}
                      className={`flex items-center gap-3 rounded-xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-60 ${
                        selected
                          ? "border-orange-500 bg-orange-50 shadow-sm"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      {opt.icons}

                      <span className="min-w-0">
                        <span className="block font-semibold">{opt.title}</span>

                        <span className="block text-xs text-stone-500">
                          {opt.note}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {paymentMethod === "ONLINE" && (
                <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                  <p className="font-semibold">
                    Razorpay test mode: no real money is deducted.
                  </p>

                  <p className="mt-1">
                    Use Razorpay's dummy card details only.
                  </p>
                </div>
              )}
            </section>
          </div>

          <aside className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6 lg:sticky lg:top-24">
            <h2 className="mb-4 flex items-center justify-between text-lg font-bold">
              Order summary
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                {safeCartItems.length}{" "}
                {safeCartItems.length === 1 ? "item" : "items"}
              </span>
            </h2>

            {isEmpty ? (
              <div className="py-8 text-center">
                <p className="font-semibold">Your cart is empty</p>

                <button
                  onClick={() => navigate("/home")}
                  className="mt-3 text-sm font-semibold text-orange-600 hover:underline"
                >
                  Browse shops
                </button>
              </div>
            ) : (
              <>
                <ul className="max-h-72 divide-y divide-stone-100 overflow-y-auto pr-1">
                  {safeCartItems.map((item, index) => (
                    <li
                      key={item.id || index}
                      className="flex items-center justify-between gap-3 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                          <IoFastFoodOutline size={20} />
                        </span>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {item.name}
                          </p>

                          <p className="text-xs text-stone-500">
                            Qty {item.quantity}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 text-sm font-bold">
                        ₹
                        {(
                          Number(item.price) * Number(item.quantity)
                        ).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>

                <dl className="mt-4 space-y-3 border-t border-stone-200 pt-4 text-sm">
                  <div className="flex justify-between text-stone-600">
                    <dt>Subtotal</dt>

                    <dd className="font-semibold text-stone-900">
                      ₹{safeTotalAmount.toLocaleString()}
                    </dd>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <dt>Delivery</dt>

                    <dd
                      className={`font-semibold ${
                        deliveryFee === 0 ? "text-green-600" : "text-stone-900"
                      }`}
                    >
                      {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
                    </dd>
                  </div>

                  {deliveryFee > 0 && (
                    <p className="text-xs text-stone-500">
                      Add ₹{Math.max(0, 501 - safeTotalAmount).toLocaleString()}{" "}
                      more for free delivery.
                    </p>
                  )}

                  <div className="flex items-baseline justify-between border-t border-stone-200 pt-3">
                    <dt className="text-base font-bold">Total</dt>

                    <dd className="text-2xl font-extrabold text-orange-600">
                      ₹{totalWithDeliveryFee.toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={isEmpty || isPlacingOrder}
              className="mt-6 hidden w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 lg:block"
            >
              {isPlacingOrder ? "Processing..." : placeOrderLabel}
            </button>
          </aside>
        </div>
      </main>

      {!isEmpty && (
        <div className="fixed inset-x-0 bottom-0 z-[1000] border-t border-stone-200 bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center gap-4">
            <div className="min-w-0">
              <p className="text-xs text-stone-500">Total</p>

              <p className="text-xl font-extrabold text-orange-600">
                ₹{totalWithDeliveryFee.toLocaleString()}
              </p>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className="ml-auto flex-1 rounded-lg bg-orange-500 py-3 font-semibold text-white transition active:bg-orange-600 disabled:cursor-not-allowed disabled:bg-stone-300 sm:max-w-xs sm:flex-none sm:px-8"
            >
              {isPlacingOrder ? "Processing..." : placeOrderLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
