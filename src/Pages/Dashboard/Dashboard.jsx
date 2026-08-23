import { useState } from "react";
import SideBar from "./SideBar";
import Window from "./Window";

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="h-[calc(100vh-4.5rem)] mt-[4.5rem] bg-white dark:bg-secondary-900 overflow-hidden flex flex-row">
      <SideBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Window
        activeTab={activeTab}
      />
    </div>
  );
}

export default Dashboard;