import React, { useState } from 'react';
import Window from './components/Window';
import SideBar from './components/SideBar';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='h-screen flex'>
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Window activeTab={activeTab} />
    </div>
  );
}

export default App;
