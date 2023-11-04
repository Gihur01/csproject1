/* Date.prototype.addDays = function(days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}
 */

export function getDatesInSameMonth(dateArray, targetDate) {
  const targetMonth = targetDate.getMonth();
  const targetYear = targetDate.getFullYear();

  return dateArray.filter((date) => {
    return date.getMonth() === targetMonth && date.getFullYear() === targetYear;
  });
}

export function getDatesInSameDay(dateArray, targetDate) {
  const targetDay = targetDate.getMonth();
  const targetYear = targetDate.getFullYear();

  return dateArray.filter((date) => {
    return date.getMonth() === targetMonth && date.getFullYear() === targetYear;
  });
}

export function addHoursToDate(date, hoursToAdd) {
  date.setHours(date.getHours() + hoursToAdd);
  return date;
}

export function getDatesWithinFiveMonths(dateArray) {
  const today = new Date();
  const fiveMonthsFromToday = new Date(today);
  fiveMonthsFromToday.setMonth(today.getMonth() + 5);

  return dateArray.filter((date) => {
    return date >= today && date <= fiveMonthsFromToday;
  });
}