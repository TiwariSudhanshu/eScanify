import React, { useEffect, useState } from "react";
import Certificate from "../Certificates/Certificate";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { saveAs } from "file-saver";
// import { QRCodeSVG } from 'qrcode.react';
import QRCode from "qrcode";
function CertificatePreview() {
  const [profiles, setProfiles] = useState([]);
  // const [loader, setLoader] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      // setLoader(true);
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
        // setLoader(false)
      }
    };
    fetchData();
  }, []);

  const generatePDF = (profile, callback) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [800, 600],
    });
  
    const imgWidth = 800;
    const imgHeight = 600;
    const certificateImage = "./ecellcertificate2.png";
  
    // Create an image object
    const img = new Image();
    img.src = certificateImage;
  
    img.onload = () => {
      // Adding the certificate background
      doc.addImage(img, "PNG", 0, 0, imgWidth, imgHeight);
  
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
  
      // Adding QR Code
      const id = profile._id;
      const qrCodeLink = `https://escanify-frsq.onrender.com/#/profile/${id}`;
      const qrCodeCanvas = document.createElement("canvas");
      QRCode.toCanvas(qrCodeCanvas, qrCodeLink, { width: 100 }, (error) => {
        if (!error) {
          doc.addImage(qrCodeCanvas.toDataURL("image/png"), "PNG", 50, 500);
          // Return the PDF as a Blob via the callback
          callback(doc.output("blob"));
        } else {
          console.error("Error generating QR code:", error);
        }
      });
    };
  
    img.onerror = (err) => {
      console.error("Error loading certificate image:", err);
    };
  };
  

  const handleDownload = async () => {
    try {
      if (profiles.length === 0) {
        toast.error("No profiles to download certificates for");
        return;
      }
  
      const zip = new JSZip();
      const promises = profiles.map(
        (profile) =>
          new Promise((resolve) => {
            generatePDF(profile, (pdfBlob) => {
              zip.file(`${profile.name}.pdf`, pdfBlob);
              resolve();
            });
          })
      );
  
      await Promise.all(promises);
  
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "Certificates.zip");
  
      toast.success("All certificates downloaded!");
    } catch (error) {
      toast.error("Error downloading certificates");
      console.error("Error in downloading certificates:", error);
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
        class="  mt-[8vmax] w-auto mx-[43%] bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <svg
          class="fill-current  w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download All</span>
      </button>
      {profiles.map((profile, index) => (
        <Certificate key={index} data={profile} />
      ))}
    </>
  );
}

export default CertificatePreview;
