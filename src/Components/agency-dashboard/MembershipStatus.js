import React from "react";

export default function MembershipStatus({ agency }) {
  if (agency.accountType !== "membership") return null;

  const now = new Date();
  const expiryDate = new Date(agency.membershipExpiry);
  const timeDiff = Math.floor((expiryDate - now) / (1000 * 60 * 60 * 24));

  return (
    <div className="mb-6">
      <div className={`p-4 rounded border-l-4 ${
        timeDiff < 30 ? "bg-yellow-900/10 border-yellow-500" : "bg-green-900/10 border-green-500"
      }`}>
        <h3 className="font-semibold">Membership Status</h3>
        <p className="mt-1 text-sm">
          Your current plan is: <strong>{agency.membershipTier}</strong>
        </p>
        <p className="mt-1 text-sm">
          Membership expires: <strong>{agency.membershipExpiry}</strong>
        </p>
        {timeDiff < 30 && (
          <p className="mt-2 text-yellow-400 text-sm">
            ⚠️ Your membership will expire in {timeDiff} days. Consider renewal.
          </p>
        )}
      </div>
    </div>
  );
}