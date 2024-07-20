import React from 'react'
import logo from './assets/logo.svg'
import ExampleComp from './components/exampleComponent/ExampleComp'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import EmployeeHome from './pages/employeeHome/employeeHome'
import HodHome from './pages/HOD/hodHome'
import HodView from './pages/HOD/hodView'
import HodSchedule from './pages/HOD/hodSchedule'
import HRHome from './pages/HR/hrHome'
import HRView from './pages/HR/hrView'
import Login from './pages/Login/Login'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<HRHome/>} />
          <Route path="/hrView" element={<HRView/>} />
          <Route path="/hodHome" element={<HodHome/>} />
          <Route path="/hodView" element={<HodView />} />
          <Route path="/hodSchedule" element={<HodSchedule/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App