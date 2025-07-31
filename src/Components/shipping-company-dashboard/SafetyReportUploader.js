import React, { useState } from "react";

const SafetyReportUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file to upload.");
    const report = {
      file,
      description,
      date: new Date().toISOString(),
    };
    onUpload?.(report);
    setFile(null);
    setDescription("");
  };

  return (
    <div className="safety-report-uploader">
      <h2>📤 Safety Report Uploader</h2>
      <p>
        Upload safety documentation, incident logs, or inspection reports. Ensure your fleet remains compliant and audit-ready.
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Report Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief summary of the report"
            required
          />
        </label>

        <label>
          Select File:
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </label>

        <button type="submit">Upload Report</button>
      </form>
    </div>
  );
};

export default SafetyReportUploader;

