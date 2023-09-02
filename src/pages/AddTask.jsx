import React, { useState } from 'react'
import { addTask } from '../firebase'

export default function AddTask() {
  const [taskData, setTaskData] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const submit = (e) => {
    e.preventDefault()
    addTask(taskData)
    e.target.reset()
  }

  return (
    <div className='AddTask Page'>
      <h1>AddTask</h1>
      <form onSubmit={submit}>
        <input type='text' onChange={handleChange} name='category' placeholder='Category' />
        <input type='date' onChange={handleChange} name='timestamp' />
        <input type='text' onChange={handleChange} name='task' placeholder='Task' />
        <input type='text' onChange={handleChange} name='description' placeholder='Description' />
        <button>submit</button>
      </form>
    </div>
  )
}
