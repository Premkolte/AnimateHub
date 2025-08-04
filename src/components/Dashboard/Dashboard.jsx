import { useState } from "react";
import { Buttons } from "./Buttons";
import SideBar from "./SideBar";
import Window from "./Window";
import WelcomeMessage from "../WelcomeMessage";

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900">
      <div className="container mx-auto px-4 pt-8">
        <WelcomeMessage />
      </div>
      <div className="h-screen flex flex-row">
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Window activeTab={activeTab} />
      </div>
    </div>
  );
}

export default Dashboard;
