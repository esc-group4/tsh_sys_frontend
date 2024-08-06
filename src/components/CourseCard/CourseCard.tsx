import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format, differenceInMilliseconds } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import './CourseCard.css'

interface CourseProps {
  grade: string | null
  attendance: number
  type: string
  reasons: string | null
  completedDateTime: string | null
  startDate: string
  endDate: string
  course_name: string
  providerName: string
  skill_name: string
  course_location: string
  course_description: string
  status: string
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Upcoming':
      return 'status-upcoming'
    case 'Completed':
      return 'status-completed'
    case 'Expired':
      return 'status-expired'
    default:
      return ''
  }
}

const CourseCard: React.FC<CourseProps> = ({
  grade,
  attendance,
  type,
  reasons,
  completedDateTime,
  startDate,
  endDate,
  course_name,
  providerName,
  skill_name,
  course_location,
  course_description,
  status,
}) => {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const timeZone = 'Asia/Singapore'
      const deadlineDate = toZonedTime(endDate, timeZone)
      const difference = differenceInMilliseconds(deadlineDate, now)

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / (1000 * 60)) % 60)

        setTimeLeft({ days, hours, minutes })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [endDate])

  const handleClick = () => {
    if (['Upcoming', 'Expired'].includes(status)) {
      navigate(`/course/${course_name}`)
    }
    // No action for 'Completed'
  }

  const showCountdown = !['Completed', 'Expired'].includes(status)
  const showWarning = !['Completed', 'Upcoming'].includes(status)
  const showExpand = !['Completed'].includes(status)

  const formattedEndDate = format(new Date(endDate), 'MMMM dd, yyyy')

  return (
    <a
      href="#"
      className="course-link"
      onClick={(e) => {
        e.preventDefault()
        handleClick()
      }}
    >
      <div className="event-box">
        <div className="left-column">
          {showCountdown && (
            <div className="countdown-container">
              <div className="time" id="countdown">{`${String(
                timeLeft.days
              ).padStart(2, '0')} : ${String(timeLeft.hours).padStart(
                2,
                '0'
              )} : ${String(timeLeft.minutes).padStart(2, '0')}`}</div>
              <div className="time-labels">
                <div className="label">Days</div>
                <div className="label">Hrs</div>
                <div className="label">Mins</div>
              </div>
            </div>
          )}
          <div className="status-container">
            {showWarning && (
              <i className="fas fa-exclamation-triangle warning-icon"></i>
            )}
            <div className={`status ${getStatusClass(status)}`}>
              Status:&nbsp;<span className="status-value">{status}</span>
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="info-item-header">
            <span>{course_name}</span>
            {showExpand && <i className="fas fa-chevron-right"></i>}
          </div>

          <div className="info-item">
            <i className="fas fa-calendar-alt"></i>
            <div id="event-date">
              <span>{formattedEndDate}</span>
            </div>
          </div>

          <div className="info-item">
            <i className="fas fa-info-circle"></i>
            <span>{skill_name}</span>
          </div>

          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{course_location}</span>
          </div>

          {grade && (
            <div className="info-item">
              <i className="fas fa-star"></i>
              <span>Grade: {grade}</span>
            </div>
          )}
        </div>
      </div>
    </a>
  )
}

export default CourseCard
