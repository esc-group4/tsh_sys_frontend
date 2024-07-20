// hodHome.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import SimpleTable, { DataType } from './../../components/Table/Table';

const HodHome: React.FC = () => {
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

  // Page Padding
  // Flexibility & Separation of Concerns
  const pageStyle: React.CSSProperties = {
    padding: '20px',
  };

  const navStyle: React.CSSProperties = {
    display: 'inline-flex',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
  };

  const linkStyle: React.CSSProperties = {
    color: '#333',
    textDecoration: 'none',
    padding: '8px 12px',
    display: 'inline-block',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={pageStyle}>
      <nav style={navStyle}>
        <Link to="/hodschedule" style={linkStyle}>Schedule</Link>
      </nav>
      <h1>Approved Scheduled Trainings</h1>
      <SimpleTable data={approvedData} />
      <h1>Pending Approval Trainings</h1>
      <SimpleTable data={pendingData} />
    </div>
  );
};

export default HodHome;