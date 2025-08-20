import { useState } from "react";
import SideBar from "./SideBar";
import Window from "./Window";
import WelcomeMessage from "../../components/layout/WelcomeMessage";

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);

  // // Available filter categories
  // const filterCategories = [
  //   "All",
  //   "hover",
  //   "slide",
  //   "animation",
  //   "form",
  //   "button",
  //   "card",
  //   "input",
  // ];


  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 p-2">
      <div className="container mx-auto px-4 pt-8">
        <WelcomeMessage />
      </div>
      <div className="h-screen flex flex-row">
        <SideBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Window
          activeTab={activeTab}
        />
      </div>
    </div>
  );
}

export default Dashboard;