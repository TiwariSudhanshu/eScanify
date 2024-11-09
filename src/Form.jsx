import React, { useState } from "react";

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
    suggestions: "",
    checkbox1: false,
    checkbox2: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with desired submit action
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Event Registration</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mobile No.*</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">College*</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Year*</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Branch*</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
            <option value="Civil">Civil</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Enrollment No.*</label>
          <input
            type="text"
            name="enrollment"
            value={formData.enrollment}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Event Name*</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Any Suggestions</label>
          <textarea
            name="suggestions"
            value={formData.suggestions}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="checkbox1"
              checked={formData.checkbox1}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Check box 1</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="checkbox2"
              checked={formData.checkbox2}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Check box 2</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
