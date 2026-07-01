import type { SavedSchedule } from "@/types/schedule";

const storageKey = "aims-custom-scheduler:draft";

export function loadSavedSchedule(): SavedSchedule | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const savedValue = window.localStorage.getItem(storageKey);

  if (!savedValue) {
    return undefined;
  }

  try {
    return JSON.parse(savedValue) as SavedSchedule;
  } catch {
    window.localStorage.removeItem(storageKey);
    return undefined;
  }
}

export function saveSchedule(schedule: SavedSchedule) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(schedule));
}

export function clearSavedSchedule() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(storageKey);
}
