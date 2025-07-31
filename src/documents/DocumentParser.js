// src/documents/DocumentParser.js

export const parseDocument = (file) => {
  if (!file || typeof file !== "object") return null;

  const { name, size, type } = file;

  return {
    fileName: name,
    fileSizeKB: Math.round(size / 1024),
    fileType: type,
    uploadDate: new Date().toISOString(),
    summary: "Parsing not yet implemented. Extend with text extraction or OCR.",
    keywords: [],
    status: "Parsed basic metadata"
  };
};

