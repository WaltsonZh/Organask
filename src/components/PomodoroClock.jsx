import { useRef, useEffect, useState } from 'react'
import { ordinal, startTimer, stopTimer, timeFormat } from '../utils'
import { useOutletContext } from 'react-router-dom'

/**
 * "Restore timer when navigate back from other route"
 * only works when React.strictMode is off,
 * because it makes the page render twice,
 * hence the second render will replace the restored data with user input.
 */

export default function PomodoroClock(prop) {
  const { workTime, shortBreak, longBreak, status, handleStatus } = prop
  const routine = useRef(0)
  const [cycle, setCycle] = useState(1)
  const {
    run: { running, setRunning },
    timer: { timeMap, setTimeMap },
  } = useOutletContext()

  useEffect(() => {
    setTimeMap((prevTimeMap) => ({
      ...prevTimeMap,
      [status]: localStorage.getItem('timer'),
    }))

    setCycle((prevCycle) => {
      if (localStorage.getItem('cycle')) {
        return JSON.parse(localStorage.getItem('cycle'))
      } else {
        return prevCycle
      }
    })

    return () => {
      stopTimer()
      setRunning(false)
      localStorage.setItem('running', false)
      localStorage.setItem('resume', true)
    }
  }, [])

  useEffect(() => {
    setTimeMap((prevTimeMap) => {
      if (localStorage.getItem('resume')) {
        localStorage.removeItem('resume')
        if (status === 'pomodoro') {
          return { ...prevTimeMap, shortBreak, longBreak }
        } else if (status === 'shortBreak') {
          return { ...prevTimeMap, pomodoro: workTime, longBreak }
        } else {
          return { ...prevTimeMap, pomodoro: workTime, shortBreak }
        }
      } else {
        return { pomodoro: workTime, shortBreak, longBreak }
      }
    })
  }, [workTime, shortBreak, longBreak])

  useEffect(() => {
    localStorage.setItem('timer', timeMap[status])
    if (timeMap[status] < 0) {
      skip()
    }
  }, [timeMap])

  useEffect(() => {
    if (running) start()
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
    setCycle(1)
    handleStatus(e.target.name)
    setTimeMap({ pomodoro: workTime, shortBreak, longBreak })
  }

  const skip = () => {
    stopTimer()
    setTimeMap({ pomodoro: workTime, shortBreak, longBreak })
    if (status === 'pomodoro' && routine.current < 3) {
      routine.current += 1
      handleStatus('shortBreak')
    } else if (status === 'pomodoro') {
      routine.current = 0
      handleStatus('longBreak')
    } else {
      handleStatus('pomodoro')
      if (routine.current == 0) {
        localStorage.setItem('cycle', cycle + 1)
        setCycle((prevCycle) => prevCycle + 1)
      }
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
      <p>
        {cycle}
        {ordinal(cycle)} cycle
      </p>
    </div>
  )
}
