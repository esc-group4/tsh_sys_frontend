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

  // Define the order of statuses
  const statusOrder = [
    'Evaluation Required',
    'Upcoming',
    'Expired',
    'Completed',
  ]

  // Custom sorting function
  const sortedCourses = [...courses].sort((a, b) => {
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  })

  // Count the number of pending trainings and evaluations
  const pendingTrainingCount = sortedCourses.filter(
    (course) => course.status === 'Upcoming'
  ).length
  const pendingEvaluationCount = sortedCourses.filter(
    (course) => course.status === 'Evaluation Required'
  ).length

  // Fetch courses from backend API based on user email
  useEffect(() => {
    const fetchCourses = async () => {
      if (!userData || !userData.email) {
        setError('User data or email not available')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          `http://localhost:3001/courses/${userData.email}`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
      } catch (error) {
        console.error('Error fetching courses:', error)
        setError('Failed to fetch courses')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [userData])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="home-page">
      <div className="header-info">
        <p className="welcome-message">Welcome to your training dashboard!</p>
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
              id={course.id}
              key={course.id}
              title={course.title}
              deadline={course.deadline}
              info={course.info}
              location={course.location}
              status={course.status}
              countdown={course.countdown}
              description={course.description}
              trainer={course.trainer}
              email={course.email}
              name={course.name}
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
