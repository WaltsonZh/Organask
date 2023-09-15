import React, { useRef, useState } from 'react'
import { Form } from 'react-router-dom'
import { Timestamp } from 'firebase/firestore'
import { addTask } from '../firebase'
import { dateFormat } from '../utils.js'

export const action = async ({ request }) => {
  const formData = await request.formData()
  let data = {}
  for (const pair of formData.entries()) {
    data[pair[0]] = pair[1]
  }

  const jsStartTime = new Date(`${data.fullday ? data.startdate : `${data.startdate} ${data.starttime}`}`)
  const startTimestamp = Timestamp.fromDate(jsStartTime)
  const jsEndTime = new Date(`${data.fullday ? data.enddate : `${data.startdate} ${data.endtime}`}`)
  const endTimestamp = Timestamp.fromDate(jsEndTime)

  delete data.startdate
  delete data.starttime
  delete data.endtime
  delete data.enddate

  data = {
    ...data,
    startTimestamp,
    endTimestamp,
    fullday: data.fullday ? true : false,
    finish: false,
  }
  addTask(data)

  return null
}

export default function AddTask() {
  const [fullDay, setFullDay] = useState(false)
  const checkbox = useRef()
  const now = new Date()
  const [startDate, setStartDate] = useState(dateFormat(now))
  const [startTime, setStartTime] = useState('')

  return (
    <div className='AddTask Page'>
      <h1>Add Task</h1>
      <Form method='post'>
        <div className='head'>
          <div className='input--box'>
            <input type='text' name='category' required />
            <span>Category</span>
          </div>
          <div className='fullday'>
            <label className={fullDay ? '' : 'selected'}>One Day</label>
            <input ref={checkbox} type='checkbox' name='fullday' onChange={(e) => setFullDay(e.target.checked)} />
            <label className={fullDay ? 'selected' : ''}>Full Day</label>
          </div>
        </div>
        <div className='tasktime'>
          <div className='time--box'>
            <label>Start Date</label>
            <input type='date' name='startdate' defaultValue={dateFormat(now)} min={dateFormat(now)} onChange={(e) => setStartDate(e.target.value)} required />
          </div>
          {fullDay ? (
            <div className='time--box'>
              <label>End Date</label>
              <input type='date' name='enddate' min={startDate} required />
            </div>
          ) : (
            <>
              <div className='time--box'>
                <label>Start time</label>
                <input type='time' name='starttime' min={startDate === dateFormat(now) ? `${now.getHours()}:${now.getMinutes()}` : ''} onChange={(e) => setStartTime(e.target.value)} required />
              </div>
              <div className='time--box'>
                <label>End Time</label>
                <input type='time' name='endtime' min={startTime} required />
              </div>
            </>
          )}
        </div>
        <div className='input--box'>
          <input type='text' name='task' required />
          <span>Task</span>
        </div>
        <div className='input--box description'>
          <textarea type='text' name='description' required />
          <span>Description</span>
        </div>
        <button>submit</button>
      </Form>
    </div>
  )
}
