// src/components/documentExpiry/documentExpiryDetected.js
import React from 'react';
import { isExpired, willExpireBeforeBoarding } from '../../utils/expiryValidator';
import './documentExpiryDetected.css';

const DocumentExpiryDetected = ({ records = [], contractStartDate = '2025-08-01', rotation = { on: 3, off: 3 } }) => {
  if (records.length === 0) return null;

  return (
    <div className="document-checker">
      <h4 className="checker-title">📄 Document Expiry Overview</h4>
      <ul className="doc-list">
        {records.map(({ name, expiry }, index) => {
          const expired = isExpired(expiry);
          const riskyBoarding = !expired && willExpireBeforeBoarding(expiry, contractStartDate, rotation);

          let statusText = '✅ Valid';
          if (expired) statusText = '⚠️ Expired';
          else if (riskyBoarding) statusText = '⏳ Expires before boarding';

          const rowClass = expired
            ? 'expired'
            : riskyBoarding
            ? 'boarding-risk'
            : 'valid';

          return (
            <li
              key={index}
              className={`doc-row ${rowClass}`}
              aria-label={`${name} expires on ${expiry}, status: ${statusText}`}
            >
              <span className="doc-name">{name}</span>
              <span className="doc-expiry">{expiry}</span>
              <span className="doc-status">{statusText}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DocumentExpiryDetected;

