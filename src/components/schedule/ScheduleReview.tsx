import { ScheduleEntryForm } from "@/components/schedule/ScheduleEntryForm";
import type { ScheduleEntry } from "@/types/schedule";

const reviewEntries: ScheduleEntry[] = [
  {
    id: "review-cs113",
    subjectCode: "CS 113",
    description: "Automata and Language Theory",
    section: "BSCS 4-A-SOUTH",
    day: "Thursday",
    startTime: "18:30",
    endTime: "21:30",
    location: "COMLAB 3-S",
    mode: "onsite",
    confidence: 0.86,
  },
  {
    id: "review-cs118",
    subjectCode: "CS 118",
    description: "CS Thesis Writing 1",
    section: "BSCS 4-A-SOUTH",
    day: "Friday",
    startTime: "18:30",
    endTime: "21:30",
    location: "ONLINE",
    mode: "online",
    confidence: 0.72,
  },
];

export function ScheduleReview() {
  return (
    <section className="grid gap-5">
      {reviewEntries.map((entry) => (
        <div key={entry.id} className="space-y-3">
          {entry.confidence && entry.confidence < 0.8 ? (
            <p className="rounded-2xl border border-[#ffd55d] bg-[#fff7d6] px-3 py-2 text-sm font-bold text-[#6e5a12]">
              Please verify this entry before export.
            </p>
          ) : null}
          <ScheduleEntryForm entry={entry} />
        </div>
      ))}

      <div className="flex flex-wrap gap-3">
        <button className="button-secondary px-4 py-2">
          Add subject
        </button>
        <button className="button-secondary px-4 py-2">
          Add another meeting
        </button>
        <button className="button-secondary px-4 py-2">
          Merge duplicate
        </button>
      </div>
    </section>
  );
}
