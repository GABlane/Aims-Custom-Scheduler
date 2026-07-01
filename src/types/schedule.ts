import type { WallpaperDesign } from "@/types/wallpaper";

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type Day = (typeof DAYS)[number];

export type ScheduleEntry = {
  id: string;
  subjectCode: string;
  description: string;
  section?: string;
  day: Day;
  startTime: string;
  endTime: string;
  location?: string;
  instructor?: string;
  mode?: "onsite" | "online" | "hybrid";
  confidence?: number;
};

export type SavedSchedule = {
  id: string;
  name: string;
  entries: ScheduleEntry[];
  design: WallpaperDesign;
  updatedAt: string;
};
