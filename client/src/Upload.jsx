import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

function Upload() {
    const [file, setFile] = useState(null)
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if (!file) {
            toast.error('Please select a file!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch("http://localhost:8080/api/v1/profile/saveExcel", {
                method: 'Post',
                body: formData,
            })
            if (response.ok) {
                const result = await response.json();
                toast.success(result.message || "File uploaded successfully!");
                console.log('Response:', result);
                navigate("/certificates")
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to upload file");
            }
        } catch (error) {
            toast.error("Error")
            console.log("Error", error)
        }
    }
    

  return (
    <div>
      <input type="file" accept='xlsx, xls' onChange={handleFileChange}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Upload
