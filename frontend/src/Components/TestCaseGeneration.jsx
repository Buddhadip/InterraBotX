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
    <div>
      <h2>Test Case Generation</h2>
      <textarea value={functionSnippet} onChange={(e) => setFunctionSnippet(e.target.value)} />
      <button onClick={handleGenerateTestCases}>Generate Test Cases</button>
      <div>
        <h4>Generated Test Cases:</h4>
        {testCasesGenerated ? (
          generatedTestCases && generatedTestCases.length > 0 ? (
            <table>
              {/* Render your table header */}
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>Input</th>
                  <th>Output</th>
                </tr>
              </thead>
              {/* Render your table body */}
              <tbody>
                {generatedTestCases.map((testCase, index) => (
                  <tr key={index + 1}>
                    <td>{testCase.Serial}</td>
                    <td>{testCase.Input}</td>
                    <td>{testCase.Output}</td>
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

         {/* Include the DownloadTestCases component and pass the generated test cases */}
         <DownloadTestCases testCases={generatedTestCases} />
      </div>
    </div>
  );
};

export default TestCaseGeneration;
