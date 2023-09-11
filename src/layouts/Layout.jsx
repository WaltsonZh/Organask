import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet, NavLink } from 'react-router-dom'
import { query, orderBy, onSnapshot } from 'firebase/firestore'
import { taskCollection } from '../firebase'
import Modal from '../components/Modal.jsx'

/**
 * "Real-time data fetching"
 * works only when React.strictMode is on,
 * because the first render will get the data,
 * the second render is when the tasks are set.
 */

export default function Layout() {
  const [tasks, setTasks] = useState([])
  const [running, setRunning] = useState(false)
  const [timeMap, setTimeMap] = useState({})
  const [modal, setModal] = useState([])

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
    return unsubscribe
  }, [])

  useEffect(() => {
    tasks.forEach((task) => modal.push({ [task.id]: false }))
  }, [tasks])

  return (
    <>
      <Sidebar />
      <Outlet context={{ tasks, timer: { timeMap, setTimeMap }, run: { running, setRunning }, popup: { modal, setModal } }} />
      <NavLink to='addtask' className={({ isActive }) => (isActive ? 'remove' : 'AddTask--btn')}>
        <i className='bx bx-plus'></i>
      </NavLink>
    </>
  )
}
