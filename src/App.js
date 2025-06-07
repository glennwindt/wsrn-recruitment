// src/App.jsx

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, getUserRole } from './services/firebase';
import AdminDashboard from './components/AdminDashboard';
import AgencyDashboard from './components/AgencyDashboard';
import ShippingCompanyDashboard from './components/ShippingCompanyDashboard';
import SeafarerApplicationForm from './components/SeafarerApplicationForm';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const role = getUserRole(currentUser.email);
        setUser({ ...currentUser, role });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          {user.role === 'admin' && <AdminDashboard />}
          {user.role === 'agency' && <AgencyDashboard />}
          {user.role === 'shipping_company' && <ShippingCompanyDashboard />}
          {user.role === 'seafarer' && <SeafarerApplicationForm />}
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

// Simple Login Form
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = require('./services/auth');

  const handleLogin = async () => {
    setLoading(true);
    const user = await login(email, password);
    setLoading(false);
    if (!user) {
      // Show login form again
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">WSRN Login</h2>
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
          disabled={loading}
          className={`bg-blue-600 text-white w-full py-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </div>
  );
}

export default App;