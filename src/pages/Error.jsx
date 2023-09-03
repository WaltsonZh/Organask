import React from 'react'
import { useRouteError } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function Error() {
  const error = useRouteError()

  return (
    <>
    <Sidebar />
      <div className='Page'>
        <h1>Error: {error.message}</h1>
        <h6>{JSON.stringify(error)}</h6>
      </div>
    </>
  )
}
