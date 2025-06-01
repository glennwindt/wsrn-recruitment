// src/services/aimaPortal.js

import { getAuth } from "firebase/auth";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const auth = getAuth();

export async function submitLegalDocument(data) {
  if (!data.applicantName || !data.nifNumber || !data.nissNumber) {
    console.warn("🚫 Missing required legal data.");
    return null;
  }

  try {
    const response = await fetch("https://www.aima.gov.pt/api/recruitment/legal ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.currentUser?.accessToken}`
      },
      body: JSON.stringify({
        ...data,
        submittedBy: auth.currentUser?.email,
        submissionDate: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`AIMA API returned ${response.status}`);
    }

    const result = await response.json();
    await addDoc(collection(db, "legal_applications"), {
      ...data,
      trackingCode: result.trackingCode,
      status: "Submitted",
      submittedAt: new Date().toISOString()
    });

    console.log("✅ Application successfully submitted to AIMA:", result);
    return result;
  } catch (err) {
    console.error("❌ Failed to submit to AIMA:", err.message);
    return { success: false, error: err.message };
  }
}

export async function checkApplicationStatus(trackingCode) {
  try {
    const response = await fetch(`https://www.aima.gov.pt/api/status/ ${trackingCode}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${auth.currentUser?.accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Status check failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("🔍 AIMA Application Status:", result.status);
    return result;
  } catch (err) {
    console.error("❌ AIMA Status Check Failed:", err.message);
    return { success: false, error: err.message };
  }
}