import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet, NavLink } from 'react-router-dom'
import { query, orderBy, onSnapshot } from 'firebase/firestore'
import { taskCollection } from '../firebase'
import { stopTimer } from '../utils.js'

export default function Layout() {
  const [tasks, setTasks] = useState([])
  const [timeMap, setTimeMap] = useState({})

  useEffect(() => {
    const unsubscribe = () => {
      const q = query(taskCollection, orderBy('startTimestamp'))
      onSnapshot(q, (snapshot) => {
        const taskArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setTasks(taskArr)
      })
    }
    return () => {
      unsubscribe()
      stopTimer()
    }
  }, [])

  return (
    <>
      <Sidebar />
      <Outlet context={{ tasks, timer: { timeMap, setTimeMap } }} />
      <NavLink to='addtask' className={({ isActive }) => (isActive ? 'remove' : 'AddTask--btn')}>
        <i className='bx bx-plus'></i>
      </NavLink>
    </>
  )
}
