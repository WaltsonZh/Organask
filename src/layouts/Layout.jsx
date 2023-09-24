import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet, NavLink } from 'react-router-dom'
import { query, orderBy, onSnapshot, where } from 'firebase/firestore'
import { auth, taskCollection } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

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
  const [modal, setModal] = useState({})
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    tasks.forEach((task) =>
      setModal((prevModal) => ({
        ...prevModal,
        [task.id]: false,
      }))
    )
  }, [tasks])

  useEffect(() => {
    const unsubscribe = () => {
      const q = query(taskCollection, where('uid', '==', localStorage.getItem('uid')), orderBy('endTimestamp'))
      onSnapshot(q, (snapshot) => {
        const taskArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setTasks(taskArr)
      })
    }

    return unsubscribe
  }, [user])

  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        localStorage.setItem('uid', currentUser.uid)
      }
      setUser(currentUser)
    })
  }

  return (
    <>
      <Sidebar user={user} />
      <div className='Layout'>
        <Outlet
          context={{
            user,
            tasks,
            timer: { timeMap, setTimeMap },
            run: { running, setRunning },
            popup: { modal, setModal },
          }}
        />
        <Footer />
      </div>

      <NavLink to='addtask' className={({ isActive }) => (isActive || !JSON.parse(localStorage.getItem('isLoggedIn')) ? 'remove' : 'AddTask--btn')}>
        <i className='bx bx-plus'></i>
      </NavLink>
    </>
  )
}
