import React from 'react'
import { removeTask } from '../firebase'
import { useOutletContext } from 'react-router-dom'

export default function Categories() {
  const tasks = useOutletContext()

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
        {tasks.map((task) => (
          <div key={task.id}>
            <p>{JSON.stringify(task)}</p>
            <button className='delete--btn' onClick={() => removeTask(task.id)}>
              delete task
            </button>
          </div>
        ))}
        {tasks.map((task) => (
          <div key={task.id}>
            <p>{JSON.stringify(task)}</p>
            <button className='delete--btn' onClick={() => removeTask(task.id)}>
              delete task
            </button>
          </div>
        ))}
        {tasks.map((task) => (
          <div key={task.id}>
            <p>{JSON.stringify(task)}</p>
            <button className='delete--btn' onClick={() => removeTask(task.id)}>
              delete task
            </button>
          </div>
        ))}
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
