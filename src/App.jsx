import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'


import LoginRoutes from './routes/LoginRoutes'
import AdminRoutes from './routes/AdminRoutes'


function App() {


  return (
    <>
    
      <Router>
        <Routes>
          <Route path="/login/*" element={<LoginRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
