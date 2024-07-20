import React from 'react'
import logo from './assets/logo.svg'
import ExampleComp from './components/exampleComponent/ExampleComp'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import EmployeeHome from './pages/employeeHome/employeeHome'
import HodHome from './pages/HOD/hodHome'
import HodView from './pages/HOD/hodView'
import HodSchedule from './pages/HOD/hodSchedule'
import Login from './pages/Login/Login'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/hodSchedule" element={<HodSchedule/>} />
          <Route path="/dashboard" element={<HodHome/>} />
          <Route path="/hodView" element={<HodView />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
