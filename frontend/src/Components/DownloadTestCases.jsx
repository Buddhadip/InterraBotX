// DownloadTestCases.jsx
import React from 'react';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

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
    <div className="relative top-[-8px] right-[-288px]">
      {testCases && testCases.length > 0 && (
        <>
          <CSVLink data={prepareCSVData()} filename={'test-cases.csv'}>
            <button className="bg-green-600 text-white font-bold py-1 px-2 text-sm rounded-3xl mr-2">
              <FontAwesomeIcon icon={faDownload} className="mr-2 " />Download
            </button>
          </CSVLink>
        </>
      )}
    </div>
  );
};

export default DownloadTestCases;
