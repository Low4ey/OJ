import React, { useState } from "react";
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const sanitizedFormData = {
      userEmail: DOMPurify.sanitize(formData.userEmail),
      userPassword: DOMPurify.sanitize(formData.userPassword),
    };

    fetch("http://localhost:5005/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(sanitizedFormData),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        const { accessToken } = data;
        storeAccessToken(accessToken);
        console.log(data);
        navigate("/dashboard"); // Replace "/dashboard" with the desired redirect path
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl text-white mb-6 font-secone">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-4 px-4 py-2 rounded-lg bg-custom-gray text-white placeholder-gray-400 font-poppins"
            type="string"
            name="userEmail"
            placeholder="Email"
            value={formData.userEmail}
            onChange={handleChange}
            required
          />
          <input
            className="w-full mb-4 px-4 py-2 rounded-lg bg-custom-gray text-white placeholder-gray-400 font-poppins"
            type="password"
            name="userPassword"
            placeholder="Password"
            value={formData.userPassword}
            onChange={handleChange}
            required
          />
          <button
            className="w-full bg-custom-blue hover:bg-custom-dark-blue text-white font-bold py-2 px-4 rounded font-poppins"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
