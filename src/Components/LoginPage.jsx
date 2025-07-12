import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold text-blue-700 mb-4">WSRN Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 mb-2"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-4"
        />
        
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 hover:bg-blue-700 transition"
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

export default LoginPage;