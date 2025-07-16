import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { AuthProvider } from './context/AuthContext'; // ✅ Add this import

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Provide context to all components */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

