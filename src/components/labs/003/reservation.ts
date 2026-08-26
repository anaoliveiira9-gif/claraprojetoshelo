export type TableMood = "warm" | "deep";

export type TableOption = {
  id: string;
  label: string;
  description: string;
  capacity: string;
  mood: TableMood;
};

/**
 * Stylized table choices — there is no real floor plan, so "escolher uma
 * mesa" is represented as a handful of distinct spots in the room, each
 * with its own mood. The mood feeds the ambient panel so the choice reads
 * as spatial, not just a labelled radio option.
 */
export const TABLES: TableOption[] = [
  {
    id: "janela",
    label: "Mesa da Janela",
    description: "Vista para o pátio interno, a chama mais próxima do vidro.",
    capacity: "2–4 pessoas",
    mood: "warm",
  },
  {
    id: "salao",
    label: "Salão Central",
    description: "No coração da sala, entre os arranjos e o burburinho baixo.",
    capacity: "2–6 pessoas",
    mood: "deep",
  },
  {
    id: "reservada",
    label: "Sala Reservada",
    description: "Um canto recolhido atrás da cortina de linho, quase privado.",
    capacity: "4–10 pessoas",
    mood: "warm",
  },
  {
    id: "chef",
    label: "Mesa do Chef",
    description: "De frente para a cozinha aberta — aroma de brasa, conversa com a equipe.",
    capacity: "2–8 pessoas",
    mood: "deep",
  },
];

export function getTableById(id: string | null): TableOption | undefined {
  return TABLES.find((table) => table.id === id);
}

export type ReservationSelection = {
  date: string; // ISO yyyy-mm-dd
  people: number;
  time: string; // HH:mm
  tableId: string;
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
