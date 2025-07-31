import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

/**
 * Records a heartbeat signal from a specific system component
 * @param {string} componentName - Descriptive name of the component
 */
export async function sendHeartbeat(componentName) {
  const ref = doc(db, "systemHeartbeat", componentName);
  await setDoc(
    ref,
    {
      lastSeen: serverTimestamp()
    },
    { merge: true }
  );
}

