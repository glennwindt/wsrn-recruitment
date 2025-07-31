// src/documents/DocumentUploader.js

import React, { useState } from "react";
import { parseDocument } from "./DocumentParser";
import DocumentPreview from "./DocumentPreview";

const DocumentUploader = () => {
  const [parsedData, setParsedData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const parsed = parseDocument(file);
    setParsedData(parsed);
  };

  return (
    <div className="document-uploader">
      <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} />
      {parsedData && <DocumentPreview parsedData={parsedData} />}
    </div>
  );
};

export default DocumentUploader;

