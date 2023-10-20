import React, { useState } from "react";
import DOMPurify from "dompurify";
import { connect } from 'react-redux';

const SignupPage = ({ isLoggedIn , toggleSignin}) => {
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

  const sanitizedFormData = {
    userName: DOMPurify.sanitize(formData.userName),
    firstName: DOMPurify.sanitize(formData.firstName),
    lastName: DOMPurify.sanitize(formData.lastName),
    userEmail: DOMPurify.sanitize(formData.userEmail),
    userPhone: DOMPurify.sanitize(formData.userPhone),
    userPassword: DOMPurify.sanitize(formData.userPassword),
  };

  const validateForm = () => {
		if (
			!sanitizedFormData.userName ||
      !sanitizedFormData.firstName ||
			!sanitizedFormData.lastName ||
			!sanitizedFormData.userEmail ||
			!sanitizedFormData.userPhone ||
			!sanitizedFormData.userPassword
		) {
			setError("Please fill in all the fields.");
			return false;
		}

		// Password validation
		const password = sanitizedFormData.userPassword;
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
		if (!phoneRegex.test(sanitizedFormData.userPhone)) {
			setError("Phone number must be 10 digits.");
			return false;
		}

		// Email validation
		const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		if (!emailRegex.test(sanitizedFormData.userEmail)) {
			setError("Please enter a valid email address.");
			return false;
		}

		setError(""); // Clear the error message if all validations pass
		return true;
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
      body: JSON.stringify(sanitizedFormData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        else 
        {
          return response.json().then(error => {
            throw new Error(error.message);
          });
    
          // throw new Error("Error");
        }
      })
      .then((data) => {
        console.log(data); // Assuming the server returns some data
        // TODO: Handle success or navigate to a different page
      })
      .catch((error) => {
        // console.error("Signup failed:", error.message);
        // TODO: Handle error or show error message to the user
        setError(`${error.message}`);
      });
  };

  if (isLoggedIn) {
    return null; // Don't render the signup page if the user is logged in
  }
  return (
    <div className="flex justify-center rounded-b-lg rounded-tr-lg items-center bg-gray-900">
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
          <button onClick={toggleSignin} className="text-white">ALready have Account?</button>
        </form>
      </div>
    </div>
  );

};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps)(SignupPage);
