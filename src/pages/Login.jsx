import React from 'react'
import { redirect } from 'react-router-dom'

export const loader = ({ request }) => {
  const path = new URL(request.url).searchParams.get('redirect') || '/'

  if (JSON.parse(localStorage.getItem('isLoggedIn'))) {
    throw redirect(path)
  }

  return null
}

export default function Login() {
  return (
    <div className='Page Login'>
      <div>
        <h1>Welcome to Organask</h1>
        <h2>Login to get your tasks Organized.</h2>
      </div>
    </div>
  )
}
