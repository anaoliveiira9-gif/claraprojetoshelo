import type { Property } from "./data";

type ClusterCoord = { x: number; y: number };

/**
 * Rough fictional cluster centers (percentage of the map viewBox) so that
 * properties in the same bairro sit close together, and bairros in the same
 * city sit in the same general region of the abstract grid. This is a
 * stylistic abstraction, not real geodata.
 */
const BAIRRO_COORDS: Record<string, ClusterCoord> = {
  "Jardim Europa": { x: 18, y: 30 },
  Jardins: { x: 27, y: 37 },
  "Itaim Bibi": { x: 31, y: 50 },
  "Vila Madalena": { x: 13, y: 53 },
  Moema: { x: 35, y: 62 },
  Leblon: { x: 76, y: 64 },
  "Granja Viana": { x: 60, y: 14 },
};

/** Faint city-region labels drawn behind the pin clusters. */
export const CITY_LABELS: Array<{ name: string; x: number; y: number }> = [
  { name: "São Paulo", x: 15, y: 20 },
  { name: "Rio de Janeiro", x: 66, y: 50 },
  { name: "Cotia", x: 58, y: 7 },
];

const JITTER = 4.5;

/** Deterministic per-property offset (from its data seed) within its bairro cluster. */
export function getPropertyPosition(property: Property): ClusterCoord {
  const base = BAIRRO_COORDS[property.bairro] ?? { x: 50, y: 45 };
  const jx = (property.seed - 0.5) * 2 * JITTER;
  const jy = (((property.seed * 53) % 1) - 0.5) * 2 * JITTER;
  return {
    x: Math.min(96, Math.max(4, base.x + jx)),
    y: Math.min(94, Math.max(8, base.y + jy)),
  };
}
