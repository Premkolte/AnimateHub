import React from "react";
import SideBar from "./SideBar";

function Window() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-black text-xl mb-8">AnimateHub -  A one place for all you Frontend CSS needs</h1>
        {/* The content will be here for different tabs */}
      </div>
    </div>
  );
}

export default Window;
