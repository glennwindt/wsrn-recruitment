// src/services/roles.js

export function getUserRole(email) {
  if (!email) return "guest";

  if (email.endsWith("@wsrn.com")) return "admin";
  if (email.endsWith(".agency")) return "agency";
  if (email.endsWith(".shipping")) return "shipping_company";
  if (email.includes(".seafarer")) return "seafarer";

  return "guest";
}