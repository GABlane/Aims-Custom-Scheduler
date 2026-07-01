import type { ScheduleEntry } from "@/types/schedule";

type MinimalTemplateProps = {
  entries: ScheduleEntry[];
};

export function MinimalTemplate({ entries }: MinimalTemplateProps) {
  return (
    <div className="bg-[var(--panel)] p-8 text-[var(--ink)]">
      <h2 className="display-serif text-3xl">Weekly Schedule</h2>
      <div className="mt-6 grid gap-3">
        {entries.map((entry) => (
          <div key={entry.id} className="border-l-4 border-[var(--purple)] pl-3">
            <p className="font-semibold">{entry.subjectCode}</p>
            <p className="text-sm text-[var(--muted)]">{entry.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
