// InterraBotX.jsx
import React, { useState } from 'react';
import CodeChat from './CodeChat';
import CodeCompletion from './CodeCompletion';
import CodeGeneration from './CodeGeneration';
import TestCaseGeneration from './TestCaseGeneration';

const InterraBotX = () => {
  const [selectedUseCase, setSelectedUseCase] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleUseCaseChange = (e) => {
    setSelectedUseCase(e.target.value);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">InterraBotX</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto my-8 p-8 flex border border-black " style={{ display: 'flex', width: '100vw', height: '80vh' }}>
        {/* Left Panel */}
        <div className="mr-8 w-1/4 border-r-2 border-green-950 pr-4">
          <h2 className="text-xl font-bold mb-2">Options</h2>

          {/* Add Model Dropdown */}
          <label className="block mb-2">
            Model:
            <select
              className="border rounded p-2 w-full"
              value={selectedModel}
              onChange={handleModelChange}
            >
              {/* Add model options */}
              <option value="">Select Model</option>
              <option value="model1">OpenAI</option>
              <option value="model2">Codey</option>
            </select>
          </label>

          <label className="block mb-2">
            Use Case:
            <select
              className="border rounded p-2 w-full"
              value={selectedUseCase}
              onChange={handleUseCaseChange}
            >
              <option value="">Select Use Case</option>
              <option value="codeChat">Code Generation Chat</option>
              <option value="codeCompletion">Code Completion</option>
              <option value="codeGeneration">Function Generation</option>
              <option value="testCaseGeneration">Test Case Generation</option>
            </select>
          </label>

          {/* Add Language Dropdown */}
          <label className="block mb-2">
            Language:
            <select
              className="border rounded p-2 w-full"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {/* Add language options */}
              <option value="">Select Language</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
          </label>
        </div>

        {/* Right Panel */}
        <div className="w-3/4 pl-4">
          {selectedUseCase === 'codeChat' && <CodeChat/>}
          {selectedUseCase === 'codeCompletion' && <CodeCompletion />}
          {selectedUseCase === 'codeGeneration' && <CodeGeneration />}
          {selectedUseCase === 'testCaseGeneration' && <TestCaseGeneration />}
          {selectedUseCase === 'uploadCode' && <UploadCode />}
        </div>
      </div>
    </div>
  );
};

export default InterraBotX;
