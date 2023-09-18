import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, redirect } from 'react-router-dom'
import Layout from './layouts/Layout'
import Error from './pages/Error'
import Calendar from './pages/Calendar'
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories'
import Pomodoro from './pages/Pomodoro'
import AddTask, { action as addTaskAction } from './pages/AddTask'
import Login from './pages/Login'

const loader = ({ request }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false
  const path = new URL(request.url).pathname
  console.log(typeof isLoggedIn)

  if (!isLoggedIn) {
    console.log('!isLoggedIn')
    throw redirect(`/login?redirect=${path}`)
  }

  return null
}

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} errorElement={<Error />}>
        <Route index element={<Dashboard />} loader={loader} />
        <Route path='calendar' element={<Calendar />} loader={loader} />
        <Route path='categories' element={<Categories />} loader={loader} />
        <Route path='pomodoro' element={<Pomodoro />} loader={loader} />
        <Route path='addtask' element={<AddTask />} action={addTaskAction} loader={loader} />
        <Route path='login' element={<Login />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
