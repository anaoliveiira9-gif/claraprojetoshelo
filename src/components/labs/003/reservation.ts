export type ReservationSelection = {
  date: string; // ISO yyyy-mm-dd
  people: number;
  time: string; // HH:mm
};

export type ReservationConfirmation = {
  code: string;
  selection: ReservationSelection;
};

const TIME_SLOTS = [
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
];

/** Small deterministic hash so "unavailable" slots stay stable per date. */
function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Returns the fixed slot list for a given date, each flagged available or
 * not. Deterministic (no Math.random in render) so server and client agree,
 * and stable across re-renders for the same date.
 */
export function getTimeSlots(dateISO: string): { time: string; available: boolean }[] {
  const seed = hashString(dateISO);
  return TIME_SLOTS.map((time, index) => ({
    time,
    // Roughly a quarter of the slots read as booked, varying by date.
    available: (seed + index * 7) % 4 !== 0,
  }));
}

function randomCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

/**
 * Stands in for a real booking API call — synchronous logic wrapped in a
 * short artificial delay so a real network call can slot in here later
 * without changing the calling code in the wizard.
 */
export function createReservation(
  selection: ReservationSelection,
): Promise<ReservationConfirmation> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: `NOIR-${randomCode()}`, selection });
    }, 650);
  });
}
