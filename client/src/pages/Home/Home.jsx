import React, { useState } from "react";
import "./Home.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventName: "",
    college: "",
    eventDate: "",
  });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  //   Handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  //   Toggle ui
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded((prevState) => !prevState);
  };

  //   API

  // Form Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await fetch("https://escanify.onrender.com/api/v1/profile/save", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          college: formData.college,
          year: formData.year,
          branch: formData.branch,
          eventName: formData.eventName,
          eventDate: formData.eventDate,
        }),
      });

      if (response.ok) {
        toast.success("Registered", {
          autoClose: 3000,
        });
        const data = await response.json();
        const id = data.data._id;
        navigate("/certificate", {
          state: { id, name: formData.name, event: formData.eventName },
        });
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("Error");
      console.log("Error is : ", error);
    } finally {
      setLoader(false);
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) {
      toast.error("Please select a file!");
      return;
    }
  
    setLoader(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("https://escanify.onrender.com/api/v1/profile/saveExcel", {
        method: "Post",
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        toast.success(result.message || "File uploaded successfully!");
        console.log("Response:", result);
        navigate("/certificates");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to upload file");
      }
    } catch (error) {
      toast.error("Error");
      console.log("Error", error);
    } finally {
      setLoader(false); 
    }
  };
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
              name="eventDate"
              value={formData.eventDate}
              onChange={handleInputChange}
              placeholder="Event date"
            />
          </div>
          <button onClick={handleFormSubmit} className="signup-btn">
            Submit
          </button>
        </div>
      </div>
      <div className="call-text">
  <h1>
    Upload <span>and</span> Generate
  </h1>
  <input
    type="file"
    accept=".xlsx, .xls"
    id="file-input"
    className="Upbtn"
    onChange={handleFileChange}
  />
  <label htmlFor="file-input" className="upload-btn">
    <button className="flex justify-center items-center" onClick={handleFileSubmit} disabled={loader}>
      {loader ? <svg
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
        </svg> : "UPLOAD"}
    </button>
  </label>
</div>
    </div>
  );
}

export default Home;
