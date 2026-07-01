"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";

import { WeeklyGrid } from "@/components/schedule/WeeklyGrid";
import { WallpaperControls } from "@/components/wallpaper/WallpaperControls";
import { WallpaperPreview } from "@/components/wallpaper/WallpaperPreview";
import {
  downloadWallpaper,
  validateWallpaperExport,
} from "@/lib/export/export-wallpaper";
import {
  loadSavedSchedule,
  saveSchedule,
} from "@/lib/storage/local-schedule-storage";
import type { ScheduleEntry } from "@/types/schedule";
import { DEVICE_PRESETS, type WallpaperDesign } from "@/types/wallpaper";

type WallpaperBuilderProps = {
  entries: ScheduleEntry[];
  initialDesign: WallpaperDesign;
};

function getDimensions(design: WallpaperDesign) {
  if (design.devicePreset === "custom" && design.customDimensions) {
    return design.customDimensions;
  }

  return DEVICE_PRESETS[design.devicePreset];
}

export function WallpaperBuilder({
  entries,
  initialDesign,
}: WallpaperBuilderProps) {
  const [scheduleEntries, setScheduleEntries] = useState(entries);
  const [design, setDesign] = useState(initialDesign);
  const [isInitialized, setIsInitialized] = useState(false);
  const [exportError, setExportError] = useState<string>();
  const validation = useMemo(
    () => validateWallpaperExport({ entries: scheduleEntries, design }),
    [scheduleEntries, design],
  );
  const dimensions = getDimensions(design);

  useEffect(() => {
    const savedSchedule = loadSavedSchedule();

    queueMicrotask(() => {
      if (savedSchedule?.entries.length) {
        setScheduleEntries(savedSchedule.entries);
        setDesign(savedSchedule.design);
      }

      setIsInitialized(true);
    });
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    saveSchedule({
      id: "local-draft",
      name: "AIMS schedule draft",
      entries: scheduleEntries,
      design,
      updatedAt: new Date().toISOString(),
    });
  }, [scheduleEntries, design, isInitialized]);

  function updateDesign(nextDesign: WallpaperDesign) {
    setExportError(undefined);
    setDesign(nextDesign);
  }

  function handleDownload() {
    setExportError(undefined);

    try {
      downloadWallpaper({
        entries: scheduleEntries,
        design,
        filename: `aims-class-schedule-${design.devicePreset}.png`,
      });
    } catch (error) {
      setExportError(
        error instanceof Error ? error.message : "Unable to export wallpaper.",
      );
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <div className="space-y-5">
        <WallpaperControls design={design} onChange={updateDesign} />
        <section className="soft-panel space-y-3 p-5">
          <div>
            <h2 className="display-serif text-xl">Export</h2>
            <p className="muted-copy mt-1 text-sm">
              {dimensions.width} x {dimensions.height} PNG
            </p>
          </div>

          {validation.errors.length > 0 ? (
            <div className="rounded-2xl border border-[#ffd55d] bg-[#fff7d6] p-3 text-sm text-[#6e5a12]">
              {validation.errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}

          {exportError ? (
            <div className="rounded-2xl border border-[#ffb7b7] bg-[#fff1f1] p-3 text-sm text-[#8a2a2a]">
              {exportError}
            </div>
          ) : null}

          <button
            className="button-primary w-full px-5 py-3 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!validation.valid}
            onClick={handleDownload}
          >
            Download PNG
          </button>
        </section>
      </div>

      <div className="space-y-6">
        <WallpaperPreview entries={scheduleEntries} design={design} />
        <WeeklyGrid entries={scheduleEntries} timeFormat={design.timeFormat} />
      </div>
    </div>
  );
}
