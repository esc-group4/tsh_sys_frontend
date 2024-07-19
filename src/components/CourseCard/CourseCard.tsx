import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseCard.css';

interface CourseProps {
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

const getStatusClass = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'status-upcoming';
      case 'Evaluation Required':
        return 'status-evaluation';
      case 'Completed':
        return 'status-completed';
      case "Expired":
        return 'status-expired';
    }
};

const CourseCard: React.FC<CourseProps> = ({ id, title, deadline, info, location, status, countdown, description, trainer }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    if (['Upcoming', 'Expired'].includes(status)) {
      navigate(`/course/${id}`);
    } else if (status === 'Evaluation Required') {
      navigate(`/evaluation/${id}`);
    }
    // No action for 'Completed'
  };

  const showCountdown = !['Completed', 'Evaluation Required', 'Expired'].includes(status);
  const showWarning = !['Completed', 'Upcoming'].includes(status);
  const showExpand = !['Completed'].includes(status);


  return (
    <a href="#" className="course-link" onClick={(e) => { e.preventDefault(); handleClick(); }}>
      <div className="event-box">
        <div className="left-column">

          {showCountdown && countdown && (
            <div className="countdown-container">
              <div className="time" id="countdown">{countdown}</div>
              <div className="time-labels">
                <div className="label">Days</div>
                <div className="label">Hrs</div>
                <div className="label">Min</div>
              </div>
            </div>
          )}
          <div className="status-container">
            {showWarning && <i className="fas fa-exclamation-triangle warning-icon"></i>}
            <div className={`status ${getStatusClass(status)}`}>
              Status:&nbsp;<span className="status-value">{status}</span>
            </div>
          </div>

        </div>
        
        <div className="right-column">
          <div className="info-item-header">
            <span>{title}</span>
            {showExpand && <i className="fas fa-chevron-right"></i>}
          </div>

          <div className="info-item">
            <i className="fas fa-calendar-alt"></i>
            <div id="event-date"><span>{deadline}</span></div>
          </div>

          <div className="info-item">
            <i className="fas fa-info-circle"></i>
            <span>{info}</span>
          </div>

          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{location}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CourseCard;
