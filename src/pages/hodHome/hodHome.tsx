// hodHome.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleTable, { DataType } from './../../components/Table/Table';
import MasterlistTable, { EmployeeType } from './../../components/Table/masterlistTable';

const HodHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scheduledTrainings');

  const approvedData: DataType[] = [
    {
      key: '1',
      trainingNeed: 'Microsoft Office',
      type: 'External',
      date: '20/07/2024',
      personnel: 17,
    },
    {
      key: '2',
      trainingNeed: 'ERP',
      type: 'Internal',
      date: '31/07/2024',
      personnel: 10,
    },
    {
      key: '3',
      trainingNeed: 'Product Handling',
      type: 'Internal',
      date: '02/08/2024',
      personnel: 13,
    },
  ];

  const pendingData: DataType[] = [
    {
      key: '1',
      trainingNeed: 'Quality Awareness',
      type: 'External',
      date: '21/11/2024',
      personnel: 21,
    },
    {
      key: '2',
      trainingNeed: 'Tools (Jig Fixtures)',
      type: 'Internal',
      date: '29/11/2024',
      personnel: 19,
    },
    {
      key: '3',
      trainingNeed: 'Hand Tools (Pneumatic)',
      type: 'Internal',
      date: '12/12/2024',
      personnel: 23,
    },
  ];

  const employeeData: EmployeeType[] = [
    { key: '1', employee: 'Khoo Yong Lee', id: 'TSH113759', division: 'Production', designation: 'MES Planner', trainings: [
      { key: '1', trainingNeed: '5S Training', date: '09/09/2024' },
      { key: '2', trainingNeed: 'Safety', date: '13/10/2024' },
      { key: '3', trainingNeed: 'Kaizen', date: '19/11/2024' },
    ]},
    { key: '2', employee: 'Alina Tan', id: 'TSH109962', division: 'Production', designation: 'Assistant', trainings: [
      { key: '1', trainingNeed: 'Counterfeit', date: '09/09/2024' },
      { key: '2', trainingNeed: 'Safety', date: '13/10/2024' },
      { key: '3', trainingNeed: 'CI & IP', date: '19/11/2024' },
    ]},
    { key: '3', employee: 'Ernest Wong', id: 'TSH108972', division: 'Production', designation: 'Leader', trainings: [
      { key: '1', trainingNeed: '5S Training', date: '09/09/2024' },
      { key: '2', trainingNeed: 'Tools', date: '13/10/2024' },
      { key: '3', trainingNeed: 'Kaizen', date: '19/11/2024' },
    ]},
    { key: '4', employee: 'Fery James', id: 'TSH109698', division: 'Production', designation: 'Material Lead', trainings: [
      { key: '1', trainingNeed: '5S Training', date: '09/09/2024' },
      { key: '2', trainingNeed: 'Safety', date: '13/10/2024' },
      { key: '3', trainingNeed: 'Quality Control', date: '19/11/2024' },
    ]},
    { key: '5', employee: 'Alina Tan', id: 'TSH109962', division: 'Production', designation: 'Assistant', trainings: [
      { key: '1', trainingNeed: 'Counterfeit', date: '09/09/2024' },
      { key: '2', trainingNeed: 'Safety', date: '13/10/2024' },
      { key: '3', trainingNeed: 'CI & IP', date: '19/11/2024' },
    ]},
  ];

  // Page Padding
  // Flexibility & Separation of Concerns
  const pageStyle: React.CSSProperties = {
    padding: '20px',
  };

  const linkStyle: React.CSSProperties = {
    color: '#333',
    padding: '8px 12px',
    display: 'inline-block',
    transition: 'background-color 0.3s',
    marginBottom: '20px',
  };

  const headerStyle: React.CSSProperties = { 
    fontSize: '16px',
    margin: 0,
  };

  const tableSectionStyle: React.CSSProperties = {
    marginBottom: '40px',
  };

  const tabStyle: React.CSSProperties = {
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    transition: 'border-bottom 0.3s',
  };

  const activeTabStyle: React.CSSProperties = {
    ...tabStyle,
    borderBottom: '2px solid #333',
  };

  const headingContainerStyle: React.CSSProperties = {
    borderRadius: '8px',
    padding: '10px 20px',
    marginBottom: '20px',
    maxWidth: '100%', // Allow the container to adjust based on content
    display: 'inline-block', // Adjust width based on content
  };

  const approvedHeadingStyle: React.CSSProperties = {
    ...headingContainerStyle,
    backgroundColor: '#d1e7dd', // Light green
  };

  const pendingHeadingStyle: React.CSSProperties = {
    ...headingContainerStyle,
    backgroundColor: '#f8d7da', // Light red
  };
  
  return (
    <div style={pageStyle}>
      <Link to="/hodschedule" style={linkStyle}>Create a Training Request</Link>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div 
          style={activeTab === 'scheduledTrainings' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('scheduledTrainings')}
        >
          Scheduled Trainings
        </div>
        <div 
          style={activeTab === 'masterlist' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('masterlist')}
        >
          Training Masterlist
        </div>
      </div>
      {activeTab === 'scheduledTrainings' && (
        <>
          <div style={tableSectionStyle}>
            <div style={approvedHeadingStyle}>
              <h1 style={headerStyle}>Approved</h1>
            </div>
            <SimpleTable data={approvedData} viewRoute='hodView' />
          </div>
          <div style={tableSectionStyle}>
            <div style={pendingHeadingStyle}>
              <h1 style={headerStyle}>Pending Approval</h1>
            </div>
            <SimpleTable data={pendingData} viewRoute='hodView' />
          </div>
        </>
      )}
      {activeTab === 'masterlist' && (
        <div style={tableSectionStyle}>
            <MasterlistTable data={employeeData} />
      </div>
      )}
    </div>
  );
};

export default HodHome;