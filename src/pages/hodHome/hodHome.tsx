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
  const [rejectedData, setRejectedData] = useState<DataType[]>([]);
  const [employeeData, setEmployeeData] = useState<EmployeeType[]>([]);

  useEffect(() => {
    if (userData) {
      setDepartment(userData.department_name);
    }
  }, [userData]);

  useEffect(() => {
    if (!department) return;

    const fetchTrainingRequests = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hod/trainingrequest/${department}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const approved = data
          .filter((item: any) => item.status === 'Approved')
          .map((item: any, index: number) => ({
            key: (index + 1).toString(),
            request_id: item.request_id.toString(),
            trainingNeed: item.course_name,
            type: item.type,
            date: new Date(item.date).toLocaleDateString(),
            personnel: item.personnel,
            status: item.status,
            department: department,
          }));

        const pending = data
          .filter((item: any) => item.status === 'Pending')
          .map((item: any, index: number) => ({
            key: (index + 1).toString(),
            request_id: item.request_id.toString(),
            trainingNeed: item.course_name,
            type: item.type,
            date: new Date(item.date).toLocaleDateString(),
            personnel: item.personnel,
            status: item.status,
            department: department,
          }));

        const rejected = data
          .filter((item: any) => item.status === 'Rejected')
          .map((item: any, index: number) => ({
            key: (index + 1).toString(),
            request_id: item.request_id.toString(),
            trainingNeed: item.course_name,
            type: item.type,
            date: new Date(item.date).toLocaleDateString(),
            personnel: item.personnel,
            status: item.status,
            department: department,
          }));

        setApprovedData(approved);
        setPendingData(pending);
        setRejectedData(rejected);
      } catch (error) {
        console.error('Error fetching courses: ', error);
      }
    };

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

          const completedTrainings = trainings.filter((training: any) => training.grade !== null);
          const trainingData = completedTrainings.length > 0
            ? completedTrainings.map((training: any, trainIndex: number) => ({
                key: (trainIndex + 1).toString(),
                trainingNeed: training.course_name,
                date: training.completedDateTime? new Date(training.completedDateTime).toLocaleDateString() : "No recorded date",
              }))
            : [{
                key: '1',
                trainingNeed: <i>No training completed yet</i>,
                date: ''
              }];

          return {
            key: (empIndex + 1).toString(),
            employee: employee.staff_name,
            id: employee.staff_id.toString(),
            division: "null", // unsure where to get this
            designation: employee.position,
            trainings: trainingData,
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

  const pageStyle: React.CSSProperties = {
    padding: '20px',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'background-color 0.3s',
    marginBottom: '20px',
    fontWeight: 'bold',
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
    maxWidth: '100%',
    display: 'inline-block',
  };

  const approvedHeadingStyle: React.CSSProperties = {
    ...headingContainerStyle,
    backgroundColor: '#d1e7dd', // Light green
  };

  const pendingHeadingStyle: React.CSSProperties = {
    ...headingContainerStyle,
    backgroundColor: '#ffe5d9', // Light orange
  };

  const rejectedHeadingStyle: React.CSSProperties = {
    ...headingContainerStyle,
    backgroundColor: '#f8d7da', // Light red
  };
  
  return (
    <div style={pageStyle}>
      <Link to="/hodSchedule" style={buttonStyle}>Create a Training Request</Link>
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
          <div style={tableSectionStyle}>
            <div style={rejectedHeadingStyle}>
              <h1 style={headerStyle}>Rejected</h1>
            </div>
            <SimpleTable data={rejectedData} viewRoute='hodView' />
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