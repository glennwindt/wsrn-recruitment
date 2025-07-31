// src/documents/DocumentPreview.js

import React from "react";

const DocumentPreview = ({ parsedData }) => {
  if (!parsedData) return <p>No document data available.</p>;

  const { fileName, fileSizeKB, fileType, uploadDate, summary, keywords, status } = parsedData;

  return (
    <div className="document-preview">
      <h2>{fileName}</h2>
      <ul>
        <li><strong>Size:</strong> {fileSizeKB} KB</li>
        <li><strong>Type:</strong> {fileType}</li>
        <li><strong>Uploaded:</strong> {new Date(uploadDate).toLocaleString()}</li>
        <li><strong>Status:</strong> {status}</li>
      </ul>
      <p><strong>Summary:</strong> {summary}</p>
      {keywords?.length > 0 && (
        <div>
          <strong>Keywords:</strong>
          <ul>
            {keywords.map((kw, i) => <li key={i}>{kw}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;

