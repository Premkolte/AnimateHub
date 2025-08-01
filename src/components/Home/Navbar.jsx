import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./images/Animate_logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
              <span className="font-gagalin text-3xl font-bold text-white dark:text-gray-100">
                AnimateHub
              </span>
              <span className="md:hidden">
                <DarkModeToggle />
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-4 md:space-x-6 items-center">
            {["Home", "Explore", "About", "Contact", "Login"].map((item) => (
              <Link
                key={item}
                to={`/${item === "Home" ? '' : item.toLowerCase()}`}
                onClick={closeMenu}
                className="hover:text-gray-300 dark:hover:text-white"
              >
                {item}
              </Link>
            ))}
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-2xl focus:outline-none"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {isOpen && (
          <div className="flex flex-col mt-4 space-y-4 md:hidden">
            {["Home", "Explore", "About", "Contact", "Login"].map((item) => (
              <Link
                key={item}
                to={`/${item === "Home" ? '' : item.toLowerCase()}`}
                onClick={closeMenu}
                className="hover:text-gray-300 dark:hover:text-white"
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
