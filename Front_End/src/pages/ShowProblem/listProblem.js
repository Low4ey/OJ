import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { connect } from "react-redux";


const getAccessToken = () => {
	const encodedToken = localStorage.getItem("accessToken");
	if (encodedToken) {
		const sanitizedToken = decodeURIComponent(encodedToken);
		return DOMPurify.sanitize(sanitizedToken);
	}
	return null;
};

const ProblemList = ({ isLoggedIn }) => {
	const [problems, setProblems] = useState([]);
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [errort, setErrorT ] = useState(false);


	useEffect(() => {
		if (!isLoggedIn) {
		  navigate("/login"); // Redirect to the login page if the user is not logged in
		} else {
		  fetchProblems();
		}
	  }, [isLoggedIn]);	
	

	const accessToken = getAccessToken();

	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest",
		},
		withCredentials: true,
	};

	const fetchProblems = () => {
		fetch("http://localhost:5005/api/getProblem?approved=true", {
			method: "GET",
			headers: config.headers,
			credentials: "include",
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					return response.json().then((error) => {
						throw new Error(error.message);
					});
				}
			})
			.then((data) => setProblems(data))
			.catch((error) => {
				console.log(error);
				setError(`${error}`);
				setErrorT(true);
			});
	};

	const convertProblemName = (title) => {
		return title.toLowerCase().replace(/\s+/g, "-");
	};

	const redirectToProblemPage = (problemTitle) => {
		navigate(`/dashboard/${problemTitle}`);
	};

if(errort) {
	return (
		<div>{error}</div>
	)
}
	return (
		<div className="flex">
			<div className="w-1/3 bg-gray-200 p-4">
				<h1 className="text-2xl font-bold mb-4">Problems</h1>
				{problems.map((problem) => (
					<div
						key={problem._id}
						className="cursor-pointer mb-2 p-2 border border-gray-300"
						onClick={() =>
							redirectToProblemPage(
								convertProblemName(problem.title)
							)
						}
					>
						{problem.title}
					</div>
				))}
			</div>
		</div>
	);

};

const mapStateToProps = (state) => {
	return {
	  isLoggedIn: state.isLoggedIn,
	};
  };
  
export default connect(mapStateToProps)(ProblemList);
