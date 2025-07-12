// src/components/seafarer-application-form/DocumentUploader.jsx

import React, { useState } from 'react';

const DocumentUploader = () => {
  const [documents, setDocuments] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments(files);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="w-full border p-2"
      />

      {documents.length > 0 && (
        <ul className="mt-4 list-disc ml-5 text-sm text-gray-600">
          {documents.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentUploader;