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

    const fetchTrainingRequests = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hod/trainingrequest/${department}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

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
        console.error('Error fetching training requests: ', error);
      }
    };

    const fetchEmployeesTrainingData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/staff/${department}/all`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const employees = await response.json();

        const employeeDataPromises = employees.map((employee: any, empIndex: number) =>
          new Promise(async (resolve) => {
            try {
              const trainingResponse = await fetch(`http://localhost:8080/course/staff/${employee.staff_id}`);
              if (!trainingResponse.ok) {
                throw new Error(`Network response was not ok for staff ${employee.staff_id}`);
              }
              const trainings = await trainingResponse.json();

              const completedTrainings = trainings.filter((training: any) => training.completedDateTime !== null);
              const employeeData = {
                key: (empIndex + 1).toString(),
                employee: employee.staff_name,
                id: employee.staff_id.toString(),
                division: "null", // Unsure where to get this
                designation: employee.position,
                trainings: completedTrainings.map((training: any, trainIndex: number) => ({
                  key: (trainIndex + 1).toString(),
                  trainingNeed: training.course_name,
                  date: new Date(training.startDate).toLocaleDateString(),
                })),
              };

              // Delay for 200ms before resolving the promise
              setTimeout(() => resolve(employeeData), 200);
            } catch (error) {
              console.error(`Error fetching trainings for staff ${employee.staff_id}: `, error);
              resolve(null); // Resolve with null in case of error
            }
          })
        );

        const resolvedEmployeeData = await Promise.all(employeeDataPromises);
        setEmployeeData(resolvedEmployeeData.filter((emp) => emp !== null)); // Filter out any null values
      } catch (error) {
        console.error('Error fetching employees training data: ', error);
      }
    };
    
    fetchTrainingRequests();
    fetchEmployeesTrainingData();
  }, [department]);

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
    maxWidth: '100%',
    display: 'inline-block',
  };

  const approvedHeadingStyle: React.CSSProperties = {
    ...headingContainerStyle,
    backgroundColor: '#d1e7dd',
  };

  const pendingHeadingStyle: React.CSSProperties = {
    ...headingContainerStyle,
    backgroundColor: '#f8d7da',
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
