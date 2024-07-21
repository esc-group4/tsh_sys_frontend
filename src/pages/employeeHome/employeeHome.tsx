import React from 'react';
import './employee.css';
import CourseCard from '../../components/CourseCard/CourseCard';
import { useCourses } from '../../contexts/CourseContext';
import { useAuth } from '../../contexts/UserContext';

const EmployeeHome: React.FC = () => {
  const { courses } = useCourses();
  let items = ["others","others2"]
  const { currentUser,userData  } = useAuth();
  console.log(currentUser?.uid)

  // Define the order of statuses
  const statusOrder = ['Evaluation Required', 'Upcoming', 'Expired', 'Completed'];

  // Custom sorting function
  const sortedCourses = [...courses].sort((a, b) => {
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });

  // Count the number of pending trainings
  const pendingTrainingCount = courses.filter(course => course.status === 'Upcoming').length;
  // Count the number of pending evaluations
  const pendingEvaluationCount = courses.filter(course => course.status === 'Evaluation Required').length;

  return (
      <div className="home-page">
      <div className="header-info">
        <p className="welcome-message">Welcome to your training dashboard!</p>
        <div className="status-indicators">
          <div className="status-box pending">
            <div className="status-label">Upcoming Training:</div>
            <div className="status-number">{pendingTrainingCount}</div>
          </div>
          <div className="status-box pending">
            <div className="status-label">Pending Evaluation:</div>
            <div className="status-number">{pendingEvaluationCount}</div>
          </div>
        </div>
      </div>

      <div className="section-divider"></div>
      <div className="courses-container">
        {sortedCourses.map((course, index) => (
          <CourseCard
            id={course.id}
            key={index}
            title={course.title}
            deadline={course.deadline}
            info={course.info}
            location={course.location}
            status={course.status}
            countdown={course.countdown}
            description={course.description}
            trainer={course.trainer}
          />
        ))}
      </div>
    </div>


  );
};

export default EmployeeHome;