import React from 'react'
import { addTask } from '../firebase'

export default function AddTask() {
  const submit = (e) => {
    e.preventDefault()
    addTask(e.target.category.value, e.target.timestamp.value, e.target.task.value, e.target.description.value)
    e.target.reset()
  }

  return (
    <div className='AddTask Page'>
      <h1>AddTask</h1>
      <form onSubmit={submit}>
        <input type='text' name='category' placeholder='Category' />
        <input type='date' name='timestamp' />
        <input type='text' name='task' placeholder='Task' />
        <input type='text' name='description' placeholder='Description' />
        <button>submit</button>
      </form>
    </div>
  )
}
