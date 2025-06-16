// src/utils/scheduleTypes.js
const scheduleOptions = {
  euInlandWaterways: [
    { value: "4/4 Weeks", label: "4 Weeks On / 4 Weeks Off (Freelance)" },
    { value: "3/1 Month", label: "3 Months On / 1 Month Off" }
  ],
  internationalShips: [
    { value: "6/3 Months", label: "6 Months On / 3 Months Off" },
    { value: "9/3 Months", label: "9 Months On / 3 Months Off" },
    { value: "Permanent", label: "Permanent – Domestic Passenger Ships/Ferries" }
  ],
  domesticPortugal: [
    { value: "4/4 Weeks", label: "4 Weeks On / 4 Weeks Off" },
    { value: "6/3 Months", label: "6 Months On / 3 Months Off" },
    { value: "9/3 Months", label: "9 Months On / 3 Months Off" },
    { value: "Permanent", label: "Permanent Employment" }
  ]
};

export default scheduleOptions;