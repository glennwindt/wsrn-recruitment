import React, { useState, useEffect } from 'react';
import { uploadDocument, fetchDocuments, syncRenewal } from '../../services/documentUploadAPI';

export default function DocumentVault({ wsrnId }) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments(wsrnId).then(setDocuments);
  }, [wsrnId]);

  const handleUpload = async (file, type) => {
    await uploadDocument(wsrnId, file, type);
    setDocuments(await fetchDocuments(wsrnId));
    syncRenewal(wsrnId, type); // triggers WSRN notification
  };

  return (
    <div className="vault-panel">
      <h3>📁 Document Repository</h3>
      <ul>
        {documents.map(doc => (
          <li key={doc.id}>
            <strong>{doc.type}:</strong> <a href={doc.url} target="_blank">Preview</a>
          </li>
        ))}
      </ul>
      <input type="file" onChange={e => handleUpload(e.target.files[0], 'Certificate')} />
    </div>
  );
}

