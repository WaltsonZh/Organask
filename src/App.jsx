import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Layout />} />
      </Routes>
    </BrowserRouter>
  )
}
