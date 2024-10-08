import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import EmployeeHome from './pages/employeeHome/employeeHome'
import Login from './pages/Login/Login'
import HodHome from './pages/hodHome/hodHome'
import HodSchedule from './pages/hodHome/hodSchedule'
import HodView from './pages/hodHome/hodView'
import HRHome from './pages/hrHome/hrHome'
import HRView from './pages/hrHome/hrView'
import CourseDetails from './pages/CourseDetails/CourseDetails'
import Attendance from './pages/Attendance/Attendance'
import AttendanceConfirmation from './pages/AttendanceConfirmation/AttendanceConfirmation'
import CourseCompleted from './pages/CourseCompleted/CourseCompleted'
import { CourseProvider } from './contexts/CourseContext'
import Layout from './Layout'
import './config/firebase-config'
import { useAuth } from './contexts/UserContext'

function App() {
  const { userData } = useAuth()

  return (
    <CourseProvider>
      <Router>
        {!userData ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/employeehome" element={<EmployeeHome />} />
              <Route path="/hodhome" element={<HodHome />} />
              <Route path="/hodSchedule" element={<HodSchedule />} />
              <Route path="/hodView" element={<HodView />} />
              <Route path="/hrhome" element={<HRHome />} />
              <Route path="/hrView" element={<HRView />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/attendance/:id/:staffid" element={<Attendance />} />
              <Route
                path="/attendance-confirmation"
                element={<AttendanceConfirmation />}
              />
              <Route path="/completion" element={<CourseCompleted />} />
            </Route>
          </Routes>
        )}
      </Router>
    </CourseProvider>
  )
}

export default App