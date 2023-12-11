import React, { useState, useEffect } from 'react';
import DownloadTestCases from './DownloadTestCases';

const extractFunctionFromPython = (content) => {
  const functionRegex = /def\s+(\w+)\s*\([^)]*\):([\s\S]*?)(?=\bdef\b|$)/g;
  const matches = [];
  let match;

  // Find all matches
  while ((match = functionRegex.exec(content)) !== null) {
    matches.push({ name: match[1], body: match[2] });
  }

  return matches;
};

const readFileContent = async (file) => {
  try {
    const content = await file.text();
    return content;
  } catch (error) {
    console.error('Error reading file content:', error);
    throw error;
  }
};

const TestCaseGeneration = () => {
  const [functionSnippet, setFunctionSnippet] = useState('');
  const [generatedTestCases, setGeneratedTestCases] = useState([]);
  const [testCasesGenerated, setTestCasesGenerated] = useState(false);
  const [functionsList, setFunctionsList] = useState([]); // Add this line
  const [selectedFunction, setSelectedFunction] = useState(''); // Add this line

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
      let prompt = '';

      if (selectedFunction) {
        // If a function is selected, use its snippet
        prompt = `${selectedFunction} \n\nwrite me unit test cases for this function ,
                           containing both negative and positive test cases, 
                           one row will contain serial number(Serial), 
                           another row will contain input field of the function(Input) 
                           and other row will contain expected output(Output),
                           in excel sheet table format with as many rows as you can generate.
                           Provide only the test cases in table format and no extra description, no explanation without any starting sentence`;
      } else {
        // Otherwise, use the manually entered function snippet
        prompt = `${functionSnippet} \n\nwrite me unit test cases for this function ,
                          containing both negative and positive test cases, 
                          one row will contain serial number(Serial), 
                          another row will contain input field of the function(Input) 
                          and other row will contain expected output(Output),
                          in excel sheet table format with as many rows as you can generate.
                          Provide only the test cases in table format and no extra description, no explanation without any starting sentence`;
      }
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
        const testCasesArray = processTestCasesData(data.processedTestCases);
        setGeneratedTestCases(testCasesArray);
      } else {
        console.error('Error: processedTestCases is undefined in the response');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const content = await readFileContent(file);
        const functions = extractFunctionFromPython(content);

        if (functions.length > 0) {
          // Display a dropdown to select the function
          setFunctionSnippet(`Select a function from dropwdown to generate test cases\n`);
          setFunctionsList(functions);
          setSelectedFunction('');
        } else {
          console.error('Unable to extract functions from Python file.');
        }

        event.target.value = ''; // Clear the input value to allow re-uploading of the same file
      } catch (error) {
        console.error('Error reading file content:', error);
      }
    }
  };

  const processTestCasesData = (processedTestCases) => {
    const rows = processedTestCases.split('\n');
    const headers = rows[0].split('|').map(cell => cell.trim()).filter(Boolean);

    return rows.slice(2).map(row => {
      const values = row.split('|').map(cell => cell.trim()).filter(Boolean);
      return headers.reduce((testCase, header, index) => {
        testCase[header] = isNaN(values[index]) ? values[index] : Number(values[index]);
        return testCase;
      }, {});
    });
  };



  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md max-h-70">
      <h2 className="text-2xl font-bold mb-4">Test Case Generation</h2>
      <div className="mb-4">
        <label htmlFor="functionSnippet" className="block text-sm font-medium text-gray-400">
          Function Snippet:
        </label>
        <textarea
          id="functionSnippet"
          className="border p-2 w-full text-black"
          value={ functionSnippet || selectedFunction }
          onChange={(e) => setFunctionSnippet(e.target.value)}
          placeholder="Enter your function snippet here"
        />

        <select
          className="mt-2 p-2 w-full text-black"
          value={selectedFunction}
          onChange={(e) => setSelectedFunction(e.target.value)}
        >
          <option value="" disabled >
            Select a function
          </option>
          {functionsList.map((func) => (
            <option key={func.name} value={func.name}>
              {func.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-400">
          Upload Code File:
        </label>
        <input
          type="file"
          id="fileUpload"
          accept=".js, .py, .java, .cpp, .c"
          onInput={handleFileUpload}
          className="mt-1 p-2 w-full"
        />
      </div>
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
