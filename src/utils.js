export const getMonthCalendar = (today) => {
  const year = today.getFullYear()
  const month = today.getMonth()
  const first = new Date(year, month)
  const firstWeekday = first.getDay()
  const leapYear = year % 400 ? true : year % 100 ? false : year % 4 ? true : false

  const daysOfMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

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

export const timeFormat = (time) => {
  const min = Math.floor(time / 60) % 60
  const sec = time % 60
  const hour = Math.floor(time / 3600)
  return `${hour > 0 ? hour + ':' : ''}${min < 10 ? 0 : ''}${min}:${sec < 10 ? 0 : ''}${sec}`
}
