import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCourses } from '../../contexts/CourseContext'
import QrScanner from 'react-qr-scanner'
import './Attendance.css'

const Attendance: React.FC = () => {
  const { id, staffid } = useParams<{ id: string; staffid: string }>()
  const navigate = useNavigate()
  const [delay, setDelay] = useState(300)

  const handleScan = async (data: any) => {
    if (data && id) {
      console.log('Scanned Data:', data.text)
      try {
        const response = await fetch(
          `http://192.168.137.1:8080/attendance/${data.text}/${staffid}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ request_id: data.text, staff_id: staffid }),
          }
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        navigate('/attendance-confirmation')
      } catch (error) {
        console.error('Failed to send attendance data:', error)
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
