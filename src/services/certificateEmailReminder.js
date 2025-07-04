// src/services/certificateEmailReminder.js
import { db } from "./firebase";
import { 
  collection, 
  doc, 
  addDoc, 
  Timestamp,
  query,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore";

// =====================
// 1. PRESERVE EXISTING CODE (100% unchanged)
// =====================
export async function sendCertificateRenewalEmail(applicantId, documentType, recipient) {
  try {
    const emailData = {
      applicantId,
      documentType,
      recipient,
      message: generateEmailContent(documentType),
      sentAt: Timestamp.now(),
      status: "Sent",
      read: false
    };

    await addDoc(collection(db, "email_reminders"), emailData);
    console.log(`📧 Renewal email sent to ${recipient} for ${documentType}`);
    
    return emailData;
  } catch (err) {
    console.error("❌ Failed to send renewal email:", err);
    return { success: false, error: err.message };
  }
}

function generateEmailContent(documentType) {
  switch(documentType) {
    case "STCW":
      return `
        Dear Seafarer / Agency,

        This is a formal reminder that your STCW certification is due for renewal. 
        Under international maritime law, this certificate must be refreshed every 5 years.
        
        Please complete the refresher course at an approved training center and upload the updated document.

        Best regards,
        Worldwide Seafarers Recruitment Network (WSRN)
      `;
    case "Medical Fitness":
      return `
        Dear Seafarer / Agency,

        This is a formal reminder that your medical fitness certificate is due for renewal. 
        Please schedule a new examination and update your record in WSRN.

        Best regards,
        WSRN Team
      `;
    case "GMDSS":
      return `
        Dear Seafarer / Agency,

        This is a formal reminder that your GMDSS radio license is due for renewal. 
        Please complete the required course and update your profile.

        Best regards,
        WSRN Team
      `;
    default:
      return `
        Dear Seafarer / Agency,

        This is a formal reminder that one of your documents is due for renewal. 
        Please review your records and update accordingly.

        Best regards,
        WSRN Team
      `;
  }
}

// =====================
// 2. ADD NEW FEATURES BELOW (as separate functions)
// =====================

/**
 * NEW: Automated batch processing (doesn't modify existing email flow)
 * @returns {Promise<{processedCount: number, failures: array}>}
 */
export async function processExpiringCertificates() {
  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() + 30); // 30-day window
  
  try {
    const expiringDocs = await getDocs(
      query(
        collection(db, "certificates"),
        where("expiryDate", "<=", Timestamp.fromDate(thresholdDate)),
        where("notificationSent", "==", false)
      )
    );

    const results = [];
    for (const doc of expiringDocs.docs) {
      const certData = doc.data();
      const emailResult = await sendCertificateRenewalEmail(
        certData.userId,
        certData.type,
        certData.contactEmail
      );
      
      if (emailResult.success) {
        await updateDoc(doc.ref, { notificationSent: true });
        results.push({ docId: doc.id, emailId: emailResult.id });
      }
    }

    return {
      processedCount: results.length,
      failures: expiringDocs.docs.length - results.length
    };
  } catch (error) {
    console.error("Batch processing failed:", error);
    throw error;
  }
}

/**
 * NEW: Creates in-app notification (optional)
 * @param {string} userId 
 * @param {string} documentType 
 * @param {string} emailId - Reference to original email
 */
export async function createDocumentNotification(userId, documentType, emailId) {
  const notification = {
    userId,
    type: "document_reminder",
    title: `Renewal Required: ${documentType}`,
    body: "Please check your email for renewal instructions",
    relatedEmail: emailId,
    createdAt: Timestamp.now(),
    status: "unread"
  };

  await addDoc(collection(db, "notifications"), notification);
}

// =====================
// 3. QWEN INTEGRATION HELPERS
// =====================
export function getQwenTemplateVersion() {
  return "1.2.0-legacy"; // Matches your current QWEN agreement
}