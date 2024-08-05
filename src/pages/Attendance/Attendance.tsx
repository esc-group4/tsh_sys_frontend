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

  const handleScan = (data: any) => {
    if (data) {
      console.log('Scanned Data:', data.text) // assuming data.text contains the URL
      // Redirect to the URL scanned from the QR code
      window.open(data.text, '_blank')
      if (id) {
        updateCourseStatus(parseInt(id), 'Completed')
        navigate('/attendance-confirmation')
      }
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
        <span>3. You will be redirected to the URL.</span>
      </div>
    </div>
  )
}

export default Attendance
