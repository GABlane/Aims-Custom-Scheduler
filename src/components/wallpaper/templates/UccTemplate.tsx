import type { ScheduleEntry } from "@/types/schedule";

type UccTemplateProps = {
  entries: ScheduleEntry[];
};

export function UccTemplate({ entries }: UccTemplateProps) {
  return (
    <div className="bg-[#f7f8f5] p-8 text-[#172019]">
      <div className="border-b-4 border-[#1f6d4a] pb-4">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1f6d4a]">
          Class schedule
        </p>
        <h2 className="mt-2 text-3xl font-semibold">AIMS Weekly Plan</h2>
      </div>
      <div className="mt-6 grid gap-3">
        {entries.map((entry) => (
          <div key={entry.id} className="rounded-md bg-white p-3">
            <p className="font-semibold">{entry.subjectCode}</p>
            <p className="text-sm text-[#586457]">{entry.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
