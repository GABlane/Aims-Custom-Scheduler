import type { ScheduleEntry } from "@/types/schedule";

type MinimalTemplateProps = {
  entries: ScheduleEntry[];
};

export function MinimalTemplate({ entries }: MinimalTemplateProps) {
  return (
    <div className="bg-white p-8 text-[#172019]">
      <h2 className="text-3xl font-semibold">Weekly Schedule</h2>
      <div className="mt-6 grid gap-3">
        {entries.map((entry) => (
          <div key={entry.id} className="border-l-4 border-[#1f6d4a] pl-3">
            <p className="font-semibold">{entry.subjectCode}</p>
            <p className="text-sm text-[#586457]">{entry.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
