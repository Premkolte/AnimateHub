import React from 'react'
import './SideBar.css'


function SideBar() {
  return (
    <div className='sidebar'>
        <div>
            <h1>AnimateHub</h1>
        </div>
        <div>
            <button className='button'>Botton</button>
            <br />
            <button  className='button'>Cards</button>
            <br />
            <button className='button'>Box-shadow</button>
            <br />
            <button className='button'>Dropdown Box</button>
            <br />
            <button className='button'>Input-fields</button>
            <br />
            <button className='button'>Radio Button</button>
            <br />
            <button className='button'>Toggle Switches</button>

        </div>

    </div>
  )
}

export default SideBar