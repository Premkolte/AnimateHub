import React from 'react';
import './Window.css'
import SideBar from './SideBar'

function Window() {
  return (
    <div className='window'>
        <SideBar/>
        <div className='main-content'><h1>DISPLAY</h1></div>
    </div>
  )
}

export default Window