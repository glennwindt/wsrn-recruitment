export function generateWSRNId(index) {
  const padded = String(index).padStart(6, "0");
  return `WSRN${padded}`;
}

