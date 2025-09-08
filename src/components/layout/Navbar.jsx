import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import DarkModeToggle from '../UI/DarkModeToggle';
import MobileNav from './NavbarComponents/MobileNav';
import NavbarProfile from './NavbarComponents/NavbarProfile';

const NewNavbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: "Home", link: "/" },
        { name: "Explore", link: "/explore" },
        { name: "About", link: "/about" },
        {
            name: "Playgrounds",
            subLinks: [
                { name: "Animation Ground", link: "/animationplayground" },
                { name: "Code Playground", link: "/playground" },
                { name: "Framer Playground", link: "/framerplayground" },
                { name: "Gradient Ground", link: "/ColorGradientPlayground" },
                { name: "Tailwind Ground", link: "/TailwindPlayground" },
                { name: "SVG Playground", link: "/SVGPlayground" },
                { name: "Font Playground", link: "/FontPlayground" },
                { name: "Flexbox Ground", link: "/flexboxPlayground" },
            ]
        },
        { name: "LeaderBoard", link: "/leaderboard" },
        { name: "Challenge", link: "/challenge" },
        { name: "Blogs", link: "/blogs" },
        { name: "Contact", link: "/contact" },
    ];

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const closeDropdown = () => {
        setActiveDropdown(null);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        closeDropdown();
    };

    // Close dropdown when route changes
    useEffect(() => {
        closeDropdown();
    }, [location]);

    return (
        <nav className="bg-white dark:bg-secondary-900 border-b border-gray-200 dark:border-secondary-700 sticky top-0 z-50 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        >
                            AnimateHub
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((item, index) => (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => item.subLinks && toggleDropdown(index)}
                                onMouseLeave={() => item.subLinks && closeDropdown()}
                            >
                                {item.subLinks ? (
                                    <>
                                        <button
                                            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${activeDropdown === index
                                                ? 'text-indigo-600 dark:text-indigo-400'
                                                : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                                                } transition-colors`}
                                        >
                                            {item.name}
                                            <span className="ml-1">
                                                {activeDropdown === index ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                                            </span>
                                        </button>
                                        {activeDropdown === index && (
                                            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                                                <div className="py-1">
                                                    {item.subLinks.map((subItem, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            to={subItem.link}
                                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                            onClick={closeDropdown}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={item.link}
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === item.link
                                            ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                                            } transition-colors`}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}

                    </div>


                    <div className='flex justify-center items-center space-x-4'>
                        <DarkModeToggle />
                        <NavbarProfile />

                        {/* Mobile menu button */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={toggleMobileMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                                aria-expanded={isMobileMenuOpen}
                                aria-label="Toggle navigation"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile menu */}
            <MobileNav
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
                navLinks={navLinks}
                activeDropdown={activeDropdown}
                toggleDropdown={toggleDropdown}
            />
        </nav>
    );
};

export default NewNavbar;
