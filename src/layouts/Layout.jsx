import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet, NavLink } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Sidebar />
      <Outlet />
      <NavLink to='addtask' className='AddTask--btn'>
        <i className='bx bx-plus'></i>
      </NavLink>
    </>
  )
}
