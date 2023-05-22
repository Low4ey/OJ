import React from "react";
import RichTextEditor from "./components/richText/richText";
import CodeEditor from "./components/codeEditor/codeEditor";
import ProblemPage from "./pages/ShowProblem/showProblem";

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
            <ProblemPage />
            
        </div>
    );
};

export default App;

