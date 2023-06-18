import React from "react";

const Navbar = ({ activeTab, onTabChange, onSignupClick }) => {
	const handleTabClick = (tab) => {
		onTabChange(tab);
	};

	const handleSignupClick = () => {
		onSignupClick();
	};

	return (
		<nav>
			<div className="flex items-center h-full px-12 py-2">
				{/* Left side items */}
				<div className="mr-auto ml-20 flex items-center px-20">
					<div className="m-2 text-base leading-tight">
						<span
							className={`block text-white text-lg font leading-5 ${
								activeTab === "home"
									? "text-blue-500 underline"
									: ""
							}`}
							onClick={() => handleTabClick("home")}
							style={{ cursor: "pointer" }}
						>
							Code Royale
						</span>
					</div>
				</div>

				{/* Right side items */}
				<div className="mr-20 flex items-center px-20">
					<div className="mr-4 pr-20">
						<span
							className={`block text-white text-lg font leading-5 ${
								activeTab === "practice"
									? "text-blue-500 underline"
									: ""
							}`}
							onClick={() => handleTabClick("practice")}
							style={{ cursor: "pointer" }}
						>
							Practice
						</span>
					</div>
					<div className="mr-4 pr-20">
						<span
							className={`block text-white text-lg font leading-5 ${
								activeTab === "compete"
									? "text-blue-500 underline"
									: ""
							}`}
							onClick={() => handleTabClick("compete")}
							style={{ cursor: "pointer" }}
						>
							Compete
						</span>
					</div>
					<button
						className="rounded-tl-xl rounded-bl-xl rounded-br-xl py-2 px-8 border border-white cursor-pointer"
						onClick={handleSignupClick}
					>
						<span className="text-white font text-base">
							Sign Up
						</span>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
