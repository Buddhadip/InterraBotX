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
    <div>
      <h2>Code Completion</h2>
      <textarea value={codeSnippet} onChange={handleCodeChange} />
      <button onClick={handleCodeCompletion}>Complete Code</button>
      <div>
        <h4>Completed Code:</h4>
        <pre>{completedCode}</pre>
      </div>
    </div>
  );
};

export default CodeCompletion;
