import React from 'react';
import { useNavigate } from 'react-router-dom';
import confirmationLogo from '../../assets/confirmation-logo.jpg';
import './AttendanceConfirmation.css';

const Confirmation: React.FC = () => {
    const navigate = useNavigate();

    const handleReturnHomeClick = () => {
        navigate('/employeeHome'); // Redirect to home page
    };

    return (
        <div className="confirmation-container">
            <div className="confirmation-content">
                <img src={confirmationLogo} alt="Confirmation" className="confirmation-logo" />
                <h1 className="confirmation-title">Thank You!</h1>
                <p className="confirmation-message">Your attendance has been successfully confirmed. Please look out for the Training Evaluation Form.</p>
                <button className="return-home-btn" onClick={handleReturnHomeClick}>Return to Home</button>
            </div>
        </div>
    );
};

export default Confirmation;
