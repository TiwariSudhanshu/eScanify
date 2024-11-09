import React from 'react';
import { useLocation } from 'react-router-dom';
import './certificateDetails.css';

const CertificateDetails = () => {
  const location = useLocation();
  const { attendeeData } = location.state || {};

  
  const {
    name = 'Pavitra',
    event = 'Sample Event',
    date = 'November 9, 2024',
    branch = 'Computer Science',
    college = 'XYZ University',
    year = '3rd Year',
    enrollmentNo = '123456789'
  } = attendeeData || {};

  return (
    <div className="certificate-details-container">
      <h2 className="certificate-title">Certificate Details</h2>

      <div className="certificate-content">
        <div className="detail-item">
          <span className="detail-label">Name:</span>
          <span className="detail-value">{name}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Event:</span>
          <span className="detail-value">{event}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Date:</span>
          <span className="detail-value">{date}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Branch:</span>
          <span className="detail-value">{branch}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">College:</span>
          <span className="detail-value">{college}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Year:</span>
          <span className="detail-value">{year}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Enrollment No.:</span>
          <span className="detail-value">{enrollmentNo}</span>
        </div>
      </div>

      <div className="certificate-footer">
        <p className="footer-text">This certificate is valid only when issued by the authorized personnel.</p>
      </div>
    </div>
  );
};

export default CertificateDetails;
