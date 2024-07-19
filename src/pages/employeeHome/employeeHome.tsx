import React from 'react';
import './employee.css';
import CourseCard from '../../components/CourseCard/CourseCard';
import logo from '../../assets/profile.jpg';

const EmployeeHome: React.FC = () => {
  // Sample data, replace with actual data fetching logic
  const courses = [
    {
      title: 'Course 1',
      deadline: '25-07-2024',
      info: 'Details about Course 1',
      location: 'Location A',
      status: 'Upcoming',
      countdown: '07 : 06 : 59'
    },

    {
      title: 'Course 2',
      deadline: '05-08-2024',
      info: 'Details about Course 2',
      location: 'Location B',
      status: 'Evaluation Required',
      countdown: '00 : 00 : 00'
    },

    {
      title: 'Course 3',
      deadline: '25-08-2024',
      info: 'Details about Course 3',
      location: 'Location C',
      status: 'Completed',
      countdown: '00 : 00 : 00'
    },
    {
      title: 'Course 4',
      deadline: '05-08-2024',
      info: 'Details about Course 4',
      location: 'Location D',
      status: 'Expired',
      countdown: '00 : 00 : 00'
    },

    {
      title: 'Course 5',
      deadline: '09-08-2024',
      info: 'Details about Course 5',
      location: 'Location E',
      status: 'Evaluation Required',
      countdown: '00 : 00 : 00'
    }

    // Add more courses as needed
  ];

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
      <nav className="navbar">
        <div className="user-info">
          <div className="user-details">
            <span className="user-name">Joanne Lim</span>
            <span className="user-department">Technical Manager</span>
          </div>
          <img src={logo} alt="Logo" className="user-avatar" />
        </div>
      </nav>

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
            key={index}
            title={course.title}
            deadline={course.deadline}
            info={course.info}
            location={course.location}
            status={course.status}
            countdown={course.countdown}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeHome;