// src/Components/UploadCode.jsx
import React, { useState } from 'react';

const UploadCode = () => {
  const [file, setFile] = useState(null);
  console.log('File:', file);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('codeFile', file);
    //   const userInput = 'Generate test cases for the uploaded code, only the function, no extra sentences, no explanation';

      const response = await fetch('http://localhost:3000/api/upload-code', {
        method: 'POST',
        body: formData,
        // headers: {
        //     'User-Input': userInput, // Include user input in headers or as needed
        //   },  
      });
      console.log('OpenAI API Response:', response);

      const data = await response.json();
      console.log('Generated Upload Cases:', data.generatedTestCases);
      // Handle the generated test cases as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <h2>Upload Code</h2>
      <input type="file" accept=".py" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Generate Test Cases</button>
    </div>
  );
};

export default UploadCode;
