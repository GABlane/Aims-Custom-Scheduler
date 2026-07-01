import { parseDayCode } from "@/lib/parser/parse-day";
import { parseTimeRange } from "@/lib/parser/parse-time";
import type { ScheduleEntry } from "@/types/schedule";

type ParseScheduleResult = {
  entries: ScheduleEntry[];
  rawText: string;
};

function createEntryId() {
  return globalThis.crypto?.randomUUID?.() ?? `entry-${Date.now()}`;
}

export function parseScheduleText(rawText: string): ParseScheduleResult {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const entries: ScheduleEntry[] = [];
  let activeSubjectCode = "";
  let activeDescription = "";

  for (const line of lines) {
    if (/^[A-Z]{2,}\s*\d{2,}/.test(line)) {
      activeSubjectCode = line;
      continue;
    }

    const [possibleDayCode] = line.split(/\s+/);
    const day = parseDayCode(possibleDayCode);
    const timeRange = parseTimeRange(line);

    if (day && timeRange && activeSubjectCode) {
      const location = line
        .replace(possibleDayCode, "")
        .replace(/\d{1,2}:\d{2}\s*[AP]M\s*-\s*\d{1,2}:\d{2}\s*[AP]M/i, "")
        .trim();

      entries.push({
        id: createEntryId(),
        subjectCode: activeSubjectCode,
        description: activeDescription,
        day,
        startTime: timeRange.startTime,
        endTime: timeRange.endTime,
        location,
        mode: /online/i.test(location) ? "online" : "onsite",
      });
      continue;
    }

    if (activeSubjectCode && !activeDescription) {
      activeDescription = line;
    }
  }

  return { entries, rawText };
}
