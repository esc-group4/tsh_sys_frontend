import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCourses } from '../../contexts/CourseContext'
import QrScanner from 'react-qr-scanner'
import './Attendance.css'

const Attendance: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { updateCourseStatus } = useCourses()
  const navigate = useNavigate()
  const [delay, setDelay] = useState(300)

  const handleDoneClick = () => {
    if (id) {
      updateCourseStatus(parseInt(id), 'Completed')
      navigate('/attendance-confirmation')
    }
  }

  const handleScan = (data: any) => {
    if (data) {
      // Handle the scanned data here
      console.log('Scanned Attendance Data:', data)
      // You can also mark the attendance here and navigate to the confirmation page
      handleDoneClick()
    }
  }

  const handleError = (err: any) => {
    console.error(err)
  }

  return (
    <div className="attendance-container">
      <h1 className="attendance-title">Mark Your Attendance</h1>
      <div className="qr-code-container">
        <QrScanner
          delay={delay}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      <div className="instructions">
        <span>1. Point your camera at the QR code.</span>
        <span>2. The QR code will be scanned automatically.</span>
        <span>3. Mark your attendance.</span>
      </div>
      <div className="attendance-actions">
        <button className="done-btn" onClick={handleDoneClick}>
          Done
        </button>
      </div>
    </div>
  )
}

export default Attendance
