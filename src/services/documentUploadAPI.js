// src/services/documentUploadAPI.js
import { db, storage } from "./firebase"; // Modified import
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc 
} from "firebase/firestore";
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";
import { checkAppAccess } from "./mobileSecurity";

// 1. PRESERVED EXISTING FUNCTIONS (with enhancements)
export async function uploadCertificate(documentData, userId) {
  if (!checkAppAccess()) {
    throw new Error('🚫 Session expired or invalid permissions');
  }

  if (!documentData.file || !documentData.type) {
    console.warn("🚫 Missing required document data.");
    return { success: false, error: "Missing file or document type" };
  }

  try {
    // NEW: First upload the file to storage
    const storagePath = `certificates/${userId}/${documentData.type}_${Date.now()}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, documentData.file);

    // Wait for upload to complete
    await uploadTask;
    const downloadURL = await getDownloadURL(storageRef);

    // Modified: Store metadata in Firestore
    const documentRef = await addDoc(collection(db, "user_documents"), {
      ...documentData,
      fileURL: downloadURL, // NEW
      storagePath: storagePath, // NEW
      userId,
      uploadedAt: new Date().toISOString(),
      status: "Pending Review"
    });

    console.log(`📄 Document ${documentData.type} uploaded for user ${userId}`);
    return { 
      success: true, 
      docId: documentRef.id,
      fileURL: downloadURL 
    };
  } catch (err) {
    console.error("❌ Failed to upload document:", err.message);
    return { success: false, error: err.message };
  }
}

// 2. ENHANCED STATUS UPDATE (now with storage cleanup)
export async function updateDocumentStatus(documentId, newStatus) {
  try {
    const documentRef = doc(db, "user_documents", documentId);
    const updates = {
      status: newStatus,
      reviewedAt: new Date().toISOString()
    };

    // NEW: Auto-cleanup for rejected documents
    if (newStatus === "Rejected") {
      const docSnapshot = await getDoc(documentRef);
      if (docSnapshot.exists()) {
        const { storagePath } = docSnapshot.data();
        if (storagePath) {
          await deleteObject(ref(storage, storagePath));
          updates.fileURL = null;
          console.log(`🗑️ Deleted storage file for document ${documentId}`);
        }
      }
    }

    await updateDoc(documentRef, updates);
    console.log(`✅ Document ${documentId} marked as "${newStatus}"`);
    return true;
  } catch (err) {
    console.error("❌ Failed to update document status:", err.message);
    return false;
  }
}

// 3. NEW FILE UPLOAD FUNCTIONALITY
export const uploadFileWithProgress = (file, path) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${Math.round(progress)}%`);
        // You can add this to your UI state if needed
      },
      (error) => {
        reject({
          code: error.code,
          message: error.message,
          isRecoverable: [
            'storage/retry-limit-exceeded',
            'storage/network-request-failed'
          ].includes(error.code)
        });
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            url: downloadURL,
            path: uploadTask.snapshot.ref.fullPath,
            metadata: file
          });
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};