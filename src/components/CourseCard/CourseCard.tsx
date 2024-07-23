import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { format, differenceInMilliseconds } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
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
  email: string;
  name: string;
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

const CourseCard: React.FC<CourseProps> = ({ id, title, deadline, info, location, status, countdown, description, trainer, name, email }) => {

  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const timeZone = 'Asia/Singapore';
      const deadlineDate = toZonedTime(deadline, timeZone);
      const difference = differenceInMilliseconds(deadlineDate, now);

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);

        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [deadline]);

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
              <div className="time" id="countdown">{`${String(timeLeft.days).padStart(2, '0')} : ${String(timeLeft.hours).padStart(2, '0')} : ${String(timeLeft.minutes).padStart(2, '0')}`}</div>
              <div className="time-labels">
                <div className="label">Days</div>
                <div className="label">Hrs</div>
                <div className="label">Mins</div>
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
