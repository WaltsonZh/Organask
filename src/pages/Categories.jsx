import React, { useEffect, useState } from 'react'
import { removeTask, taskCollection } from '../firebase'
import { onSnapshot, orderBy, query } from 'firebase/firestore'

export default function Categories() {
  const [tasks, setTasks] = useState([])

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
    unsubscribe()
  }, [])

  return (
    <div className='Categories Page'>
      <h1>Categories</h1>
      <div className='Categories--task'>
        {tasks.map((task) => (
          <div key={task.id}>
            <p>{JSON.stringify(task)}</p>
            <button className='delete--btn' onClick={() => removeTask(task.id)}>
              delete task
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
