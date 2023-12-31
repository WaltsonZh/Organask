import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { auth, provider } from '../firebase'
import { signInWithRedirect, signOut } from 'firebase/auth'

export default function Sidebar(prop) {
  const { user } = prop
  const [fold, setFold] = useState(false)
  const [mode, setMode] = useState(JSON.parse(localStorage.getItem('mode')))
  const [login, setLogin] = useState(false)

  useEffect(() => {
    setMode((prevMode) => {
      if (prevMode === null || prevMode === true) {
        document.querySelector('body').classList.remove('Dark')
        return true
      } else {
        document.querySelector('body').classList.add('Dark')
        return prevMode
      }
    })
    setLogin(JSON.parse(localStorage.getItem('isLoggedIn')) || false)
  }, [])

  const toggleFold = () => {
    setFold((prevFold) => !prevFold)
  }

  const toggleMode = () => {
    localStorage.setItem('mode', !mode)
    document.querySelector('body').classList.toggle('Dark')
    setMode((prevMode) => !prevMode)
  }

  const account = async () => {
    try {
      if (user) {
        localStorage.setItem('isLoggedIn', false)
        localStorage.removeItem('uid')
        setLogin(false)
        await signOut(auth)
        location.reload()
      } else {
        localStorage.setItem('isLoggedIn', true)
        await signInWithRedirect(auth, provider)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={`Sidebar ${fold ? 'fold' : ''}`}>
      <div className='Sidebar--title'>
        <i className='bx bx-task'></i>
        <span>Organask</span>
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
        <div
          className='Sidebar--label Sidebar--login'
          onClick={() => {
            if (login && user || !login && user === null) {
              account()
            }
          }}
        >
          <i className={`bx ${login ? 'bx-log-out' : 'bxl-google'}`}></i>
          <span>{login ? 'Log out' : 'Log in'}</span>
          {login && user === null ? <i className='bx bx-user-circle'></i> : user ? <img src={user.photoURL} /> : null}
        </div>
        <div className='Sidebar--mode Sidebar--label' onClick={toggleMode}>
          <div className='mode--icon'>{mode ? <i className='bx bx-moon'></i> : <i className='bx bx-sun'></i>}</div>
          <span>{mode ? 'Dark' : 'Light'} Mode</span>
          <div className='mode--switch'>
            <div className='switch'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
