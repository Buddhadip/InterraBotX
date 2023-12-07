// App.jsx
import React from 'react';
import CodeCompletion from './Components/CodeCompletion';
import CodeGeneration from './Components/CodeGeneration';
import TestCaseGeneration from './Components/TestCaseGeneration';

const App = () => {
  return (
    <div>
      <h1>React App</h1>
      <CodeCompletion />
      <CodeGeneration />
      <TestCaseGeneration />
    </div>
  );
};

export default App;
