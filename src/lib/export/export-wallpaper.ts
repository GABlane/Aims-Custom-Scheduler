export type WallpaperExportFormat = "image/png" | "image/jpeg";

export function exportWallpaperCanvas(
  canvas: HTMLCanvasElement,
  format: WallpaperExportFormat = "image/png",
  quality?: number,
) {
  return canvas.toDataURL(format, quality);
}
