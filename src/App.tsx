import React, { useState } from 'react'
import currimage from './assets/catto.jpg'
import ExampleComp from './components/exampleComponent/ExampleComp'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import EmployeeHome from './pages/employeeHome/employeeHome'
import Login from './pages/Login/Login'
import NavBar from './components/navbar/navbar'

// TODO : will need to accomodate different home directory for different 

function App() {
  let items = ["others","others2"]
  const isLoggedIn = useState(false);

  return (
    <div>
      <NavBar currentuserName="UserOne" currentuserRole="Saikang"  currentuserImage={currimage} navItems={items}/>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employeehome" element={<EmployeeHome/>} />
          <Route path="/hodhome" element={<EmployeeHome/>} />
          <Route path="/hrhome" element={<EmployeeHome/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
