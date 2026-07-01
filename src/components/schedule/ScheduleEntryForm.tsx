"use client";

import { DAYS, type ScheduleEntry } from "@/types/schedule";

type ScheduleEntryFormProps = {
  entry: ScheduleEntry;
  conflictMessage?: string;
  onChange: (entry: ScheduleEntry) => void;
  onDelete: (id: string) => void;
  onDuplicate: (entry: ScheduleEntry) => void;
};

export function ScheduleEntryForm({
  entry,
  conflictMessage,
  onChange,
  onDelete,
  onDuplicate,
}: ScheduleEntryFormProps) {
  function updateEntry(patch: Partial<ScheduleEntry>) {
    onChange({ ...entry, ...patch });
  }

  return (
    <article className="soft-panel grid gap-4 p-4 sm:grid-cols-2">
      <label className="space-y-1 text-sm font-bold text-[var(--ink)]">
        Subject code
        <input
          name="subjectCode"
          value={entry.subjectCode}
          onChange={(event) => updateEntry({ subjectCode: event.currentTarget.value })}
          className="field-shell"
        />
      </label>
      <label className="space-y-1 text-sm font-bold text-[var(--ink)]">
        Description
        <input
          name="description"
          value={entry.description}
          onChange={(event) => updateEntry({ description: event.currentTarget.value })}
          className="field-shell"
        />
      </label>
      <label className="space-y-1 text-sm font-bold text-[var(--ink)]">
        Day
        <select
          name="day"
          value={entry.day}
          onChange={(event) =>
            updateEntry({ day: event.currentTarget.value as ScheduleEntry["day"] })
          }
          className="field-shell"
        >
          {DAYS.map((day) => (
            <option key={day}>{day}</option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1 text-sm font-bold text-[var(--ink)]">
          Start
          <input
            name="startTime"
            type="time"
            value={entry.startTime}
            onChange={(event) => updateEntry({ startTime: event.currentTarget.value })}
            className="field-shell"
          />
        </label>
        <label className="space-y-1 text-sm font-bold text-[var(--ink)]">
          End
          <input
            name="endTime"
            type="time"
            value={entry.endTime}
            onChange={(event) => updateEntry({ endTime: event.currentTarget.value })}
            className="field-shell"
          />
        </label>
      </div>
      <label className="space-y-1 text-sm font-bold text-[var(--ink)]">
        Location
        <input
          name="location"
          value={entry.location ?? ""}
          onChange={(event) =>
            updateEntry({
              location: event.currentTarget.value,
              mode: /online/i.test(event.currentTarget.value) ? "online" : "onsite",
            })
          }
          className="field-shell"
        />
      </label>
      <label className="space-y-1 text-sm font-bold text-[var(--ink)]">
        Section
        <input
          name="section"
          value={entry.section ?? ""}
          onChange={(event) => updateEntry({ section: event.currentTarget.value })}
          className="field-shell"
        />
      </label>

      {conflictMessage ? (
        <p className="rounded-2xl border border-[#ffd55d] bg-[#fff7d6] px-3 py-2 text-sm font-bold text-[#6e5a12] sm:col-span-2">
          {conflictMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button
          type="button"
          className="button-secondary px-4 py-2 text-sm"
          onClick={() => onDuplicate(entry)}
        >
          Duplicate meeting
        </button>
        <button
          type="button"
          className="rounded-full border border-[#ffb7b7] bg-white px-4 py-2 text-sm font-bold text-[#8a2a2a] hover:bg-[#fff1f1]"
          onClick={() => onDelete(entry.id)}
        >
          Delete entry
        </button>
      </div>
    </article>
  );
}
