import React, { useState, useRef, useEffect } from 'react'
import { timeFormat } from '../utils'

export default function PomodoroClock({ workTime, shortBreak, longBreak, status, handleStatus }) {
  const [running, setRunning] = useState(false)
  const timer = useRef()
  const routine = useRef(0)
  const [timeMap, setTimeMap] = useState({})

  useEffect(() => {
    return () => clearInterval(timer.current)
  }, [])

  useEffect(() => {
    setTimeMap({
      pomodoro: workTime,
      shortBreak: shortBreak,
      longBreak: longBreak,
    })
  }, [workTime, shortBreak, longBreak])

  useEffect(() => {
    if (timeMap[status] < 0) {
      skip()
    }
  }, [timeMap])

  useEffect(() => {
    if (running) start()
  }, [status])

  const toggle = () => {
    if (running) {
      clearInterval(timer.current)
    } else {
      start()
    }
    setRunning((prevRunning) => !prevRunning)
  }

  const start = () => {
    timer.current = setInterval(() => {
      setTimeMap((prevTimeMap) => ({
        ...prevTimeMap,
        [status]: prevTimeMap[status] - 1,
      }))
    }, 1000)
  }

  const statusChange = (e) => {
    clearInterval(timer.current)
    setRunning(false)
    routine.current = 0
    handleStatus(e.target.name)
    setTimeMap({
      pomodoro: workTime,
      shortBreak: shortBreak,
      longBreak: longBreak,
    })
  }

  const skip = () => {
    clearInterval(timer.current)
    setTimeMap({
      pomodoro: workTime,
      shortBreak: shortBreak,
      longBreak: longBreak,
    })
    if (status === 'pomodoro' && routine.current < 3) {
      routine.current += 1
      handleStatus('shortBreak')
    } else if (status === 'pomodoro') {
      routine.current = 0
      handleStatus('longBreak')
    } else {
      handleStatus('pomodoro')
    }
  }

  return (
    <div className='PomodoroClock'>
      <h1>{timeFormat(timeMap[status])}</h1>
      <div className='run'>
        <button onClick={toggle}>{running ? 'Pause' : 'Start'}</button>
        {running && (
          <button className='skip' onClick={skip}>
            <i className='bx bx-skip-next'></i>
          </button>
        )}
      </div>
      <button onClick={statusChange} className={status === 'pomodoro' ? 'current' : ''} name='pomodoro'>
        Pomodoro
      </button>
      <button onClick={statusChange} className={status === 'shortBreak' ? 'current' : ''} name='shortBreak'>
        Short Break
      </button>
      <button onClick={statusChange} className={status === 'longBreak' ? 'current' : ''} name='longBreak'>
        Long Break
      </button>
    </div>
  )
}
