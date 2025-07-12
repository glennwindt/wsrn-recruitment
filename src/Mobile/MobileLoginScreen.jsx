// src/mobile/MobileLoginScreen.jsx
// NOTE: Assuming this file contains login logic similar to LoginPage.jsx

import React, { useState } from 'react';
// CORRECTED: Import 'auth' as a NAMED export now
import { auth, signInWithEmailAndPassword } from '../services/firebase'; 
// You might also need 'useNavigate' if this screen handles navigation after login
// import { useNavigate } from 'react-router-dom'; 

const MobileLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const navigate = useNavigate(); // Uncomment if you need navigation

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // navigate('/'); // Uncomment and use if navigation is required
      console.log("Mobile Login Successful!"); // Use console.log for success
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
      console.error("Mobile Login Error:", err.message); // Log the actual error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">WSRN Mobile Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-3 mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-3 mb-4 rounded"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700 transition"
        >
          Sign In
        </button>
        <div className="mt-4 text-sm text-gray-500 text-center">
          Forgot password? Contact support@wsrn.com
        </div>
      </div>
    </div>
  );
};

export default MobileLoginScreen;
