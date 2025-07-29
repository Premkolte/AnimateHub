import { useState } from "react";
import { Buttons } from "./Buttons";
import SideBar from "./SideBar";
import Window from "./Window";

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="h-screen flex flex-row">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Window activeTab={activeTab} />
    </div>
  );
}

export default Dashboard;
