// src/utils/fileHandler.js

/**
 * Simulates file upload and returns a fake URL.
 * @param {File} file - The file to upload
 * @returns {Promise<string>}
 */
export const uploadFile = async (file) => {
  console.log('Stub upload:', file.name);
  return Promise.resolve('https://example.com/fake-upload-url');
};

