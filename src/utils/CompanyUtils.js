export function formatCurrency(amount = 0) {
  return `€${parseFloat(amount).toFixed(2)}`;
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB");
}

export function getToday() {
  return new Date().toISOString().split("T")[0];
}

export function generateId(prefix, number) {
  return `${prefix}${String(number).padStart(3, "0")}`;
}

