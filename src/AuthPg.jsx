import React from "react";

function AuthPg({ recipientName, eventName, organizer, date, certificateId }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg max-w-2xl p-8 text-center border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          {/* E-Cell Logo */}
          <div className="flex items-center">
            <img
              src="" 
              alt="E-Cell Logo"
              className="h-12 mr-2"
            />
            <div className="text-left">
              <h1 className="text-lg font-semibold text-blue-800">E-CELL</h1>
              <p className="text-sm text-gray-600">RGPV, Bhopal</p>
            </div>
          </div>
          {/* Date and Certificate ID */}
          <div className="text-right">
            <p className="text-sm text-gray-600">Date: {date}</p>
            <p className="text-sm text-gray-600">ID: {certificateId}</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Certificate of Participation</h2>
        
        <p className="text-gray-700 text-left mb-6">
          Dear <span className="font-semibold">{recipientName}</span>,
        </p>
        
        <p className="text-gray-700 text-justify mb-6">
          We are delighted to present this certificate for successfully attending the event
          <span className="font-semibold"> {eventName} </span> organized by {organizer}.
          Your active participation and dedication were highly appreciated, and we believe this experience will be beneficial in your future endeavors.
        </p>
        
        <p className="text-gray-700 text-justify mb-8">
          This certificate serves as a testament to your commitment and enthusiasm for professional growth. We hope this event provided valuable insights and a memorable experience.
        </p>
        
        {/* Signature Section */}
        <div className="flex justify-end items-center">
          <div className="text-right">
            <img src="" alt="Signature" className="h-8 mb-2" />
            <p className="font-semibold text-gray-700">Dr. Shikha Agrawal</p>
            <p className="text-sm text-gray-600">
              Director, Centre of University Placement <br />
              Training & Corporate Affairs, RGPV
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPg;
