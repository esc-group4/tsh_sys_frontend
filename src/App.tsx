import React from 'react'
import logo from './assets/logo.svg'
import ExampleComp from './components/exampleComponent/ExampleComp'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import EmployeeHome from './pages/employeeHome/employeeHome'
import Login from './pages/Login/Login'
import CourseDetails from './pages/CourseDetails/CourseDetails';
import TraineeEvaluation from './pages/Evaluation/TraineeEvaluation.tsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<EmployeeHome/>} />
          <Route path="/coursedetails" element={<CourseDetails/>} />
          <Route path="/evaluation" element={<TraineeEvaluation/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
