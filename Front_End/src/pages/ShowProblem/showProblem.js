import React, { useState, useEffect } from 'react';
import CodeEditor from '../../components/codeEditor/codeEditor';
import './showProblem.css';
import { useParams } from 'react-router-dom';

const Problem = ({ problemTitle }) => {
  const [problemData, setProblemData] = useState('');

  useEffect(() => {
    const getProblem = () => {
      fetch(`http://localhost:5005/api/getProblem?title=${problemTitle}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch problem data');
          }
          return response.json();
        })
        .then((data) => {
          setProblemData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getProblem();
  }, [problemTitle]);

  return (
    <div className="problem-container">
      <h2>Problem</h2>
      <pre className="problem-data">Title : {problemData.title}</pre>
      <pre className="problem-data">
        Content :{' '}
        <p dangerouslySetInnerHTML={{ __html: problemData.content }}></p>
      </pre>
      <pre className="problem-data">Difficulty : {problemData.difficulty}</pre>
      <pre className="problem-data">Tags : {problemData.tags}</pre>
    </div>
  );
};

const TestCases = () => {
  const [testCases, setTestCases] = useState('');

  const handleTestCasesChange = (e) => {
    setTestCases(e.target.value);
  };

  const handleRunCode = () => {
    console.log('Running code...');
    console.log('Test cases:', testCases);
  };

  const handleSubmitCode = () => {
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
  const { problemTitle } = useParams();

  const convertToTitle = (str) => {
    return str.replace(/-/g, ' ');
  };

  return (
    <div className="page-container">
      <Problem problemTitle={convertToTitle(problemTitle)} />
      <div className="problem-code-container">
        <CodeEditor />
        <TestCases />
      </div>
    </div>
  );
};

export default ProblemPage;
