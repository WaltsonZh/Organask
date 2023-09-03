import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout'
import Error from './pages/Error'
import Calendar from './pages/Calendar'
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories'
import Pomodoro from './pages/Pomodoro'
import AddTask, {action as addTaskAction} from './pages/AddTask'

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} errorElement={<Error />}>
        <Route index element={<Dashboard />} />
        <Route path='calendar' element={<Calendar />} />
        <Route path='categories' element={<Categories />} />
        <Route path='pomodoro' element={<Pomodoro />} />
        <Route path='addtask' element={<AddTask />} action={addTaskAction} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
