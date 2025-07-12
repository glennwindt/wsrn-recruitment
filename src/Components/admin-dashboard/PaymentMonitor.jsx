// src/components/AdminDashboard/PaymentMonitor.jsx

import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

const PaymentMonitor = () => {
  const [blockedEntities, setBlockedEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlockedCompanies = async () => {
      const q = query(collection(db, "blocked_entities"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlockedEntities(data);
      setLoading(false);
    };

    fetchBlockedCompanies();
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Payment Monitor</h2>
      
      {loading ? (
        <p>Loading payment status...</p>
      ) : (
        <>
          {blockedEntities.length > 0 ? (
            <ul>
              {blockedEntities.map(entity => (
                <li key={entity.id} className="mb-2">
                  <strong>{entity.name}</strong> - Blocked since {entity.blockedDate}<br />
                  <small>Crew affected: {entity.crewCount}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No blocked companies at this time.</p>
          )}

          <button 
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Unblock All
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentMonitor;