import type { ScheduleEntry } from "@/types/schedule";

type UccTemplateProps = {
  entries: ScheduleEntry[];
};

export function UccTemplate({ entries }: UccTemplateProps) {
  return (
    <div className="bg-[var(--page)] p-8 text-[var(--ink)]">
      <div className="border-b-4 border-[var(--purple)] pb-4">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--purple)]">
          Class schedule
        </p>
        <h2 className="display-serif mt-2 text-3xl">AIMS Weekly Plan</h2>
      </div>
      <div className="mt-6 grid gap-3">
        {entries.map((entry) => (
          <div key={entry.id} className="rounded-md bg-white p-3">
            <p className="font-semibold">{entry.subjectCode}</p>
            <p className="text-sm text-[var(--muted)]">{entry.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
