import React, { useState } from "react";
import Background from "../../assets/bg.png";
import Man from "../../assets/man.png";
import Navbar from "../layout/navbar";
import Practice from "./practicePage";
import Compete from "./competePage";

const HomePage = () => {
	const [activeTab, setActiveTab] = useState("home");

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	const renderContent = () => {
		if (activeTab === "practice") {
			return (<div><Practice/></div>);
		} else if (activeTab === "compete") {
			return (<div><Compete/></div>);
		} else {
			return (
				<div className="flex flex-1 justify-center items-center">
					<div className="w-1/2 text-center">
						<h1 className="text-white font-bold text-4xl">Code</h1>
						<h1 className="text-white font-bold text-4xl mb-4">
							Royale
						</h1>
						<h2 className="text-white font-medium text-sm">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut aliquip
							ex ea commodo consequat.
						</h2>
					</div>
					<div className="w-1/2 flex justify-center">
						<img
							src={Man}
							alt="Man"
							style={{ width: 350, height: 262 }}
							className="my-auto"
						/>
					</div>
				</div>
			);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-center h-screen">
				<img
					src={Background}
					alt="Background"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="h-full w-full gradient-layer backdrop-filter-blur items-center justify-center">
					<div className="w-full gradient-layer backdrop-filter-blur p-1">
						<Navbar
							activeTab={activeTab}
							onTabChange={handleTabChange}
						/>
					</div>
                    {renderContent()}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
