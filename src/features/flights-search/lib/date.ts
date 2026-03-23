export const formatDate = (date: Date) => date.toISOString().split("T")[0];

export const formatDateDDMM = (dateStr: string) => {
  const date = new Date(dateStr + "T00:00:00");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}${month}`;
};

export const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
};

export const formatDateDisplay = (dateStr: string) => {
  const date = new Date(dateStr + "T00:00:00");

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
