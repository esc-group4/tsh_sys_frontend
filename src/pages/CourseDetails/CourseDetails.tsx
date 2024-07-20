import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../../contexts/CourseContext';
import './CourseDetails.css';

const CourseDetails: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const { courses } = useCourses();
    const navigate = useNavigate();
    
    const course = courses.find(course => course.id === parseInt(id || ''));

    if (!course) {
        return <div>Course not found.</div>;
    }

    const handleMarkAttendance = () => {
        if (id) {
            navigate(`/attendance/${id}`);
        }
    };

    return (
        <div className="course-details-container">
            <a href="/home" className="back-button"><i className="fas fa-arrow-left"></i> Back</a>
            <div className="course-header">
                <h1 className="course-title">{course.title}</h1>
                <div className={`status2 ${getStatusClass2(course.status)}`}>{course.status}</div>
            </div>
            <div className="course-info">
                <div className="info-item2">
                    <i className="fas fa-calendar-alt"></i>
                    <span>{course.deadline}</span>
                </div>
                <div className="info-item2">
                    <i className="fas fa-info-circle"></i>
                    <span>{course.info}</span>
                </div>
                <div className="info-item2">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{course.location}</span>
                </div>
            </div>
            <div className="course-description">
                <h2>Course Description</h2>
                <p>{course.description}</p>
            </div>
            <div className="instructor-info">
                <h2>Instructor</h2>
                <p>{course.trainer}</p>
            </div>
            <div className="course-actions">
                {course.status !== 'Expired' && (
                    <button className="mark-attendance-btn" onClick={handleMarkAttendance}>Mark Attendance</button>
                )}
            </div>
        </div>
    );
};

const getStatusClass2 = (status: string) => {
    switch (status) {
        case 'Upcoming':
            return 'status-upcoming2';
        case 'Evaluation Required':
            return 'status-evaluation2';
        case 'Completed':
            return 'status-completed2';
        case 'Expired':
            return 'status-expired2';
    }
};

export default CourseDetails;
