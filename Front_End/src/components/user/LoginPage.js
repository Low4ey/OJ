import React, { useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

// import './LoginPage.css';

export const storeAccessToken = (accessToken) => {
    const sanitizedToken = DOMPurify.sanitize(accessToken);
    const encodedToken = encodeURIComponent(sanitizedToken);
    localStorage.setItem("accessToken", encodedToken);
};

const LoginPage = () => {
    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: "",
    });

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [redirect, setRedirect] = useState(false);

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
            //prevention of  potential XSS attacks by sanitizing
            const sanitizedFormData = {
                userEmail: DOMPurify.sanitize(formData.userEmail),
                userPassword: DOMPurify.sanitize(formData.userPassword),
            };

            // Send a POST request to the backend API for user authentication
            const response = await axios.post(
                "http://localhost:5005/user/login",
                sanitizedFormData,
                {
                    withCredentials: true, // Send cookies with the request
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest", // Add X-Requested-With header to mitigate CSRF attacks
                    },
                }
            );
            const { accessToken } = response.data;

            // Store the access token in the browser's localStorage
            storeAccessToken(accessToken);

            // Handle the response from the server
            console.log(response.data); // Assuming the server returns some data

            // Set the login status to true
            // setIsLoggedIn(true);

            // Set the redirect flag to true
            // const navigate = useNavigate();
            // navigate('/dashboard');

            // TODO: Handle success or navigate to a different page
        } catch (error) {
            // Handle error responses from the server
            console.error("Login failed:", error.message);
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
            {/* {redirect && isLoggedIn && <Redirect to="/dashboard" />} */}
        </div>
    );
};

export default LoginPage;
