export type ImportedScheduleImage = {
  imageDataUrl: string;
  width: number;
  height: number;
  updatedAt: string;
};

const importImageStorageKey = "aims-custom-scheduler:imported-table-image";

export function loadImportedScheduleImage(): ImportedScheduleImage | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const savedValue = window.sessionStorage.getItem(importImageStorageKey);

  if (!savedValue) {
    return undefined;
  }

  try {
    return JSON.parse(savedValue) as ImportedScheduleImage;
  } catch {
    window.sessionStorage.removeItem(importImageStorageKey);
    return undefined;
  }
}

export function saveImportedScheduleImage(image: ImportedScheduleImage) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(importImageStorageKey, JSON.stringify(image));
}

export function clearImportedScheduleImage() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(importImageStorageKey);
}
