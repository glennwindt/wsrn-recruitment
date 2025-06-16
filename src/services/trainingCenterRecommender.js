// src/services/trainingCenterRecommender.js

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export async function recommendTrainingCenter(location, certificateType, applicantId) {
  try {
    const q = query(collection(db, "training_centers"));
    const snapshot = await getDocs(q);

    const centers = [];
    snapshot.forEach(docSnap => {
      centers.push(docSnap.data());
    });

    // Match by country first
    let matchedCenters = centers.filter(c => c.country === location.country);

    // If no matches, fallback to global list
    if (matchedCenters.length === 0) {
      matchedCenters = centers;
    }

    // Filter by course type
    const finalMatches = matchedCenters.filter(c => 
      c.courses.includes(certificateType)
    );

    console.log(`🎓 Recommended centers for ${certificateType} near ${location.city}, ${location.country}:`, finalMatches);
    return finalMatches;

  } catch (err) {
    console.error("❌ Failed to find training centers:", err);
    return [];
  }
}