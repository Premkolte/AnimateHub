import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.nav
      className="w-full bg-slate-800 text-white py-2 shadow-md fixed top-0 right-0 left-0 z-50 overflow-hidden"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="flex justify-between items-center py-2">
          {/* Logo Animation */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 1.2 }}
          >
            <Link to="/" onClick={closeMenu} className="flex items-center space-x-2">
              <motion.div
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                <img
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  src={Logo}
                  alt="AnimateHub Logo"
                />
              </motion.div>
              <span className="font-gagalin bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300 font-bold text-lg sm:text-xl md:text-3xl">
                AnimateHub
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-4 lg:space-x-6 items-center">
            {["Home", "Explore", "About", "Contact", "Login"].map((item) => (
              <motion.div
                key={item}
                className="hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={closeMenu}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-2xl focus:outline-none text-white"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden flex flex-col mt-4 space-y-2 bg-slate-700 rounded-lg shadow-lg p-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              {["Home", "Explore", "About", "Contact", "Login"].map((item) => (
                <motion.div
                  key={item}
                  className="hover:text-blue-400 transition-colors text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={closeMenu}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
