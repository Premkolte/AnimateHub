import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../../../store/authStore"
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../../../contexts/FavoritesContext";

const NavbarProfile = () => {
    const { favorites } = useFavorites();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { currentUser, logout } = useAuthStore();
    const profileRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        if (isProfileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileOpen]);

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate("/");
    };

    return (
        <div className="relative" ref={profileRef}>
            <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
            >
                {currentUser?.avatarUrl ? (
                    <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.username || 'Profile'}
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <FiUser className="w-5 h-5" />
                )}

                <FiChevronDown
                    className={`absolute -bottom-1 -right-1 text-xs bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full p-0.5 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            <div
                className={`absolute right-0 top-full mt-2 w-64 rounded-xl shadow-2xl z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 transform origin-top-right transition-all duration-300 ease-out ${isProfileOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
            >
                {currentUser ? (
                    // Logged In User Menu
                    <>
                        {/* Profile Header */}
                        <div className="p-4 border-b border-gray-200/20 dark:border-gray-700/30">
                            <div className="flex items-center space-x-3">
                                {currentUser.avatarUrl ? (
                                    <img
                                        src={currentUser.avatarUrl}
                                        alt={currentUser.username}
                                        className="w-12 h-12 rounded-full ring-2 ring-blue-500/20 object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg ring-2 ring-blue-500/20">
                                        {currentUser.username
                                            ? currentUser.username.charAt(0).toUpperCase()
                                            : "U"}
                                    </div>
                                )}
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
                                to={
                                    currentUser?.username
                                        ? `/profile/${currentUser.username}`
                                        : "/profile"
                                }
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 text-gray-700 dark:text-gray-300 group"
                            >
                                <FiUser className="text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                                <span className="font-medium">Profile</span>
                            </Link>

                            <Link
                                to="/favorites"
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 text-gray-700 dark:text-gray-300 group relative"
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

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 text-red-600 dark:text-red-400 group"
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
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 text-white flex items-center justify-center font-bold text-lg">
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
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-blue-600 dark:text-blue-400 group"
                        >
                            <FiUser className="group-hover:scale-110 transition-transform duration-200" />
                            <span className="font-medium">Sign In</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavbarProfile
