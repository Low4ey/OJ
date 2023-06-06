import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = () => {
    fetch('http://localhost:5005/api/getProblem')
      .then(response => response.json())
      .then(data => setProblems(data))
      .catch(error => {
        console.error('Error fetching problems:', error);
      });
  };

  const convertProblemName = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };
  

  const redirectToProblemPage = (problemTitle) => {
    navigate(`/dashboard/${problemTitle}`);
  };

  return (
    <div className="flex">
      <div className="w-1/3 bg-gray-200 p-4">
        <h1 className="text-2xl font-bold mb-4">Problems</h1>
        {problems.map((problem) => (
          <div
            key={problem._id}
            className="cursor-pointer mb-2 p-2 border border-gray-300"
            onClick={() => redirectToProblemPage(convertProblemName(problem.title))}
          >
            {problem.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemList;
