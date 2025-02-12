import React, { useState, useEffect, useRef } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Buttons } from "./Buttons";
import { useNavigate, Link } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";

function SideBar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Menu Icon for Mobile Devices */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          className="flex items-center justify-center rounded-md p-2 bg-gray-200 hover:bg-gray-300 focus:outline-none mt-12 md:mt-0"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? (
            <IoMdClose size={24} className="text-gray-700" />
          ) : (
            <IoMdMenu size={24} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`lg:w-64 fixed inset-y-0 left-0 z-40 bg-white shadow-xl transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:inset-0 lg:z-auto overflow-y-auto`}
        style={{ maxHeight: "100vh", paddingTop: "2rem" }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between hover:bg-purple-300 m-2 py-1 px-2 rounded-md">
          <Link to="/">
            <BiChevronLeft size={28} className="hover:text-white" />
          </Link>
          <h1
            className="text-3xl font-bold text-center cursor-pointer"
            onClick={() => navigate("/")}
            role="button"
          >
            AnimateHub
          </h1>
        </div>

        {/* Sidebar Buttons */}
        <div className="p-4 h-full flex flex-col justify-between">
          <div className="space-y-2 mb-4 pb-4">
            {Buttons.map((button, index) => (
              <button
                key={index}
                className={`${
                  activeTab === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                } py-2 px-4 rounded-md w-full text-lg text-left focus:outline-none transition-colors duration-300`}
                onClick={() => handleTabClick(index)}
              >
                {button}
              </button>
            ))}
          </div>

          {/* Command Palette Tip */}
          <div className="text-center text-sm text-gray-700">
            Type{" "}
            <kbd className="px-2 py-1.5 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg">
              cmd
            </kbd>
            +
            <kbd className="px-2 py-1.5 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg">
              K
            </kbd>{" "}
            for command palette
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
