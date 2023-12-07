// CodeGeneration.jsx
import React, { useState } from 'react';

const CodeGeneration = () => {
  const [functionName, setFunctionName] = useState('');
  const [language, setLanguage] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleGenerateCode = async () => {
    try {
      const userInput = `${functionName} in ${language}, only the function, no extra sentences, no explanation`;

      // Make a POST request to the backend API
      const response = await fetch('http://localhost:3000/api/code-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      // Extract generated code from the response
      const data = await response.json();
      setGeneratedCode(data.generatedCode);
    } catch (error) {
      console.error('Error:', error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <h2>Code Generation</h2>
      <input
        type="text"
        placeholder="Function Name"
        value={functionName}
        onChange={(e) => setFunctionName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />
      <button onClick={handleGenerateCode}>Generate Code</button>
      <div>
        <h4>Generated Code:</h4>
        <pre>{generatedCode}</pre>
      </div>
    </div>
  );
};

export default CodeGeneration;
