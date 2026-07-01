import type { Day } from "@/types/schedule";

export const dayCodes = {
  SU: "Sunday",
  TH: "Thursday",
  M: "Monday",
  T: "Tuesday",
  W: "Wednesday",
  F: "Friday",
  S: "Saturday",
} as const satisfies Record<string, Day>;

const orderedDayCodes = Object.entries(dayCodes).sort(
  ([leftCode], [rightCode]) => rightCode.length - leftCode.length,
);

export function parseDayCode(value: string): Day | undefined {
  const normalizedValue = value.trim().toUpperCase();
  const match = orderedDayCodes.find(([code]) => normalizedValue === code);

  return match?.[1];
}
