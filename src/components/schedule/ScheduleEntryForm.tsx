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
      className="grid gap-4 rounded-lg border border-[#d6dfd0] bg-white p-4 shadow-sm sm:grid-cols-2"
    >
      <label className="space-y-1 text-sm font-medium text-[#334033]">
        Subject code
        <input
          name="subjectCode"
          defaultValue={currentEntry.subjectCode}
          className="w-full rounded-md border border-[#bfcabb] px-3 py-2"
        />
      </label>
      <label className="space-y-1 text-sm font-medium text-[#334033]">
        Description
        <input
          name="description"
          defaultValue={currentEntry.description}
          className="w-full rounded-md border border-[#bfcabb] px-3 py-2"
        />
      </label>
      <label className="space-y-1 text-sm font-medium text-[#334033]">
        Day
        <select
          name="day"
          defaultValue={currentEntry.day}
          className="w-full rounded-md border border-[#bfcabb] px-3 py-2"
        >
          {DAYS.map((day) => (
            <option key={day}>{day}</option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1 text-sm font-medium text-[#334033]">
          Start
          <input
            name="startTime"
            type="time"
            defaultValue={currentEntry.startTime}
            className="w-full rounded-md border border-[#bfcabb] px-3 py-2"
          />
        </label>
        <label className="space-y-1 text-sm font-medium text-[#334033]">
          End
          <input
            name="endTime"
            type="time"
            defaultValue={currentEntry.endTime}
            className="w-full rounded-md border border-[#bfcabb] px-3 py-2"
          />
        </label>
      </div>
      <label className="space-y-1 text-sm font-medium text-[#334033]">
        Location
        <input
          name="location"
          defaultValue={currentEntry.location}
          className="w-full rounded-md border border-[#bfcabb] px-3 py-2"
        />
      </label>
      <label className="space-y-1 text-sm font-medium text-[#334033]">
        Section
        <input
          name="section"
          defaultValue={currentEntry.section}
          className="w-full rounded-md border border-[#bfcabb] px-3 py-2"
        />
      </label>
      <div className="sm:col-span-2">
        <button className="rounded-md bg-[#1f6d4a] px-4 py-2 font-semibold text-white hover:bg-[#18583c]">
          Save entry
        </button>
      </div>
    </form>
  );
}
