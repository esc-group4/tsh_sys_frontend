// hodHome.tsx
import React, { useEffect, useState } from 'react';
import SimpleTable, { DataType } from './../../components/Table/Table';
import MasterlistTable, { EmployeeType } from './../../components/Table/masterlistTable';

const HrHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scheduledTrainings');
  const [trainingData, setTrainingData] = useState<DataType[]>([]);
  const [employeeData, setEmployeeData] = useState<EmployeeType[]>([]);

  useEffect(() => {
    const fetchTrainingRequests = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hr/trainingrequest/all`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const mappedData: DataType[] = data.map((item: any, index: number) => ({
          key: (index + 1).toString(),
          trainingNeed: item.course_name,
          type: item.type,
          date: new Date(item.date).toLocaleDateString('en-GB'), // Convert to DD/MM/YYYY format
          personnel: item.personnel,
          department: item.department_name,
          status: item.status,
          request_id: item.request_id,
        }));
        setTrainingData(mappedData);
      } catch (error) {
        console.error('Error fetching courses: ', error);
      }
    };

    // TODO: Get all employees within department and all their attributes
    const fetchEmployeesTrainingData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/staff/all`);
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
  }, []);

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
  
  return (
    <div style={pageStyle}>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div 
          style={activeTab === 'scheduledTrainings' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('scheduledTrainings')}
        >
          Trainings
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
            <SimpleTable data={trainingData} showAdditionalColumns={true} viewRoute='hrView' />
          </div>
        </>
      )}
      {activeTab === 'masterlist' && (
        <div style={tableSectionStyle}>
            <MasterlistTable data={employeeData} showDepartment={true} />
      </div>
      )}
    </div>
  );
};

export default HrHome;