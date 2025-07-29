import { collection, query, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../import { db } from "../services/firebase";";

const applicationsRef = collection(db, "applicants");

export async function checkDocumentExpiry(userId) {
  try {
    const q = query(applicationsRef);
    const snapshot = await getDocs(q);

    const expiredDocuments = [];

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const passportExpiry = new Date(data.passportExpiryDate);
      const medicalExpiry = new Date(data.medicalCertificateExpiry);
      const stcwExpiry = new Date(data.stcwExpiryDate);

      const now = new Date();

      if (passportExpiry < now || medicalExpiry < now || stcwExpiry < now) {
        expiredDocuments.push({
          userId: data.userId,
          name: data.name,
          passportExpired: passportExpiry < now,
          medicalExpired: medicalExpiry < now,
          stcwExpired: stcwExpiry < now
        });
      }
    });

    return expiredDocuments;
  } catch (err) {
    console.error("❌ Error checking document expiry:", err);
    return [];
  }
}

export async function notifyUserOfExpiry(userId) {
  const expired = await checkDocumentExpiry(userId);

  if (expired.length > 0) {
    alert(`⚠️ Some of your documents have expired. Please renew them before applying.`);
    console.log("Expired documents for user:", expired);
  }
}

