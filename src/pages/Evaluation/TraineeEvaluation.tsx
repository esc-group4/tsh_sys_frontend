import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourses } from '../../contexts/CourseContext';
import './TraineeEvaluation.css';

const TraineeEvaluation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { updateCourseStatus } = useCourses();
  const navigate = useNavigate();

    const handleSubmit = () => {
      if (id) {
        updateCourseStatus(parseInt(id), 'Completed');
        navigate('/attendance-confirmation');
    }        navigate('/completion');
    };

    const handleBackClick = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="evaluation-container">
            <h1>Trainee Evaluation</h1>
            <a href="/employeeHome" className="back-button" onClick={handleBackClick}><i className="fas fa-arrow-left"></i> Back</a>
            <div className="scrollable-form">
                <form>
                    <div className="question-group">
                        <h2>The objectives of the training were clearly defined.</h2>
                        <label><input type="radio" name="q1" value="Excellent" /> Excellent</label>
                        <label><input type="radio" name="q1" value="Average" /> Average</label>
                        <label><input type="radio" name="q1" value="Poor" /> Poor</label>
                    </div>

                    <div className="question-group">
                        <h2>The training materials were relevant and useful.</h2>
                        <label><input type="radio" name="q2" value="Excellent" /> Excellent</label>
                        <label><input type="radio" name="q2" value="Average" /> Average</label>
                        <label><input type="radio" name="q2" value="Poor" /> Poor</label>
                    </div>

                    <div className="question-group">
                        <h2>The training was well organized and structured.</h2>
                        <label><input type="radio" name="q3" value="Excellent" /> Excellent</label>
                        <label><input type="radio" name="q3" value="Average" /> Average</label>
                        <label><input type="radio" name="q3" value="Poor" /> Poor</label>
                    </div>

                    <div className="question-group">
                        <h2>The training was delivered effectively.</h2>
                        <label><input type="radio" name="q4" value="Excellent" /> Excellent</label>
                        <label><input type="radio" name="q4" value="Average" /> Average</label>
                        <label><input type="radio" name="q4" value="Poor" /> Poor</label>
                    </div>

                    <div className="question-group">
                        <h2>The training met my expectations.</h2>
                        <label><input type="radio" name="q5" value="Yes" /> Yes</label>
                        <label><input type="radio" name="q5" value="No" /> No</label>
                    </div>

                    <div className="question-group">
                        <h2>Would you recommend this training to others?</h2>
                        <label><input type="radio" name="q6" value="Yes" /> Yes</label>
                        <label><input type="radio" name="q6" value="No" /> No</label>
                    </div>

                    {/* Repeat question-group for each question */}

                    <div className="question-group">
                        <h2>Overall Training Rating</h2>
                        <div className="star-rating">
                            <label>★</label>
                            <label>★</label>
                            <label>★</label>
                            <label>★</label>
                            <label>★</label>
                        </div>
                    </div>
                    <div className="question-group">
                        <label>What aspects of the training could be improved?</label>
                        <textarea />
                    </div>
                    <div className="question-group">
                        <label>Other comments?</label>
                        <textarea />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="submit-btn" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TraineeEvaluation;
