// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CourseProvider } from './contexts/CourseContext';
import EmployeeHome from './pages/employeeHome/employeeHome';
import Login from './pages/Login/Login';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import TraineeEvaluation from './pages/Evaluation/TraineeEvaluation';
import Attendance from './pages/Attendance/Attendance';
import AttendanceConfirmation from './pages/AttendanceConfirmation/AttendanceConfirmation';
import CourseCompleted from './pages/CourseCompleted/CourseCompleted';
import logo from './assets/logo.svg';

function App() {
  return (
    <CourseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<EmployeeHome />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/evaluation/:id" element={<TraineeEvaluation />} />
          <Route path='/attendance/:id' element={<Attendance />} />
          <Route path='/attendance-confirmation' element={<AttendanceConfirmation />} />
          <Route path='/completion' element={<CourseCompleted />} />
        </Routes>
      </Router>
    </CourseProvider>
  );
}

export default App;
