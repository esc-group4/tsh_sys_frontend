import React from 'react';

export interface EmployeeType {
  key: string;
  employee: string;
  id: string;
  division: string;
  designation: string;
  trainings?: TrainingType[];
}

export interface TrainingType {
  key: string;
  trainingNeed: string;
  date: string;
}

interface MasterlistTableProps {
  data: EmployeeType[];
}

const tableCellStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
  };
  
  const tableHeaderStyle: React.CSSProperties = {
    ...tableCellStyle,
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
  };
  
  const nestedTableCellStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
  };
  
  const employeeRowStyle: React.CSSProperties = {
    backgroundColor: '#add8e6', // Light blue
  };
  
  const trainingItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
  };

const MasterlistTable: React.FC<MasterlistTableProps> = ({ data }) => {
  return (
    <table >
      <thead>
        <tr>
          <th style={{ ...tableHeaderStyle, width: '5%' }}>No.</th>
          <th style={{ ...tableHeaderStyle, width: '25%' }}>Employee</th>
          <th style={{ ...tableHeaderStyle, width: '20%' }}>ID</th>
          <th style={{ ...tableHeaderStyle, width: '25%' }}>Division</th>
          <th style={{ ...tableHeaderStyle, width: '25%' }}>Designation</th>
        </tr>
      </thead>
      <tbody>
        {data.map((employee, index) => (
          <React.Fragment key={employee.key}>
            <tr style={employeeRowStyle}>
              <td style={tableCellStyle}>{index + 1}</td>
              <td style={tableCellStyle}>{employee.employee}</td>
              <td style={tableCellStyle}>{employee.id}</td>
              <td style={tableCellStyle}>{employee.division}</td>
              <td style={tableCellStyle}>{employee.designation}</td>
            </tr>
            {employee.trainings && employee.trainings.length > 0 && (
              <tr>
                <td colSpan={5} style={nestedTableCellStyle}>
                  {employee.trainings.map((training) => (
                    <div key={training.key} style={trainingItemStyle}>
                      <div>{training.trainingNeed}</div>
                      <div>{training.date}</div>
                    </div>
                  ))}
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default MasterlistTable;