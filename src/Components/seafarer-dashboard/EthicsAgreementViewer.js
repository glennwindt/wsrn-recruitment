import React, { useState } from "react";

const EthicsAgreementViewer = ({ agreementText = "", onAcknowledge }) => {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleAcknowledge = () => {
    setAcknowledged(true);
    onAcknowledge?.(new Date().toISOString());
  };

  return (
    <div className="ethics-agreement-viewer">
      <h2>🕊️ WSRN Ethics Commitment</h2>

      <div className="agreement-text">
        <p>{agreementText || "Loading ethics charter..."}</p>
      </div>

      {!acknowledged ? (
        <button onClick={handleAcknowledge}>
          I Acknowledge and Agree
        </button>
      ) : (
        <p className="acknowledged">✅ Acknowledged on {new Date().toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default EthicsAgreementViewer;

