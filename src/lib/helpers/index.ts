// Generic reusable logic (e.g., formatDate, debounce)
export function formatDateTime(isoString: string) {
  const date = new Date(isoString);

  // ---- Date formatting ----
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });

  const suffix = (n: number) => {
    if (n > 3 && n < 21) return "th"; // handles 11th, 12th, 13th
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formattedDate = `${day}${suffix(day)} ${month}`;

  // ---- Time formatting ----
  const formattedTime = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase(); // converts AM → am

  return { date: formattedDate, time: formattedTime };
}
