import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataType } from './../../components/Table/Table';
import ViewScheduled from './../../components/ViewScheduled/ViewScheduled';

const SuccessPopup: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
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
          <p>{message}</p>
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

const RescheduleComponent: React.FC<{ onConfirm: (date: string) => void }> = ({ onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle: React.CSSProperties = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#dc3545',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={containerStyle}>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
        style={inputStyle}
      />
      {selectedDate && (
        <button 
          onClick={() => onConfirm(selectedDate)}
          style={buttonStyle}
        >
          Confirm
        </button>
      )}
    </div>
  );
};

const HrView: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { itemData } = location.state as { itemData: DataType };
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isRescheduled, setIsRescheduled] = useState(false);
  
    const pageStyle: React.CSSProperties = {
      padding: '20px',
    };
  
    const handleGoBack = () => {
      navigate(-1);
    };
  
    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
    };
  
    const backButtonStyle: React.CSSProperties = {
      cursor: 'pointer',
      fontSize: '20px',
      color: 'black',
      background: 'none',
      border: 'none',
      width: '10px',
      marginRight: '20px',
    };
  
    const actionButtonStyle: React.CSSProperties = {
      padding: '10px 20px',
      margin: '0 10px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px',
      color: 'white',
      fontWeight: 'bold',
    };
  
    const handleApprove = () => {
      console.log('Training approved!');
      setSuccessMessage('Training Request Approved!');
      setShowSuccessPopup(true);
    };
  
    const handleReject = () => {
      console.log('Training rejected!');
      setSuccessMessage('Training Request Rejected!');
      setShowSuccessPopup(true);
    };
  
    const handleReschedule = () => {
      setShowDatePicker(true);
    };

    const handleConfirmReschedule = (date: string) => {
      console.log('Rescheduling training for:', date);
      setSuccessMessage('Rescheduling Successful');
      setShowSuccessPopup(true);
      setShowDatePicker(false);
      setIsRescheduled(true);
    };
  
    interface PersonnelBase {
        employee: string;
        id: string;
        department: string;
    }
      
    interface PersonnelWithStatus extends PersonnelBase {
        status: string;
    }
      
    type Personnel = PersonnelBase | PersonnelWithStatus;
      
    const trainingDetails = {
        type: itemData.type,
        department: itemData.department || 'Unable to retrieve',
        trainingName: itemData.trainingNeed,
        reasons: itemData.status === 'Completed' 
          ? 'Mandatory safety training for all personnel' 
          : 'Improve proficiency with office apps',
        date: itemData.date,
        personnelInvolved: itemData.status === 'Completed' 
          ? [
              { employee: 'Alina Tan', id: 'TSH109962', department: 'Machining', status: 'Completed' },
              { employee: 'Khoo Yong Lee', id: 'TSH113759', department: 'Machining', status: 'Evaluation' },
              { employee: 'Rosaline Fernando', id: 'TSH110621', department: 'Machining', status: 'Evaluation' },
              { employee: 'Samantha Wong', id: 'TSH138397', department: 'Machining', status: 'Completed' },
              { employee: 'Alina Tan', id: 'TSH109962', department: 'Machining', status: 'Absent' },
            ] as PersonnelWithStatus[]
          : [
              { employee: 'Alina Tan', id: 'TSH109962', department: 'Machining' },
              { employee: 'Khoo Yong Lee', id: 'TSH113759', department: 'Machining' },
            ] as PersonnelBase[],
        status: itemData.status || 'Unable to retrieve',
    };
      
    const hasAbsentEmployees = itemData.status === 'Completed' && 
        (trainingDetails.personnelInvolved as PersonnelWithStatus[]).some(person => person.status === 'Absent');      
    
    return (
        <div style={pageStyle}>
          <header style={headerStyle}>
            <button onClick={handleGoBack} style={backButtonStyle}>
              &lt;
            </button>
            <h1>{itemData.trainingNeed}</h1>
          </header>
          <ViewScheduled {...trainingDetails} isHrView={true} />
          {itemData.status === 'Pending' && (
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <button 
                onClick={handleApprove} 
                style={{...actionButtonStyle, backgroundColor: 'green'}}
              >
                Approve
              </button>
              <button 
                onClick={handleReject} 
                style={{...actionButtonStyle, backgroundColor: 'red'}}
              >
                Reject
              </button>
            </div>
          )}
          {itemData.status === 'Completed' && hasAbsentEmployees && !showDatePicker && !isRescheduled && (
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <button 
                onClick={handleReschedule} 
                style={{...actionButtonStyle, backgroundColor: '#007bff'}}
              >
                Reschedule
              </button>
            </div>
          )}
          {showDatePicker && (
            <RescheduleComponent onConfirm={handleConfirmReschedule} />
          )}
          {showSuccessPopup && (
            <SuccessPopup 
                message={successMessage}
                onClose={() => {
                  setShowSuccessPopup(false);
                  navigate(-1);
                }} 
            />
          )}
        </div>
    );
};
    
export default HrView;