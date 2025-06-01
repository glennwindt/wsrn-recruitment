import React, { useState } from "react";
import { createUserWithEmailAndPassword, auth } from "../services/firebase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("seafarer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create user with email/password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // You can now store additional info in Firestore if needed
      alert(`User ${user.email} registered as ${userType}`);
      console.log("Registered User:", user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Register with WSRN</h2>

        {/* Role Selection */}
        <div>
          <label className="block mb-2 font-medium">Register As</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded"
          >
            <option value="seafarer">Seafarer (Free Registration)</option>
            <option value="agency">Agency (Commission or Membership)</option>
            <option value="shippingCompany">Shipping Company</option>
          </select>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}