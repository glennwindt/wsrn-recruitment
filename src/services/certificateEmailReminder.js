// src/services/certificateEmailReminder.js

import { db } from "../services/firebase";
import { collection, doc, addDoc } from "firebase/firestore";

export async function sendCertificateRenewalEmail(applicantId, documentType, recipient) {
  try {
    const emailData = {
      applicantId,
      documentType,
      recipient,
      message: generateEmailContent(documentType),
      sentAt: new Date().toISOString(),
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