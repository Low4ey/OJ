import React, { useState } from 'react';
import CodeEditor from '../../components/codeEditor/codeEditor';
import "./showProblem.css"

const Problem = () => {
  // Sample problem data
  const problemData = `This is a sample problem. Solve it using your preferred programming language.
  
  Input:
  - A single integer n
  
  Output:
  - Print the first n even numbers
  
  Example:
  Input: 5
  Output: 2 4 6 8 10`;

  return (
    <div className="problem-container">
      <h2>Problem</h2>
      <pre className="problem-data">{problemData}</pre>
    </div>
  );
};

const TestCases = () => {
  const [testCases, setTestCases] = useState('');

  const handleTestCasesChange = (e) => {
    setTestCases(e.target.value);
  };

  const handleRunCode = () => {
    // Implement code execution logic here
    console.log('Running code...');
    console.log('Test cases:', testCases);
  };

  const handleSubmitCode = () => {
    // Implement code submission logic here
    console.log('Submitting code...');
    console.log('Test cases:', testCases);
  };

  return (
    <div className="test-cases-container">
      <h3>Test Cases</h3>
      <textarea
        value={testCases}
        onChange={handleTestCasesChange}
        placeholder="Enter test cases..."
        rows={6}
      />
      <div className="test-cases-buttons">
        <button onClick={handleRunCode}>Run</button>
        <button onClick={handleSubmitCode}>Submit</button>
      </div>
    </div>
  );
};

const ProblemPage = () => {
  return (
    <div className="page-container">
        <Problem />
      <div className="problem-code-container">
        <CodeEditor />
      <TestCases />
      </div>
    </div>
  );
};

export default ProblemPage;
