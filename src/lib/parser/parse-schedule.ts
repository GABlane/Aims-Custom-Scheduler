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

const subjectCodePattern = /\b([A-Z]{2,})\s*(\d{2,}[A-Z]?)\b/;
const dayCodePattern = "(SU|TH|M|T|W|F|S)";
const timeRangeSource =
  "\\d{1,2}[:;]\\d{2}\\s*[AP]M\\s*[-–—]\\s*\\d{1,2}[:;]\\d{2}\\s*[AP]M";
const meetingStartPattern = new RegExp(
  `\\b${dayCodePattern}\\b\\s+${timeRangeSource}`,
  "gi",
);
const meetingTimePattern = new RegExp(timeRangeSource, "i");

type MeetingSegment = {
  dayCode: string;
  text: string;
  index: number;
};

function cleanOcrText(value: string) {
  return value
    .replace(/[“”]/g, "\"")
    .replace(/[‘’]/g, "'")
    .replace(/\u00a0/g, " ")
    .replace(/[‐‑‒]/g, "-")
    .replace(/[|]+/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function normalizeSubjectCode(value: string) {
  const match = value.match(subjectCodePattern);

  if (!match) {
    return value.trim().toUpperCase();
  }

  return `${match[1]} ${match[2]}`.toUpperCase();
}

function extractSection(value: string) {
  const cleanedValue = value
    .replace(/^[\s/-]+|[\s/-]+$/g, "")
    .replace(/\s+-\s+/g, " - ")
    .trim();

  if (!cleanedValue) {
    return undefined;
  }

  const sectionMatch = cleanedValue.match(/\b[A-Z]{2,}[A-Z0-9 -]*\d-[A-Z][A-Z -]*\b/i);

  return (sectionMatch?.[0] ?? cleanedValue).toUpperCase();
}

function extractMeetingSegments(value: string): MeetingSegment[] {
  const matches = Array.from(value.matchAll(meetingStartPattern));

  return matches.map((match, index) => {
    const startIndex = match.index ?? 0;
    const nextIndex = matches[index + 1]?.index ?? value.length;

    return {
      dayCode: match[1],
      text: value.slice(startIndex, nextIndex).replace(/^[\s/,-]+|[\s/,-]+$/g, ""),
      index: startIndex,
    };
  });
}

function parseLocation(segment: string) {
  return segment
    .replace(new RegExp(`^\\s*${dayCodePattern}\\b`, "i"), "")
    .replace(meetingTimePattern, "")
    .replace(/^[\s/,-]+|[\s/,-]+$/g, "")
    .trim();
}

export function parseScheduleText(rawText: string): ParseScheduleResult {
  const lines = rawText
    .split(/\r?\n/)
    .map(cleanOcrText)
    .filter(Boolean);

  const entries: ScheduleEntry[] = [];
  let activeSubjectCode = "";
  let activeDescription = "";
  let activeSection: string | undefined;

  for (const line of lines) {
    const subjectCodeMatch = line.match(subjectCodePattern);
    const content = subjectCodeMatch
      ? line.slice((subjectCodeMatch.index ?? 0) + subjectCodeMatch[0].length).trim()
      : line;

    if (subjectCodeMatch) {
      activeSubjectCode = normalizeSubjectCode(subjectCodeMatch[0]);
      activeDescription = "";
      activeSection = undefined;

      if (!content) {
        continue;
      }
    }

    const segments = extractMeetingSegments(content);

    if (segments.length > 0 && activeSubjectCode) {
      const firstPrefix = content.slice(0, segments[0].index).trim();
      const lineSection = extractSection(firstPrefix);

      if (lineSection) {
        activeSection = lineSection;
      } else if (firstPrefix && !activeDescription) {
        activeDescription = firstPrefix;
      }

      for (const segment of segments) {
        const day = parseDayCode(segment.dayCode);
        const timeRange = parseTimeRange(segment.text);

        if (!day || !timeRange) {
          continue;
        }

        const location = parseLocation(segment.text);

        entries.push({
          id: createEntryId(),
          subjectCode: activeSubjectCode,
          description: activeDescription,
          section: activeSection,
          day,
          startTime: timeRange.startTime,
          endTime: timeRange.endTime,
          location,
          mode: /online/i.test(location) ? "online" : "onsite",
          confidence: 0.7,
        });
      }
      continue;
    }

    if (activeSubjectCode && content && !activeDescription) {
      activeDescription = content;
    }
  }

  return { entries, rawText };
}
