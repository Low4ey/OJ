import React, { useState } from "react";
import axios from "axios";

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
		if (
			!formData.userName ||
			!formData.firstName ||
			!formData.lastName ||
			!formData.userEmail ||
			!formData.userPhone ||
			!formData.userPassword
		) {
			setError("Please fill in all the fields.");
			return false;
		}

		// Password validation
		// Password validation
		// Password validation
		const password = formData.userPassword;
		if (password.length < 8) {
			setError("Password must be at least 8 characters long.");
			return false;
		}
		if (!/[a-z]/.test(password)) {
			setError("Password must contain at least one lowercase letter.");
			return false;
		}
		if (!/[A-Z]/.test(password)) {
			setError("Password must contain at least one uppercase letter.");
			return false;
		}
		if (!/\d/.test(password)) {
			setError("Password must contain at least one number.");
			return false;
		}
		if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
			setError("Password must contain at least one special character.");
			return false;
		}

		// Phone validation
		const phoneRegex = /^\d{10}$/;
		if (!phoneRegex.test(formData.userPhone)) {
			setError("Phone number must be 10 digits.");
			return false;
		}

		// Email validation
		const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		if (!emailRegex.test(formData.userEmail)) {
			setError("Please enter a valid email address.");
			return false;
		}

		setError(""); // Clear the error message if all validations pass
		return true;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			// Send a POST request to the backend API
			const response = await axios.post(
				"http://localhost:5005/user/signup",
				formData
			);

			// Handle the response from the server
			console.log(response.data); // Assuming the server returns some data

			// TODO: Handle success or navigate to a different page
		} catch (error) {
			// Handle error responses from the server
			console.error("Signup failed:", error.message);
			// TODO: Handle error or show error message to the user
			setError("Signup failed. Please try again.");
		}
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
