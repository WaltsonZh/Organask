import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Calendar from './pages/Calendar'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='calendar' element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
