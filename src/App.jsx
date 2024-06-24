import React, { useState } from "react";
import SideBar from "./components/SideBar";
import Window from "./components/Window";
import AnimatedCursor from "react-animated-cursor";
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
} from "kbar";
import { Buttons } from "./constants/Buttons";

function App() {
  const [activeTab, setActiveTab] = useState(0); // Initialize activeTab state

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
    </KBarProvider>
)
}

export default App;
