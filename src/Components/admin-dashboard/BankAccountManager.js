// src/components/AdminDashboard/BankAccountManager.js

import React, { useState } from 'react';

const BankAccountManager = () => {
  const [accounts, setAccounts] = useState([]);

  const addAccount = () => {
    // Logic to add new bank account
    console.log("Add new bank account");
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Bank Account Management</h2>
      
      <button 
        onClick={addAccount}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        Add New Bank Account
      </button>

      {/* Display existing accounts */}
      {accounts.map((account) => (
        <div key={account.id} className="mb-4 p-4 border rounded">
          <h3 className="font-medium">{account.name}</h3>
          <p>{account.iban}</p>
          <button 
            onClick={() => /* Remove account */}
            className="text-red-500 mt-2"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default BankAccountManager;