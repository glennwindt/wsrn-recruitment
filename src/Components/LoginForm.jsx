import React, { useState } from "react";
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from "../services/firebase";

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // In real system, use your own Firebase backend
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Login successful.");
      onLoginSuccess?.();
    } catch (err) {
      console.error(err);
      setError("⚠️ Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold">WSRN – Staff & Agency Login</h2>
        <p className="text-sm text-gray-400">
          Sign in to access recruitment tools, legal processing, and payroll management.
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="glenn@wsrn.com"
              required
              className="w-full p-3 bg-gray-700 rounded"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full p-3 bg-gray-700 rounded"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded font-semibold transition ${
              loading ? "bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing In..." : "🔐 Log In"}
          </button>
        </form>

        <div className="pt-4 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">Need an account? Contact support for registration.</p>
        </div>
      </div>
    </div>
  );
}