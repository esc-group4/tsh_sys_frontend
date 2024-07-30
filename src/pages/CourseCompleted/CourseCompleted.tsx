import React from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import './CourseCompleted.css';

const CourseCompleted: React.FC = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/employeeHome');
    };

    return (
        <div className="course-completed-container">
            <div className="completion-message">
                <i className="fas fa-check-circle completion-icon"></i>
                <h1 className='Congrats'>Congratulations!</h1>
                <p className="completion-text">You have successfully completed your training and evaluation. Well done!</p>
                <button className="home-btn" onClick={handleHomeClick}>Return to Home</button>
            </div>
        </div>
    );
};

export default CourseCompleted;
