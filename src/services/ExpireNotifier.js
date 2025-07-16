export function checkExpiringDocs(documents, alertFn) {
  const today = new Date();
  documents.forEach(doc => {
    const expiry = new Date(doc.expiryDate);
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 30) {
      alertFn(`${doc.type} expires in ${daysLeft} day(s)`);
    }
  });
}

