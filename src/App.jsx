import React, { useState } from "react";
import SideBar from "./components/SideBar"
import Window  from "./components/Window"

function App() {
  const [activeTab, setActiveTab] = useState(0); // Initialize activeTab state

  return (
    <div className="flex">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Window activeTab={activeTab} />
    </div>
  );
}

export default App;
