import React, { useEffect, useState } from 'react'
import { getMonthCalendar } from '../utils'

export default function Calendar() {
  const today = new Date()
  const [date, setDate] = useState({
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  })
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const [monthlyCalendar, setMonthlyCalendar] = useState(getMonthCalendar(date))
  const monthlyCalendarEls = monthlyCalendar.map((week) => {
    let key = 0
    return (
      <div key={monthlyCalendar.indexOf(week)} className='monthly--week'>
        {week.map((day) => {
          return (
            <div key={key++} className='monthly--day'>
              {day ? day : ''}
            </div>
          )
        })}
      </div>
    )
  })

  useEffect(() => {
    setMonthlyCalendar(getMonthCalendar(date))
  }, [date])

  const handleClick = (e) => {
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
        month: prevDate.month === 0 ? 11 : prevDate.month - 1
      }))
    } else {
      setDate((prevDate) => ({
        ...prevDate,
        year: prevDate.year + Math.floor(prevDate.month / 11),
        month: (prevDate.month + 1) % 12
      }))
    }
  }

  return (
    <div className='Calendar Page'>
      <h1>Calendar</h1>
      <div className='calendar--header'>
        <button className='bx bx-chevrons-left' name='lastYear' onClick={handleClick}></button>
        <button className='bx bx-chevron-left' name='lastMonth' onClick={handleClick}></button>
        <h2>
          {monthName[date.month]}, {date.year}
        </h2>
        <button className='bx bx-chevron-right' name='nextMonth' onClick={handleClick}></button>
        <button className='bx bx-chevrons-right' name='nextYear' onClick={handleClick}></button>
      </div>
      <div className='calendar--grid'>{monthlyCalendarEls}</div>
    </div>
  )
}
