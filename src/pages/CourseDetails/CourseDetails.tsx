import React from 'react'
import { useAuth } from '../../contexts/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useCourses } from '../../contexts/CourseContext'
import './CourseDetails.css'

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>()
  const { courses } = useCourses()
  const navigate = useNavigate()
  const { userData } = useAuth()
  const staffId = userData?.staff_id

  const course = courses.find((course) => course.course_name === id)

  const handleBackClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault()
    navigate('/employeeHome')
  }

  if (!course) {
    return <div>Course not found.</div>
  }

  const handleMarkAttendance = () => {
    if (id) {
      navigate(`/attendance/${id}/${staffId}`)
    }
  }

  return (
    <div className="course-details-container">
      <a href="/employeeHome" className="back-button" onClick={handleBackClick}>
        <i className="fas fa-arrow-left"></i> Back
      </a>
      <div className="course-header">
        <h1 className="course-title">{course.course_name}</h1>
        <div className={`status2 ${getStatusClass2(course.status)}`}>
          {course.status}
        </div>
      </div>
      <div className="course-info">
        <div className="info-item2">
          <i className="fas fa-calendar-alt"></i>
          <span>{course.endDate}</span>
        </div>
        <div className="info-item2">
          <i className="fas fa-info-circle"></i>
          <span>{course.skill_name}</span>
        </div>
        <div className="info-item2">
          <i className="fas fa-map-marker-alt"></i>
          <span>{course.course_location}</span>
        </div>
      </div>
      <div className="course-description">
        <h2>Course Description</h2>
        <p>{course.course_description}</p>
      </div>
      <div className="instructor-info">
        <h2>Instructor</h2>
        <p>{course.providerName}</p>
      </div>
      <div className="course-actions">
        {course.status !== 'Expired' && (
          <button
            className="mark-attendance-btn"
            onClick={handleMarkAttendance}
          >
            Mark Attendance
          </button>
        )}
      </div>
    </div>
  )
}

const getStatusClass2 = (status: string) => {
  switch (status) {
    case 'Upcoming':
      return 'status-upcoming2'
    case 'Evaluation Required':
      return 'status-evaluation2'
    case 'Completed':
      return 'status-completed2'
    case 'Expired':
      return 'status-expired2'
    default:
      return ''
  }
}

export default CourseDetails
