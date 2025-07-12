import React from "react";

export default function CTTTrackingWidget({ deliveryCode = "", status = "Pending", showLink = true }) {
  if (!deliveryCode) return (
    <div className="bg-gray-800 p-4 rounded text-center text-sm text-gray-400">
      📦 No CTT tracking available
    </div>
  );

  const colorMap = {
    Delivered: "text-green-400",
    "In Transit": "text-yellow-400",
    Pending: "text-gray-400",
    Delayed: "text-red-400"
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow text-sm flex flex-col items-center justify-center">
      <p className="font-semibold text-white">CTT Delivery Status</p>
      <p className={`mt-2 ${colorMap[status] || "text-gray-300"}`}>{status}</p>
      {showLink && (
        <a
          href={`https://www.ctt.pt/en/tracking/?trackingCode=${deliveryCode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-blue-400 hover:text-blue-300 text-xs underline"
        >
          🔍 Track: {deliveryCode}
        </a>
      )}
    </div>
  );
}

