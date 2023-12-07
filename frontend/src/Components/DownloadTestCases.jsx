// DownloadTestCases.jsx
import React from 'react';
import { CSVLink } from 'react-csv';

const DownloadTestCases = ({ testCases }) => {
  // Function to format the test cases data into CSV format
  const prepareCSVData = () => {
    const csvData = [
      ['Serial Number', 'Input', 'Output'],
      ...testCases.map((testCase) => [testCase.Serial, testCase.Input, testCase.Output]),
    ];
    return csvData;
  };

  return (
    <div>
      {testCases && testCases.length > 0 && (
        <CSVLink data={prepareCSVData()} filename={'test-cases.csv'}>
          Download CSV
        </CSVLink>
      )}
    </div>
  );
};

export default DownloadTestCases;
