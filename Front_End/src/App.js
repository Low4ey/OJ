import React,{useState} from "react";
import RichTextEditor from "./components/richText/richText";
import CodeEditor from "./components/codeEditor/codeEditor";
import ProblemPage from "./pages/ShowProblem/showProblem";
import Resizeable from "./components/resizeDiv/Resizeable";

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
            {/* <Resizeable /> */}
            
        </div>
    );
};

export default App;

