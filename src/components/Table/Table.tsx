import React from 'react';
import { Link } from 'react-router-dom';

export interface DataType {
  key: string;
  trainingNeed: string;
  request_id: string;
  type: string;
  date: string;
  personnel: number;
  status?: 'Completed' | 'Pending' | 'Approved'; /* ? for optional */
  department?: string;
}

interface SimpleTableProps {
  data: DataType[];
  showAdditionalColumns?: boolean;
  viewRoute: 'hodView' | 'hrView';
}

const SimpleTable: React.FC<SimpleTableProps> = ({ data, showAdditionalColumns = false, viewRoute }) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'Pending':
        return 'red';
      case 'Approved':
        return '#CC9900'; // Darker yellow (goldish color)  
      default:
        return 'black';
    }
  };

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{...tableHeaderStyle, width: '5%'}}>No.</th>
          <th style={{...tableHeaderStyle, width: showAdditionalColumns ? '20%' : '45%'}}>Training Need</th>
          {showAdditionalColumns && (
            <>
              <th style={{...tableHeaderStyle, width: '10%'}}>Status</th>
              <th style={{...tableHeaderStyle, width: '15%'}}>Department</th>
            </>
          )}
          <th style={{...tableHeaderStyle, width: '15%'}}>Type</th>
          <th style={{...tableHeaderStyle, width: '15%'}}>Date</th>
          <th style={{...tableHeaderStyle, width: '10%'}}>Personnel</th>
          <th style={{...tableHeaderStyle, width: '5%'}}></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.key}>
            <td style={tableCellStyle}>{item.key}</td>
            <td style={tableCellStyle}>{item.trainingNeed}</td>
            {showAdditionalColumns && (
              <>
                <td style={{...tableCellStyle, color: getStatusColor(item.status || '')}}>{item.status}</td>
                <td style={tableCellStyle}>{item.department}</td>
              </>
            )}
            <td style={tableCellStyle}>{item.type}</td>
            <td style={tableCellStyle}>{item.date}</td>
            <td style={tableCellStyle}>{item.personnel}</td>
            <td style={arrowCellStyle}>
              <Link
                to={`/${viewRoute}`}
                state={{ itemData: item }}
                style={{ ...arrowButtonStyle }}
              >
                &gt;
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const tableCellStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
};

const tableHeaderStyle: React.CSSProperties = {
  ...tableCellStyle,
  backgroundColor: '#f2f2f2',
  textAlign: 'left'
};

const arrowCellStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  width: '40px'
}

const arrowButtonStyle: React.CSSProperties = {
  cursor: 'pointer',
  fontSize: '20px',
  color: 'black',
  background: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textDecoration: 'none',
};

export default SimpleTable;