import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    college: "",
    year: "",
    branch: "",
    enrollment: "",
    eventName: "",
    eventDate: "",
    suggestions: "",
    checkbox1: false,
    checkbox2: false,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://escanify.onrender.com/api/v1/profile/save", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          college: formData.college,
          year: formData.year,
          branch: formData.branch,
          enrollment: formData.enrollment,
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
        navigate("/certificate", { state: { id, name: formData.name } });
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("Error");
      console.log("Error is : ", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center   border-gray-800   pb-10 w-full items-center bg-gradient-to-br from-indigo-100 via-blue-100 to-sky-50 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 z-40 w-full bg-shubhu py-2 text-center text-white font-bold text-2xl">
        eScanify
      </header>

      <main className="flex-grow  w-full pt-20 pb-10 flex items-center justify-center">
        <div className="w-full  bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50





 max-w-lg p-6 hover:shadow-black transition-all duration-300  rounded-lg shadow-2xl">
      
      
        <h2 className="text-2xl font-bold text-shubhu text-center">
          Digital Certificate Generator
        </h2>
      <form
        onSubmit={handleSubmit}
        className="from-blue-900/50 to-white/10   p-6  mt-2 z-10 rounded-xl max-w-lg flex justify-center w-full flex-col "
      >

        <div className="mb-4">
          <label className="block text-black font-bold">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-bold">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-600 "
          />
        </div>

{/*         <div className="mb-4">
          <label className="block text-black font-bold">Mobile No.*</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-600"
          />
        </div>
 */}
        <div className="mb-4">
          <label className="block text-black font-bold">College*</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-bold">Year*</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-600"
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-black font-bold">Branch*</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-600"
          >
            <option value="">Select Branch</option>
            <option value="AU">Automobile Engineering</option>
            <option value="Civil">Civil Engineering</option>
            <option value="CSE">Computer Science and Engineering</option>
            <option value="EE">Electrical and Electronics Engineering</option>
            <option value="ECE">Electronics and Communication Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="Mech">Mechanical Engineering</option>
            <option value="Petro">Petrochemical Technology</option>
            <option value="AIML">CSE(Artificial Intelligence and Machine Learning)</option>
            <option value="DS">CSE(Data Science)</option>
            <option value="CSBS">Computer Science and Business System</option>
            <option value="Other">Other</option>
          </select>
        </div>

{/*         <div className="mb-4">
          <label className="block text-black font-bold">Enrollment No.*</label>
          <input
            type="text"
            name="enrollment"
            value={formData.enrollment}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-600"
          />
        </div>
 */}
        <div className="mb-4">
          <label className="block text-black font-bold">Event Name*</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-bold">Event Date*</label>
          <input
            type="Date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block col-span-3 row-span-7 text-black font-bold">
            Any Suggestions
          </label>
          <textarea
            name="suggestions"
            value={formData.suggestions}
            onChange={handleChange}
            className="w-full row-span-7 col-span-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-600"
          ></textarea>
        </div>

{/*         <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="Check Box1"
              checked={formData.checkbox1}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-black font-bold"> Do you want to get updates in the future about events conducted by E-Cell RGPV?</span>
          </label>
        </div> */}

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="Check Box2"
              checked={formData.checkbox2}
              onChange={handleChange}
              className="form-checkbox h-6 w-6 text-blue-600"
            />
            <span className="ml-2 text-black">Could you please confirm if the details provided above are accurate and complete?</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full hover:bg-blue-600 hover:text-white font-bold py-2 px-4 rounded-md outline text-shubhu transition duration-300"
        >
          Submit
        </button>
      </form>
      </div>
      </main>
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 z-40 w-full bg-shubhu py-1 text-center text-white  text-4sm">
        © 2024 eScanify | All rights reserved.
      </footer>
    </div>
  );
};

export default Form;
