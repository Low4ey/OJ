import React, { useState , useEffect } from 'react';
import axios from 'axios';
import CodeEditor from '../../components/codeEditor/codeEditor';
import "./showProblem.css"
import { useParams } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
// import InputSlider from 'react-input-slider';


// const MarkdownComponent = ({ content }) => {
//   return <ReactMarkdown>{content}</ReactMarkdown>;
// };


const Problem = ({ problemId }) => {

  const [problemData, setProblemData] = useState('');

  useEffect(() => {
    const getProblem = async ()=> {
      // const { problemId } = useParams();
      // const id = "";
      try {
        // console.log(`http://localhost:5005/api/getProblem?id=${problemId}`);
        const response = await axios.get(
          `http://localhost:5005/api/getProblem?id=${problemId}`,
        );
        setProblemData(response.data); // view this as variable
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getProblem();
  },[problemId]);

  const markdownContent = "<p>ty<em>rr</em>rr<strong>r</strong></p>";

  return (
    <div className="problem-container">
      <h2>Problem</h2>
      <pre className="problem-data">Title : {problemData.title}</pre>
      {/* <ReactMarkdown>{markdownContent}</ReactMarkdown> */}
      {/* <ReactMarkdown>{problemData.content}</ReactMarkdown> */}
      
      <pre className="problem-data">Content : <p dangerouslySetInnerHTML={{__html: problemData.content}}></p></pre>
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
  
  const { problemId } = useParams();
  return (
    <div className="page-container">
        <Problem  problemId={problemId}/>
      <div className="problem-code-container">
        <CodeEditor />
      <TestCases />
      </div>
    </div>
  );
};

export default ProblemPage;
