// src/utils/DateParser.js
export const DateParser = {
  parse(dateStr) {
    return new Date(dateStr);
  },
  format(dateObj) {
    return dateObj.toISOString().split('T')[0];
  }
};

