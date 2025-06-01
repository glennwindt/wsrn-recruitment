import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../services/firebase";
import { checkAppAccess } from "../services/mobileSecurity";

export default function MobileLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const hasAccess = checkAppAccess();

      if (!hasAccess) {
        throw new Error("🚫 You no longer have access to WSRN mobile tools.");
      }

      alert("✅ Login successful. Redirecting...");
      window.location.href = "/mobile/applicant-screen";
    } catch (err) {
      console.error(err);
      setError("⚠️ Invalid credentials or access revoked.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6">WSRN Mobile – Login</h2>
        
        {error && (
          <div className="bg-red-900/30 border border-red-700 p-3 mb-6 rounded">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Email Address</label>
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
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full p-3 bg-gray-700 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full py-3 px-4 rounded font-semibold transition ${
              loading ? "bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing In..." : "🔐 Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Only available to WSRN Staff, Agencies, Shipping Companies, and Crew members.
        </p>
      </div>
    </div>
  );
}