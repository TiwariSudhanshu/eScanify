import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CertificateDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/profile/fetch", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data.data);
        } else {
          toast.error("Some error occurred");
        }
      } catch (error) {
        toast.error("Error");
        console.log("Error is :", error);
      }
    };
    fetchData();
  }, [id]);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  const { name, eventName, branch, college, year, enrollment } = profile;
  const date = ""; // Assuming the date will be fetched or passed later

  return (
    <div className="flex flex-col items-center py-10  bg-gradient-to-br from-indigo-100 via-blue-100 to-sky-50 min-h-screen">
      <header className="fixed top-0 left-0 z-40 w-full bg-shubhu py-2 text-center text-white font-bold text-2xl">
        Welcome to eScanify
      </header>

      <h2 className="text-4xl font-extrabold text-gray-900 mb-4 mt-8">
        Certificate Details
      </h2>
      <div className="w-full max-w-3xl bg-white shadow-shubhu shadow-lg rounded-lg p-8 space-y-6">
        {/* Name Section */}
        <div className="flex items-center justify-between space-x-4 bg-blue-50 p-4 rounded-lg">
          <span className="text-lg text-shubhu font-bold">Name:</span>
          <span className="text-lg font-semibold text-gray-800">{name}</span>
        </div>

        {/* Event Section */}
        <div className="flex items-center justify-between space-x-4 bg-blue-50 p-4 rounded-lg">
              <span className="text-lg text-shubhu font-bold">Event:</span>
              <span className="text-lg font-semibold text-gray-800">{eventName}</span>
            </div>

        {/* Date Section */}
        <div className="flex items-center justify-between space-x-4 bg-blue-50 p-4 rounded-lg">
              <span className="text-lg text-shubhu font-bold">Date:</span>
              <span className="text-lg font-semibold text-gray-800">{date}</span>
            </div>

        {/* Branch Section */}
        <div className="flex items-center justify-between space-x-4 bg-blue-50 p-4 rounded-lg">
              <span className="text-lg text-shubhu font-bold">Branch:</span>
              <span className="text-lg font-semibold text-gray-800">{branch}</span>
            </div>

        {/* College Section */}
        <div className="flex items-center justify-between space-x-4 bg-blue-50 p-4 rounded-lg">
              <span className="text-lg text-shubhu font-bold">College:</span>
              <span className="text-lg font-semibold text-gray-800">{college}</span>
            </div>

        {/* Year Section */}
        <div className="flex items-center justify-between space-x-4 bg-blue-50 p-4 rounded-lg">
              <span className="text-lg text-shubhu font-bold">Year:</span>
              <span className="text-lg font-semibold text-gray-800">{year}</span>
            </div>

        {/* Enrollment Section */}
        <div className="flex items-center justify-between space-x-4 bg-blue-50 p-4 rounded-lg">
              <span className="text-lg text-shubhu font-bold">Enrollment No.:</span>
              <span className="text-lg font-semibold text-gray-800">{enrollment}</span>
            </div>
      </div>

      <div className="text-center mt-6">
        <footer className="fixed bottom-0 left-0 z-40 w-full bg-shubhu py-1 text-center text-white  text-4sm">
          © 2024 eScanify | All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default CertificateDetails;
