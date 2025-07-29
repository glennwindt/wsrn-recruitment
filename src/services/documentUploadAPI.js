import { db } from "../services/firebase";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { checkAppAccess } from "./mobileSecurity";

export async function uploadCertificate(documentData, userId) {
  if (!checkAppAccess()) {
    throw new Error('🚫 Session expired or invalid permissions');
  }
  if (!documentData.file || !documentData.type) {
    console.warn("🚫 Missing required document data.");
    return { success: false, error: "Missing file or document type" };
  }

  try {
    const storagePath = `certificates/${userId}/${documentData.type}_${Date.now()}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, documentData.file);

    await uploadTask;
    const downloadURL = await getDownloadURL(storageRef);

    const documentRef = await addDoc(collection(db, "user_documents"), {
      ...documentData,
      fileURL: downloadURL,
      storagePath,
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

export async function uploadDocument(wsrnId, file, docType) {
  return await uploadCertificate({ file, type: docType }, wsrnId);
}

export async function fetchDocuments(wsrnId) {
  try {
    const docsRef = collection(db, "user_documents");
    const q = query(docsRef, where("userId", "==", wsrnId));
    const snapshot = await getDocs(q);
    const documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return documents;
  } catch (err) {
    console.error("❌ Failed to fetch documents:", err.message);
    return [];
  }
}

export async function syncRenewal(wsrnId, docType) {
  try {
    const message = `📢 WSRN Alert: Renewal of ${docType} received for ${wsrnId}`;
    console.log(message);
    await addDoc(collection(db, "wsrn_notifications"), {
      wsrnId,
      type: "DocumentRenewal",
      docType,
      message,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("❌ Failed to sync renewal:", err.message);
  }
}

export async function updateDocumentStatus(documentId, newStatus) {
  try {
    const documentRef = doc(db, "user_documents", documentId);
    const updates = {
      status: newStatus,
      reviewedAt: new Date().toISOString()
    };

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

export const uploadFileWithProgress = (file, path) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${Math.round(progress)}%`);
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
