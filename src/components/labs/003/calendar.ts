export type CalendarDay = {
  date: Date;
  iso: string;
  isPast: boolean;
};

const WEEKDAY_LABELS = ["D", "S", "T", "Q", "Q", "S", "S"];

export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Builds a Sunday-first week grid for one month, padded with nulls so every
 * row has 7 cells. `today` is used only to flag past (unselectable) days.
 */
export function buildMonthGrid(year: number, month: number, today: Date) {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = firstOfMonth.getDay();

  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const cells: (CalendarDay | null)[] = Array.from({ length: startWeekday }, () => null);

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    cells.push({
      date,
      iso: toISODate(date),
      isPast: date.getTime() < todayStart.getTime(),
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: (CalendarDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const label = firstOfMonth.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return { weeks, label };
}

export { WEEKDAY_LABELS };
