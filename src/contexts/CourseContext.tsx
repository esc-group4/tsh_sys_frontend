import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './UserContext';

type Course = {
  id: number;
  title: string;
  deadline: string;
  info: string;
  location: string;
  status: string;
  countdown: string;
  description: string;
  trainer: string;
  email: string;
  name: string;
};

type CourseContextProps = {
  courses: Course[];
  updateCourseStatus: (id: number, status: string) => void;
};

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, userData } = useAuth(); // Get the current user and user data from the Auth context

  // Fetch courses from backend API based on user email
  useEffect(() => {
    const fetchCourses = async () => {
      if (!userData || !userData.email) return;

      try {
        const response = await fetch(`http://localhost:3001/courses/${userData.email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Course[] = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userData]);

  const updateCourseStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`http://localhost:3001/courses/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedCourse = await response.json();
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course.id === id ? updatedCourse : course
        )
      );
    } catch (error) {
      console.error('Error updating course status:', error);
    }
  };

  return (
    <CourseContext.Provider value={{ courses, updateCourseStatus }}>
      {children}
    </CourseContext.Provider>
  );
};

const useCourses = (): CourseContextProps => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};



export { CourseProvider, useCourses };