import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './UserContext'

type Course = {
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

type CourseContextProps = {
  courses: Course[]
  loading: boolean
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined)

const CourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const { userData } = useAuth()
  const staffId = userData?.staff_id // Access staff_id from userData

  useEffect(() => {
    if (staffId) {
      const fetchCourses = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/course/staff/${staffId}`
          )
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const data: Course[] = await response.json()
          console.log('Courses:', data)
          setCourses(data)
        } catch (error) {
          console.error('Error fetching courses:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchCourses()
    }
  }, [staffId])

  return (
    <CourseContext.Provider value={{ courses, loading }}>
      {children}
    </CourseContext.Provider>
  )
}

const useCourses = (): CourseContextProps => {
  const context = useContext(CourseContext)
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider')
  }
  return context
}

export { CourseProvider, useCourses }
