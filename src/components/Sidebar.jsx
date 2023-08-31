import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const [fold, setFold] = useState(false)
  const [mode, setMode] = useState(true)

  const toggleFold = () => {
    setFold((prevFold) => !prevFold)
  }

  const toggleMode = () => {
    setMode((prevMode) => !prevMode)
    document.querySelector('body').classList.toggle('Dark')
  }

  return (
    <div className={`Sidebar ${fold ? 'fold' : ''}`}>
      <div className='Sidebar--title'>
        <i className='bx bx-task'></i>
        <span>Task Manager</span>
        <i className='bx bx-chevron-left toggle' onClick={toggleFold}></i>
      </div>
      <div className='Sidebar--menu'>
        <NavLink to='calendar' className='Sidebar--label'>
          <i className='bx bxs-calendar'></i>
          <span>Calendar</span>
        </NavLink>
        <div className='Sidebar--mode Sidebar--label' onClick={toggleMode}>
          <div className='mode--icon'>
            <i className='bx bx-moon'></i>
            <i className='bx bx-sun'></i>
          </div>
          <span>{mode ? 'Dark' : 'Light'} Mode</span>
          <div className='mode--switch'>
            <div className='switch'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
