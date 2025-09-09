import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';

const MobileNav = ({ isOpen, onClose, navLinks, activeDropdown, toggleDropdown }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
                aria-hidden="true"
            />
            <div 
                className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{
                    transformOrigin: 'right center',
                    willChange: 'transform',
                    visibility: isOpen ? 'visible' : 'hidden',
                    transitionProperty: 'transform, visibility',
                    transitionDelay: isOpen ? '0s, 0s' : '0s, 0.3s'
                }}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menu</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
                            aria-label="Close menu"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>
                    
                    <nav className="flex-1 overflow-y-auto py-4">
                        <div className="space-y-1 px-4">
                            {navLinks.map((item, index) => (
                                <div key={index} className="relative">
                                    {item.subLinks ? (
                                        <>
                                            <button
                                                onClick={() => toggleDropdown(index === activeDropdown ? null : index)}
                                                className="w-full flex justify-between items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:translate-x-1"
                                            >
                                                <span>{item.name}</span>
                                                <FaChevronDown 
                                                    className={`ml-2 transform transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} 
                                                    size={12} 
                                                />
                                            </button>
                                            {activeDropdown === index && (
                                                <div className="pl-4 mt-1 space-y-1">
                                                    {item.subLinks.map((subItem, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            to={subItem.link}
                                                            className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:translate-x-2"
                                                            onClick={onClose}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            to={item.link}
                                            className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:translate-x-1"
                                            onClick={onClose}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </nav>
                    
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            © {new Date().getFullYear()} AnimateHub. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileNav;
