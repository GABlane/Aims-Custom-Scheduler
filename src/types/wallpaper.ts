export const DEVICE_PRESETS = {
  "phone-portrait": { label: "Phone portrait", width: 1080, height: 1920 },
  "phone-portrait-modern": {
    label: "Phone portrait modern",
    width: 1440,
    height: 3200,
  },
  desktop: { label: "Desktop", width: 1920, height: 1080 },
  laptop: { label: "Laptop", width: 1366, height: 768 },
  custom: { label: "Custom", width: 1080, height: 1920 },
} as const;

export type DevicePresetId = keyof typeof DEVICE_PRESETS;

export type WallpaperTemplate = "minimal-light" | "minimal-dark" | "ucc-inspired";

export type WallpaperDesign = {
  devicePreset: DevicePresetId;
  template: WallpaperTemplate;
  backgroundColor: string;
  backgroundImageDataUrl?: string;
  accentColor: string;
  blur: number;
  darkOverlay: number;
  fontSize: number;
  showDescription: boolean;
  showRoom: boolean;
  showInstructor: boolean;
  showEmptyDays: boolean;
  timeFormat: "12h" | "24h";
  customDimensions?: {
    width: number;
    height: number;
  };
};
