import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Logo from "./images/Animate_logo.png";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useAuthStore } from "../../store/authStore";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();
  const { currentUser, logout } = useAuthStore();
  const [language, setLanguage] = useState("en");

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = ["Home", "Explore", "About", "Contact"];

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
    <nav className="w-full bg-blue-600 dark:bg-purple-700 text-white dark:text-gray-200 py-2 pt-1 shadow-lg sticky top-0 left-0 z-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
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
              <span className="font-heading text-3xl font-bold text-white dark:text-gray-100">
                AnimateHub
              </span>
            </Link>
            <span className="md:hidden">
              <DarkModeToggle />
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-4 md:space-x-6 items-center">
            {navLinks.map((item) => (
              <Link
                key={item}
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                onClick={closeMenu}
                className="hover:text-gray-300 dark:hover:text-white"
              >
                {item}
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
                  title={currentUser.username || 'Profile'}
                >
                  {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'U'}
                </Link>
              </>
            ) : (
              <Link
                to="/sign-in"
                onClick={closeMenu}
                className="hover:text-gray-300 dark:hover:text-white"
              >
                Sign In
              </Link>
            )}

            <DarkModeToggle />

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-4 px-3 py-1 rounded bg-white text-blue-600 font-semibold shadow hover:bg-gray-200 transition"
            >
              {language === "en" ? "🇮🇳 हिंदी" : "🇬🇧 English"}
            </button>
            <div id="google_translate_element" style={{ display: "none" }}></div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
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
          <div className="flex flex-col mt-4 space-y-4 md:hidden">
            {navLinks.map((item) => (
              <Link
                key={item}
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                onClick={closeMenu}
                className="hover:text-gray-300 dark:hover:text-white"
              >
                {item}
              </Link>
            ))}

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
                className="hover:text-gray-300 dark:hover:text-white"
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
