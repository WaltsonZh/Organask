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
  return <h1>Login</h1>
}
