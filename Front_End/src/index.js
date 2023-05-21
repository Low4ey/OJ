import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import LoginPage from './components/user/LoginPage';
import SignupPage from './components/user/SignupPage';
import EditorPage from './pages/AddProblem/problem';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/add-problem" element={<EditorPage/>} />

      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
