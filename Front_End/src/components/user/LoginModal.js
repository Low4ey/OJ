import React, { useState } from 'react';
import Modal from 'react-modal';
import './ModalComponent.css'; // Import your CSS file
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };
  const toggleSignUp = () => {
    setIsSignUp(true);
  };
  const toggleSignin = () => {
    setIsSignUp(false);
  };

  return (
    <div>
      <button  className="bg-gray-900 hover:bg-custom-dark-blue text-white font-bold py-2 px-4 rounded" onClick={openModal}>Login / SignUp</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Sign Up/Sign In Modal"
        className="modal-content bg-transparent" // Apply CSS class to the modal content
        overlayClassName="modal-overlay" // Apply CSS class to the modal overlay
      >
        {/* <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2> */}
        <div className='flex align-center justify-center'>
            <button className={`font-bold p-2 text-lg rounded-t-lg ${isSignUp?" bg-gray-800 text-white":""} w-40 m-x-10`} onClick={toggleSignUp}>
        Sign Up
        </button>
        <button onClick={toggleSignin} className={`font-bold p-2 text-lg rounded-t-lg ${!isSignUp?" bg-gray-800 text-white":""} border-x-20 w-40 ml-10`}>
          Sign in
        </button>
        </div>
        <div className=''>
        {isSignUp ? (
          <SignupPage toggleSignin={toggleSignin}/>
        ) : (
            <LoginPage />
        )}
        </div>
        {/* <button onClick={closeModal}>Close Modal</button> */}
      </Modal>
    </div>
  );
};

export default LoginModal;
