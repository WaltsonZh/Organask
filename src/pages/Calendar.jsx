import React, { useEffect, useState } from 'react'
import { filterTasksByMonth, getMonthCalendar } from '../utils'
import { useOutletContext } from 'react-router-dom'

export default function Calendar() {
  const tasks = useOutletContext()
  const today = new Date()
  const [date, setDate] = useState({
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  })
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const [monthlyCalendar, setMonthlyCalendar] = useState([])
  const monthlyCalendarEls = monthlyCalendar.map((week) => {
    let key = 0
    return (
      <div key={monthlyCalendar.indexOf(week)} className='monthly--week'>
        {week.map((day) => {
          return (
            <div key={key++} className={`monthly--day ${date.day === day ? 'today' : ''}`}>
              <p>{day ? day : ''}</p>
              <div></div>
            </div>
          )
        })}
      </div>
    )
  })

  useEffect(() => {
    if (date.year === today.getFullYear() && date.month === today.getMonth()) {
      setDate((prevDate) => ({
        ...prevDate,
        day: today.getDate(),
      }))
    } else {
      setDate((prevDate) => ({
        ...prevDate,
        day: 1,
      }))
    }
    setMonthlyCalendar(getMonthCalendar(date))
  }, [date.year, date.month])

  const navigate = (e) => {
    const name = e.target.name
    if (name === 'lastYear') {
      setDate((prevDate) => ({
        ...prevDate,
        year: prevDate.year - 1,
      }))
    } else if (name === 'nextYear') {
      setDate((prevDate) => ({
        ...prevDate,
        year: prevDate.year + 1,
      }))
    } else if (name === 'lastMonth') {
      setDate((prevDate) => ({
        ...prevDate,
        year: prevDate.month === 0 ? prevDate.year - 1 : prevDate.year,
        month: prevDate.month === 0 ? 11 : prevDate.month - 1,
      }))
    } else {
      setDate((prevDate) => ({
        ...prevDate,
        year: prevDate.year + Math.floor(prevDate.month / 11),
        month: (prevDate.month + 1) % 12,
      }))
    }
  }

  const returnToday = () => {
    setDate({
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
    })
  }

  return (
    <div className='Calendar Page'>
      <h1>Calendar</h1>
      <div className='calendar--header'>
        <div className='navigation'>
          <button className='bx bx-chevrons-left' name='lastYear' onClick={navigate}></button>
          <button className='bx bx-chevron-left' name='lastMonth' onClick={navigate}></button>
          <h2>
            {monthName[date.month]}, {date.year}
          </h2>
          <button className='bx bx-chevron-right' name='nextMonth' onClick={navigate}></button>
          <button className='bx bx-chevrons-right' name='nextYear' onClick={navigate}></button>
        </div>
        <button className='bx bx-navigation return' onClick={returnToday}></button>
      </div>
      <div className='calendar--grid'>{monthlyCalendarEls}</div>
    </div>
  )
}
