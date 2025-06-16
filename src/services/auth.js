import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Logged in user:", user.email, "Role:", getUserRole(user.email));
    return user;
  } catch (error) {
    console.error("Login failed:", error.message);
    alert("Authentication failed. Please check your credentials.");
    return null;
  }
};

function getUserRole(email) {
  if (!email) return "guest";
  if (email.endsWith("@wsrn.com")) return "admin";
  if (email.includes(".agency")) return "agency";
  if (email.includes(".shipping")) return "shipping_company";
  if (email.includes(".seafarer")) return "seafarer";
  return "guest";
}

export { login, getUserRole };