import type { ScheduleEntry } from "@/types/schedule";
import type { WallpaperDesign } from "@/types/wallpaper";

type WallpaperPreviewProps = {
  entries: ScheduleEntry[];
  design: WallpaperDesign;
};

export function WallpaperPreview({ entries, design }: WallpaperPreviewProps) {
  return (
    <section className="soft-panel p-5">
      <div
        className="mx-auto flex aspect-[9/16] max-h-[720px] min-h-[560px] w-full max-w-sm flex-col overflow-hidden rounded-md p-6 text-[var(--ink)]"
        style={{ backgroundColor: design.backgroundColor }}
      >
        <header className="border-b border-black/10 pb-4">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--purple)]">
            Weekly Schedule
          </p>
          <h2 className="display-serif mt-2 text-3xl">BSCS 4-A</h2>
        </header>

        <div className="grid flex-1 content-start gap-3 py-5">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-md border-l-4 bg-white/80 p-3 shadow-sm"
              style={{ borderColor: design.accentColor }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{entry.subjectCode}</p>
                  {design.showDescription ? (
                    <p className="text-sm text-[var(--muted)]">
                      {entry.description}
                    </p>
                  ) : null}
                </div>
                <p className="text-right text-xs font-bold text-[var(--purple)]">
                  {entry.day.slice(0, 3)}
                </p>
              </div>
              <p className="mt-2 text-sm font-medium">
                {entry.startTime}-{entry.endTime}
              </p>
              {design.showRoom && entry.location ? (
                <p className="text-xs text-[var(--muted)]">{entry.location}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
