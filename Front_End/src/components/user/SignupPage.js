import React, { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    userEmail: "",
    userPhone: "",
    userPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Validation logic here...

    return true; // Return true if all validations pass
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    fetch("http://localhost:5005/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Signup request failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Assuming the server returns some data
        // TODO: Handle success or navigate to a different page
      })
      .catch((error) => {
        console.error("Signup failed:", error.message);
        // TODO: Handle error or show error message to the user
        setError("Signup failed. Please try again.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl text-white mb-6">Signup</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-4 px-4 py-2 rounded-lg bg-custom-gray text-white placeholder-gray-400"
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
          />
          <input
            className="w-full mb-4 px-4 py-2 rounded-lg bg-custom-gray text-white placeholder-gray-400"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            className="w-full mb-4 px-4 py-2 rounded-lg bg-custom-gray text-white placeholder-gray-400"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            className="w-full mb-4 px-4 py-2 rounded-lg bg-custom-gray text-white placeholder-gray-400"
            type="email"
            name="userEmail"
            placeholder="Email"
            value={formData.userEmail}
            onChange={handleChange}
          />
          <input
            className="w-full mb-4 px-4 py-2 rounded-lg bg-custom-gray text-white placeholder-gray-400"
            type="tel"
            name="userPhone"
            placeholder="Phone"
            value={formData.userPhone}
            onChange={handleChange}
          />
          <input
            className="w-full mb-4 px-4 py-2 rounded-lg bg-custom-gray text-white placeholder-gray-400"
            type="password"
            name="userPassword"
            placeholder="Password"
            value={formData.userPassword}
            onChange={handleChange}
          />
          <button
            className="w-full bg-custom-blue hover:bg-custom-dark-blue text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default SignupPage;