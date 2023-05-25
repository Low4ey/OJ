import React, { useState, useEffect, useRef } from 'react';
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
    const getProblem = async () => {
      // const { problemId } = useParams();
      // const id = "";
      try {
        // console.log(`http://localhost:5005/api/getProblem?id=${problemId}`);
        const response = await axios.get(
          `http://localhost:5005/api/getProblem?id=${problemId}`,
        );
        setProblemData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getProblem();
  }, [problemId]);

  const markdownContent = "<p>ty<em>rr</em>rr<strong>r</strong></p>";

  return (
    <div className="problem-container">
      <h2>Problem</h2>
      <pre className="problem-data">Title : {problemData.title}</pre>
      {/* <ReactMarkdown>{markdownContent}</ReactMarkdown> */}
      {/* <ReactMarkdown>{problemData.content}</ReactMarkdown> */}

      <pre className="problem-data">Content : <p dangerouslySetInnerHTML={{ __html: problemData.content }}></p></pre>
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
  const refBox = useRef(null);
  const refRight = useRef(null);
  const refBottom = useRef(null);
  useEffect(() => {
    const resizeableElement = refBox.current;
    const styles = window.getComputedStyle(resizeableElement);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let xCord = 0;
    let yCord = 0;
    resizeableElement.style.top = '150px';
    resizeableElement.style.left = '150px';

    // Right
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - xCord;
      width = width + dx;
      xCord = event.clientX;
      resizeableElement.style.width = `${width}px`;
    };

    const onMouseUpRightResize = () => {
      document.removeEventListener('mousemove', onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      xCord = event.clientX;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.left = styles.left;
      resizeableElement.style.right = null;
      document.addEventListener('mousemove', onMouseMoveRightResize);
      document.addEventListener('mouseup', onMouseUpRightResize);
    };

    // Bottom
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - yCord;
      height = height + dy;
      yCord = event.clientY;
      resizeableElement.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = () => {
      document.removeEventListener('mousemove', onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event) => {
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.top = styles.top;
      resizeableElement.style.bottom = null;
      document.addEventListener('mousemove', onMouseMoveBottomResize);
      document.addEventListener('mouseup', onMouseUpBottomResize);
    };

    const resizerRight = refRight.current;
    resizerRight.addEventListener('mousedown', onMouseDownRightResize);

    const resizerBottom = refBottom.current;
    resizerBottom.addEventListener('mousedown', onMouseDownBottomResize);

    return () => {
      resizerRight.removeEventListener('mousedown', onMouseDownRightResize);
      resizerBottom.removeEventListener('mousedown', onMouseDownBottomResize);
    };
  }, []);

  const { problemId } = useParams();
  return (
    <>
      <div className="page-container">
        <div className='wrapper'>
          <div ref={refBox} className='resizeable-box'>
            <div ref={refRight} className='resizer rr'></div>
            <div ref={refBottom} className='resizer rb'></div>
            <Problem problemId={problemId} />
          </div>
        </div>
        <div className="problem-code-container">
          <CodeEditor />
          <TestCases />
        </div>
      </div>
    </>
  );
};

export default ProblemPage;
