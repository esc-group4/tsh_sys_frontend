import React, { useState, useEffect } from 'react'
import './employee.css'
import CourseCard from '../../components/CourseCard/CourseCard'
import { useCourses } from '../../contexts/CourseContext'
import { useAuth } from '../../contexts/UserContext'

const EmployeeHome: React.FC = () => {
  const { courses } = useCourses()
  const { userData } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const statusOrder = [
    'Evaluation Required',
    'Upcoming',
    'Expired',
    'Completed',
  ]

  const sortedCourses = [...courses].sort((a, b) => {
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  })

  const pendingTrainingCount = sortedCourses.filter(
    (course) => course.status === 'Upcoming'
  ).length

  useEffect(() => {
    if (!userData) {
      setError('User data not available')
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [userData])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="home-page">
      <div className="header-info">
        <p className="welcome-message">
          Welcome to your training dashboard, {userData?.staff_name}!
        </p>
        <div className="status-indicators">
          <div className="status-box pending">
            <div className="status-label">Upcoming Training:</div>
            <div className="status-number">{pendingTrainingCount}</div>
          </div>
        </div>
      </div>

      <div className="section-divider"></div>
      <div className="courses-container">
        {sortedCourses.length > 0 ? (
          sortedCourses.map((course) => (
            <CourseCard
              key={course.course_name}
              grade={course.grade}
              attendance={course.attendance}
              type={course.type}
              reasons={course.reasons}
              completedDateTime={course.completedDateTime}
              startDate={course.startDate}
              endDate={course.endDate}
              course_name={course.course_name}
              providerName={course.providerName}
              skill_name={course.skill_name}
              course_location={course.course_location}
              course_description={course.course_description}
              status={course.status}
            />
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </div>
  )
}

export default EmployeeHome