import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DataType } from './../../components/Table/Table';
import ViewScheduled from './../../components/ViewScheduled/ViewScheduled';

const HodView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemData } = location.state as { itemData: DataType };

  // Page Padding
  // Flexibility & Separation of Concerns
  const pageStyle: React.CSSProperties = {
    padding: '20px',
  };

  const handleGoBack = () => {
    navigate(-1); // This navigates to the previous page
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'left',
  };
  
  const backButtonStyle: React.CSSProperties = {
    cursor: 'pointer',
    fontSize: '20px',
    color: 'black',
    background: 'none',
    width: '10px',
    marginRight: '20px',
};

const trainingDetails = {
    type: 'External',
    department: 'Management, Finance & HR',
    trainingName: 'Microsoft Office',
    reasons: 'Improve proficiency with office apps',
    date: '29/07/2024',
    personnelInvolved: [
      { employee: 'Alina Tan', id: 'TSH109962', department: 'Machining' },
      { employee: 'Khoo Yong Lee', id: 'TSH113759', department: 'Machining' },
    ],
    status: 'Approved by HR',
};

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <button onClick={handleGoBack} style={backButtonStyle}>
          &lt;
        </button>
        <h1>{itemData.trainingNeed}</h1>
      </header>
      <ViewScheduled {...trainingDetails} />
    </div>
  );
};

export default HodView;