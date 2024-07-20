import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourses } from '../../contexts/CourseContext';
import qrCodeImage from '../../assets/qr-code.jpg';
import './Attendance.css';

const Attendance: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { updateCourseStatus } = useCourses();
    const navigate = useNavigate();

    const handleDoneClick = () => {
        if (id) {
            updateCourseStatus(parseInt(id), 'Evaluation Required');
            navigate('/attendance-confirmation');
        }
    };

    return (
        <div className="attendance-container">
            <h1 className="attendance-title">Mark Your Attendance</h1>
            <div className="qr-code-container">
                <img src={qrCodeImage} alt="QR Code" className="qr-code" />
            </div>
            <div className="instructions">
                <span>1. Open your camera / QR code scanner.</span>
                <span>2. Scan the QR code above.</span>
                <span>3. Mark your attendance.</span>
            </div>
            <div className="attendance-actions">
                <button className="done-btn" onClick={handleDoneClick}>Done</button>
            </div>
        </div>
    );
};

export default Attendance;
