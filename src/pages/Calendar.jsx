import React from 'react'
import { getMonthCalendar } from '../utils'

export default function Calendar() {
  const today = new Date()
  const month = today.getMonth()
  const year = today.getFullYear()
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const monthlyCalendar = getMonthCalendar(today)
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

  return (
    <div className='Calendar Page'>
      <h1>Calendar</h1>
      <h2>
        {monthName[month]}, {year}
      </h2>
      <div className='calendar--grid'>{monthlyCalendarEls}</div>
    </div>
  )
}
