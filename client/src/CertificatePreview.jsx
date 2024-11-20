import React, { useEffect, useState } from 'react'
import Certificate from './Certificate'
import { toast } from "react-toastify";
import jsPDF from 'jspdf';
import JSZip from "jszip";
import { saveAs } from "file-saver";
// import { QRCodeSVG } from 'qrcode.react';
import QRCode from 'qrcode'
function CertificatePreview() {

  const [profiles, setProfiles] = useState([]);
  // const [loader, setLoader] = useState(false)

  useEffect(()=>{
    const fetchData = async()=>{
      // setLoader(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/profile/fetchAll",{
          method: 'get'
        })
        if(response.ok){
          const result = await response.json()
          setProfiles(result.data);
        } else{
          console.log("Error in response")
        }
      } catch (error) {
        toast.error("Error in fetching")
        console.log("Error in fetching :", error)
      } finally{
        // setLoader(false)
      }
    }
    fetchData();
  },[])

  const generatePDF = (profile) => {
    const doc = new jsPDF({
      orientation: "landscape", // Match the certificate's orientation
      unit: "px",
      format: [800, 600], // Adjust size as per the certificate's resolution
    });
  
    // Background Image (Certificate Template)
    const imgWidth = 800;
    const imgHeight = 600; 
    const certificateImage = "./../public/images/ecellcertificate2.png";
  
    // Adding the certificate background
    doc.addImage(certificateImage, "PNG", 0, 0, imgWidth, imgHeight);
  
    // Adding Name
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(profile.name || "Participant Name", imgWidth / 2, 260, {
      align: "center",
    });
  
    // Adding Description
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
    const id = profile._id;
    // Adding QR Code
    const qrCodeLink =  `https://localhost:8080/#/profile/${id}`; // Replace with the appropriate link
    const qrCodeSize = 160;
    const qrCodeX = 50; 
    const qrCodeY = 500; 
    const qrCodeCanvas = document.createElement("canvas");
    QRCode.toCanvas(qrCodeCanvas, qrCodeLink, { width: qrCodeSize });
    doc.addImage(qrCodeCanvas.toDataURL("image/png"), "PNG", qrCodeX, qrCodeY);
  
    // Return the PDF as a Blob
    return doc.output("blob");
  };
  

  const handleDownload = async()=>{
   try {
     if(profiles.length == 0 ){
       toast.error("No profiles to download certificates for");
         return;
     }
 
     const zip = new JSZip();
 
     profiles.forEach((profile, index)=>{
       const pdfBlob = generatePDF(profile);
       zip.file(`${profile.name}.pdf`, pdfBlob);
     })
 
     const zipBlob = await zip.generateAsync({ type: "blob" });
       saveAs(zipBlob, "Certificates.zip");
 
       toast.success("All certificates downloaded!");
   } catch (error) {
    toast.error("Error downloading certificates");
    console.error("Error in downloading certificates:", error);
   }
  }

  if (!profiles) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <>
    <button  onClick={handleDownload} className='bg-blue-500 text-white p-10 '>Download all</button>
     {profiles.map((profile, index) => (
        <Certificate key={index} data={profile} />
      ))}
    </>
  )
}

export default CertificatePreview
