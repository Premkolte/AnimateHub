import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DarkModeToggle from "../DarkModeToggle";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./images/Animate_logo.png";
// import './Navbar.css'; // Assuming you have a CSS file for additional styling

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 shadow-lg fixed top-0 left-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Animation */}
          <motion.div
            className="text-lg md:text-xl lg:text-2xl font-bold tracking-wider flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 7 }}
            whileTap={{ scale: 1.6 }}
          >
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <motion.div
                initial={{ scale: 2 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                <img className="size-12 pt-2 pl-4" src={Logo} alt="animateHub"/>
              </motion.div>
              <span className="font-gagalin bg-clip-text text-transparent bg-text-gradient font-bold text-3xl">
                AnimateHub
              </span>              <span className="md:hidden">
                <DarkModeToggle />
              </span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4 md:space-x-6 items-center">
            {["Home", "Explore", "About", "Contact", "Login"].map((item) => (
              <motion.div
                key={item}
                className="hover:text-gray-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to={`/${item.toLowerCase()}`} onClick={closeMenu}>
                  {item}
                </Link>
              </motion.div>
            ))}
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-2xl focus:outline-none">
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {isOpen && (
          <motion.div
            className="flex flex-col mt-4 space-y-4 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            {["Home", "Explore", "About", "Contact", "Login"].map((item) => (
              <motion.div
                key={item}
                className="hover:text-gray-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to={`/${item.toLowerCase()}`} onClick={closeMenu}>
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
