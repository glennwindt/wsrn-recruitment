const mockDatabase = [
  { name: "Maria Esteban", dob: "1988-10-05", passport: "PX82938" }
];

export function verifyIdentity({ name, dob, passport }) {
  return mockDatabase.some(record =>
    record.name === name &&
    record.dob === dob &&
    record.passport === passport
  );
}

