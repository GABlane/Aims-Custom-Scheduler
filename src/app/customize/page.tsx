import Link from "next/link";

import { WeeklyGrid } from "@/components/schedule/WeeklyGrid";
import { WallpaperControls } from "@/components/wallpaper/WallpaperControls";
import { WallpaperPreview } from "@/components/wallpaper/WallpaperPreview";
import type { ScheduleEntry } from "@/types/schedule";
import type { WallpaperDesign } from "@/types/wallpaper";

const sampleEntries: ScheduleEntry[] = [
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
  },
];

const defaultDesign: WallpaperDesign = {
  devicePreset: "phone-portrait",
  template: "minimal-light",
  backgroundColor: "#f7f8f5",
  accentColor: "#1f6d4a",
  blur: 0,
  darkOverlay: 0,
  fontSize: 36,
  showDescription: true,
  showRoom: true,
  showInstructor: false,
  showEmptyDays: true,
  timeFormat: "12h",
};

export default function CustomizePage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-5 py-8 text-[#172019] sm:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 border-b border-[#dfe5d8] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Link href="/review" className="text-sm font-semibold text-[#1f6d4a]">
              Back to review
            </Link>
            <h1 className="text-3xl font-semibold">Customize wallpaper</h1>
            <p className="max-w-2xl leading-7 text-[#586457]">
              The first version starts with phone and desktop presets, two
              templates, and a sharp PNG export path.
            </p>
          </div>
          <button className="rounded-md bg-[#1f6d4a] px-4 py-3 font-semibold text-white hover:bg-[#18583c]">
            Download PNG
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <WallpaperControls design={defaultDesign} />
          <div className="space-y-6">
            <WallpaperPreview entries={sampleEntries} design={defaultDesign} />
            <WeeklyGrid entries={sampleEntries} />
          </div>
        </div>
      </div>
    </main>
  );
}
