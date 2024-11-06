export const isDateInPeriod = (dueDate, period) => {
  const date = new Date(dueDate);
  const now = new Date();

  if(dueDate==null){
    return false
  }
  if (period === "Today") {
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }

  if (period === "This week") {
    // Start of the week (Sunday)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    // End of the week (Saturday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return date >= startOfWeek && date <= endOfWeek;
  }

  if (period === "This month") {
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }
  if (period === "All") {
    return true;
  }

  return false;
};
