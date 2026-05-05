export const formatDate = (value) => {
  if (!value) return "-";
  const d = new Date(value); // Parse the date string
  if (Number.isNaN(d.getTime())) return "-"; // Invalid date check
  return d.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }); // Indian format (DD/MM/YYYY)
};

export const formatDateTime = (value) => {
  if (!value) return "-";
  const d = new Date(value); // Parse the date string
  if (Number.isNaN(d.getTime())) return "-"; // Invalid date check
  return d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }); // Indian format for datetime
};
