// Utility functions that manipulate JS dates

// returns a JS date object based on a unix timestamp and the timezone offset
export function getDate(unixTimestamp, timezoneOffset) {
    return new Date((unixTimestamp - timezoneOffset) * 1000);
}

// returns a string that represents the day of the week based on a JS date object
export function getWeekday(date) {
    const dayNames = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = date.getDay();
    return dayNames[weekday];
}