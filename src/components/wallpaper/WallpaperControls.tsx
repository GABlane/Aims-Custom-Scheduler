"use client";

import type { WallpaperDesign } from "@/types/wallpaper";

type WallpaperControlsProps = {
  design: WallpaperDesign;
  onChange: (design: WallpaperDesign) => void;
};

const templateDefaults: Record<
  WallpaperDesign["template"],
  Pick<WallpaperDesign, "backgroundColor" | "accentColor">
> = {
  "minimal-light": {
    backgroundColor: "#f5f2ed",
    accentColor: "#7c35de",
  },
  "minimal-dark": {
    backgroundColor: "#1f2420",
    accentColor: "#a553ed",
  },
  "ucc-inspired": {
    backgroundColor: "#f7fbf4",
    accentColor: "#287a4b",
  },
};

export function WallpaperControls({ design, onChange }: WallpaperControlsProps) {
  function updateDesign(patch: Partial<WallpaperDesign>) {
    onChange({ ...design, ...patch });
  }

  function updateCustomDimension(
    key: "width" | "height",
    value: number,
  ) {
    onChange({
      ...design,
      customDimensions: {
        width: design.customDimensions?.width ?? 1080,
        height: design.customDimensions?.height ?? 1920,
        [key]: value,
      },
    });
  }

  function updateTemplate(template: WallpaperDesign["template"]) {
    updateDesign({
      template,
      ...templateDefaults[template],
    });
  }

  return (
    <aside className="soft-panel space-y-5 p-5">
      <div>
        <h2 className="display-serif text-xl">Customization</h2>
        <p className="muted-copy mt-1 text-sm">
          Starter controls for the first wallpaper generator phase.
        </p>
      </div>

      <label className="block space-y-2 text-sm font-bold text-[var(--ink)]">
        Device
        <select
          value={design.devicePreset}
          onChange={(event) =>
            updateDesign({
              devicePreset: event.currentTarget.value as WallpaperDesign["devicePreset"],
            })
          }
          className="field-shell"
        >
          <option value="phone-portrait">Phone portrait</option>
          <option value="phone-portrait-modern">Phone portrait modern</option>
          <option value="desktop">Desktop</option>
          <option value="laptop">Laptop</option>
          <option value="custom">Custom dimensions</option>
        </select>
      </label>

      <label className="block space-y-2 text-sm font-bold text-[var(--ink)]">
        Theme
        <select
          value={design.template}
          onChange={(event) =>
            updateTemplate(event.currentTarget.value as WallpaperDesign["template"])
          }
          className="field-shell"
        >
          <option value="minimal-light">Minimal light</option>
          <option value="minimal-dark">Minimal dark</option>
          <option value="ucc-inspired">UCC-inspired</option>
        </select>
      </label>

      {design.devicePreset === "custom" ? (
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-2 text-sm font-bold text-[var(--ink)]">
            Width
            <input
              type="number"
              min="320"
              max="7680"
              value={design.customDimensions?.width ?? 1080}
              onChange={(event) =>
                updateCustomDimension("width", Number(event.currentTarget.value))
              }
              className="field-shell"
            />
          </label>
          <label className="space-y-2 text-sm font-bold text-[var(--ink)]">
            Height
            <input
              type="number"
              min="320"
              max="7680"
              value={design.customDimensions?.height ?? 1920}
              onChange={(event) =>
                updateCustomDimension("height", Number(event.currentTarget.value))
              }
              className="field-shell"
            />
          </label>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-2 text-sm font-bold text-[var(--ink)]">
          Background
          <input
            type="color"
            value={design.backgroundColor}
            onChange={(event) =>
              updateDesign({ backgroundColor: event.currentTarget.value })
            }
            className="h-10 w-full rounded-md border border-[var(--line)]"
          />
        </label>
        <label className="space-y-2 text-sm font-bold text-[var(--ink)]">
          Accent
          <input
            type="color"
            value={design.accentColor}
            onChange={(event) =>
              updateDesign({ accentColor: event.currentTarget.value })
            }
            className="h-10 w-full rounded-md border border-[var(--line)]"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm font-bold text-[var(--ink)]">
        Font size
        <input
          type="range"
          min="24"
          max="52"
          value={design.fontSize}
          onChange={(event) =>
            updateDesign({ fontSize: Number(event.currentTarget.value) })
          }
          className="w-full accent-[var(--purple)]"
        />
      </label>

      <label className="block space-y-2 text-sm font-bold text-[var(--ink)]">
        Time format
        <select
          value={design.timeFormat}
          onChange={(event) =>
            updateDesign({
              timeFormat: event.currentTarget.value as WallpaperDesign["timeFormat"],
            })
          }
          className="field-shell"
        >
          <option value="12h">12-hour</option>
          <option value="24h">24-hour</option>
        </select>
      </label>

      <div className="space-y-3 text-sm font-bold text-[var(--ink)]">
        {[
          ["showDescription", "Show description", design.showDescription],
          ["showRoom", "Show room", design.showRoom],
          ["showEmptyDays", "Show empty days", design.showEmptyDays],
        ].map(([name, label, checked]) => (
          <label key={String(name)} className="flex items-center gap-3">
            <input
              type="checkbox"
              name={String(name)}
              checked={Boolean(checked)}
              onChange={(event) =>
                updateDesign({
                  [String(name)]: event.currentTarget.checked,
                } as Partial<WallpaperDesign>)
              }
              className="h-4 w-4 accent-[var(--purple)]"
            />
            {label}
          </label>
        ))}
      </div>
    </aside>
  );
}
