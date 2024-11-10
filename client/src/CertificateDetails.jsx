import React from 'react';
import { useLocation } from 'react-router-dom';

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
    <div className=" flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 mt-10">Certificate Details</h2>

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Name:</span>
          <span className="ml-2 text-gray-800">{name}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Event:</span>
          <span className="ml-2 text-gray-800">{event}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Date:</span>
          <span className="ml-2 text-gray-800">{date}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Branch:</span>
          <span className="ml-2 text-gray-800">{branch}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">College:</span>
          <span className="ml-2 text-gray-800">{college}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Year:</span>
          <span className="ml-2 text-gray-800">{year}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Enrollment No.:</span>
          <span className="ml-2 text-gray-800">{enrollmentNo}</span>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-black-50 italic mt-3">
          This certificate is valid only when issued by the authorized personnel.
        </p>
      </div>
    </div>
  );
};

export default CertificateDetails;
