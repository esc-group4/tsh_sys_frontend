import React from 'react'
import logo from './assets/logo.svg'
import ExampleComp from './components/exampleComponent/ExampleComp'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import EmployeeHome from './pages/employeeHome/employeeHome'
import Login from './pages/Login/Login'

// TODO : will need to accomodate different home directory for different 

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<EmployeeHome/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
