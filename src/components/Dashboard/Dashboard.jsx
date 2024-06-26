import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
} from "kbar";
import { Buttons } from "./Buttons";
import SideBar from "./SideBar";
import Window from "./Window";
import { useState } from "react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const actions = [
    ...Buttons.map((button, index) => ({
      id: button.toLowerCase().replace(" ", "-"),
      name: button,
      perform: () => setActiveTab(index),
    })),
    {
      id: "github",
      keywords: ["repositary", "source code"],
      name: "Github",
      perform: () => {
        window.location.href = "https://github.com/Premkolte/AnimateHub";
      },
    },
  ];

  function RenderResults() {
    const { results } = useMatches();
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            <div>{item}</div>
          ) : (
            <div
              className="text-lg p-4 rounded-lg"
              style={{
                background: active ? "#eee" : "transparent",
              }}
            >
              {item.name}
            </div>
          )
        }
      />
    );
  }
  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="bg-black/20 backdrop-blur-sm">
          <KBarAnimator className="bg-white rounded-xl shadow-xl flex flex-col gap-4 w-96">
            <KBarSearch className="w-96 outline-none px-6 py-4 text-lg text-black rounded-lg" />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      <div className="flex flex-row">
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Window activeTab={activeTab} />
      </div>
    </KBarProvider>
  );
}
export default Dashboard;
