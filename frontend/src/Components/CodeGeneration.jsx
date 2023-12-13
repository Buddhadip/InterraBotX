// CodeGeneration.jsx
import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//import '../Styles/button.css';

// Wrapper component to omit backticks from the code snippet
const CodeSnippet = ({ language, children }) => {
  // Remove backticks from the content
  const codeContent = children.replace(/`/g, '');

  return (
    <SyntaxHighlighter language={language} style={dracula}>
      {codeContent}
    </SyntaxHighlighter>
  );
};

const CodeGeneration = ({ selectedLanguage }) => {
  const [functionName, setFunctionName] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');


  const handleGenerateCode = async () => {
    try {
      const userInput = `write code for ${functionName} in ${selectedLanguage}, only the function, no extra sentences, no explanation`;
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
    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Function Generation</h2>
      <div className="mb-4 flex space-x-4">
        <input
          className="border p-2 flex-1 text-black"
          type="text"
          placeholder="Function Name"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
        />
      </div>
     <button
        className="bg-blue-500 hover:bg-blue-700 hover:ease-in duration-200 text-white font-bold py-2 px-4 rounded mx-auto block"
        onClick={handleGenerateCode}
      >
        Generate Code
      </button> 

      <div className="mt-8 overflow-auto max-h-60">
        <h4 className="text-xl font-bold mb-2 text-white">Generated Code:</h4>
        <div className="mt-8 bg-gray-700 p-4 rounded">
          <CodeSnippet language={selectedLanguage}>
            {generatedCode}
          </CodeSnippet>
        </div>
      </div>
    </div>
  );
};

export default CodeGeneration;
