import React, { useState } from 'react'

export default function Sidebar() {
  const [fold, setFold] = useState(false)

  const toggle = () => {
    setFold((prevFold) => !prevFold)
    console.log('toggle')
  }

  return (
    <div className={`Sidebar ${fold ? 'fold' : ''}`}>
      <div className='Sidebar--title'>
        <i className='bx bx-task'></i>
        <h1>Task Manager</h1>
      </div>
      <i className='bx bx-chevron-left toggle' onClick={toggle}></i>
      <div className='Sidebar--mode'>
        {/* <i class='bx bx-moon'></i>
        <i class='bx bx-sun'></i> */}
      </div>
    </div>
  )
}
