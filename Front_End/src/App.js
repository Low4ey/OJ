import React from "react";
import RichTextEditor from "./components/richText/richText";
import CodeEditor from "./components/codeEditor/codeEditor";
import ProblemPage from "./pages/ShowProblem/showProblem";
import AddProblem from "./pages/AddProblem/problem"

// import LoginPage from "./components/user/LoginPage";
// import SignupPage from "./components/user/SignupPage";

const App = () => {
    return (
        <div>
            {/* <LoginPage /> */}
            {/* <SignupPage /> */}
            Welcome to my MERN stack application
            {/* <RichTextEditor /> */}
            {/* <CodeEditor /> */}
            {/* <ProblemPage /> */}
            <AddProblem />

            
        </div>
    );
};

export default App;

