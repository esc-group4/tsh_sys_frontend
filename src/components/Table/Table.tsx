import React from 'react';
import { Link } from 'react-router-dom';

export interface DataType {
  key: string;
  trainingNeed: string;
  type: string;
  date: string;
  personnel: number;
}

interface SimpleTableProps {
  data: DataType[];
}

const SimpleTable: React.FC<SimpleTableProps> = ({ data }) => {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
            <th style={{...tableHeaderStyle, width: '5%'}}>No.</th>
            <th style={{...tableHeaderStyle, width: '45%'}}>Training Need</th>
            <th style={{...tableHeaderStyle, width: '15%'}}>Type</th>
            <th style={{...tableHeaderStyle, width: '15%'}}>Date</th>
            <th style={{...tableHeaderStyle, width: '15%'}}>Personnel</th>
            <th style={{...tableHeaderStyle, width: '5%'}}></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.key}>
            <td style={tableCellStyle}>{item.key}</td>
            <td style={tableCellStyle}>{item.trainingNeed}</td>
            <td style={tableCellStyle}>{item.type}</td>
            <td style={tableCellStyle}>{item.date}</td>
            <td style={tableCellStyle}>{item.personnel}</td>
            <td style={arrowCellStyle}>
              <Link
                to="/hodView"
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
    width: '40px' // fixed
}

const arrowButtonStyle: React.CSSProperties = {
    cursor: 'pointer',
    fontSize: '20px',
    color: 'black',
    background: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none', // remove underline
};
  
export default SimpleTable;