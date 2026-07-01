export type ParsedTimeRange = {
  startTime: string;
  endTime: string;
};

const timeRangePattern =
  /(\d{1,2}):(\d{2})\s*([AP]M)\s*-\s*(\d{1,2}):(\d{2})\s*([AP]M)/i;

function toTwentyFourHour(hoursText: string, minutesText: string, period: string) {
  const hours = Number(hoursText);
  const minutes = Number(minutesText);
  const normalizedPeriod = period.toUpperCase();

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return undefined;
  }

  const adjustedHours =
    normalizedPeriod === "PM" ? (hours % 12) + 12 : hours === 12 ? 0 : hours;

  return `${String(adjustedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function parseTimeRange(value: string): ParsedTimeRange | undefined {
  const match = value.match(timeRangePattern);

  if (!match) {
    return undefined;
  }

  const startTime = toTwentyFourHour(match[1], match[2], match[3]);
  const endTime = toTwentyFourHour(match[4], match[5], match[6]);

  if (!startTime || !endTime) {
    return undefined;
  }

  return { startTime, endTime };
}
