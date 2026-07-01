import type { ScheduleEntry } from "@/types/schedule";
import type { WallpaperDesign } from "@/types/wallpaper";

export const sampleScheduleEntries: ScheduleEntry[] = [
  {
    id: "sample-cs113",
    subjectCode: "CS 113",
    description: "Automata and Language Theory",
    section: "BSCS 4-A-SOUTH",
    day: "Thursday",
    startTime: "18:30",
    endTime: "21:30",
    location: "COMLAB 3-S",
    mode: "onsite",
    confidence: 0.86,
  },
  {
    id: "sample-cs118-friday",
    subjectCode: "CS 118",
    description: "CS Thesis Writing 1",
    section: "BSCS 4-A-SOUTH",
    day: "Friday",
    startTime: "18:30",
    endTime: "21:30",
    location: "ONLINE",
    mode: "online",
    confidence: 0.72,
  },
  {
    id: "sample-cs118-saturday",
    subjectCode: "CS 118",
    description: "CS Thesis Writing 1",
    section: "BSCS 4-A-SOUTH",
    day: "Saturday",
    startTime: "10:30",
    endTime: "12:30",
    location: "ONLINE",
    mode: "online",
    confidence: 0.78,
  },
];

export const defaultWallpaperDesign: WallpaperDesign = {
  devicePreset: "phone-portrait",
  template: "minimal-light",
  backgroundColor: "#f5f2ed",
  accentColor: "#7c35de",
  blur: 0,
  darkOverlay: 0,
  fontSize: 36,
  showDescription: true,
  showRoom: true,
  showInstructor: false,
  showEmptyDays: true,
  timeFormat: "12h",
};
