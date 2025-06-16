// src/services/geminiAPI.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const auth = getAuth();

export async function askGemini(question) {
  try {
    const response = await fetch("https://gemini.googleapis.com/v1/projects/-/locations/global/models/gemini-pro-vision/retrieve ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.currentUser?.accessToken}`
      },
      body: JSON.stringify({
        messages: [
          { role: "user", content: question }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API returned ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Gemini Response:", result);
    return result;
  } catch (err) {
    console.error("❌ Gemini API failed:", err.message);
    return { success: false, error: err.message };
  }
}