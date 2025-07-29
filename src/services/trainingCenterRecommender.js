// src/services/trainingCenterRecommender.js

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function recommendTrainingCenter(location, certificateType, applicantId) {
  try {
    const q = query(collection(db, "training_centers"));
    const snapshot = await getDocs(q);

    const centers = snapshot.docs.map(doc => doc.data());

    let matchedCenters = centers.filter(c => c.country === location.country);

    if (matchedCenters.length === 0) {
      matchedCenters = centers;
    }

    const finalMatches = matchedCenters.filter(c =>
      c.courses.includes(certificateType)
    );

    console.log(
      `🎓 Recommended centers for ${certificateType} near ${location.city}, ${location.country}:`,
      finalMatches
    );

    return finalMatches;
  } catch (err) {
    console.error("❌ Failed to recommend training centers:", err.message);
    return [];
  }
}

