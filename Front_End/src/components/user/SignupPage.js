import React, { useState } from "react";
import axios from "axios";
import "./SignupPage.css";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        userEmail: "",
        userPhone: "",
        // userCountry:'',
        userPassword: "",
        // userRole: '',
        // userInstitute: '',
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
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={formData.userName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="userEmail"
                    placeholder="Email"
                    value={formData.userEmail}
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    name="userPhone"
                    placeholder="Phone"
                    value={formData.userPhone}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="userPassword"
                    placeholder="Password"
                    value={formData.userPassword}
                    onChange={handleChange}
                />
                {/* <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        /> */}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;
