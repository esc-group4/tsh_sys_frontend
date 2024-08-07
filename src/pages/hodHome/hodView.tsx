import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DataType } from './../../components/Table/Table';
import ViewScheduled from './../../components/ViewScheduled/ViewScheduled';

const HodView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemData } = location.state as { itemData: DataType };

  useEffect(() => {
    console.log(itemData.request_id)


    // TODO: Get Training Details
    const fetchTrainingDetails = async () => {
      try {
        const response = await fetch('http://localhost:8080/hod/trainingrequest/detail/${itemData.key}');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        //setTrainingDetails();
      } catch (error) {
        console.error('Error fetching courses: ', error);
      }
    };

    fetchTrainingDetails();
  });

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
  type: itemData.type,
  department: itemData.department || 'Unable to retrieve',
  trainingName: itemData.trainingNeed,
  reasons: 'Improve proficiency with office apps', /* IMPORTANT: NEED TO RETRIEVE INFORMATION FROM DATABASE */
  date: itemData.date,
  personnelInvolved: [ /* IMPORTANT: NEED TO RETRIEVE INFORMATION FROM DATABASE */
    { employee: 'Alina Tan', id: 'TSH109962', department: 'Machining' },
    { employee: 'Khoo Yong Lee', id: 'TSH113759', department: 'Machining' },
  ],
  status: itemData.status || 'Unable to retrieve',
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