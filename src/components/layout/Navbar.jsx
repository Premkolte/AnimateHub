import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DarkModeToggle from "../UI/DarkModeToggle";
import { FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Logo from "/assets/Animate_logo.png";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useAuthStore } from "../../store/authStore";
import {
  SignedIn,
  SignedOut,
  useClerk,
} from "@clerk/clerk-react";
import "../layout/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { favorites } = useFavorites();
  const { currentUser, logout } = useAuthStore();
  const [language, setLanguage] = useState("en");

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = ["Home", "Explore", "About", "AnimationPlayground", "LeaderBoard", "Contact"];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

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
    <>
      <nav
        className={`
          w-full backdrop-blur-md transition-all duration-500 ease-out
          ${scrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 shadow-2xl border-b-0 text-gray-800 dark:text-gray-200' 
            : 'bg-gradient-to-r from-[#3b82f6] to-[#6a99d6] dark:from-purple-900 dark:to-purple-900 border-b border-white/20 text-white dark:text-gray-200'
          }
          py-3 sticky top-0 left-0 z-50
          ${scrolled ? 'shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]' : 'shadow-[0px_3px_20px_0px_rgba(255,255,255,0.3)]'}
        `}
      >
        <div className="w-full px-4 lg:px-8">
          <div className="w-full flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group">
              <Link
                to="/"
                className="flex items-center space-x-3 transform transition-transform duration-300 hover:scale-105"
                onClick={closeMenu}
              >
                <div className="relative">
                  <img
                    className="w-12 h-12 lg:w-16 lg:h-16 transition-transform duration-300 group-hover:rotate-12"
                    src={Logo}
                    alt="AnimateHub Logo"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 rounded-full blur-lg group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                <span className={`font-heading text-xl md:text-2xl lg:text-3xl font-bold transition-all duration-300 ${
                  scrolled 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-white to-gray-100 dark:from-gray-100 dark:to-purple-200 bg-clip-text text-transparent'
                }`}>
                  AnimateHub
                </span>
              </Link>
              <div className="xl:hidden">
                <DarkModeToggle />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((item, index) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={item}
                    to={path}
                    onClick={closeMenu}
                    className={`
                      relative px-4 py-2 rounded-lg transition-all duration-300 ease-out
                      font-medium text-sm xl:text-base
                      ${scrolled 
                        ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300' 
                        : 'hover:bg-white/20 dark:hover:bg-purple-800/30 text-white/90 dark:text-gray-200'
                      }
                      hover:shadow-lg hover:shadow-white/10
                      transform hover:scale-105 hover:-translate-y-0.5
                      ${isActive 
                        ? scrolled
                          ? 'text-blue-600 dark:text-purple-400 bg-blue-50 dark:bg-purple-900/40 shadow-lg'
                          : 'text-white dark:text-purple-200 bg-white/10 dark:bg-purple-700/40 shadow-lg'
                        : ''
                      }
                      group overflow-hidden
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="relative z-10">{item}</span>
                    <div className={`
                      absolute bottom-0 left-0 h-0.5 bg-gradient-to-r transition-all duration-300
                      ${scrolled 
                        ? 'from-blue-500 to-purple-500' 
                        : 'from-white to-blue-200 dark:from-purple-300 dark:to-pink-300'
                      }
                      ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                    `} />
                    {/* Animated background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden xl:flex items-center space-x-3 xl:space-x-4">
              {currentUser ? (
                <>
                  {/* Favorites Link */}
                  <Link
                    to="/favorites"
                    onClick={closeMenu}
                    className="relative group flex items-center space-x-2 px-3 py-2 rounded-lg
                      bg-white/10 dark:bg-purple-800/30 hover:bg-white/20 dark:hover:bg-purple-700/40
                      transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <FaHeart className="text-red-400 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-sm font-medium">Favorites</span>
                    {favorites.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full
                        animate-pulse shadow-lg transform scale-110">
                        {favorites.length}
                      </span>
                    )}
                  </Link>

                  {/* Sign Out Button */}
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                      navigate("/");
                    }}
                    className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300
                      transition-all duration-300 hover:scale-105 font-medium text-sm"
                  >
                    Sign Out
                  </button>

                  {/* User Profile */}
                  <Link
                    to="/profile"
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
                      text-white flex items-center justify-center font-bold text-sm
                      hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 
                      hover:scale-110 transform ring-2 ring-white/20"
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
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 
                    dark:from-purple-600 dark:to-purple-700 text-white font-medium
                    transition-all duration-300 hover:scale-105 hover:shadow-xl 
                    hover:shadow-blue-500/25 dark:hover:shadow-purple-500/25
                    transform hover:-translate-y-0.5"
                >
                  Sign In
                </Link>
              )}

              {/* Dark Mode Toggle */}
              <div className="p-2 rounded-lg backdrop-blur-sm bg-white/10 dark:bg-purple-800/40
                hover:bg-white/20 dark:hover:bg-purple-700/50 transition-all duration-300">
                <DarkModeToggle />
              </div>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 rounded-lg backdrop-blur-sm bg-white/20 hover:bg-white/30 
                  dark:bg-purple-800/40 dark:hover:bg-purple-700/50 transition-all duration-300 
                  font-medium shadow-sm hover:scale-105 hover:shadow-lg text-sm"
              >
                {language === "en" ? "🇮🇳 हिंदी" : "🇬🇧 English"}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`xl:hidden menu-button relative p-2 rounded-lg transition-all duration-300 hover:scale-110 focus:outline-none group ${
                scrolled 
                  ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <div className="relative w-6 h-6">
                <span className={`
                  absolute top-1.5 left-0 w-6 h-0.5 transform transition-all duration-300 ease-out
                  ${scrolled ? 'bg-gray-700 dark:bg-gray-300' : 'bg-white'}
                  ${isOpen ? 'rotate-45 translate-y-2' : ''}
                `} />
                <span className={`
                  absolute top-3 left-0 w-6 h-0.5 transform transition-all duration-300 ease-out
                  ${scrolled ? 'bg-gray-700 dark:bg-gray-300' : 'bg-white'}
                  ${isOpen ? 'opacity-0' : ''}
                `} />
                <span className={`
                  absolute top-[18px] left-0 w-6 h-0.5 transform transition-all duration-300 ease-out
                  ${scrolled ? 'bg-gray-700 dark:bg-gray-300' : 'bg-white'}
                  ${isOpen ? '-rotate-45 -translate-y-2' : ''}
                `} />
              </div>
            </button>
          </div>
        </div>
        <div id="google_translate_element" style={{ display: "none" }}></div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `} />

      {/* Mobile Menu */}
      <div className={`
        fixed top-0 right-0 h-screen w-80 max-w-[85vw] z-50 xl:hidden mobile-menu
        bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
        transform transition-transform duration-500 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        shadow-2xl border-l border-white/20 dark:border-gray-700/50
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200/20 dark:border-gray-700/30">
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Menu
            </span>
            <button 
              onClick={closeMenu} 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 px-6 py-4 space-y-2 overflow-y-auto">
            {navLinks.map((item, index) => {
              const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;
              return (
                <Link
                  key={item}
                  to={path}
                  onClick={closeMenu}
                  className={`
                    flex items-center px-4 py-3 rounded-xl transition-all duration-300
                    text-lg font-medium transform hover:scale-105 hover:shadow-lg
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-purple-400 shadow-lg' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                    }
                  `}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: isOpen ? 'slideInRight 0.5s ease-out forwards' : 'none'
                  }}
                >
                  <span>{item}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 dark:bg-purple-400 rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200/20 dark:border-gray-700/30 space-y-2">
              <SignedIn>
                <Link
                  to="/favorites"
                  onClick={closeMenu}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl
                    hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300"
                >
                  <FaHeart className="text-red-400" />
                  <span className="text-lg font-medium">Favorites</span>
                  {favorites.length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => {
                    signOut({ redirectUrl: "/" });
                    closeMenu();
                  }}
                  className="w-full flex items-center px-4 py-3 rounded-xl text-left
                    hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400
                    transition-all duration-300 text-lg font-medium"
                >
                  Sign Out
                </button>
              </SignedIn>
              <SignedOut>
                <Link
                  to="/sign-in"
                  onClick={closeMenu}
                  className="flex items-center justify-center px-4 py-3 rounded-xl
                    bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium
                    transition-all duration-300 hover:scale-105 shadow-lg text-lg"
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>

            {/* Mobile Language Toggle */}
            <div className="pt-4">
              <button
                onClick={toggleLanguage}
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 
                  dark:from-gray-800 dark:to-gray-700 font-semibold
                  transition-all duration-300 hover:scale-105 shadow-sm text-lg"
              >
                {language === "en" ? "🇮🇳 हिंदी" : "🇬🇧 English"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
