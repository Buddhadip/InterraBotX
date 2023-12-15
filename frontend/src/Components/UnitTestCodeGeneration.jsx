// UnitTestCodeGeneration.jsx
import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toast } from 'react-toastify';
import { ToastContainer  } from 'react-toastify';   
import 'react-toastify/dist/ReactToastify.css';
// Wrapper component to omit backticks from the code snippet
const UnitTestCodeSnippet = ({ language, children }) => {
  // Remove backticks from the content
  const testCodeContent = children.replace(/`/g, '');

  return (
    <SyntaxHighlighter language={language} style={dracula}>
      {testCodeContent}
    </SyntaxHighlighter>
  );
};

const UnitTestCodeGeneration = ({selectedLanguage}) => {
  const [testCodeSnippet, setTestCodeSnippet] = useState('');
  const [generatedUnitTestCode, setGeneratedUnitTestCode] = useState('');

  const handleGenerateUnitTestCode = async () => {
    try {

      // Validate testCodeSnippet on the client side
      if (!testCodeSnippet.trim()) {
        toast.error('Test code snippet cannot be empty');
        return;
      }

        // prompt = `${testCodeSnippet} \ngenerate a code in ${selectedLanguage} language  which can unit
        // test this function after taking  data 
        // from a csv file named testcases.csv , just provide the code part,do not write any explanation or sentence, 
        // containg following columns with name {columns}
        // code can use any external libray or modules , or can generate from scratch`;
      
        // Make a POST request to the backend API
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            testCodeSnippet,
            selectedLanguage, // Include selectedLanguage in the request
          }),
        };
    
        // Make a POST request to the backend API
        const response = await fetch('http://localhost:3000/api/unit-test-code-generation', requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error}`);
      } else {
        const data = await response.json();
        setGeneratedUnitTestCode(data.generatedUnitTestCode);
      }

      // // Extract generated unit test code from the response
      // const data = await response.json();
      // setGeneratedUnitTestCode(data.generatedUnitTestCode);
    } catch (error) {
      toast.error('An unexpected error occurred');
      // Handle error as needed
    }
  };

  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Unit Test Code Generation</h2>
      <div className="mb-4">
        <label htmlFor="testCodeSnippet" className="block text-sm font-medium text-gray-400">
          Function Snippet:
        </label>
        <textarea
          id="testCodeSnippet"
          className="border p-2 w-full text-black"
          value={testCodeSnippet}
          onChange={(e) => setTestCodeSnippet(e.target.value)}
          placeholder="Enter your function snippet here"
        />
      </div>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleGenerateUnitTestCode}
      >
        Generate Unit Test Code
      </button>
      <div className="mt-8 overflow-auto max-h-40">
        <h4 className="text-xl font-bold mb-2 text-white">Generated Unit Test Code:</h4>
        <div className="mt-8 bg-gray-700 p-4 rounded">
        <UnitTestCodeSnippet language={selectedLanguage}>
            {generatedUnitTestCode}
          </UnitTestCodeSnippet>
        </div>
      </div>
    </div>
  );
};

export default UnitTestCodeGeneration;
