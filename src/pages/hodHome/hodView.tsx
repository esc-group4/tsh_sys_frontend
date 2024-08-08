import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataType } from './../../components/Table/Table';
import ViewScheduled from './../../components/ViewScheduled/ViewScheduled';

interface FetchedData {
  trainingRequest: {
    status: string;
    request_id: number;
    course_name: string;
    type: string;
    date: string;
    reasons: string;
  };
  staff: Array<{
    staff_id: string;
    staff_name: string;
  }>;
}

interface TrainingDetails {
  type: string;
  department: string;
  trainingName: string;
  reasons: string;
  date: string;
  personnelInvolved: Array<{ employee: string; id: string; department: string }>;
  status: string;
}

const HodView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemData } = location.state as { itemData: DataType };

  const [trainingDetails, setTrainingDetails] = useState<TrainingDetails>({
    type: itemData.type || '',
    department: itemData.department || '',
    trainingName: itemData.trainingNeed || '',
    reasons: '',
    date: itemData.date || '',
    personnelInvolved: [],
    status: itemData.status || 'Unable to retrieve',
  });

  useEffect(() => {
    const fetchTrainingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hod/trainingrequest/detail/${itemData.request_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: FetchedData = await response.json();
        
        setTrainingDetails(prevDetails => ({
          ...prevDetails,
          reasons: data.trainingRequest.reasons,
          personnelInvolved: data.staff.map((staff) => ({
            employee: staff.staff_name,
            id: staff.staff_id,
            department: itemData.department || '',
          }))
        }));
      } catch (error) {
        console.error('Error fetching courses: ', error);
      }
    };

    fetchTrainingDetails();
  });

  const pageStyle: React.CSSProperties = {
    padding: '20px',
  };

  const handleGoBack = () => {
    navigate(-1);
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