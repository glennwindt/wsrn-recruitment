// src/services/aiDocumentValidation.js

import { db } from "../services/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

/**
 * Simulates OCR document scanning
 */
export async function scanDocument(fileBlob) {
  // In real app, this would use Google Cloud Vision / Firebase Functions
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        confidence: Math.random() * 0.4 + 0.7, // Between 0.7 - 1.1
        data: {
          name: "John Doe",
          passportNumber: "P123456789",
          expiryDate: "2030-12-31",
          nationality: "Philippines"
        }
      });
    }, 1500);
  });
}

/**
 * Validates document based on type
 */
export async function validateUploadedDocument(documentId, fileBlob, documentType) {
  if (!fileBlob || !documentType) {
    console.warn("🚫 No document provided for validation.");
    return null;
  }

  try {
    const ocrResult = await scanDocument(fileBlob);

    const validationResult = {
      documentId,
      type: documentType,
      isValid: ocrResult.confidence > 0.85,
      confidence: ocrResult.confidence,
      extractedData: ocrResult.data,
      scannedAt: new Date().toISOString()
    };

    // Update Firestore record
    const documentRef = doc(db, "user_documents", documentId);
    await updateDoc(documentRef, {
      validated: true,
      valid: validationResult.isValid,
      confidence: validationResult.confidence,
      extractedData: validationResult.extractedData,
      scannedAt: validationResult.scannedAt
    });

    console.log(`🧠 AI Validation completed for ${documentId}:`, validationResult);
    return validationResult;

  } catch (err) {
    console.error("❌ AI Document Validation failed:", err.message);
    return { success: false, error: err.message };
  }
}