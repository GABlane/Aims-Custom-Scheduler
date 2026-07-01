"use client";

import type { WallpaperDesign } from "@/types/wallpaper";

type WallpaperControlsProps = {
  design: WallpaperDesign;
};

export function WallpaperControls({ design }: WallpaperControlsProps) {
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
          defaultValue={design.devicePreset}
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
          defaultValue={design.template}
          className="field-shell"
        >
          <option value="minimal-light">Minimal light</option>
          <option value="minimal-dark">Minimal dark</option>
          <option value="ucc-inspired">UCC-inspired</option>
        </select>
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-2 text-sm font-bold text-[var(--ink)]">
          Background
          <input
            type="color"
            defaultValue={design.backgroundColor}
            className="h-10 w-full rounded-md border border-[var(--line)]"
          />
        </label>
        <label className="space-y-2 text-sm font-bold text-[var(--ink)]">
          Accent
          <input
            type="color"
            defaultValue={design.accentColor}
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
          defaultValue={design.fontSize}
          className="w-full accent-[var(--purple)]"
        />
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
              defaultChecked={Boolean(checked)}
              className="h-4 w-4 accent-[var(--purple)]"
            />
            {label}
          </label>
        ))}
      </div>
    </aside>
  );
}
