// src/services/documentUploadAPI.js

import { db } from "../services/firebase";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";

export async function uploadCertificate(documentData, userId) {
  if (!documentData.file || !documentData.type) {
    console.warn("🚫 Missing required document data.");
    return null;
  }

  try {
    const documentRef = await addDoc(collection(db, "user_documents"), {
      ...documentData,
      userId,
      uploadedAt: new Date().toISOString(),
      status: "Pending Review"
    });

    console.log(`📄 Document ${documentData.type} uploaded for user ${userId}`);
    return documentRef.id;
  } catch (err) {
    console.error("❌ Failed to upload document:", err.message);
    return { success: false, error: err.message };
  }
}

export async function updateDocumentStatus(documentId, newStatus) {
  try {
    const documentRef = doc(db, "user_documents", documentId);
    await updateDoc(documentRef, {
      status: newStatus,
      reviewedAt: new Date().toISOString()
    });

    console.log(`✅ Document ${documentId} marked as "${newStatus}"`);
    return true;
  } catch (err) {
    console.error("❌ Failed to update document status:", err.message);
    return false;
  }
}