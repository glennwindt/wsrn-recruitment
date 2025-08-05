export const generateSickLeaveMemo = (staffOnLeave, registry) => {
  if (!staffOnLeave || !registry || registry.length === 0) {
    return 'Sick leave memo could not be generated due to missing data.';
  }

  const availableStaff = registry.filter(entry =>
    entry.isActive &&
    entry.role === 'Staff' &&
    entry.email !== staffOnLeave.email
  );

  const coverageList = availableStaff.map(s => s.name || s.email).slice(0, 3);
  const coverageText = coverageList.length
    ? coverageList.join(', ')
    : 'No coverage staff available';

  return `${staffOnLeave.name} is out sick today. Coverage assigned to: ${coverageText}.`;
};

