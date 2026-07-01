import { DAYS, type ScheduleEntry } from "@/types/schedule";

type WeeklyGridProps = {
  entries: ScheduleEntry[];
};

function formatTime(value: string) {
  const [hoursText, minutesText] = value.split(":");
  const hours = Number(hoursText);
  const minutes = Number(minutesText);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return value;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function WeeklyGrid({ entries }: WeeklyGridProps) {
  return (
    <section className="soft-panel overflow-hidden">
      <div className="grid border-b border-[var(--line)] bg-[#efe3ff] text-sm font-bold text-[var(--purple)] sm:grid-cols-7">
        {DAYS.map((day) => (
          <div key={day} className="border-[var(--line)] px-3 py-2 sm:border-r">
            {day.slice(0, 3)}
          </div>
        ))}
      </div>
      <div className="grid min-h-80 gap-px bg-[var(--line)] sm:grid-cols-7">
        {DAYS.map((day) => {
          const dayEntries = entries.filter((entry) => entry.day === day);

          return (
            <div key={day} className="min-h-44 bg-white p-3">
              <div className="space-y-3">
                {dayEntries.length > 0 ? (
                  dayEntries.map((entry) => (
                    <article
                      key={entry.id}
                      className="rounded-md bg-[var(--purple)] p-3 text-white"
                    >
                      <p className="font-semibold">{entry.subjectCode}</p>
                      <p className="text-sm opacity-90">{entry.description}</p>
                      <p className="pt-2 text-xs font-medium opacity-90">
                        {formatTime(entry.startTime)}-{formatTime(entry.endTime)}
                      </p>
                      {entry.location ? (
                        <p className="text-xs opacity-80">{entry.location}</p>
                      ) : null}
                    </article>
                  ))
                ) : (
                  <p className="text-sm text-[var(--muted)]">No classes</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
