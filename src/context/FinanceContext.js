import React, { createContext, useState } from "react";

export const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [loans, setLoans] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [employees, setEmployees] = useState([]);

  return (
    <FinanceContext.Provider value={{
      loans, setLoans,
      meetings, setMeetings,
      employees, setEmployees
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

