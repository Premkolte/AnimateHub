import React, { useState } from 'react';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { Buttons } from '../constants/Buttons';

function SideBar({ activeTab, setActiveTab }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Menu Icon for Mobile Devices */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          className="flex items-center justify-center rounded-md p-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <IoMdClose size={30} className="text-gray-700" />
          ) : (
            <IoMdMenu size={30} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`lg:w-64 fixed inset-y-0 left-0 z-40 bg-white shadow-xl transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:inset-0 lg:z-auto overflow-y-auto`}
        style={{ maxHeight: '100vh', paddingTop: '4rem' }} // Adjusted padding top
      >
        <div className="p-4 h-full flex flex-col justify-between">
          <div className="space-y-2 mb-4 pb-4">
            {Buttons.map((button, index) => (
              <button
                key={index}
                className={`${
                  activeTab === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'
                } py-2 px-4 rounded-md w-full text-lg text-left focus:outline-none`}
                onClick={() => handleTabClick(index)}
              >
                {button}
              </button>
            ))}
          </div>
          <div>
            Type{' '}
            <kbd className="px-2 py-1.5 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg">
              cmd
            </kbd>
            +
            <kbd className="px-2 py-1.5 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg">
              K
            </kbd>{' '}
            for command palette
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
