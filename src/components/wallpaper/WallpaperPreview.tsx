import type { ScheduleEntry } from "@/types/schedule";
import { DEVICE_PRESETS, type WallpaperDesign } from "@/types/wallpaper";

type WallpaperPreviewProps = {
  entries: ScheduleEntry[];
  design: WallpaperDesign;
};

const themeStyles: Record<
  WallpaperDesign["template"],
  {
    foreground: string;
    muted: string;
    card: string;
    border: string;
    panel: string;
  }
> = {
  "minimal-light": {
    foreground: "#48413f",
    muted: "#817b78",
    card: "#ffffff",
    border: "#e4dfda",
    panel: "rgba(255, 255, 255, 0.72)",
  },
  "minimal-dark": {
    foreground: "#f8f4ed",
    muted: "#b8c0b4",
    card: "#354038",
    border: "#53614f",
    panel: "rgba(45, 53, 47, 0.78)",
  },
  "ucc-inspired": {
    foreground: "#263127",
    muted: "#62705f",
    card: "#ffffff",
    border: "#dce8d7",
    panel: "rgba(255, 255, 255, 0.78)",
  },
};

function getDimensions(design: WallpaperDesign) {
  if (design.devicePreset === "custom" && design.customDimensions) {
    return design.customDimensions;
  }

  return DEVICE_PRESETS[design.devicePreset];
}

function formatTime(value: string, format: WallpaperDesign["timeFormat"]) {
  const [hoursText, minutesText] = value.split(":");
  const hours = Number(hoursText);
  const minutes = Number(minutesText);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return value;
  }

  if (format === "24h") {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function WallpaperPreview({ entries, design }: WallpaperPreviewProps) {
  const dimensions = getDimensions(design);
  const theme = themeStyles[design.template];
  const visibleEntries = entries.filter((entry) => design.showEmptyDays || entry.day);
  const previewWidth = dimensions.height >= dimensions.width ? 360 : 680;
  const aspectRatio = `${dimensions.width} / ${dimensions.height}`;

  return (
    <section className="soft-panel p-5">
      <div
        className="mx-auto flex w-full flex-col overflow-hidden rounded-[22px] p-6"
        style={{
          aspectRatio,
          maxWidth: previewWidth,
          backgroundColor: design.backgroundColor,
          color: theme.foreground,
        }}
      >
        <header className="border-b pb-4" style={{ borderColor: theme.border }}>
          <p
            className="text-sm font-bold uppercase tracking-[0.12em]"
            style={{ color: design.accentColor }}
          >
            Weekly Schedule
          </p>
          <h2
            className="display-serif mt-2"
            style={{ fontSize: Math.max(22, design.fontSize * 0.78) }}
          >
            BSCS 4-A
          </h2>
        </header>

        <div className="grid flex-1 content-start gap-3 overflow-hidden py-5">
          {visibleEntries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-2xl border-l-4 p-3 shadow-sm"
              style={{
                borderColor: design.accentColor,
                backgroundColor: theme.card,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{entry.subjectCode}</p>
                  {design.showDescription ? (
                    <p className="text-sm" style={{ color: theme.muted }}>
                      {entry.description}
                    </p>
                  ) : null}
                </div>
                <p
                  className="text-right text-xs font-bold"
                  style={{ color: design.accentColor }}
                >
                  {entry.day.slice(0, 3)}
                </p>
              </div>
              <p className="mt-2 text-sm font-medium">
                {formatTime(entry.startTime, design.timeFormat)}-
                {formatTime(entry.endTime, design.timeFormat)}
              </p>
              {design.showRoom && entry.location ? (
                <p className="text-xs" style={{ color: theme.muted }}>
                  {entry.location}
                </p>
              ) : null}
            </article>
          ))}
        </div>

        <footer
          className="rounded-2xl px-4 py-3 text-xs font-bold"
          style={{ backgroundColor: theme.panel, color: theme.muted }}
        >
          {dimensions.width} x {dimensions.height}
        </footer>
      </div>
    </section>
  );
}
