import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Course {
  id: number;
  title: string;
  deadline: string;
  info: string;
  location: string;
  status: string;
  countdown: string;
  description: string;
  trainer: string;
}

interface CourseContextProps {
  courses: Course[];
  updateCourseStatus: (id: number, status: string) => void;
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Sample data, replace with actual data fetching logic
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'Course 1',
      deadline: '25-07-2024',
      info: 'Details about Course 1',
      location: 'Location A',
      status: 'Upcoming',
      countdown: '07 : 06 : 59',
      description: 'This is a description of Course 1',
      trainer: 'Trainer A'
    },
    {
      id: 2,
      title: 'Course 2',
      deadline: '05-08-2024',
      info: 'Details about Course 2',
      location: 'Location B',
      status: 'Evaluation Required',
      countdown: '00 : 00 : 00',
      description: 'This is a description of Course 2',
      trainer: 'Trainer B'
    },
    {
      id: 3,
      title: 'Course 3',
      deadline: '25-08-2024',
      info: 'Details about Course 3',
      location: 'Location C',
      status: 'Completed',
      countdown: '00 : 00 : 00',
      description: 'This is a description of Course 3',
      trainer: 'Trainer C'
    },
    {
      id: 4,
      title: 'Course 4',
      deadline: '05-08-2024',
      info: 'Details about Course 4',
      location: 'Location D',
      status: 'Expired',
      countdown: '00 : 00 : 00',
      description: 'This is a description of Course 4',
      trainer: 'Trainer D'
    },
    {
      id: 5,
      title: 'Course 5',
      deadline: '09-08-2024',
      info: 'Details about Course 5',
      location: 'Location E',
      status: 'Evaluation Required',
      countdown: '00 : 00 : 00',
      description: 'This is a description of Course 5',
      trainer: 'Trainer E'
    }
  ]);

  const updateCourseStatus = (id: number, status: string) => {
    setCourses(prevCourses =>
        prevCourses.map(course =>
            course.id === id ? { ...course, status } : course
        )
    );
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
