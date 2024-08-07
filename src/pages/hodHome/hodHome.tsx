// hodHome.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleTable, { DataType } from './../../components/Table/Table';
import MasterlistTable, { EmployeeType } from './../../components/Table/masterlistTable';
import { useAuth } from '../../contexts/UserContext';

const HodHome: React.FC = () => {
  const { userData } = useAuth();
  const [department, setDepartment] = useState('');
  const [activeTab, setActiveTab] = useState('scheduledTrainings');
  const [approvedData, setApprovedData] = useState<DataType[]>([]);
  const [pendingData, setPendingData] = useState<DataType[]>([]);
  const [employeeData, setEmployeeData] = useState<EmployeeType[]>([]);

  useEffect(() => {
    if (userData) {
      setDepartment(userData.department_name);
    }
  }, [userData]);

  useEffect(() => {
    if (!department) return;

    // TODO: Get "ApprovedTrainingRequests"
    const fetchTrainingRequests = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hod/trainingrequest/${department}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Filter the data based on status
        const approved = data
          .filter((item: any) => item.status === 'Approved')
          .map((item: any) => ({
            key: item.request_id.toString(),
            trainingNeed: item.course_name,
            type: item.type,
            date: new Date(item.date).toLocaleDateString(),
            personnel: item.personnel,
          }));

        const pending = data
          .filter((item: any) => item.status === 'Pending')
          .map((item: any) => ({
            key: item.request_id.toString(),
            trainingNeed: item.course_name,
            type: item.type,
            date: new Date(item.date).toLocaleDateString(),
            personnel: item.personnel,
          }));

        setApprovedData(approved);
        setPendingData(pending);
      } catch (error) {
        console.error('Error fetching courses: ', error);
      }
    };

    // TODO: Get all employees within department and all their attributes
    const fetchEmployeesTrainingData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/staff/${department}/all`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const employees = await response.json();

        const employeeTrainingPromises = employees.map(async (employee: any, empIndex: number) => {
          const trainingResponse = await fetch(`http://localhost:8080/course/staff/${employee.staff_id}`);
          if (!trainingResponse.ok) {
            throw new Error('Network response was not ok');
          }
          const trainings = await trainingResponse.json();

          const completedTrainings = trainings.filter((training: any) => training.completedDateTime !== null);
          return {
            key: (empIndex + 1).toString(),
            employee: employee.staff_name,
            id: employee.staff_id.toString(),
            division: "null", // unsure where to get this
            designation: "null", // this is gettable
            trainings: completedTrainings.map((training: any, trainIndex: number) => ({
              key: (trainIndex + 1).toString(),
              trainingNeed: training.course_name,
              date: new Date(training.startDate).toLocaleDateString(),
            })),
          };
        });

        const resolvedEmployeeData = await Promise.all(employeeTrainingPromises);
        setEmployeeData(resolvedEmployeeData);
      } catch (error) {
        console.error('Error fetching courses: ', error);
      }
    };

    fetchTrainingRequests();
    fetchEmployeesTrainingData();
  }, [department]);

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
      <Link to="/hodSchedule" style={linkStyle}>Create a Training Request</Link>
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