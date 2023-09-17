import { useEffect, useState } from 'react'
import PomodoroClock from '../components/PomodoroClock'

export default function Pomodoro() {
  const [pomodoro, setPomodoro] = useState({
    workTime: localStorage.getItem('workTime') || 25,
    shortBreak: localStorage.getItem('shortBreak') || 5,
    longBreak: localStorage.getItem('longBreak') || 15,
  })
  const [status, setStatus] = useState(localStorage.getItem('status') || 'pomodoro')

  useEffect(() => {
    localStorage.setItem('status', status)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    localStorage.setItem(name, value)
    setPomodoro((prevPomodoro) => ({
      ...prevPomodoro,
      [name]: value,
    }))
  }

  const handleStatus = (newStatus) => {
    localStorage.setItem('status', newStatus)
    setStatus(newStatus)
  }

  return (
    <div className='Pomodoro Page'>
      <h1>Pomodoro</h1>
      <form>
        <div className='input--box'>
          <input type='number' min={0} defaultValue={pomodoro.workTime} onChange={handleChange} name='workTime' required />
          <span>Pomodoro</span>
        </div>
        <div className='input--box'>
          <input type='number' min={0} defaultValue={pomodoro.shortBreak} onChange={handleChange} name='shortBreak' required />
          <span>Short Break</span>
        </div>
        <div className='input--box'>
          <input type='number' min={0} defaultValue={pomodoro.longBreak} onChange={handleChange} name='longBreak' required />
          <span>Long Break</span>
        </div>
      </form>
      <PomodoroClock workTime={pomodoro.workTime * 60} shortBreak={pomodoro.shortBreak * 60} longBreak={pomodoro.longBreak * 60} status={status} handleStatus={(newStatus) => handleStatus(newStatus)} />
    </div>
  )
}
