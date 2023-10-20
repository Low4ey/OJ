import React,{useState} from "react";
import RichTextEditor from "./components/richText/richText";
import CodeEditor from "./components/codeEditor/codeEditor";
import ProblemPage from "./pages/ShowProblem/showProblem";
import AddProblem from "./pages/AddProblem/problem"
import ProblemList from "./pages/ShowProblem/listProblem";

import LoginPage from "./components/user/LoginPage";
import Dashboard from "./pages/dashboard/dashboard";
import Navbar from "./components/Navbar/navbar";
import SignupPage from "./components/user/SignupPage";
import Resize from "./components/resizeDiv/Resize";
const App = ({isLoggedIn}) => {
    return (
        <div>
            <Navbar />
            <Dashboard />
            {/* <Resize /> */}
            {/* Welcome to my MERN stack application [HOME] */}
            {/* <LoginPage /> */}
            {/* <SignupPage /> */}
            {/* <RichTextEditor /> */}
            {/* <CodeEditor /> */}
            {/* <ProblemPage /> */}
            {/* <AddProblem /> */}
            {/* <ProblemList /> */}
            {/* <Dashboard /> */}
            {/* <Dashboard /> */}
        </div>
    );
};
const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
  });
export default App;

