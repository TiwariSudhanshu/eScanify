import React, { useEffect, useState } from "react";
import Certificate from "../Certificates/Certificate";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import certificate from "./ecellcertificate2.png"
// import { QRCodeSVG } from 'qrcode.react';
import QRCode from "qrcode";
function CertificatePreview() {
  const [profiles, setProfiles] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const response = await fetch(
          "https://escanify.onrender.com/api/v1/profile/fetchAll",
          {
            method: "get",
          }
        );
        if (response.ok) {
          const result = await response.json();
          setProfiles(result.data);
        } else {
          console.log("Error in response");
        }
      } catch (error) {
        toast.error("Error in fetching");
        console.log("Error in fetching :", error);
      } finally {
        setLoader(false)
      }
    };
    fetchData();
  }, []);

  const generatePDF = async (profile) => {
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [800, 600],
      });
  
      const imgWidth = 800;
      const imgHeight = 600;
  
      // Load the certificate background image
      const loadImage = (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = (err) => reject(`Failed to load image: ${src}`);
        });
  
      const img = await loadImage(certificate); // Pass the imported certificate path
      doc.addImage(img, "PNG", 0, 0, imgWidth, imgHeight); // Add image to PDF
  
      // Add participant's name
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text(profile.name || "Participant Name", imgWidth / 2, 260, {
        align: "center",
      });
  
      // Add description
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text(
        "has actively participated in the event organized by E-Cell RGPV.",
        imgWidth / 2,
        320,
        { align: "center" }
      );
      doc.text(
        "We acknowledge your commitment and enthusiasm in advancing your entrepreneurship skills.",
        imgWidth / 2,
        340,
        { align: "center" }
      );
  
      // Generate QR code
      const id = profile._id;
      const qrCodeLink = `https://escanify-frsq.onrender.com/#/profile/${id}`;
      const qrCodeDataUrl = await QRCode.toDataURL(qrCodeLink, { width: 100 });
  
      // Add QR code to the certificate
      doc.addImage(qrCodeDataUrl, "PNG", 50, 500);
  
      // Return the PDF as a Blob
      return doc.output("blob");
    } catch (error) {
      console.error("Error generating PDF for profile:", profile, error);
      throw error;
    }
  };
  
  
  
  

  const handleDownload = async () => {
    
    try {
      if (profiles.length === 0) {
        toast.error("No profiles to download certificates for");
        return;
      }
        setLoader(true)
  
      const zip = new JSZip();
      const promises = profiles.map(async (profile) => {
        try {
          const pdfBlob = await generatePDF(profile);
          zip.file(`${profile.name}.pdf`, pdfBlob);
        } catch (error) {
          console.error(`Error processing profile: ${profile.name}`, error);
          toast.error(`Failed to generate certificate for ${profile.name}`);
        }
      });
  
      await Promise.all(promises); // Ensure all profiles are processed
  
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "Certificates.zip");
  
      toast.success("All certificates downloaded!");
    } catch (error) {
      toast.error("Error downloading certificates");
      console.error("Error in downloading certificates:", error);
    } finally {
      setLoader(false)
    }
  };
  
  

  if (!profiles) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <>
    <button
    onClick={handleDownload}
    disabled={loader}
    className={`mt-[8vmax] w-auto flex justify-center items-center my-auto mx-auto ${
  loader ? "bg-blue-300 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-600"
} font-bold text-white py-2 px-4 rounded transition-all duration-300 ease-in-out`}
  >
    {loader ? (
      <>
        <svg
          className="animate-spin w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        Loading...
      </>
    ) : (
      <>
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download All</span>
      </>
    )}
  </button>
      {profiles.map((profile, index) => (
        <Certificate key={index} data={profile} />
      ))}
    </>
  );
}

export default CertificatePreview;
