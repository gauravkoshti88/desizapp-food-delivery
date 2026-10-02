import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";

// One source of truth for desktop + mobile (order was different before)
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const ctaLabel = userData ? "Get Started" : "Login";

  const handleCta = () => {
    closeMenu();
    navigate("/login");
  };

  // Close with Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Close menu if screen grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => e.matches && closeMenu();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-orange-400/40
                 bg-gradient-to-r from-orange-600 via-amber-600 to-red-600
                 shadow-lg shadow-orange-500/30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0" onClick={closeMenu}>
            <img
              src={Logo}
              alt="DesiZapp Logo"
              className="h-10 w-auto sm:h-11 lg:h-12 object-contain
                         transition-transform duration-300 hover:scale-105
                         motion-reduce:transition-none"
            />
          </a>

          {/* Desktop links (md and up) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-4">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative rounded-full px-3 py-2 text-base lg:text-lg
                           font-medium text-white transition-colors duration-200
                           hover:bg-white/20 focus:outline-none
                           focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {item.label}
                <span
                  className="absolute -bottom-0.5 left-3 right-3 h-0.5 origin-left scale-x-0
                             rounded-full bg-amber-200 transition-transform duration-300
                             group-hover:scale-x-100 motion-reduce:transition-none"
                />
              </a>
            ))}
          </div>

          {/* Desktop CTA (md and up, so there is no gap between 768–1023px) */}
          <div className="hidden md:flex items-center">
            <button
              type="button"
              onClick={handleCta}
              className="rounded-full border border-orange-300 bg-orange-200 px-5 py-1.5
                         font-semibold text-black shadow-lg transition-all duration-200
                         hover:scale-105 hover:bg-orange-300 focus:outline-none
                         focus-visible:ring-2 focus-visible:ring-white/70
                         motion-reduce:transition-none motion-reduce:hover:scale-100"
            >
              {ctaLabel}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="rounded-xl p-2 text-white transition-colors hover:bg-white/20
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out
                    motion-reduce:transition-none
                    ${isOpen ? "max-h-[28rem] opacity-100 visible" : "max-h-0 opacity-0 invisible"}`}
      >
        <div className="border-t border-white/20 bg-gradient-to-b from-orange-600 to-red-600">
          <div className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-lg font-semibold text-white
                           transition-colors hover:bg-white/20 focus:outline-none
                           focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleCta}
              className="mt-3 w-full rounded-xl bg-orange-200 px-6 py-3 font-bold text-black
                         shadow-lg transition-colors hover:bg-orange-300 focus:outline-none
                         focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
