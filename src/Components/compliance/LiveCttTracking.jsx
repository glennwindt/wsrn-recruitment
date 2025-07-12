import React from "react";

export default function LiveCttTracking({ shipments = [] }) {
  if (shipments.length === 0) return (
    <div className="bg-gray-800 p-4 rounded text-center text-sm text-gray-400">
      📦 No live deliveries yet.
    </div>
  );

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-sm">
      <h2 className="text-xl font-bold mb-4">🚚 Live CTT Shipment Tracker</h2>
      <table className="w-full table-auto border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2">Delivery Code</th>
            <th className="p-2">Supplier</th>
            <th className="p-2">Item</th>
            <th className="p-2">Status</th>
            <th className="p-2">Expected</th>
            <th className="p-2">Prime</th>
            <th className="p-2">Track</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s, i) => (
            <tr key={i} className="hover:bg-gray-700 transition">
              <td className="p-2">{s.code}</td>
              <td className="p-2">{s.supplier}</td>
              <td className="p-2">{s.item}</td>
              <td className="p-2">{s.status}</td>
              <td className="p-2">{s.expectedDelivery || "Unknown"}</td>
              <td className="p-2">{s.isPrime ? "🚀" : "–"}</td>
              <td className="p-2">
                <a
                  href={`https://www.ctt.pt/en/tracking/?trackingCode=${s.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  🔍 Track
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

