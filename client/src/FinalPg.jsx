import React, { useState, useEffect } from "react";
import "./Finalpg.css";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const FinalPg = () => {
  const [profiles, setProfiles] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventName: "",
    college: "",
    eventDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/profile/fetchAll"
        );
        if (response.ok) {
          const result = await response.json();
          setProfiles(result.data);
        } else {
          toast.error("Error in response");
        }
      } catch (error) {
        toast.error("Error in fetching");
        console.error("Error in fetching:", error);
      }
    };
    fetchData();
  }, []);

  const toggleExpand = () => {
    setExpanded((prevState) => !prevState);
  };

  const generatePDF = (profile) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [800, 600],
    });

    const imgWidth = 800;
    const imgHeight = 600;
    const certificateImage = "../public/images/ecellcertificate2.png";

    doc.addImage(certificateImage, "PNG", 0, 0, imgWidth, imgHeight);

    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(profile.name || "Participant Name", imgWidth / 2, 260, {
      align: "center",
    });

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
    const qrCodeLink = `https://localhost:8080/#/profile/${id}`;
    const qrCodeSize = 160;
    const qrCodeX = 50;
    const qrCodeY = 500;
    const qrCodeCanvas = document.createElement("canvas");
    QRCode.toCanvas(qrCodeCanvas, qrCodeLink, { width: qrCodeSize });
    doc.addImage(qrCodeCanvas.toDataURL("image/png"), "PNG", qrCodeX, qrCodeY);

    return doc.output("blob"); 
  };
  const generateIndividualPDF = (profile) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [800, 600],
    });

    const imgWidth = 800;
    const imgHeight = 600;
    const certificateImage = "../public/images/ecellcertificate2.png";

    doc.addImage(certificateImage, "PNG", 0, 0, imgWidth, imgHeight);

    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(profile.name || "Participant Name", imgWidth / 2, 260, {
      align: "center",
    });

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
    const qrCodeLink = `https://localhost:8080/#/profile/${id}`;
    const qrCodeSize = 160;
    const qrCodeX = 50;
    const qrCodeY = 500;
    const qrCodeCanvas = document.createElement("canvas");
    QRCode.toCanvas(qrCodeCanvas, qrCodeLink, { width: qrCodeSize });
    doc.addImage(qrCodeCanvas.toDataURL("image/png"), "PNG", qrCodeX, qrCodeY);

    doc.save(`${profile.name || "Participant"}.pdf`);
  };

  const handleDownload = async () => {
    try {
      if (profiles.length === 0) {
        toast.error("No profiles to download certificates for");
        return;
      }

      const zip = new JSZip();

      profiles.forEach((profile) => {
        const pdfBlob = generatePDF(profile);
        zip.file(`${profile.name}.pdf`, pdfBlob);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "Certificate.zip");
      toast.success("All certificates downloaded!");
    } catch (error) {
      toast.error("Error downloading certificates");
      console.error("Error in downloading certificates.", error);
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
    <div className="wrapper">
      <div className={`login-text ${expanded ? "expand" : ""}`}>
        <button className="cta" onClick={toggleExpand}>
          <i className={`fas fa-chevron-${expanded ? "up" : "down"} fa-1x`}></i>
        </button>
        <div className={`text ${expanded ? "show-hide" : ""}`}>
          <a href="/">Form</a>
          <hr />
          <div className="alignment">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              placeholder="Event name"
            />
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              placeholder="College"
            />
            <input
              type="date"
              name="eventData"
              value={formData.eventDate}
              onChange={handleInputChange}
              placeholder="Event date"
            />
          </div>
          <button onClick={() => generateIndividualPDF(formData)} className="signup-btn">
            Generate
          </button>
        </div>
      </div>
      <div className="call-text">
        <h1>
          Upload <span>and</span> generate
        </h1>
        <input
          type="file"
          accept=".xlsx, .xls"
          id="file-input"
          className="Upbtn"
        />
        <label htmlFor="file-input" className="upload-btn">
          <button onClick={handleDownload}>UPLOAD</button>
        </label>
      </div>
    </div>
  );
};

export default FinalPg;
