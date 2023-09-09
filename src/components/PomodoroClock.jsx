import React, { useState, useRef, useEffect } from 'react'
import { startTimer, stopTimer, timeFormat } from '../utils'

export default function PomodoroClock({ workTime, shortBreak, longBreak, status, handleStatus }) {
  const [running, setRunning] = useState(false)
  const routine = useRef(0)
  const [timeMap, setTimeMap] = useState({})

  useEffect(() => {
    setTimeMap({
      pomodoro: workTime,
      shortBreak: shortBreak,
      longBreak: longBreak,
    })
  }, [workTime, shortBreak, longBreak])

  useEffect(() => {
    localStorage.setItem('timer', timeMap[status])
    if (timeMap[status] < 0) {
      skip()
    }
  }, [timeMap])

  useEffect(() => {
    if (running) startTimer(() => {
      setTimeMap((prevTimeMap) => ({
        ...prevTimeMap,
        [status]: prevTimeMap[status] - 1,
      }))
    })
  }, [status])

  const toggle = () => {
    if (running) {
      stopTimer()
    } else {
      startTimer(() => {
        setTimeMap((prevTimeMap) => ({
          ...prevTimeMap,
          [status]: prevTimeMap[status] - 1,
        }))
      })
    }
    setRunning((prevRunning) => !prevRunning)
  }

  const statusChange = (e) => {
    stopTimer()
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
    stopTimer()
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
