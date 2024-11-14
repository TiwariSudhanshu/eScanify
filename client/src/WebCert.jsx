import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import logo from './../public/images/logo.png';

function WebCert() {
  const componentRef = useRef();

  const generatePDF = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true // Allows cross-origin images like logos to render correctly
    });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = pdf.internal.pageSize.getWidth() - 20; // Adjust width with margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save('certificate.pdf');
  };

  const location = useLocation();
  const { id, name } = location.state || {};
  const link = `http://localhost:5173/profile/${id}`;

  return (
    <>
      <div ref={componentRef} className="my-8 flex flex-col justify-center items-center bg-gradient-to-br pt-40">
        <div className="relative w-full max-w-3xl border-4 bg-white p-10 rounded-lg overflow-hidden">
          
          {/* Top and Bottom Ribbon */}
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-b-lg"></div>
          
          {/* Logo Section */}
          <div className="flex flex-col items-center ">
            <div className="w-12 h-20 flex items-center justify-center">
              <img src={logo} alt="Logo" className="object-contain w-14 h-14" />
            </div>
            <h1 className="text-5xl italic font-extrabold text-gray-800 mt-1">Certificate</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mt-1">of Achievement</h2>
          </div>
          
          {/* Recipient Name */}
          <p className="text-lg text-gray-600 text-center mt-5">This certificate is proudly presented to:</p>
          <p className="text-3xl italic font-bold text-blue-700 text-center mt-2">{name}</p>
          
          {/* Certificate Message */}
          <p className="text-center text-gray-700 mt-6 leading-relaxed">
            May this achievement mark the beginning of many future successes.
          </p>
          
          {/* Signature Section */}
          <div className="flex justify-around mt-12">
            <div className="text-center">
              <div className="border-t-2 border-gray-300 w-32 mx-auto mb-1"></div>
              <p className="text-gray-800 font-semibold">Isabel Mercado</p>
              <p className="text-gray-500 text-xs">Event Coordinator</p>
            </div>
            <div className="text-center">
              <div className="border-t-2 border-gray-300 w-32 mx-auto mb-1"></div>
              <p className="text-gray-800 font-semibold">Connor Hamilton</p>
              <p className="text-gray-500 text-xs">Director</p>
            </div>
          </div>
          
          {/* QR Code */}
          <div className="absolute top-6 right-6 p-2 border-2 border-gray-300 bg-white shadow-md rounded-lg">
            <QRCodeSVG value={link} size={80} />
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center">
        <button 
          onClick={generatePDF} 
          className="bg-blue-600 text-white px-6 p-2 mb-16 rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Download Certificate
        </button>
      </div>
    </>
  );
}

export default WebCert;
