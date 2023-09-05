import React, { useState } from 'react'

export default function PomodoroClock() {
  const [running, setRunning] = useState(false)

  const toggle = () => {
    setRunning((prevRunning) => !prevRunning)
  }

  return (
    <div className='PomodoroClock'>
      <h1>00:00</h1>
      <div className='run'>
        <button onClick={toggle}>{running ? 'Pause' : 'Start'}</button>
        {running && (
          <button className='skip'>
            <i className='bx bx-skip-next'></i>
          </button>
        )}
      </div>
      <button>Pomodoro</button>
      <button>Short Break</button>
      <button>Long Break</button>
    </div>
  )
}
