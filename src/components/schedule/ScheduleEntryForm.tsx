"use client";

import type { FormEvent } from "react";

import { DAYS, type ScheduleEntry } from "@/types/schedule";

type ScheduleEntryFormProps = {
  entry?: ScheduleEntry;
  onSubmit?: (entry: ScheduleEntry) => void;
};

const emptyEntry: ScheduleEntry = {
  id: "draft-entry",
  subjectCode: "",
  description: "",
  day: "Monday",
  startTime: "07:30",
  endTime: "08:30",
  location: "",
  section: "",
};

export function ScheduleEntryForm({ entry, onSubmit }: ScheduleEntryFormProps) {
  const currentEntry = entry ?? emptyEntry;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onSubmit?.({
      id: currentEntry.id,
      subjectCode: String(formData.get("subjectCode") ?? ""),
      description: String(formData.get("description") ?? ""),
      day: String(formData.get("day") ?? "Monday") as ScheduleEntry["day"],
      startTime: String(formData.get("startTime") ?? ""),
      endTime: String(formData.get("endTime") ?? ""),
      location: String(formData.get("location") ?? ""),
      section: String(formData.get("section") ?? ""),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="soft-panel grid gap-4 p-4 sm:grid-cols-2"
    >
      <label className="space-y-1 text-sm font-bold text-[var(--ink)]">
        Subject code
        <input
          name="subjectCode"
          defaultValue={currentEntry.subjectCode}
          className="field-shell"
        />
      </label>
      <label className="space-y-1 text-sm font-bold text-[var(--ink)]">
        Description
        <input
          name="description"
          defaultValue={currentEntry.description}
          className="field-shell"
        />
      </label>
      <label className="space-y-1 text-sm font-bold text-[var(--ink)]">
        Day
        <select
          name="day"
          defaultValue={currentEntry.day}
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
            defaultValue={currentEntry.startTime}
            className="field-shell"
          />
        </label>
        <label className="space-y-1 text-sm font-bold text-[var(--ink)]">
          End
          <input
            name="endTime"
            type="time"
            defaultValue={currentEntry.endTime}
            className="field-shell"
          />
        </label>
      </div>
      <label className="space-y-1 text-sm font-bold text-[var(--ink)]">
        Location
        <input
          name="location"
          defaultValue={currentEntry.location}
          className="field-shell"
        />
      </label>
      <label className="space-y-1 text-sm font-bold text-[var(--ink)]">
        Section
        <input
          name="section"
          defaultValue={currentEntry.section}
          className="field-shell"
        />
      </label>
      <div className="sm:col-span-2">
        <button className="button-primary px-4 py-2">
          Save entry
        </button>
      </div>
    </form>
  );
}
