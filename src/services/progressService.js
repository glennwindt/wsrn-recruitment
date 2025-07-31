import { db } from "./firebase";
import { collection, getDocs, setDoc, doc, serverTimestamp } from "firebase/firestore";

const progressCollection = collection(db, "devProgress");

export async function fetchProgressData() {
  const snapshot = await getDocs(progressCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// Overwrites the entire task document
export async function updateTask(id, newData) {
  await setDoc(doc(db, "devProgress", id.toString()), newData); // No merge
}

// Overwrites only with status + timestamp (wipes other fields)
export async function toggleTaskStatus(id, newStatus) {
  await setDoc(
    doc(db, "devProgress", id.toString()),
    {
      status: newStatus,
      updatedAt: serverTimestamp()
    }
  );
}

