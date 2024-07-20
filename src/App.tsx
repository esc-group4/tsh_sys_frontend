import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import EmployeeHome from './pages/employeeHome/employeeHome';
import Login from './pages/Login/Login';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import TraineeEvaluation from './pages/Evaluation/TraineeEvaluation';
import Attendance from './pages/Attendance/Attendance';
import AttendanceConfirmation from './pages/AttendanceConfirmation/AttendanceConfirmation';
import CourseCompleted from './pages/CourseCompleted/CourseCompleted';
import { CourseProvider } from './contexts/CourseContext';
import currimage from "./assets/profile.jpg"
import Layout from "./Layout"



function App() {
  let items = ["others","others2"]

  return (

    <CourseProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          element={
            <Layout
              currentuserName="Jason Mars"
              currentuserRole="Clerk"
              currentuserImage={currimage}
              navItems={items}
            />
          }
        >
          <Route path="/employeehome" element={<EmployeeHome/>} />
          <Route path="/hodhome" element={<EmployeeHome/>} />
          <Route path="/hrhome" element={<EmployeeHome />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/evaluation/:id" element={<TraineeEvaluation />} />
          <Route path='/attendance/:id' element={<Attendance />} />
          <Route path='/attendance-confirmation' element={<AttendanceConfirmation />} />
          <Route path='/completion' element={<CourseCompleted />} />
        </Route>
      </Routes>
    </Router>

    </CourseProvider>
  );
}

export default App;
