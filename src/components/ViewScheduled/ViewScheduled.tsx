import React from 'react';
import './ViewScheduled.css';

interface PersonnelData {
  employee: string;
  id: string;
  department: string;
}

interface TrainingDetailProps {
  type: string;
  department: string;
  trainingName: string;
  reasons: string;
  date: string;
  personnelInvolved: PersonnelData[];
  status: string;
}

const TrainingDetail: React.FC<TrainingDetailProps> = ({
  type,
  department,
  trainingName,
  reasons,
  date,
  personnelInvolved,
  status
}) => {
  return (
    <div className="container">
      <div className="details">
        <DetailItem label="Type:" value={type} />
        <DetailItem label="Department:" value={department} />
        <DetailItem label="Training Name:" value={trainingName} />
        <DetailItem label="Reasons:" value={reasons} />
        <DetailItem label="Date:" value={date} />
      </div>
      <div className="section">
        <h3 className="subheader">Personnel Involved:</h3>
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">Employee</th>
              <th className="table-header">ID</th>
              <th className="table-header">Department</th>
            </tr>
          </thead>
          <tbody>
            {personnelInvolved.map((person, index) => (
              <tr key={index}>
                <td className="table-cell">{person.employee}</td>
                <td className="table-cell">{person.id}</td>
                <td className="table-cell">{person.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DetailItem label="Status:" value={status} />
    </div>
  );
};

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const getStatusClass = (status: string): string => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('approved')) return 'status-approved';
    if (lowerStatus.includes('rejected')) return 'status-rejected';
    if (lowerStatus.includes('pending')) return 'status-pending';
    return '';
  };

  const isStatus = label === "Status:";
  const statusClass = isStatus ? getStatusClass(value) : '';

  return (
    <div className="detail-item">
      <span className="label">{label}</span>
      <span className={`value ${statusClass}`}>{value}</span>
    </div>
  );
};

export default TrainingDetail;