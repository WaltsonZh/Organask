import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-router-dom'
import { Timestamp } from 'firebase/firestore'
import { addTask } from '../firebase'

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
  }
  addTask(data)

  return null
}

export default function AddTask() {
  const [fullDay, setFullDay] = useState(false)
  const checkbox = useRef()

  return (
    <div className='AddTask Page'>
      <h1>AddTask</h1>
      <Form method='post'>
        <div className='head'>
          <div className='input--box'>
            <input type='text' name='category' required />
            <span>Category</span>
          </div>
          <div className='fullday'>
            <input ref={checkbox} type='checkbox' name='fullday' onChange={(e) => setFullDay(e.target.checked)} />
            <label htmlFor='fullday'>fullday</label>
          </div>
        </div>
        <div className='tasktime'>
          <div className='time--box'>
            <label htmlFor='startdate'>Start Date</label>
            <input type='date' name='startdate' required />
          </div>
          {fullDay ? (
            <div className='time--box'>
              <label htmlFor='enddate'>End Date</label>
              <input type='date' name='enddate' required />
            </div>
          ) : (
            <>
              <div className='time--box'>
                <label htmlFor='starttime'>Start time</label>
                <input type='time' name='starttime' required />
              </div>
              <div className='time--box'>
                <label htmlFor='endtime'>End Time</label>
                <input className='endtime' type='time' name='endtime' required />
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
