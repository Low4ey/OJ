import React, { useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import './LoginButton.css'; // Import the CSS file for animations

const LoginButton = ({ LoginForm }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    // Animate the slide-out before closing the popup
    setShowPopup(false);
    setTimeout(() => {
      setShowPopup(false);
    }, 500); // Adjust the duration to match the animation duration
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center px-4 py-2 rounded-lg bg-gray-800 text-white text-base font-medium hover:bg-gray-700 transition-all duration-300"
        onClick={handleLogin}
      >
        <IoPersonCircleOutline className="mr-2 h-5 w-5" />
        Login
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-filter backdrop-blur-lg bg-opacity-50 flex items-center justify-center">
            <div className={`bg-gray-800 rounded-lg p-4 animate-slide-${showPopup ? 'up' : 'down'}`}>
              {LoginForm}
              <button
                className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
