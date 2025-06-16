import React from "react";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">🔒 Access Denied</h2>
        <p className="mb-6 text-gray-400">
          You do not have permission to access this section of the platform.
        </p>
        <Link to="/" className="text-blue-400 underline hover:text-blue-300">
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
}