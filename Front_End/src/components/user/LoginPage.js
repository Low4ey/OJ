import React, { useState } from 'react';
import axios from 'axios';
// import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userEmail: '',
    userPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the backend API for user authentication
      const response = await axios.post('http://localhost:5005/user/login', formData);

      // Handle the response from the server
      console.log(response.data); // Assuming the server returns some data

      // TODO: Handle success or navigate to a different page
    } catch (error) {
      // Handle error responses from the server
      console.error('Login failed:', error.message);
      // TODO: Handle error or show error message to the user
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="userEmail"
          placeholder="Email"
          value={formData.userEmail}
          onChange={handleChange}
        />
        <input
          type="password"
          name="userPassword"
          placeholder="Password"
          value={formData.userPassword}
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
