import React, { useState } from "react";

const CurriculumUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus("");
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first.");
      return;
    }

    // Fake upload logic for now
    setUploadStatus(`Uploading "${selectedFile.name}"...`);
    setTimeout(() => {
      setUploadStatus(`✅ "${selectedFile.name}" uploaded successfully.`);
      setSelectedFile(null);
    }, 1500);
  };

  return (
    <div className="curriculum-uploader">
      <h2>📤 Curriculum Uploader</h2>
      <p>
        Upload class plans, study outlines, devotionals, or media files for students and staff.
        Files should be in PDF, DOCX, or PPT formats.
      </p>

      <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default CurriculumUploader;

