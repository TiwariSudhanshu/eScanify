import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';

const CertificateDetails = () => {
  const {id} = useParams();
  const [profile, setProfile] = useState(null)

  useEffect(()=>{
    const fetchData = async ()=>{
     try {
       const response = await fetch( "http://localhost:8080/api/v1/profile/fetch", {
         method: "post",
         headers:{
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           id
         })
       })
       console.log("response:",response)
       if(response.ok){
          const data = await response.json()
          setProfile(data.data)
         
       }else{
         alert("Some error occured")
       }
     } catch (error) {
      alert("Error")
      console.log("Error is :", error)
     }
    }
    fetchData()
  },[id])
  if (!profile) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  const { name, eventName, branch, college, year, enrollment } = profile;
  const date = ''; 
  
  return (
    <div className=" flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 mt-10">Certificate Details</h2>

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Name:</span>
          <span className="ml-2 text-gray-800">{name}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Event:</span>
          <span className="ml-2 text-gray-800">{eventName}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Date:</span>
          <span className="ml-2 text-gray-800">{date}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Branch:</span>
          <span className="ml-2 text-gray-800">{branch}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">College:</span>
          <span className="ml-2 text-gray-800">{college}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Year:</span>
          <span className="ml-2 text-gray-800">{year}</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Enrollment No.:</span>
          <span className="ml-2 text-gray-800">{enrollment}</span>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-black-50 italic mt-3">
          This certificate is valid only when issued by the authorized personnel.
        </p>
      </div>
    </div>
  );
};

export default CertificateDetails;
