import Link from "next/link";

import { AppNav } from "@/components/app/AppNav";
import { WallpaperBuilder } from "@/components/wallpaper/WallpaperBuilder";
import {
  defaultWallpaperDesign,
  sampleScheduleEntries,
} from "@/lib/schedule/sample-schedule";

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
        </div>

        <WallpaperBuilder
          entries={sampleScheduleEntries}
          initialDesign={defaultWallpaperDesign}
        />
      </div>
    </main>
  );
}
