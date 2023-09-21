import { useOutletContext } from 'react-router-dom'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const {
    user,
    tasks,
    popup: { modal, setModal },
  } = useOutletContext()
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)
  const [todayTasks, setTodayTasks] = useState([])
  const [recentTasks, setRecentTasks] = useState([])

  useEffect(() => {
    setTodayTasks(getTodayTasks())
    setRecentTasks(getRecentTasks())
  }, [tasks])

  const getTodayTasks = () => {
    return tasks.filter((task) => {
      const start = task.startTimestamp.toDate()
      const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate())
      const end = task.endTimestamp.toDate()
      const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate())
      return startDate <= today && endDate >= today
    })
  }

  const getRecentTasks = () => {
    return tasks.filter((task) => {
      const start = task.startTimestamp.toDate()
      const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate())
      const end = task.endTimestamp.toDate()
      const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate())
      return (startDate <= nextWeek && endDate >= nextWeek) || (startDate <= today && endDate >= today) || (startDate >= today && endDate <= nextWeek)
    })
  }

  const closeModal = (id) => {
    setModal((prevModal) => ({
      ...prevModal,
      [id]: false,
    }))
  }

  return (
    <div className='Dashboard Page'>
      <div className='title'>
        <h1>Dashboard</h1>
        {user ? <h1>Welcome, {user.displayName} !</h1> : null}
      </div>
      <section>
        <h2 className='subtitle'>Today's Tasks</h2>
        <div className='tasks'>
          {todayTasks.length ? (
            todayTasks.map((task) => (
              <div
                key={task.id}
                className='task'
                onClick={(e) => {
                  e.stopPropagation()
                  setModal((prevModal) => ({
                    ...prevModal,
                    [task.id]: true,
                  }))
                }}
              >
                <h3 className={task.finish ? 'finish' : ''}>{task.task}</h3>
                <p className={task.finish ? 'finish' : ''}>{task.description}</p>
              </div>
            ))
          ) : (
            <h1>No Tasks Today.</h1>
          )}
        </div>
        {}
      </section>
      <section>
        <h2 className='subtitle'>Recent Tasks</h2>
        <div className='tasks'>
          {recentTasks.length ? (
            recentTasks.map((task) => (
              <div
                key={task.id}
                className='task'
                onClick={(e) => {
                  e.stopPropagation()
                  setModal((prevModal) => ({
                    ...prevModal,
                    [task.id]: true,
                  }))
                }}
              >
                <h3 className={task.finish ? 'finish' : ''}>{task.task}</h3>
                <h3 className={task.finish ? 'finish' : ''}>
                  {(task.endTimestamp.toDate().getMonth() % 12) + 1}/{task.endTimestamp.toDate().getDate()}
                </h3>
                <p className={task.finish ? 'finish' : ''}>{task.description}</p>
                {modal[task.id] ? <Modal closeModal={closeModal} task={task} /> : null}
              </div>
            ))
          ) : (
            <h1>No Tasks Rececntly.</h1>
          )}
        </div>
      </section>
    </div>
  )
}
