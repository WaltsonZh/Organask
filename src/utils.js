export const getMonthCalendar = (date) => {
  const { month, year } = date
  const first = new Date(year, month)
  const firstWeekday = first.getDay()
  const daysOfMonth = getDaysOfMonth(year)

  const calendar = []
  for (let i = 0; i < 6; i++) {
    if (i * 7 - firstWeekday >= daysOfMonth[month]) break
    calendar.push([])
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstWeekday) || i * 7 + j - firstWeekday >= daysOfMonth[month]) {
        calendar[i].push(null)
      } else {
        calendar[i].push(i * 7 + j - firstWeekday + 1)
      }
    }
  }

  return calendar
}

export const getDaysOfMonth = (year) => {
  const leapYear = year % 400 === 0 ? true : year % 100 === 0 ? false : year % 4 === 0 ? true : false
  return [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}

export const timeFormat = (time) => {
  const min = Math.floor(time / 60) % 60
  const sec = time % 60
  const hour = Math.floor(time / 3600)
  return `${hour > 0 ? hour + ':' : ''}${min < 10 ? 0 : ''}${min}:${sec < 10 ? 0 : ''}${sec}`
}

export const filterTasksByMonth = (tasks, year, month) => {
  const filteredArray = []
  const range = [new Date(year, month), new Date(year + Math.floor((month + 1) / 12), (month + 1) % 12)]
  tasks.forEach((task) => {
    const date = [task.startTimestamp.toDate(), task.endTimestamp.toDate()]
    if ((date[0] < range[1] && date[0] > range[0]) || (date[1] > range[0] && date[1] < range[1]) || (date[1] > range[1] && date[0] < range[0])) {
      filteredArray.push(task)
    }
  })

  return filteredArray
}

export const sortByCategories = (tasks) => {
  const sorted = {}
  tasks.forEach((task) => {
    if (!sorted[task.category]) {
      sorted[task.category] = [task]
    } else {
      sorted[task.category].push(task)
    }
  })

  return sorted
}
