export function exportToCSV(dataArray, fileName = "wsrn-export.csv") {
  if (!Array.isArray(dataArray) || dataArray.length === 0) return;

  const header = Object.keys(dataArray[0]).join(",");
  const rows = dataArray.map(obj =>
    Object.values(obj).map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")
  );

  const csvContent = [header, ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

