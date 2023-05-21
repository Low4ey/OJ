import React, { useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

export const storeAccessToken = (accessToken) => {
  const sanitizedToken = DOMPurify.sanitize(accessToken);
  const encodedToken = encodeURIComponent(sanitizedToken);
  localStorage.setItem("accessToken", encodedToken);
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
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
      const sanitizedFormData = {
        userEmail: DOMPurify.sanitize(formData.userEmail),
        userPassword: DOMPurify.sanitize(formData.userPassword),
      };

      const response = await axios.post(
        "http://localhost:5005/user/login",
        sanitizedFormData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );

      const { accessToken } = response.data;

      storeAccessToken(accessToken);

      console.log(response.data);

      // Include the access token in the request header for subsequent API calls
    //   const authHeader = {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   };

      // Example API call using the access token in the header
    //   const userDetailsResponse = await axios.get(
    //     "http://localhost:5005/user/details",
    //     authHeader
    //   );

    //   console.log(userDetailsResponse.data);

      navigate("/add-problem"); // Replace "/dashboard" with the desired redirect path
    } catch (error) {
      console.error("Login failed:", error.message);
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
