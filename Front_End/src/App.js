import React,{useState} from "react";
import RichTextEditor from "./components/richText/richText";
import CodeEditor from "./components/codeEditor/codeEditor";
import ProblemPage from "./pages/ShowProblem/showProblem";
import AddProblem from "./pages/AddProblem/problem"
import ProblemList from "./pages/ShowProblem/listProblem";
import LoginButton from "./components/buttons/button";
import LoginForm from './components/forms/loginform';


// import LoginPage from "./components/user/LoginPage";
// import SignupPage from "./components/user/SignupPage";
const App = () => {
    return (
        <div>
            Welcome to my MERN stack application [HOME]
            {/* <LoginPage /> */}
            {/* <SignupPage /> */}
            {/* <RichTextEditor /> */}
            {/* <CodeEditor /> */}
            {/* <ProblemPage /> */}
            {/* <AddProblem /> */}
            {/* <ProblemList /> */}
            <LoginButton LoginForm={<LoginForm/>} />
        </div>
    );
};

export default App;

