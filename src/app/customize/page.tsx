import Link from "next/link";

import { AppNav } from "@/components/app/AppNav";
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
  backgroundColor: "#f9f5f1",
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

export default function CustomizePage() {
  return (
    <main className="page-bg">
      <div className="app-shell max-w-7xl space-y-8">
        <AppNav actionHref="/import" actionLabel="New import" />
        <div className="flex flex-col gap-4 pb-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Link href="/review" className="text-sm font-bold text-[var(--purple)]">
              Back to review
            </Link>
            <h1 className="text-4xl">Customize wallpaper</h1>
            <p className="muted-copy max-w-2xl leading-7">
              The first version starts with phone and desktop presets, two
              templates, and a sharp PNG export path.
            </p>
          </div>
          <button className="button-primary px-4 py-3">
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
