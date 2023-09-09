import React, { useRef, useEffect } from 'react'
import { startTimer, stopTimer, timeFormat } from '../utils'
import { useOutletContext } from 'react-router-dom'

export default function PomodoroClock({ workTime, shortBreak, longBreak, status, handleStatus }) {
  const routine = useRef(0)
  const {
    timer: { timeMap, setTimeMap },
    run: { running, setRunning },
  } = useOutletContext()

  useEffect(() => {
    setTimeMap((prevTimeMap) => {
      if (localStorage.getItem('timer') >= 0) {
        return {
          ...prevTimeMap,
          [status]: parseInt(localStorage.getItem('timer')),
        }
      } else {
        return {
          pomodoro: workTime,
          shortBreak: shortBreak,
          longBreak: longBreak,
        }
      }
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('timer', timeMap[status])
    if (timeMap[status] < 0) {
      skip()
    }
  }, [timeMap])

  useEffect(() => {
    if (running)
      start()
  }, [status])

  const toggle = () => {
    if (running) {
      stopTimer()
    } else {
      start()
    }
    setRunning((prevRunning) => {
      localStorage.setItem('running', !prevRunning)
      return !prevRunning
    })
  }

  const statusChange = (e) => {
    if (e.target.name === status) return
    stopTimer()
    setRunning(() => {
      localStorage.setItem('running', false)
      return false
    })
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

  const start = () => {
    startTimer(() => {
      localStorage.setItem('timer', timeMap[status] - 1)
      setTimeMap((prevTimeMap) => {
        return {
          ...prevTimeMap,
          [status]: prevTimeMap[status] - 1,
        }
      })
    })
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
