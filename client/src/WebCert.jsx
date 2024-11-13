import React, { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation, useNavigate } from 'react-router-dom';
import {QRCodeSVG} from 'qrcode.react'

function WebCert() {
  const navigate = useNavigate();
  const componentRef = useRef();
  const generatePDF = async()=>{
    const element = componentRef.current
    const canvas = await html2canvas(element)
    const imgData = canvas.toDataURL("/image/png");

    const pdf = new jsPDF();
    const imgWidth = 190; 
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 0;
    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    pdf.save("certificate.pdf");

  }

 const location = useLocation();
 const { id, name } = location.state || {};

 useEffect(()=>{
  if(!id || !name){
    navigate("/");
    return;
   }
 },[navigate])

  const link = `https://escanify.onrender.com/profile/${id}`;
  return (
    <>
    <div ref={componentRef} className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[800px] bg-white border-4 border-gray-200 p-8 rounded-md shadow-lg relative">
        
        {/* Top Ribbon */}
        <div className="absolute top-0 left-0 w-full h-4 bg-yellow-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-4 bg-yellow-500"></div>

        {/* Title and Seal */}
        <div className="flex flex-col items-center">
          <div className="bg-yellow-400 rounded-full p-4 mb-4 border-4 border-yellow-600">
            <span role="img" aria-label="Seal" className="text-5xl">🏅</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800">CERTIFICATE</h1>
          <h2 className="text-2xl font-semibold text-gray-600 mt-2">OF ACHIEVEMENT</h2>
        </div>

        {/* Recipient Section */}
        <p className="text-lg text-yellow-600 text-center mt-6">THIS CERTIFICATE IS PRESENTED TO:</p>
        <p className="text-3xl font-cursive text-blue-600 text-center mt-2">{name}</p>
        
        {/* Message */}
        <p className="text-center text-gray-600 mt-4">
          Hopefully this achievement will be the first step towards bigger success.<br />
          Keep trying and give your best.
        </p>

        {/* Signature Section */}
        <div className="flex justify-around mt-12">
          <div className="text-center">
            <div className="border-t-2 border-gray-300 w-40 mx-auto mb-2"></div>
            <p className="text-gray-700">Isabel Mercado</p>
          </div>
          <div className="text-center">
            <div className="border-t-2 border-gray-300 w-40 mx-auto mb-2"></div>
            <p className="text-gray-700">Connor Hamilton</p>
          </div>
        </div>

        {/* QR Code Space */}
        <div className="absolute bottom-10 right-10 border-2 border-gray-300 p-4">
          <p className="text-xs text-gray-500 text-center">QR Code</p>
          {/* Placeholder for QR Code image */}
          <div className="w-20 h-20 bg-gray-200 flex justify-center items-center">
            {/* Replace with an actual QR code image */}
            <span className="text-gray-400"><QRCodeSVG value={link}  /></span>
          </div>
        </div>
      </div>
    <button onClick={generatePDF}>Download</button>
    </div>
    </>
  );
}

export default WebCert;
