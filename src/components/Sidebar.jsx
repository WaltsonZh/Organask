import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { auth, provider } from '../firebase'
import { getRedirectResult, signInWithRedirect, signOut } from 'firebase/auth'

export default function Sidebar() {
  const [fold, setFold] = useState(false)
  const [mode, setMode] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const result = await getRedirectResult(auth)
    if (result) {
      setCurrentUser(result.user)
    }
  }

  const toggleFold = () => {
    setFold((prevFold) => !prevFold)
  }

  const toggleMode = () => {
    setMode((prevMode) => !prevMode)
    document.querySelector('body').classList.toggle('Dark')
  }

  const account = async () => {
    try {
      if (currentUser) {
        await signOut(auth)
        setCurrentUser(null)
      } else {
        signInWithRedirect(auth, provider)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={`Sidebar ${fold ? 'fold' : ''}`}>
      <div className='Sidebar--title'>
        <i className='bx bx-task'></i>
        <span>Task Manager</span>
        <i className='bx bx-chevron-left toggle' onClick={toggleFold}></i>
      </div>
      <div className='Sidebar--menu'>
        <NavLink end to='.' className={({ isActive }) => (isActive ? 'current--page Sidebar--label' : 'Sidebar--label')}>
          <i className='bx bxs-dashboard'></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to='calendar' className={({ isActive }) => (isActive ? 'current--page Sidebar--label' : 'Sidebar--label')}>
          <i className='bx bx-calendar'></i>
          <span>Calendar</span>
        </NavLink>
        <NavLink to='categories' className={({ isActive }) => (isActive ? 'current--page Sidebar--label' : 'Sidebar--label')}>
          <i className='bx bx-spreadsheet'></i>
          <span>Categories</span>
        </NavLink>
        <NavLink to='pomodoro' className={({ isActive }) => (isActive ? 'current--page Sidebar--label' : 'Sidebar--label')}>
          <i className='bx bx-stopwatch'></i>
          <span>Pomodoro</span>
        </NavLink>
        <div className='Sidebar--label Sidebar--login' onClick={account}>
          <i className={`bx ${currentUser ? 'bx-log-out' : 'bxl-google'}`}></i>
          <span>{currentUser ? 'Log out' : 'Login with Google'}</span>
          {currentUser ? <img src={currentUser.photoURL} /> : null}
        </div>
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
