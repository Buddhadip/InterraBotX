import React, { useState, useEffect } from 'react';
import DownloadTestCases from './DownloadTestCases';

const TestCaseGeneration = () => {
  const [functionSnippet, setFunctionSnippet] = useState('');
  const [generatedTestCases, setGeneratedTestCases] = useState([]);
  const [testCasesGenerated, setTestCasesGenerated] = useState(false);

  useEffect(() => {
    // This will log the updated state whenever generatedTestCases changes
    console.log("Generated Test Cases:", generatedTestCases);
    // Update testCasesGenerated when test cases are generated for the first time
    if (generatedTestCases.length > 0 && !testCasesGenerated) {
      setTestCasesGenerated(true);
    }
  }, [generatedTestCases, testCasesGenerated]);


  const handleGenerateTestCases = async () => {
    try {
      const prompt = `${functionSnippet}\n\nwrite me unit test cases for this function ,
                        containing both negative and positive test cases, 
                        one row will contain serial number(Serial), 
                        another row will contain input field of the function(Input) 
                        and other row will contain expected output(Output),
                        in excel sheet table format with as many rows as you can generate.
                        Provide only the test cases in table format and no extra description, no explanation without any starting sentence`;

      const response = await fetch('http://localhost:3000/api/test-case-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ functionSnippet: prompt }),
      });

      const data = await response.json();
      console.log(data);

      if (data && data.processedTestCases) {
        // Split rows by newline character
        const rows = data.processedTestCases.split('\n');

        // Extract headers from the first row and remove empty strings
        const headers = rows[0].split('|').map(cell => cell.trim()).filter(Boolean);

        // Process test cases starting from the third row
        const testCasesArray = rows.slice(2).map(row => {
          // Split values by '|' character, trim, and remove empty strings
          const values = row.split('|').map(cell => cell.trim()).filter(Boolean);

          // Map values to headers to create test case object
          return headers.reduce((testCase, header, index) => {
            // Convert numeric values to numbers
            testCase[header] = isNaN(values[index]) ? values[index] : Number(values[index]);
            return testCase;
          }, {});
        });

        // Set the state with the processed test cases
        setGeneratedTestCases(testCasesArray);
      } else {
        console.error('Error: processedTestCases is undefined in the response');
        // Handle the case where processedTestCases is not present in the response
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error as needed
    }
  };



  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md max-h-70">
      <h2 className="text-2xl font-bold mb-4">Test Case Generation</h2>
      <textarea
        className="border p-2 w-full mb-4 text-black"
        value={functionSnippet}
        onChange={(e) => setFunctionSnippet(e.target.value)}
        placeholder="Enter your function snippet here"
      />
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleGenerateTestCases}
      >
        Generate Test Cases
      </button>
      <div className="mt-5 flex items-center">
        <h4 className="text-xl font-bold mb-2 text-white mr-4">Generated Test Cases:</h4>
        <DownloadTestCases testCases={generatedTestCases} />
      </div>
      <div className="mt-8 max-h-40 overflow-auto">
        {testCasesGenerated ? (
          generatedTestCases && generatedTestCases.length > 0 ? (
            <table className="table-auto w-full ">
              {/* Render your table header */}
              <thead>
                <tr>
                  <th className="border px-4 py-2">Serial Number</th>
                  <th className="border px-4 py-2">Input</th>
                  <th className="border px-4 py-2">Output</th>
                </tr>
              </thead>
              {/* Render your table body */}
              <tbody>
                {generatedTestCases.map((testCase, index) => (
                  <tr
                    key={index + 1}
                    className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}
                  >
                    <td className="border px-4 py-2">{testCase.Serial}</td>
                    <td className="border px-4 py-2">{testCase.Input}</td>
                    <td className="border px-4 py-2">{testCase.Output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No test cases generated yet.</p>
          )
        ) : (
          <p>Click the "Generate Test Cases" button to generate test cases.</p>
        )}
      </div>
    </div>
  );
};

export default TestCaseGeneration;
