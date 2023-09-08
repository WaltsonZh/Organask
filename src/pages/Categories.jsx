import React, { useState } from 'react'
import { removeTask } from '../firebase'
import { useOutletContext } from 'react-router-dom'
import { sortByCategories } from '../utils.js'

export default function Categories() {
  const tasks = useOutletContext()
  const categorizedTasks = sortByCategories(tasks)
  const categories = Object.keys(categorizedTasks)

  const toggleFolder = (e) => {
    console.log(e.target.classList)
  }

  return (
    <div className='Categories Page'>
      <h1>Categories</h1>
      <div className='Categories--task'>
        {categories.map((category) => {
          return (
            <div key={category} className='folder' onClick={toggleFolder}>
              <h4>{category}</h4>
              <div className='tasks'>
                {categorizedTasks[category].map((task) => {
                  return (
                    <div className='task'>
                      <h5>{task.task}</h5>
                      <p>{task.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
