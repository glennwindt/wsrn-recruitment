import React, { useState } from "react";
import MembershipStatus from "./MembershipStatus";

export default function AgencyAccountSettings({ agency }) {
  const [autoRenew, setAutoRenew] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400">Company Name</label>
            <input type="text" defaultValue={agency.name} disabled className="w-full p-3 bg-gray-700 rounded mt-1" />
          </div>
          <div>
            <label className="block text-sm text-gray-400">Email</label>
            <input type="email" defaultValue={agency.email} disabled className="w-full p-3 bg-gray-700 rounded mt-1" />
          </div>
        </div>
      </div>

      {agency.accountType === "membership" && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Membership Plan</h3>
          <div className="bg-gray-700 p-4 rounded space-y-4">
            <p>
              <strong>Tier:</strong> {agency.membershipTier}
            </p>
            <p>
              <strong>Expires On:</strong> {agency.membershipExpiry}
            </p>
            <div className="flex items-center justify-between">
              <span>Auto-Renew Membership</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={autoRenew} onChange={() => setAutoRenew(!autoRenew)} className="sr-only peer" />
                <div className={`w-11 h-6 ${autoRenew ? 'bg-blue-600' : 'bg-gray-600'} rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 transition-all duration-300 ease-in-out`}></div>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-gray-700">
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm">
          🔐 Change Password
        </button>
        <button className="ml-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm">
          📁 Manage Vessels
        </button>
      </div>
    </div>
  );
}