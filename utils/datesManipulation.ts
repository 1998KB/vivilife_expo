export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(today.getDate() + 7);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  const isToday = date.toDateString() === today.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  // Check if the date is within the current week
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const isThisWeek = date >= startOfWeek && date <= endOfWeek;

  // Check if the date is within the next week
  const startOfNextWeek = new Date(endOfWeek);
  startOfNextWeek.setDate(endOfWeek.getDate() + 1);

  const endOfNextWeek = new Date(startOfNextWeek);
  endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);

  const isNextWeek = date >= startOfNextWeek && date <= endOfNextWeek;

  // Past date logic
  const isPast = date < today;

  if (isToday) {
    return "Today";
  } else if (isTomorrow) {
    return "Tomorrow";
  } else if (isThisWeek) {
    return `This ${date.toLocaleDateString("en-GB", { weekday: "long" })}`;
  } else if (isNextWeek) {
    return `Next ${date.toLocaleDateString("en-GB", { weekday: "long" })}`;
  } else if (isPast) {
    // If past, provide a specific format
    const daysDiff = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysDiff <= 7) {
      return `Last ${date.toLocaleDateString("en-GB", { weekday: "long" })}`;
    } else {
      return new Intl.DateTimeFormat("en-GB", options).format(date);
    }
  } else {
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  }
};

export const isDateInPast = (dateStr: string): boolean => {
  const today = new Date();
  const activityDate = new Date(dateStr);
  return activityDate < today;
};
