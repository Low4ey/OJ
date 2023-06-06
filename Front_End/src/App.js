import React from "react";
import RichTextEditor from "./components/richText/richText";
import CodeEditor from "./components/codeEditor/codeEditor";
import ProblemPage from "./pages/ShowProblem/showProblem";
import AddProblem from "./pages/AddProblem/problem"

import ProblemList from "./pages/ShowProblem/listProblem";

import NavigationSteps from './components/Navbar/steps';


// import LoginPage from "./components/user/LoginPage";
// import SignupPage from "./components/user/SignupPage";

const App = () => {
    const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

    return (
        <div>

            Welcome to my MERN stack application [HOME]

            <NavigationSteps steps={steps} />
            {/* <LoginPage /> */}
            {/* <SignupPage /> */}
            {/* <RichTextEditor /> */}
            {/* <CodeEditor /> */}

            {/* <ProblemPage /> */}
            {/* <AddProblem /> */}
            <ProblemList />
            {/* <AddProblem /> */}
        </div>
    );
};

export default App;

