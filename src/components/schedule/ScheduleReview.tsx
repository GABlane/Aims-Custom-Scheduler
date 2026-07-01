"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { ScheduleEntryForm } from "@/components/schedule/ScheduleEntryForm";
import { recognizeImage, type OcrProgress } from "@/lib/ocr/recognize-image";
import { parseScheduleText } from "@/lib/parser/parse-schedule";
import {
  loadImportedScheduleImage,
  type ImportedScheduleImage,
} from "@/lib/storage/import-image-storage";
import {
  loadSavedSchedule,
  saveSchedule,
} from "@/lib/storage/local-schedule-storage";
import {
  defaultWallpaperDesign,
  sampleScheduleEntries,
} from "@/lib/schedule/sample-schedule";
import { DAYS, type Day, type SavedSchedule, type ScheduleEntry } from "@/types/schedule";

type ConflictMap = Record<string, string>;

function createEntryId() {
  return globalThis.crypto?.randomUUID?.() ?? `entry-${Date.now()}`;
}

function createBlankEntry(): ScheduleEntry {
  return {
    id: createEntryId(),
    subjectCode: "NEW SUBJECT",
    description: "",
    section: "BSCS 4-A-SOUTH",
    day: "Monday",
    startTime: "07:30",
    endTime: "08:30",
    location: "",
    mode: "onsite",
    confidence: 1,
  };
}

function timeToMinutes(value: string) {
  const [hoursText, minutesText] = value.split(":");
  const hours = Number(hoursText);
  const minutes = Number(minutesText);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return Number.NaN;
  }

  return hours * 60 + minutes;
}

function getConflictMessages(entries: ScheduleEntry[]): ConflictMap {
  const conflicts: ConflictMap = {};

  for (const day of DAYS) {
    const dayEntries = entries.filter((entry) => entry.day === day);

    for (let index = 0; index < dayEntries.length; index += 1) {
      const current = dayEntries[index];
      const currentStart = timeToMinutes(current.startTime);
      const currentEnd = timeToMinutes(current.endTime);

      if (Number.isNaN(currentStart) || Number.isNaN(currentEnd)) {
        conflicts[current.id] = "Please verify this time.";
        continue;
      }

      if (currentStart >= currentEnd) {
        conflicts[current.id] = "Start time must be before end time.";
        continue;
      }

      for (let nextIndex = index + 1; nextIndex < dayEntries.length; nextIndex += 1) {
        const next = dayEntries[nextIndex];
        const nextStart = timeToMinutes(next.startTime);
        const nextEnd = timeToMinutes(next.endTime);

        if (
          !Number.isNaN(nextStart) &&
          !Number.isNaN(nextEnd) &&
          currentStart < nextEnd &&
          nextStart < currentEnd
        ) {
          conflicts[current.id] = `Overlaps with ${next.subjectCode || "another class"} on ${day}.`;
          conflicts[next.id] = `Overlaps with ${current.subjectCode || "another class"} on ${day}.`;
        }
      }
    }
  }

  return conflicts;
}

function createSavedSchedule(entries: ScheduleEntry[]): SavedSchedule {
  const previous = loadSavedSchedule();

  return {
    id: previous?.id ?? "local-draft",
    name: previous?.name ?? "AIMS schedule draft",
    entries,
    design: previous?.design ?? defaultWallpaperDesign,
    updatedAt: new Date().toISOString(),
  };
}

function normalizeEntryForDuplicate(entry: ScheduleEntry) {
  return [
    entry.subjectCode.trim().toUpperCase(),
    entry.description.trim().toUpperCase(),
    entry.section?.trim().toUpperCase() ?? "",
    entry.day,
    entry.startTime,
    entry.endTime,
    entry.location?.trim().toUpperCase() ?? "",
  ].join("|");
}

function getDuplicateCount(entries: ScheduleEntry[]) {
  const seen = new Set<string>();
  let duplicates = 0;

  for (const entry of entries) {
    const key = normalizeEntryForDuplicate(entry);

    if (seen.has(key)) {
      duplicates += 1;
    } else {
      seen.add(key);
    }
  }

  return duplicates;
}

export function ScheduleReview() {
  const [entries, setEntries] = useState<ScheduleEntry[]>(sampleScheduleEntries);
  const [importedImage, setImportedImage] = useState<ImportedScheduleImage>();
  const [ocrProgress, setOcrProgress] = useState<OcrProgress>();
  const [ocrRawText, setOcrRawText] = useState("");
  const [ocrError, setOcrError] = useState<string>();
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Local draft ready");
  const conflicts = useMemo(() => getConflictMessages(entries), [entries]);
  const duplicateCount = useMemo(() => getDuplicateCount(entries), [entries]);
  const conflictCount = Object.keys(conflicts).length;

  useEffect(() => {
    const savedSchedule = loadSavedSchedule();
    const savedImportedImage = loadImportedScheduleImage();

    queueMicrotask(() => {
      if (savedSchedule?.entries.length) {
        setEntries(savedSchedule.entries);
        setSaveStatus("Loaded saved local draft");
      }

      if (savedImportedImage) {
        setImportedImage(savedImportedImage);
      }

      setIsInitialized(true);
    });
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    saveSchedule(createSavedSchedule(entries));
    queueMicrotask(() => {
      setSaveStatus(`Saved locally at ${new Date().toLocaleTimeString()}`);
    });
  }, [entries, isInitialized]);

  function updateEntry(nextEntry: ScheduleEntry) {
    setEntries((currentEntries) =>
      currentEntries.map((entry) => (entry.id === nextEntry.id ? nextEntry : entry)),
    );
  }

  function addSubject() {
    setEntries((currentEntries) => [...currentEntries, createBlankEntry()]);
  }

  function duplicateMeeting(entry: ScheduleEntry) {
    setEntries((currentEntries) => [
      ...currentEntries,
      {
        ...entry,
        id: createEntryId(),
        confidence: 1,
      },
    ]);
  }

  function addAnotherMeeting() {
    const sourceEntry = entries.at(-1) ?? createBlankEntry();

    duplicateMeeting({
      ...sourceEntry,
      id: createEntryId(),
      day: getNextDay(sourceEntry.day),
    });
  }

  function deleteEntry(id: string) {
    setEntries((currentEntries) =>
      currentEntries.length > 1
        ? currentEntries.filter((entry) => entry.id !== id)
        : currentEntries,
    );
  }

  function mergeDuplicates() {
    const seen = new Set<string>();

    setEntries((currentEntries) =>
      currentEntries.filter((entry) => {
        const key = normalizeEntryForDuplicate(entry);

        if (seen.has(key)) {
          return false;
        }

        seen.add(key);
        return true;
      }),
    );
  }

  async function runOcr() {
    if (!importedImage) {
      setOcrError("Import and crop a schedule table image first.");
      return;
    }

    setIsRecognizing(true);
    setOcrError(undefined);
    setOcrRawText("");
    setOcrProgress({
      stage: "preparing",
      progress: 0,
      message: "Preparing image...",
    });

    try {
      const ocrResult = await recognizeImage(
        importedImage.imageDataUrl,
        setOcrProgress,
      );
      const parsedSchedule = parseScheduleText(ocrResult.rawText);
      const normalizedConfidence =
        typeof ocrResult.confidence === "number"
          ? Math.max(0.1, Math.min(0.99, ocrResult.confidence / 100))
          : 0.65;

      setOcrRawText(parsedSchedule.rawText);

      if (parsedSchedule.entries.length === 0) {
        setOcrError(
          "OCR finished, but no schedule meetings were detected. Add entries manually or crop a clearer subject table.",
        );
        return;
      }

      setEntries(
        parsedSchedule.entries.map((entry) => ({
          ...entry,
          confidence: normalizedConfidence,
        })),
      );
      setSaveStatus(
        `Imported ${parsedSchedule.entries.length} OCR entries. Please verify every field.`,
      );
    } catch (error) {
      setOcrError(
        error instanceof Error ? error.message : "Unable to read this schedule image.",
      );
    } finally {
      setIsRecognizing(false);
    }
  }

  return (
    <section className="grid gap-5">
      <div className="soft-panel grid gap-5 p-5 lg:grid-cols-[220px_1fr]">
        <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--cream)]">
          {importedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={importedImage.imageDataUrl}
              alt="Imported cropped schedule table"
              className="h-full min-h-36 w-full object-contain"
            />
          ) : (
            <div className="flex min-h-36 items-center justify-center px-4 text-center text-sm text-[var(--muted)]">
              No cropped table image in this browser session.
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="display-serif text-2xl">OCR import</h2>
            <p className="muted-copy mt-1 text-sm leading-6">
              Run text recognition on the cropped subject table, then review and
              correct the detected meetings below.
            </p>
          </div>

          {ocrProgress ? (
            <div className="space-y-2">
              <div className="h-2 overflow-hidden rounded-full bg-[var(--lavender)]">
                <div
                  className="h-full rounded-full bg-[var(--purple)] transition-all"
                  style={{ width: `${ocrProgress.progress}%` }}
                />
              </div>
              <p className="text-xs font-bold text-[var(--purple)]">
                {ocrProgress.message}
              </p>
            </div>
          ) : null}

          {ocrError ? (
            <p className="rounded-2xl border border-[#ffb7b7] bg-[#fff1f1] px-3 py-2 text-sm font-bold text-[#8a2a2a]">
              {ocrError}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              className="button-primary px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!importedImage || isRecognizing}
              onClick={runOcr}
            >
              {isRecognizing ? "Reading image..." : "Run OCR"}
            </button>
            <Link href="/import" className="button-secondary px-4 py-2 text-sm">
              Crop another image
            </Link>
          </div>

          {ocrRawText ? (
            <details className="rounded-2xl border border-[var(--line)] bg-[var(--cream)] p-3">
              <summary className="cursor-pointer text-sm font-bold">
                Raw OCR text
              </summary>
              <pre className="mt-3 max-h-52 overflow-auto whitespace-pre-wrap text-xs leading-5 text-[var(--body)]">
                {ocrRawText}
              </pre>
            </details>
          ) : null}
        </div>
      </div>

      <div className="soft-panel flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="display-serif text-2xl">Detected meetings</h2>
          <p className="muted-copy mt-1 text-sm">
            {entries.length} entries. {conflictCount} conflict warnings.{" "}
            {duplicateCount} duplicate matches.
          </p>
          <p className="mt-2 text-xs font-bold text-[var(--purple)]">{saveStatus}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="button-secondary px-4 py-2 text-sm" onClick={addSubject}>
            Add subject
          </button>
          <button className="button-secondary px-4 py-2 text-sm" onClick={addAnotherMeeting}>
            Add another meeting
          </button>
          <button
            className="button-secondary px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            disabled={duplicateCount === 0}
            onClick={mergeDuplicates}
          >
            Merge duplicate
          </button>
          <Link
            href="/customize"
            className="button-primary px-4 py-2 text-center text-sm"
          >
            Continue
          </Link>
        </div>
      </div>

      {entries.map((entry) => (
        <div key={entry.id} className="space-y-3">
          {entry.confidence && entry.confidence < 0.8 ? (
            <p className="rounded-2xl border border-[#ffd55d] bg-[#fff7d6] px-3 py-2 text-sm font-bold text-[#6e5a12]">
              Please verify this OCR-detected entry before export.
            </p>
          ) : null}
          <ScheduleEntryForm
            entry={entry}
            conflictMessage={conflicts[entry.id]}
            onChange={updateEntry}
            onDelete={deleteEntry}
            onDuplicate={duplicateMeeting}
          />
        </div>
      ))}
    </section>
  );
}

function getNextDay(day: Day): Day {
  const currentIndex = DAYS.indexOf(day);
  const nextIndex = (currentIndex + 1) % DAYS.length;

  return DAYS[nextIndex];
}
