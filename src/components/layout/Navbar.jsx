import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DarkModeToggle from "../UI/DarkModeToggle";
import {
  FiX,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Logo from "/assets/Animate_logo.png";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useAuthStore } from "../../store/authStore";
import "../layout/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { currentUser, logout } = useAuthStore();
  const [language, setLanguage] = useState("en");
  const profileRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  

  const navLinks = [
    "Home",
    "Explore",
    "About",
    "Playgrounds",
    "LeaderBoard",
    "Contact",
  ];

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
      if (
        isOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setIsOpen(false);
      }
      // Close profile dropdown when clicking outside
      if (
        isProfileOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isProfileOpen]);

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
    setIsProfileOpen(false); // Close dropdown when language changes
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/");
  };
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  // close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <>
      <nav
        className={`
          w-full backdrop-blur-md transition-all duration-500 ease-out
          ${
            scrolled
              ? "bg-white/95 dark:bg-gray-900/95 shadow-2xl border-b-0 text-gray-800 dark:text-gray-200"
              : "bg-gradient-to-r from-[#3b82f6] to-[#6a99d6] dark:from-purple-900 dark:to-purple-900 border-b border-white/20 text-white dark:text-gray-200"
          }
          py-3 sticky top-0 left-0 z-50
          ${
            scrolled
              ? "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
              : "shadow-[0px_3px_20px_0px_rgba(255,255,255,0.3)]"
          }
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
                <span
                  className={`font-heading text-xl md:text-2xl lg:text-3xl font-bold transition-all duration-300 ${
                    scrolled
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-white to-gray-100 dark:from-gray-100 dark:to-purple-200 bg-clip-text text-transparent"
                  }`}
                >
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
        // skip old Playground & AnimationPlayground
        if (item === "Playground" || item === "AnimationPlayground") {
          return null;
        }

        if (item === "Playgrounds") {
          return (
            <div key="playgrounds" className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className={`relative px-4 py-2 rounded-lg font-medium flex items-center
                  ${scrolled ? "text-gray-700 dark:text-gray-300" : "text-white/90"}`}
              >
                Playgrounds <FiChevronDown className="ml-1" />
              </button>

              {openDropdown && (
                <div className="absolute left-0 w-56 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-2 z-50">
                  <Link
                    to="/animationplayground"
                    onClick={() => {
                      closeMenu();
                      setOpenDropdown(false);
                    }}
                    className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700"
                  >
                    Animation Playground
                  </Link>
                  <Link
                    to="/playground"
                    onClick={() => {
                      closeMenu();
                      setOpenDropdown(false);
                    }}
                    className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700"
                  >
                    Playground
                  </Link>
                </div>
              )}
            </div>
          );
        }

                // Normal items
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
                      ${
                        scrolled
                          ? "text-gray-700 dark:text-gray-300"
                          : "text-white/90 dark:text-gray-200"
                      }
                      hover:shadow-lg 
                      transform hover:scale-105
                      ${
                        isActive
                          ? scrolled
                            ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-purple-400"
                            : "bg-white/10 dark:bg-purple-500/20 text-white dark:text-purple-200"
                          : ""
                      }
                      group overflow-hidden
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="relative z-10">{item}</span>

                    {/* Enhanced active indicator dot */}
                    {isActive && (
                      <div
                        className="absolute -top-1.5 right-1 w-3 h-3 rounded-full
                        bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500
                        animate-pulse
                        before:content-[''] before:absolute before:inset-0
                        before:rounded-full before:bg-gradient-to-br
                        before:from-cyan-400 before:via-purple-500 before:to-pink-500
                        before:animate-[spin_3s_linear_infinite]
                        after:content-[''] after:absolute after:inset-[-2px]
                        after:rounded-full after:bg-gradient-to-r
                        after:from-blue-500/30 after:to-purple-500/30
                        after:blur-sm after:animate-pulse
                        shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                      ></div>
                    )}

                    {/* Side accent for active state */}
                    {isActive && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-lg" />
                    )}

                    {/* Bottom accent */}
                    <div
                      className={`
                      absolute bottom-0 left-0 h-[2px] w-full transform origin-left
                      transition-transform duration-300 ease-out
                      bg-gradient-to-r from-blue-500 to-purple-500
                      scale-x-0 group-hover:scale-x-100
                      ${isActive ? "scale-x-100" : ""}
                    `}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions - Profile Avatar with Dropdown */}
            <div className="hidden xl:flex items-center">
              {/* Profile Avatar Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
                    hover:from-blue-600 hover:to-purple-700 text-white flex items-center justify-center 
                    font-bold text-sm transition-all duration-300 hover:scale-110 hover:shadow-lg 
                    hover:shadow-blue-500/25 ring-2 ring-white/20 hover:ring-white/40 group"
                  title="Profile Menu"
                >
                  {currentUser ? (
                    currentUser.username ? (
                      currentUser.username.charAt(0).toUpperCase()
                    ) : (
                      "U"
                    )
                  ) : (
                    <FiUser className="text-lg" />
                  )}
                  <div className="absolute -bottom-1 -right-1">
                    <FiChevronDown
                      className={`text-xs bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full p-0.5 transition-transform duration-300 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`
                  absolute right-0 top-full mt-2 w-64 rounded-xl shadow-2xl z-50
                  bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/50
                  transform origin-top-right transition-all duration-300 ease-out
                  ${
                    isProfileOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }
                `}
                >
                  {currentUser ? (
                    // Logged In User Menu
                    <>
                      {/* Profile Header */}
                      <div className="p-4 border-b border-gray-200/20 dark:border-gray-700/30">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
                            text-white flex items-center justify-center font-bold text-lg ring-2 ring-blue-500/20"
                          >
                            {currentUser.username
                              ? currentUser.username.charAt(0).toUpperCase()
                              : "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {currentUser.username || "User"}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {currentUser.email || "user@example.com"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* User Menu Items */}
                      <div className="p-2 space-y-1">
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg
                            hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200
                            text-gray-700 dark:text-gray-300 group"
                        >
                          <FiUser className="text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">Profile</span>
                        </Link>

                        <Link
                          to="/favorites"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg
                            hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200
                            text-gray-700 dark:text-gray-300 group relative"
                        >
                          <FaHeart className="text-red-500 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">Favorites</span>
                          {favorites.length > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {favorites.length}
                            </span>
                          )}
                        </Link>

                        <div className="border-t border-gray-200/20 dark:border-gray-700/30 my-2"></div>

                        {/* Dark Mode Toggle */}
                        <div
                          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg
                          hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
                        >
                          <div className="text-yellow-500">
                            <DarkModeToggle />
                          </div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            <span className="dark:hidden">Dark Mode</span>
                            <span className="hidden dark:inline">
                              Light Mode
                            </span>
                          </span>
                        </div>

                        {/* Language Toggle */}
                        <button
                          onClick={toggleLanguage}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
                            hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200
                            text-gray-700 dark:text-gray-300 group"
                        >
                          <span className="text-lg">
                            {language === "en" ? "🇮🇳" : "🇬🇧"}
                          </span>
                          <span className="font-medium">
                            {language === "en" ? "हिंदी" : "English"}
                          </span>
                        </button>

                        <div className="border-t border-gray-200/20 dark:border-gray-700/30 my-2"></div>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
                            hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200
                            text-red-600 dark:text-red-400 group"
                        >
                          <FiLogOut className="group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    // Guest User Menu
                    <div className="p-2 space-y-1">
                      <div className="p-4 border-b border-gray-200/20 dark:border-gray-700/30">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 
                            text-white flex items-center justify-center font-bold text-lg"
                          >
                            <FiUser className="text-xl" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              Guest User
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Not signed in
                            </p>
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/sign-in"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg
                          hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200
                          text-blue-600 dark:text-blue-400 group"
                      >
                        <FiUser className="group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium">Sign In</span>
                      </Link>

                      <div className="border-t border-gray-200/20 dark:border-gray-700/30 my-2"></div>

                      {/* Dark Mode Toggle */}
                      <div
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg
                        hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
                      >
                        <div className="text-yellow-500">
                          <DarkModeToggle />
                        </div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          <span className="dark:hidden">Dark Mode</span>
                          <span className="hidden dark:inline">Light Mode</span>
                        </span>
                      </div>

                      {/* Language Toggle */}
                      <button
                        onClick={toggleLanguage}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
                          hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200
                          text-gray-700 dark:text-gray-300 group"
                      >
                        <span className="text-lg">
                          {language === "en" ? "🇮🇳" : "🇬🇧"}
                        </span>
                        <span className="font-medium">
                          {language === "en" ? "हिंदी" : "English"}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`xl:hidden menu-button relative p-2 rounded-lg transition-all duration-300 hover:scale-110 focus:outline-none group ${
                scrolled
                  ? "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`
                  absolute top-1.5 left-0 w-6 h-0.5 transform transition-all duration-300 ease-out
                  ${scrolled ? "bg-gray-700 dark:bg-gray-300" : "bg-white"}
                  ${isOpen ? "rotate-45 translate-y-2" : ""}
                `}
                />
                <span
                  className={`
                  absolute top-3 left-0 w-6 h-0.5 transform transition-all duration-300 ease-out
                  ${scrolled ? "bg-gray-700 dark:bg-gray-300" : "bg-white"}
                  ${isOpen ? "opacity-0" : ""}
                `}
                />
                <span
                  className={`
                  absolute top-[18px] left-0 w-6 h-0.5 transform transition-all duration-300 ease-out
                  ${scrolled ? "bg-gray-700 dark:bg-gray-300" : "bg-white"}
                  ${isOpen ? "-rotate-45 -translate-y-2" : ""}
                `}
                />
              </div>
            </button>
          </div>
        </div>
        <div id="google_translate_element" style={{ display: "none" }}></div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
        fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden transition-opacity duration-300
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      />

      {/* Mobile Menu */}
      <div
        className={`
        fixed top-0 right-0 h-screen w-80 max-w-[85vw] z-50 xl:hidden mobile-menu
        bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
        transform transition-transform duration-500 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        shadow-2xl border-l border-white/20 dark:border-gray-700/50
      `}
      >
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
              // Skip the individual playground items
              if (item === "Playground" || item === "AnimationPlayground")
                return null;

              if (item === "Playgrounds") {
                return (
                  <div key="playgrounds" className="space-y-1">
                    <span className="block px-4 py-3 font-medium">
                      Playgrounds
                    </span>
                    <Link
                      to="/animationplayground"
                      onClick={closeMenu}
                      className="ml-4 block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    >
                      Animation Playground
                    </Link>
                    <Link
                      to="/playground"
                      onClick={closeMenu}
                      className="ml-4 block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    >
                      Playground
                    </Link>
                  </div>
                );
              }

              const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;
              return (
                <Link
                  key={item}
                  to={path}
                  onClick={closeMenu}
                  className={`
                    flex items-center px-4 py-3 rounded-xl transition-all duration-300
                    text-lg font-medium transform hover:scale-105
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-blue-500 dark:border-purple-500"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    }
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isOpen
                      ? "slideInRight 0.5s ease-out forwards"
                      : "none",
                  }}
                >
                  <span
                    className={
                      isActive ? "text-blue-600 dark:text-purple-400" : ""
                    }
                  >
                    {item}
                  </span>
                  {isActive && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  )}
                </Link>
              );
            })}

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200/20 dark:border-gray-700/30 space-y-2">
              {currentUser ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl
                    hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <FiUser className="text-blue-500" />
                    <span className="text-lg font-medium">Profile</span>
                  </Link>
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
                      logout();
                      closeMenu();
                    }}
                    className="w-full flex items-center px-4 py-3 rounded-xl text-left
                    hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400
                    transition-all duration-300 text-lg font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    onClick={closeMenu}
                    className="flex items-center justify-center px-4 py-2.5 rounded-lg
                      bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                      transition-all duration-300 hover:scale-105 shadow-lg 
                      text-base font-medium"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Language Toggle */}
            <div className="pt-4">
              <button
                onClick={toggleLanguage}
                className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r 
                  from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 
                  font-medium text-base transition-all duration-300 
                  hover:scale-105 shadow-sm flex items-center justify-center space-x-2"
              >
                <span>{language === "en" ? "🇮🇳" : "🇬🇧"}</span>
                <span>{language === "en" ? "हिंदी" : "English"}</span>
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

        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 15px rgba(147,51,234,0.5),
                       0 0 30px rgba(147,51,234,0.3); 
          }
          50% { 
            box-shadow: 0 0 25px rgba(147,51,234,0.8),
                       0 0 40px rgba(147,51,234,0.5); 
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
