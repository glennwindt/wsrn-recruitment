import React from 'react';

const DocumentUploader = ({ documents, handleFileChange }) => {
  const documentFields = [
    { name: 'passport', label: 'Passport' },
    { name: 'certificate', label: 'Certificate' },
    { name: 'cv', label: 'CV / Resume' },
  ];

  return (
    <div className="bg-white p-4 rounded shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>

      {documentFields.map(({ name, label }) => (
        <div key={name} className="mb-4">
          <label className="block text-sm font-medium mb-1">{label}</label>
          <input
            type="file"
            name={name}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full border p-2"
          />
          {documents[name] && (
            <div className="text-sm text-gray-600 mt-1">
              Selected: <strong>{documents[name].name}</strong>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentUploader;

