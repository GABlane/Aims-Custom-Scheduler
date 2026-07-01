import { DAYS, type ScheduleEntry } from "@/types/schedule";
import {
  DEVICE_PRESETS,
  type WallpaperDesign,
  type WallpaperExportFormat,
} from "@/types/wallpaper";

type WallpaperExportInput = {
  entries: ScheduleEntry[];
  design: WallpaperDesign;
};

type ExportValidationResult = {
  valid: boolean;
  errors: string[];
};

type ThemeColors = {
  background: string;
  foreground: string;
  muted: string;
  panel: string;
  border: string;
  accent: string;
  card: string;
};

const themeColors: Record<WallpaperDesign["template"], ThemeColors> = {
  "minimal-light": {
    background: "#f5f2ed",
    foreground: "#48413f",
    muted: "#817b78",
    panel: "#ffffff",
    border: "#e4dfda",
    accent: "#7c35de",
    card: "#ffffff",
  },
  "minimal-dark": {
    background: "#1f2420",
    foreground: "#f8f4ed",
    muted: "#b8c0b4",
    panel: "#2d352f",
    border: "#53614f",
    accent: "#a553ed",
    card: "#354038",
  },
  "ucc-inspired": {
    background: "#f7fbf4",
    foreground: "#263127",
    muted: "#62705f",
    panel: "#ffffff",
    border: "#dce8d7",
    accent: "#287a4b",
    card: "#ffffff",
  },
};

function getDimensions(design: WallpaperDesign) {
  if (design.devicePreset === "custom" && design.customDimensions) {
    return design.customDimensions;
  }

  return DEVICE_PRESETS[design.devicePreset];
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

function formatTime(value: string, format: WallpaperDesign["timeFormat"]) {
  const minutesFromMidnight = timeToMinutes(value);

  if (Number.isNaN(minutesFromMidnight)) {
    return value;
  }

  const hours = Math.floor(minutesFromMidnight / 60);
  const minutes = minutesFromMidnight % 60;

  if (format === "24h") {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${String(minutes).padStart(2, "0")} ${period}`;
}

function getVisibleDays(entries: ScheduleEntry[], showEmptyDays: boolean) {
  if (showEmptyDays) {
    return [...DAYS];
  }

  return DAYS.filter((day) => entries.some((entry) => entry.day === day));
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = context.measureText(testLine).width;

    if (width <= maxWidth || !currentLine) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function drawCardList(
  context: CanvasRenderingContext2D,
  entries: ScheduleEntry[],
  design: WallpaperDesign,
  colors: ThemeColors,
  width: number,
  height: number,
) {
  const margin = Math.round(width * 0.065);
  const titleSize = Math.max(40, Math.round(design.fontSize * (width / 1080)));
  const bodySize = Math.max(22, Math.round(titleSize * 0.42));
  const smallSize = Math.max(18, Math.round(titleSize * 0.33));
  const days = getVisibleDays(entries, design.showEmptyDays);
  let y = margin;

  context.fillStyle = colors.foreground;
  context.font = `700 ${titleSize}px Georgia, serif`;
  context.fillText("Weekly Schedule", margin, y + titleSize);

  context.fillStyle = colors.muted;
  context.font = `500 ${smallSize}px Arial, sans-serif`;
  context.fillText("Generated from AIMS Custom Scheduler", margin, y + titleSize + smallSize * 1.8);

  y += titleSize + smallSize * 3.4;

  for (const day of days) {
    const dayEntries = entries
      .filter((entry) => entry.day === day)
      .sort((left, right) => timeToMinutes(left.startTime) - timeToMinutes(right.startTime));
    const sectionStart = y;

    context.fillStyle = colors.accent;
    context.font = `700 ${bodySize}px Arial, sans-serif`;
    context.fillText(day, margin, y + bodySize);
    y += bodySize + smallSize * 0.8;

    if (dayEntries.length === 0) {
      context.fillStyle = colors.muted;
      context.font = `400 ${smallSize}px Arial, sans-serif`;
      context.fillText("No classes", margin, y + smallSize);
      y += smallSize * 2.2;
    }

    for (const entry of dayEntries) {
      const cardX = margin;
      const cardY = y;
      const cardWidth = width - margin * 2;
      const cardHeight = Math.max(120, Math.round(height * 0.075));

      context.fillStyle = colors.card;
      roundedRect(context, cardX, cardY, cardWidth, cardHeight, 24);
      context.fill();

      context.fillStyle = colors.accent;
      roundedRect(context, cardX, cardY, 10, cardHeight, 24);
      context.fill();

      context.fillStyle = colors.foreground;
      context.font = `700 ${bodySize}px Arial, sans-serif`;
      context.fillText(entry.subjectCode, cardX + 34, cardY + bodySize + 20);

      const timeText = `${formatTime(entry.startTime, design.timeFormat)} - ${formatTime(entry.endTime, design.timeFormat)}`;
      context.fillStyle = colors.muted;
      context.font = `600 ${smallSize}px Arial, sans-serif`;
      context.fillText(timeText, cardX + 34, cardY + bodySize + smallSize + 32);

      if (design.showDescription) {
        context.fillStyle = colors.foreground;
        context.font = `400 ${smallSize}px Arial, sans-serif`;
        const lines = wrapText(context, entry.description, cardWidth * 0.62);
        context.fillText(lines[0] ?? "", cardX + 34, cardY + bodySize + smallSize * 2.2 + 38);
      }

      if (design.showRoom && entry.location) {
        context.fillStyle = colors.muted;
        context.font = `700 ${smallSize}px Arial, sans-serif`;
        const locationWidth = context.measureText(entry.location).width;
        context.fillText(entry.location, cardX + cardWidth - locationWidth - 28, cardY + bodySize + 22);
      }

      y += cardHeight + 18;
    }

    y = Math.max(y, sectionStart + bodySize * 2.6);
    y += smallSize;
  }
}

function drawWeeklyColumns(
  context: CanvasRenderingContext2D,
  entries: ScheduleEntry[],
  design: WallpaperDesign,
  colors: ThemeColors,
  width: number,
  height: number,
) {
  const margin = Math.round(width * 0.045);
  const titleSize = Math.max(42, Math.round(design.fontSize * (width / 1440)));
  const bodySize = Math.max(20, Math.round(titleSize * 0.38));
  const smallSize = Math.max(16, Math.round(titleSize * 0.29));
  const visibleDays = getVisibleDays(entries, design.showEmptyDays);
  const columnGap = 16;
  const gridTop = margin + titleSize * 2.1;
  const gridHeight = height - gridTop - margin;
  const columnWidth =
    (width - margin * 2 - columnGap * (visibleDays.length - 1)) / visibleDays.length;

  context.fillStyle = colors.foreground;
  context.font = `700 ${titleSize}px Georgia, serif`;
  context.fillText("Weekly Schedule", margin, margin + titleSize);

  visibleDays.forEach((day, index) => {
    const x = margin + index * (columnWidth + columnGap);

    context.fillStyle = colors.panel;
    roundedRect(context, x, gridTop, columnWidth, gridHeight, 24);
    context.fill();

    context.fillStyle = colors.accent;
    context.font = `700 ${bodySize}px Arial, sans-serif`;
    context.fillText(day.slice(0, 3), x + 22, gridTop + bodySize + 22);

    const dayEntries = entries
      .filter((entry) => entry.day === day)
      .sort((left, right) => timeToMinutes(left.startTime) - timeToMinutes(right.startTime));

    let y = gridTop + bodySize + 48;

    if (dayEntries.length === 0) {
      context.fillStyle = colors.muted;
      context.font = `400 ${smallSize}px Arial, sans-serif`;
      context.fillText("No classes", x + 22, y + smallSize);
      return;
    }

    for (const entry of dayEntries) {
      const cardHeight = Math.max(112, Math.min(170, gridHeight / 4));

      context.fillStyle = colors.card;
      roundedRect(context, x + 14, y, columnWidth - 28, cardHeight, 18);
      context.fill();

      context.fillStyle = colors.accent;
      roundedRect(context, x + 14, y, 8, cardHeight, 18);
      context.fill();

      context.fillStyle = colors.foreground;
      context.font = `700 ${smallSize + 2}px Arial, sans-serif`;
      context.fillText(entry.subjectCode, x + 34, y + smallSize + 18);

      if (design.showDescription) {
        context.font = `400 ${smallSize}px Arial, sans-serif`;
        const lines = wrapText(context, entry.description, columnWidth - 70).slice(0, 2);
        lines.forEach((line, lineIndex) => {
          context.fillText(line, x + 34, y + smallSize * (lineIndex + 2.4) + 18);
        });
      }

      context.fillStyle = colors.muted;
      context.font = `600 ${smallSize - 1}px Arial, sans-serif`;
      context.fillText(
        `${formatTime(entry.startTime, design.timeFormat)} - ${formatTime(entry.endTime, design.timeFormat)}`,
        x + 34,
        y + cardHeight - smallSize - 12,
      );

      if (design.showRoom && entry.location) {
        context.fillText(entry.location, x + 34, y + cardHeight - 14);
      }

      y += cardHeight + 14;
    }
  });
}

export function validateWallpaperExport({
  entries,
  design,
}: WallpaperExportInput): ExportValidationResult {
  const errors: string[] = [];
  const dimensions = getDimensions(design);

  if (
    !Number.isFinite(dimensions.width) ||
    !Number.isFinite(dimensions.height) ||
    dimensions.width < 320 ||
    dimensions.height < 320
  ) {
    errors.push("Wallpaper dimensions must be at least 320 x 320.");
  }

  for (const entry of entries) {
    if (!entry.day) {
      errors.push(`${entry.subjectCode || "A subject"} is missing a day.`);
    }

    const start = timeToMinutes(entry.startTime);
    const end = timeToMinutes(entry.endTime);

    if (Number.isNaN(start) || Number.isNaN(end)) {
      errors.push(`${entry.subjectCode || "A subject"} has an invalid time.`);
    } else if (start >= end) {
      errors.push(`${entry.subjectCode || "A subject"} must start before it ends.`);
    }
  }

  for (const day of DAYS) {
    const dayEntries = entries.filter((entry) => entry.day === day);

    for (let index = 0; index < dayEntries.length; index += 1) {
      const current = dayEntries[index];
      const currentStart = timeToMinutes(current.startTime);
      const currentEnd = timeToMinutes(current.endTime);

      for (let nextIndex = index + 1; nextIndex < dayEntries.length; nextIndex += 1) {
        const next = dayEntries[nextIndex];
        const nextStart = timeToMinutes(next.startTime);
        const nextEnd = timeToMinutes(next.endTime);

        if (
          !Number.isNaN(currentStart) &&
          !Number.isNaN(currentEnd) &&
          !Number.isNaN(nextStart) &&
          !Number.isNaN(nextEnd) &&
          currentStart < nextEnd &&
          nextStart < currentEnd
        ) {
          errors.push(`${current.subjectCode} overlaps with ${next.subjectCode} on ${day}.`);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function createWallpaperCanvas({ entries, design }: WallpaperExportInput) {
  const dimensions = getDimensions(design);
  const colors = {
    ...themeColors[design.template],
    background: design.backgroundColor || themeColors[design.template].background,
    accent: design.accentColor || themeColors[design.template].accent,
  };
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Unable to create wallpaper canvas.");
  }

  canvas.width = dimensions.width;
  canvas.height = dimensions.height;

  context.fillStyle = colors.background;
  context.fillRect(0, 0, dimensions.width, dimensions.height);

  if (design.darkOverlay > 0) {
    context.fillStyle = `rgba(0, 0, 0, ${design.darkOverlay / 100})`;
    context.fillRect(0, 0, dimensions.width, dimensions.height);
  }

  const isPortrait = dimensions.height >= dimensions.width;

  if (isPortrait) {
    drawCardList(context, entries, design, colors, dimensions.width, dimensions.height);
  } else {
    drawWeeklyColumns(context, entries, design, colors, dimensions.width, dimensions.height);
  }

  return canvas;
}

export function exportWallpaperCanvas(
  canvas: HTMLCanvasElement,
  format: WallpaperExportFormat = "image/png",
  quality?: number,
) {
  return canvas.toDataURL(format, quality);
}

export function downloadWallpaper({
  entries,
  design,
  filename = "aims-class-schedule.png",
}: WallpaperExportInput & { filename?: string }) {
  const validation = validateWallpaperExport({ entries, design });

  if (!validation.valid) {
    throw new Error(validation.errors.join("\n"));
  }

  const canvas = createWallpaperCanvas({ entries, design });
  const link = document.createElement("a");

  link.href = exportWallpaperCanvas(canvas, "image/png");
  link.download = filename;
  link.click();
}
