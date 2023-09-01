import { addDoc } from 'firebase/firestore'
import React from 'react'
import { taskCollection } from '../firebase'

export default function AddTask() {
  const submit = (e) => {
    e.preventDefault()
    addDoc(taskCollection, {
      category: e.target.category.value,
      task: e.target.task.value,
      date: e.target.date.value,
    })
  }

  return (
    <div className='AddTask Page'>
      <h1>AddTask</h1>
    </div>
  )
}
