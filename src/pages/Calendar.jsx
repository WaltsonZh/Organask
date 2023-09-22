import { useEffect, useState } from 'react'
import { monthName, filterTasksByMonth, getDaysOfMonth, getMonthCalendar, weekName } from '../utils'
import { useOutletContext } from 'react-router-dom'
import Modal from '../components/Modal.jsx'

export default function Calendar() {
  const {
    tasks,
    popup: { modal, setModal },
  } = useOutletContext()
  const today = new Date()
  const [date, setDate] = useState({
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  })
  const taskCountOfDays = Array(31).fill(0)

  const taskOfMonth = filterTasksByMonth(tasks, date.year, date.month)
  const taskDays = taskOfMonth.map((task) => {
    const daysArr = []
    const jsDate = [task.startTimestamp.toDate(), task.endTimestamp.toDate()]
    if (jsDate[0].getMonth() !== date.month) {
      daysArr.push(1)
    } else {
      daysArr.push(jsDate[0].getDate())
    }

    if (jsDate[1].getMonth() !== date.month) {
      daysArr.push(getDaysOfMonth(date.year)[date.month])
    } else {
      daysArr.push(jsDate[1].getDate())
    }

    daysArr.push(task)

    for (let i = daysArr[0]; i <= daysArr[1]; i++) {
      taskCountOfDays[i - 1] += 1
    }

    return daysArr
  })

  const [monthlyCalendar, setMonthlyCalendar] = useState([])

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

  const closeModal = (id) => {
    setModal((prevModal) => ({
      ...prevModal,
      [id]: false,
    }))
  }

  const openModal = (task) => {
    setModal((prevModal) => ({
      ...prevModal,
      [task.id]: true,
    }))
  }

  const monthlyCalendarEls = monthlyCalendar.map((week, wIndex) => {
    return (
      <div key={wIndex} className='monthly--week'>
        {week.map((day, dIndex) => {
          const taskCount = taskCountOfDays[day - 1]
          return (
            <div key={dIndex} className={`monthly--day ${date.day === day ? 'today' : ''}`}>
              <p>{day ? day : ''}</p>
              <div className='dropdown'>
                {taskCount ? `${taskCount} task${taskCount > 1 ? 's' : ''}` : ''}
                <i className={`bx bxs-down-arrow ${taskCount ? '' : 'remove'}`}></i>
              </div>
              <ul className='tasks'>
                {taskDays.map((task) => {
                  if (day === task[0] && task[0] <= task[1]) {
                    task[0] += 1
                    taskCountOfDays[day - 1] += 1
                    const alignInline = week.indexOf(day) === 0 ? 'align-right' : week.indexOf(day) === 6 ? 'align-left' : ''
                    const alignTop = monthlyCalendar[monthlyCalendar.length - 1] === week ? 'align-top' : ''
                    return (
                      <li
                        key={task[2].id}
                        className='task'
                        onClick={() => {
                          openModal(task[2])
                        }}
                      >
                        <p className={task[2].finish ? 'finish' : ''}>{task[2].task}</p>
                        <div className={`detail ${alignInline} ${alignTop}`}>
                          <p>{task[2].category}</p>
                          <p>{task[2].description}</p>
                        </div>
                      </li>
                    )
                  }
                })}
              </ul>
            </div>
          )
        })}
      </div>
    )
  })

  const modals = tasks.map((task) => {
    return modal[task.id] ? <Modal key={task.id} closeModal={closeModal} task={task} /> : null
  })

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
      <div className='weekDays'>
        {weekName.map((day, index) => <p key={index}>{day}</p>)}
      </div>
      <div className='calendar--grid'>{monthlyCalendarEls}</div>
      {modals}
    </div>
  )
}
