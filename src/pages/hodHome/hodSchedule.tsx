import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/UserContext';

interface Employee {
  staff_id: number;
  staff_name: string;
}

interface Course {
  id: number;
  course_name: string;
}

const ErrorPopup: React.FC<{ errors: string[], onClose: () => void }> = ({ errors, onClose }) => {
    return (
      <>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }} onClick={onClose} />
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '80%',
          width: '400px'
        }}>
          <h3 style={{ marginTop: 0 }}>Incomplete Fields</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index} style={{ color: 'red', marginBottom: '8px' }}>{error}</li>
            ))}
          </ul>
          <button 
            onClick={onClose}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </>
    );
};

const SuccessPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
      <>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }} />
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '80%',
          width: '400px'
        }}>
          <h3 style={{ marginTop: 0 }}>Success</h3>
          <p>Training request successfully created!</p>
          <button 
            onClick={onClose}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Okay
          </button>
        </div>
      </>
    );
};

const ScheduleTrainingForm: React.FC = () => {
  const { userData } = useAuth();
  const [isExternal, setIsExternal] = useState(true);
  const [trainerEmail, setTrainerEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [reasons, setReasons] = useState('');
  const [date, setDate] = useState('');
  const [department, setDepartment] = useState('Machining');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/course/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses: ', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await fetch(`http://localhost:8080/staff/all`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const simplifiedEmployees: Employee[] = data.map((emp: any) => ({
          staff_id: emp.staff_id,
          staff_name: emp.staff_name
        }));
        setEmployees(simplifiedEmployees);
      } catch (error) {
        console.error('Error fetching employees: ', error);
      }
    };

    fetchCourses();
    fetchEmployees();
  }, [department]);

  const handleEmployeeSelection = (employeeId: number) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAllToggle = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map(emp => emp.staff_id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!selectedCourse) {
      errors.push("Course selection is required!");
    }
    if (!reasons.trim()) {
      errors.push("Reasons are required!");
    }
    if (!date) {
      errors.push("Date is required!");
    }
    if (selectedEmployees.length === 0) {
      errors.push("At least one personnel must be selected!");
    }
    if (isExternal && !trainerEmail.trim()) {
      errors.push("Trainer's email is required for external training!");
    }

    if (errors.length > 0) {
        setErrorMessages(errors);
        setShowErrorPopup(true);
    } else {
        try {
          const trainingData = {
            type: isExternal ? "External" : "Internal",
            generatedDateTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
            reasons: reasons,
            completedDateTime: "",
            status: 0,
            startDate: new Date().toISOString().replace('T', ' ').slice(0, 19),
            endDate: date,
            trainerEmail: isExternal ? trainerEmail : null,
            department_name: department,
            course_name: selectedCourse,
            staff: selectedEmployees,
            // TODO: personnel: number of personnels
          };
    
          const response = await fetch('http://localhost:8080/TrainingRequest', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(trainingData),
          });
    
          if (!response.ok) {
            throw new Error('Failed to schedule training');
          }
    
          setShowSuccessPopup(true);
        } catch (error) {
          console.error('Error scheduling training: ', error);
          setErrorMessages(['Failed to schedule training. Please try again.']);
          setShowErrorPopup(true);
        }
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // Styles
  const containerStyle: React.CSSProperties = { 
    maxWidth: '450px',
    margin: '0 auto',
    padding: '20px',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'left',
    marginBottom: '20px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  };

  const backButtonStyle: React.CSSProperties = { 
    background: 'none',
    color: 'black',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '0',
    marginRight: '10px',
    marginTop: '2px',
    width: '30px',
  };

  const h1Style: React.CSSProperties = { 
    margin: '0',
    fontSize: '24px',
  };

  const departmentStyle: React.CSSProperties = { 
    margin: '0',
  };

  const typeContainerStyle: React.CSSProperties = { 
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '4px',
    padding: '15px',
    marginBottom: '20px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  };

  const checkboxLabelStyle: React.CSSProperties = { 
    marginRight: '15px',
  };

  const checkboxStyle: React.CSSProperties = { 
    marginRight: '5px',
  };

  const emailFieldStyle: React.CSSProperties = { 
    marginTop: isExternal ? '10px' : '0',
    transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out, margin-top 0.3s ease-out',
    maxHeight: isExternal ? '100px' : '0',
    opacity: isExternal ? 1 : 0,
    overflow: 'hidden',
  };

  const formGroupStyle: React.CSSProperties = { 
    marginBottom: '20px',
  };

  const inputStyle: React.CSSProperties = { 
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    height: 'auto',
    minHeight: '35px',
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const personnelHeaderStyle: React.CSSProperties = { 
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  };

  const selectAllButtonStyle: React.CSSProperties = { 
    background: 'none',
    color: '#007bff',
    cursor: 'pointer',
    padding: 0,
    fontSize: '14px',
    width: '80px',
    textAlign: 'right',
  };

  const submitButtonStyle: React.CSSProperties = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    cursor: 'pointer',
    width: '100%',
    borderRadius: '4px',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <button onClick={handleBackClick} style={backButtonStyle}>←</button>
        <div>
          <h1 style={h1Style}>Schedule Training</h1>
          <p style={departmentStyle}>{department}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={typeContainerStyle}>
          <div>
            <label style={labelStyle}>Type</label>
            <div>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={isExternal}
                  onChange={() => setIsExternal(true)}
                  style={checkboxStyle}
                />
                External
              </label>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={!isExternal}
                  onChange={() => setIsExternal(false)}
                  style={checkboxStyle}
                />
                Internal
              </label>
            </div>
          </div>

          <div style={emailFieldStyle}>
            <label style={labelStyle}>Trainer's Email</label>
            <input
              type="email"
              value={trainerEmail}
              onChange={(e) => setTrainerEmail(e.target.value)}
              placeholder="Enter trainer's email address"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Courses</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={selectStyle}
          >
            <option value="">Select a course...</option>
            {courses.map((course) => (
              <option key={course.id} value={course.course_name}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Reasons</label>
          <textarea
            value={reasons}
            onChange={(e) => setReasons(e.target.value)}
            placeholder="Enter reason for the training..."
            style={{...inputStyle, height: '100px'}}
          />
        </div>

        <div style={formGroupStyle}>
          <div style={personnelHeaderStyle}>
            <label style={labelStyle}>Personnel Involved</label>
            <button 
              type="button" 
              onClick={handleSelectAllToggle} 
              style={selectAllButtonStyle}
            >
              {selectedEmployees.length === employees.length ? 'Unselect All' : 'Select All'}
            </button>
          </div>
          {employees.map((employee) => (
            <div key={employee.staff_id} style={{ marginBottom: '8px' }}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(employee.staff_id)}
                  onChange={() => handleEmployeeSelection(employee.staff_id)}
                  style={checkboxStyle}
                />
                {employee.staff_name} (ID: {employee.staff_id})
              </label>
            </div>
          ))}
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={submitButtonStyle}>Submit</button>
      </form>
      {showErrorPopup && (
        <ErrorPopup 
          errors={errorMessages} 
          onClose={() => setShowErrorPopup(false)} 
        />
      )}
      {showSuccessPopup && (
        <SuccessPopup 
            onClose={() => {
            setShowSuccessPopup(false);
            navigate(-1);
            }} 
        />
      )}
    </div>
  );
};

export default ScheduleTrainingForm;