import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Logo from "./images/Animate_logo.png";
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/clerk-react";
import { useFavorites } from "../../contexts/FavoritesContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { signOut } = useClerk();
  const { favorites } = useFavorites();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

const navLinks = ["Home", "Explore", "About", "Contact"];

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
            {navLinks.map((item) => (
              <Link
                key={item}
                to={`/${item === "Home" ? '' : item.toLowerCase()}`}
                onClick={closeMenu}
                className="hover:text-gray-300 dark:hover:text-white" 
              >
                {item}
              </Link>
            ))}
            
            {/* Favorites Link - Only for signed in users */}
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
              <Link to="/sign-in" onClick={closeMenu} className="hover:text-gray-300 dark:hover:text-white">
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
            <DarkModeToggle />
            <UserButton/>
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
            {navLinks.map((item) => (
              <Link
                key={item}
                to={`/${item === "Home" ? '' : item.toLowerCase()}`}
                onClick={closeMenu}
                className="hover:text-gray-300 dark:hover:text-white"
              >
                {item}
              </Link>
            ))}
            
            {/* Mobile Favorites Link */}
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
              <Link to="/sign-in" onClick={closeMenu} className="hover:text-gray-300 dark:hover:text-white">
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
