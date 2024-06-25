import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Home/Navbar';
import SideBar from './components/SideBar';
import Window from "./components/Window";
import HomePage from './components/Home/HomePage';
import AboutUs from './components/About/AboutUs';
import ContactUs from './components/Contact/ContactUs';
import AnimatedCursor from 'react-animated-cursor';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
} from 'kbar';
import { Buttons } from './constants/Buttons';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const actions = [
    ...Buttons.map((button, index) => ({
      id: button.toLowerCase().replace(' ', '-'),
      name: button,
      perform: () => setActiveTab(index),
    })),
    {
      id: 'github',
      keywords: ['repositary', 'source code'],
      name: 'Github',
      perform: () => {
        window.location.href = 'https://github.com/Premkolte/AnimateHub';
      },
    },
  ];

  function RenderResults() {
    const { results } = useMatches();
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === 'string' ? (
            <div>{item}</div>
          ) : (
            <div
              className="text-lg p-4 rounded-lg"
              style={{
                background: active ? '#eee' : 'transparent',
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
      <Router>
        <div>
          <Navbar />
          <div className="flex">
            <AnimatedCursor
              innerSize={12}
              outerSize={25}
              outerAlpha={0.4}
              innerScale={1}
              outerScale={2}
              color="194, 198, 204"
            />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<><SideBar activeTab={activeTab} setActiveTab={setActiveTab} /><Window activeTab={activeTab} /></>} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </KBarProvider>
  );
}

export default App;
