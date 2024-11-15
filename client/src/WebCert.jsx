import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import logo from "./../public/images/logo.png";

function WebCert() {
  const componentRef = useRef();

  const generatePDF = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Allows cross-origin images like logos to render correctly
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = pdf.internal.pageSize.getWidth() - 20; // Adjust width with margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("certificate.pdf");
  };

  const location = useLocation();
  const { id, name } = location.state || {};
  const link = `http://localhost:5173/profile/${id}`;

  return (
    <>
      <header className="fixed top-0 left-0 z-40 w-full bg-shubhu py-2 text-center text-white font-bold text-2xl">
        Welcome to eScanify
      </header>
      <div
        ref={componentRef}
        className=" flex flex-col  justify-center items-center bg-gradient-to-br pt-20 pb-12"
      >
        <div className="relative shadow-black shadow-3xl w-full sm:w-2/3 max-w-4xl border-4 p-10 rounded-lg overflow-hidden aspect-w-3 aspect-h-2">
          {/* Top and Bottom Ribbon */}
          <span className="bg-shubhu w-full">
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-[#4A90E2] via-[#0078D4] to-[#005A8D] rounded-br-3xl shadow-lg"></div>
          </span>
          <span className="bg-shubhu w-full">
            <div className="absolute bottom-0 right-0 w-full h-8 bg-gradient-to-r from-[#040023] via-[#03095c] to-[#0078D4] rounded-tl-3xl shadow-lg"></div>
          </span>

          {/* Logo Section */}
          <div className="flex flex-col relative items-center   ">
            <div className="w-20 h-24 top-0 left-0 absolute  flex items-center justify-center">
              <img src={logo} alt="Logo" className="object-contain w-24 h-14" />
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-center items-center">
            <h1 className="text-5xl italic font-extrabold text-gray-800 mt-1">
              Certificate
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mt-1">
              of Achievement
            </h2>
          </div>

          {/* Recipient Name */}
          <p className="text-lg  text-gray-600 text-center mt-5">
            This certificate is proudly presented to:
          </p>
          <p className="text-3xl underline italic font-bold text-blue-700 text-center mt-2">
            {name}
          </p>

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
          <div className="absolute top-10 right-6 p-2 border-2 border-gray-300 bg-white shadow-md rounded-lg">
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
