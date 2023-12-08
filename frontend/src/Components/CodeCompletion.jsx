// CodeCompletion.jsx
import React, { useState } from 'react';

const CodeCompletion = () => {
  const [codeSnippet, setCodeSnippet] = useState('');
  const [completedCode, setCompletedCode] = useState('');

  
  const handleCodeChange = (e) => {
    const newValue = e.target.value;
    console.log('CodeSnippet value:', newValue);
    setCodeSnippet(newValue);
  };
  
  const handleCodeCompletion = async () => {
    try {
      const formattedCodeSnippet  = `Complete the given code:\n${codeSnippet}\ndon't write any explanation, only add the rest of the code.`;
      
      console.log('Formatted codeSnippet:', formattedCodeSnippet);
      
      const response = await fetch('http://localhost:3000/api/code-completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codeSnippet: formattedCodeSnippet }),
      });

      const data = await response.json();
      setCompletedCode(data.completedCode);
    } catch (error) {
      console.error('Error:', error);
      // Handle error as needed
      console.log('Error in jsx:' , error);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Code Completion</h2>
      <textarea
        className="border p-2 w-full mb-4 text-black"
        value={codeSnippet}
        onChange={handleCodeChange}
        placeholder="Enter your code snippet here"
      />
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mx-auto block"
        onClick={handleCodeCompletion}
      >
        Complete Code
      </button>
      <h4 className="text-xl font-bold mb-2 text-white text-left">Completed Code:</h4>
      <div className="mt-8 bg-gray-700 p-4 rounded">
        <pre className="text-white text-left">{completedCode}</pre>
      </div>
    </div>
  );
};

export default CodeCompletion;
