import React, { useEffect, useState } from 'react';
import SimpleTable, { DataType } from './../../components/Table/Table';
import MasterlistTable, { EmployeeType } from './../../components/Table/masterlistTable';

const HrHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scheduledTrainings');
  const [actionRequiredData, setActionRequiredData] = useState<DataType[]>([]);
  const [othersData, setOthersData] = useState<DataType[]>([]);
  const [employeeData, setEmployeeData] = useState<EmployeeType[]>([]);
  const [filteredEmployeeData, setFilteredEmployeeData] = useState<EmployeeType[]>([]);
  const [isActionRequiredExpanded, setIsActionRequiredExpanded] = useState(true);
  const [isOthersExpanded, setIsOthersExpanded] = useState(true);
  const [nameOrIdFilter, setNameOrIdFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [departments, setDepartments] = useState<string[]>([]);

  useEffect(() => {
    const fetchTrainingRequests = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hr/trainingrequest/all`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const actionRequired = data.filter((item: any) => item.status === 'Pending' || item.status === 'Completed');
        const others = data.filter((item: any) => item.status === 'Approved' || item.status === 'Rejected');
        
        setActionRequiredData(actionRequired.map((item: any, index: number) => ({
          ...item,
          key: (index + 1).toString(),
          trainingNeed: item.course_name,
          type: item.type,
          date: new Date(item.date).toLocaleDateString('en-GB'),
          personnel: item.personnel,
          department: item.department_name,
          status: item.status,
          request_id: item.request_id,
        })));

        setOthersData(others.map((item: any, index: number) => ({
          ...item,
          key: (index + 1).toString(),
          trainingNeed: item.course_name,
          type: item.type,
          date: new Date(item.date).toLocaleDateString('en-GB'),
          personnel: item.personnel,
          department: item.department_name,
          status: item.status,
          request_id: item.request_id,
        })));
      } catch (error) {
        console.error('Error fetching courses: ', error);
      }
    };

    const fetchEmployeesTrainingData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/staff/all`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const employees = await response.json();

        const employeeTrainingPromises = employees.map(async (employee: any, empIndex: number) => {
          const [trainingResponse, designationResponse] = await Promise.all([
            fetch(`http://localhost:8080/course/staff/${employee.staff_id}`),
            fetch(`http://localhost:8080/designation/${employee.designation_id}`)
          ]);

          if (!trainingResponse.ok || !designationResponse.ok) {
            throw new Error('Network response was not ok');
          }

          const [trainings, designation] = await Promise.all([
            trainingResponse.json(),
            designationResponse.json()
          ]);

          const completedTrainings = trainings.filter((training: any) => training.grade !== null);
          const trainingData = completedTrainings.length > 0
            ? completedTrainings.map((training: any, trainIndex: number) => ({
                key: (trainIndex + 1).toString(),
                trainingNeed: training.course_name,
                date: training.completedDateTime ? new Date(training.completedDateTime).toLocaleDateString() : "No recorded date",
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
            division: "null", // unsure of where to get
            department: "null", // unsure of where to get
            designation: designation.position,
            trainings: trainingData,
          };
        });

        const resolvedEmployeeData = await Promise.all(employeeTrainingPromises);
        setEmployeeData(resolvedEmployeeData);
        setFilteredEmployeeData(resolvedEmployeeData);

        const uniqueDepartments = Array.from(new Set(resolvedEmployeeData.map(emp => emp.department)));
        setDepartments(uniqueDepartments);
      } catch (error) {
        console.error('Error fetching employee data: ', error);
      }
    };

    fetchTrainingRequests();
    fetchEmployeesTrainingData();
  }, []);

  useEffect(() => {
    const filteredData = employeeData.filter(employee => 
      (employee.employee.toLowerCase().includes(nameOrIdFilter.toLowerCase()) ||
       employee.id.includes(nameOrIdFilter)) &&
      (departmentFilter === '' || employee.department === departmentFilter)
    );
    setFilteredEmployeeData(filteredData);
  }, [employeeData, nameOrIdFilter, departmentFilter]);

  const pageStyle: React.CSSProperties = {
    padding: '20px',
  };

  const headerStyle: React.CSSProperties = { 
    fontSize: '18px',
    margin: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const tableSectionStyle: React.CSSProperties = {
    marginBottom: '20px',
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
    marginBottom: '10px',
    maxWidth: '100%',
  };

  const actionRequiredHeadingStyle: React.CSSProperties = {
    ...headingContainerStyle,
    backgroundColor: '#ffcccb', // Light red
  };

  const othersHeadingStyle: React.CSSProperties = {
    ...headingContainerStyle,
    backgroundColor: '#f0f0f0', // Light gray
    marginTop: '30px', // Added more top margin
  };

  const inputStyle: React.CSSProperties = {
    marginRight: '10px',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px', // Reduced font size
  };

  const radioButtonStyle: React.CSSProperties = {
    marginRight: '15px',
    fontSize: '14px', // Reduced font size
  };

  const radioInputStyle: React.CSSProperties = {
    marginRight: '5px', // Added spacing between radio button and text
  };

  const departmentLabelStyle: React.CSSProperties = {
    marginTop: '15px', // Added padding above Department label
    marginBottom: '5px',
    fontSize: '14px', // Reduced font size
    fontWeight: 'bold',
  };

  const toggleSection = (section: 'actionRequired' | 'others') => {
    if (section === 'actionRequired') {
      setIsActionRequiredExpanded(!isActionRequiredExpanded);
    } else {
      setIsOthersExpanded(!isOthersExpanded);
    }
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
            <div style={actionRequiredHeadingStyle} onClick={() => toggleSection('actionRequired')}>
              <h1 style={headerStyle}>
                Action Required ({actionRequiredData.length})
                <span>{isActionRequiredExpanded ? '▲' : '▼'}</span>
              </h1>
            </div>
            {isActionRequiredExpanded && (
              <SimpleTable data={actionRequiredData} showAdditionalColumns={true} viewRoute='hrView' />
            )}
          </div>
          <div style={tableSectionStyle}>
            <div style={othersHeadingStyle} onClick={() => toggleSection('others')}>
              <h1 style={headerStyle}>
                Others ({othersData.length})
                <span>{isOthersExpanded ? '▲' : '▼'}</span>
              </h1>
            </div>
            {isOthersExpanded && (
              <SimpleTable data={othersData} showAdditionalColumns={true} viewRoute='hrView' />
            )}
          </div>
        </>
      )}
      {activeTab === 'masterlist' && (
        <div style={tableSectionStyle}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Filter by name or ID"
              value={nameOrIdFilter}
              onChange={(e) => setNameOrIdFilter(e.target.value)}
              style={inputStyle}
            />
            <div style={departmentLabelStyle}>Department:</div>
            <div>
              {departments.map(department => (
                <label key={department} style={radioButtonStyle}>
                  <input
                    type="radio"
                    name="department"
                    value={department}
                    checked={departmentFilter === department}
                    onChange={() => setDepartmentFilter(department)}
                    style={radioInputStyle}
                  />
                  {department}
                </label>
              ))}
              <label style={radioButtonStyle}>
                <input
                  type="radio"
                  name="department"
                  value=""
                  checked={departmentFilter === ''}
                  onChange={() => setDepartmentFilter('')}
                  style={radioInputStyle}
                />
                All
              </label>
            </div>
          </div>
          <MasterlistTable data={filteredEmployeeData} showDepartment={true} />
        </div>
      )}
    </div>
  );
};

export default HrHome;