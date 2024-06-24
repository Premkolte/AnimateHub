import React, { useState } from "react";
import SideBar from "./components/SideBar";
import Window from "./components/Window";
import AnimatedCursor from "react-animated-cursor";

function App() {
  const [activeTab, setActiveTab] = useState(0); // Initialize activeTab state

  return (
    <div className="flex">
      <AnimatedCursor
        innerSize={12}
        outerSize={25}
        outerAlpha={0.4}
        innerScale={1}
        outerScale={2}
        color="194, 198, 204"
      />
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Window activeTab={activeTab} />
    </div>
  );
}

export default App;
