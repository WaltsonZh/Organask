import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout'
import Calendar from './pages/Calendar'
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories'
import AddTask from './pages/AddTask'

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='calendar' element={<Calendar />} />
        <Route path='categories' element={<Categories />} />
        <Route path='addtask' element={<AddTask />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
