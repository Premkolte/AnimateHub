import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "../UI/DarkModeToggle";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Logo from "/assets/Animate_logo.png";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useAuthStore } from "../../store/authStore";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/clerk-react";
import "../layout/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();
  const { currentUser, logout } = useAuthStore();
  const [language, setLanguage] = useState("en");

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = ["Home", "Explore", "About","AnimationPlayground", "LeaderBoard", "Contact"];

  useEffect(() => {
    // Hide Google Translate UI
    const style = document.createElement("style");
    style.innerHTML = `
      .goog-te-banner-frame.skiptranslate { display: none !important; }
      body { top: 0px !important; position: static !important;  }
      .goog-te-gadget { display: none !important; }
      .goog-logo-link { display: none !important; }
    `;
    document.head.appendChild(style);

    // Init Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,es",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Load Google Translate script only once
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  }, []);

  // Safe language change
  const changeLanguage = (lang) => {
    let attempts = 0;
    const interval = setInterval(() => {
      const selectEl = document.querySelector(".goog-te-combo");
      if (selectEl) {
        selectEl.value = lang;
        selectEl.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
      attempts++;
      if (attempts > 10) clearInterval(interval);
    }, 200);
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en";
    setLanguage(newLang);
    changeLanguage(newLang);
  };

  return (
    <nav
      className="w-full backdrop-blur-md 
             bg-gradient-to-r from-[#3b82f6] to-[#accefbff] dark:from-purple-900 dark:to-purple-900
             text-gray-800 dark:text-gray-200
             py-2 pt-1 sticky top-0 left-0 z-50
             border-b border-white/20
             shadow-[0px_3px_20px_0px_rgba(255,255,255,0.3)]"
    >
      <div className="w-full px-4">
        <div className="w-full flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={closeMenu}
            >
              <img
                className="w-16 h-16 pt-2 pl-4"
                src={Logo}
                alt="AnimateHub Logo"
              />
              <span className="font-heading text-2xl md:text-3xl font-bold text-white dark:text-gray-100">
                AnimateHub
              </span>
            </Link>
            <span className="lg:hidden">
              <DarkModeToggle />
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-4 justify-center -translate-x-4">
            {navLinks.map((item) => (
              <Link
                key={item}
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                onClick={closeMenu}
                className={`relative px-2 py-1 transition-all duration-300 
        hover:text-blue-700 hover:font-bold dark:hover:text-purple-300 
        ${
          location.pathname === `/${item === "Home" ? "" : item.toLowerCase()}`
            ? "text-white dark:text-purple-300 font-bold"
            : "font-normal"
        }
        group
      `}
              >
                {item}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 dark:bg-purple-300 
        transition-all duration-300 group-hover:w-full"
                />
              </Link>
            ))}

            {currentUser ? (
              <>
                <Link
                  to="/favorites"
                  onClick={closeMenu}
                  className="hover:text-gray-300 dark:hover:text-white flex items-center space-x-1"
                >
                  <FaHeart className="text-red-400" />
                  <span>Favorites</span>
                  {favorites.length > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                    navigate("/");
                  }}
                  className="hover:text-gray-300 dark:hover:text-white"
                >
                  Sign Out
                </button>

                {/* User avatar or initial */}
                <Link
                  to="/profile"
                  className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center"
                  title={currentUser.username || "Profile"}
                >
                  {currentUser.username
                    ? currentUser.username.charAt(0).toUpperCase()
                    : "U"}
                </Link>
              </>
            ) : (
              <Link
                to="/sign-in"
                onClick={closeMenu}
                className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 
                  dark:hover:bg-purple-700 text-white transition-all duration-300 shadow-lg 
                  hover:shadow-blue-500/25 dark:hover:shadow-purple-500/25"
              >
                Sign In
              </Link>
            )}

            <div className="p-1.5 rounded-lg backdrop-blur-sm bg-white/10 dark:bg-purple-800/40">
              <DarkModeToggle />
            </div>

            {/* Language Toggle with enhanced styling */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-1.5 rounded-lg backdrop-blur-sm bg-white/20 hover:bg-white/30 
                dark:bg-purple-800/40 dark:hover:bg-purple-700/50 transition-all duration-300 
                font-medium shadow-sm"
            >
              {language === "en" ? "🇮🇳 हिंदी" : "🇬🇧 English"}
            </button>
            <div
              id="google_translate_element"
              style={{ display: "none" }}
            ></div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-2xl focus:outline-none"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed top-0 right-0 h-screen w-[80%] bg-[#f8f6ff] dark:bg-[#261946] shadow-lg z-50 transform translate-x-0 transition-transform duration-300 ease-in-out block lg:hidden flex flex-col p-4 space-y-4 gap-[3vh]">
            {/* Close button at top-right */}
            <button onClick={closeMenu} className="self-end text-2xl mb-4">
              <FiX />
            </button>

            {navLinks.map((item) => {
              const isActive =
                location.pathname ===
                `/${item === "Home" ? "" : item.toLowerCase()}`;

              return (
                <Link
                  key={item}
                  to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  onClick={closeMenu}
                  className={`transition-all duration-300 text-xl
        hover:text-gray-300 hover:font-bold dark:hover:text-white hover-underline-animation
        ${
          isActive
            ? "font-bold text-blue-500 dark:text-purple-300 active-underline"
            : "font-normal"
        }
      `}
                >
                  {item}
                </Link>
              );
            })}

            <SignedIn>
              <Link
                to="/favorites"
                onClick={closeMenu}
                className="hover:text-gray-300 dark:hover:text-white flex items-center space-x-1"
              >
                <FaHeart className="text-red-400" />
                <span>Favorites</span>
                {favorites.length > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </SignedIn>

            <SignedOut>
              <Link
                to="/sign-in"
                onClick={closeMenu}
                className="hover:text-gray-300 dark:hover:text-white text-xl"
              >
                Sign In
              </Link>
            </SignedOut>

            <SignedIn>
              <button
                onClick={() => {
                  signOut({ redirectUrl: "/" });
                  closeMenu();
                }}
                className="hover:text-gray-300 dark:hover:text-white"
              >
                Sign Out
              </button>
            </SignedIn>

            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded bg-white text-blue-600 font-semibold shadow hover:bg-gray-200 transition"
            >
              {language === "en" ? "🇮🇳 हिंदी" : "🇬🇧 English"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
