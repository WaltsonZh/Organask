import React, { useRef, useState } from 'react'
import { Form, useActionData } from 'react-router-dom'
import { Timestamp } from 'firebase/firestore'

export const action = async ({ request }) => {
  const formData = await request.formData()
  let data = {}
  for (const pair of formData.entries()) {
    data[pair[0]] = pair[1]
  }

  const jsStartTime = new Date(`${data.startdate} ${data.starttime}`)
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

  return data
}

export default function AddTask() {
  const task = useActionData()
  const [fullDay, setFullDay] = useState(true)
  const checkbox = useRef()

  return (
    <div className='AddTask Page'>
      <h1>AddTask</h1>
      <Form method='post'>
        <input type='text' name='category' placeholder='Category' required />
        <input type='date' name='startdate' required />
        {fullDay ? <input type='date' name='enddate' required /> : null}
        <input ref={checkbox} type='checkbox' name='fullday' onChange={(e) => setFullDay(e.target.checked)} />
        <label htmlFor='fullday'>fullday</label>
        {!fullDay ? (
          <>
            <input type='time' name='starttime' required />
            <input type='time' name='endtime' required />
          </>
        ) : null}
        <input type='text' name='task' placeholder='Task' required />
        <input type='text' name='description' placeholder='Description' />
        <button>submit</button>
      </Form>
      <p>{JSON.stringify(task)}</p>
    </div>
  )
}
