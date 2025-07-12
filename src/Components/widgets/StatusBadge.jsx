import React from "react";

export default function StatusBadge({ status = "Pending" }) {
  const colorMap = {
    Delivered: "bg-green-800 text-green-300",
    "In Transit": "bg-yellow-800 text-yellow-300",
    Delayed: "bg-red-800 text-red-300",
    Pending: "bg-gray-800 text-gray-300",
    "Paid Off": "bg-green-900 text-green-400",
    "Low Stock": "bg-yellow-900 text-yellow-400",
    Depleted: "bg-red-900 text-red-400"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[status] || "bg-gray-900 text-white"}`}>
      {status}
    </span>
  );
}

