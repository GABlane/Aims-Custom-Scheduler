"use client";

import type { WallpaperDesign } from "@/types/wallpaper";

type WallpaperControlsProps = {
  design: WallpaperDesign;
};

export function WallpaperControls({ design }: WallpaperControlsProps) {
  return (
    <aside className="space-y-5 rounded-lg border border-[#d6dfd0] bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold">Customization</h2>
        <p className="mt-1 text-sm text-[#586457]">
          Starter controls for the first wallpaper generator phase.
        </p>
      </div>

      <label className="block space-y-2 text-sm font-medium text-[#334033]">
        Device
        <select
          defaultValue={design.devicePreset}
          className="w-full rounded-md border border-[#bfcabb] px-3 py-2"
        >
          <option value="phone-portrait">Phone portrait</option>
          <option value="phone-portrait-modern">Phone portrait modern</option>
          <option value="desktop">Desktop</option>
          <option value="laptop">Laptop</option>
          <option value="custom">Custom dimensions</option>
        </select>
      </label>

      <label className="block space-y-2 text-sm font-medium text-[#334033]">
        Theme
        <select
          defaultValue={design.template}
          className="w-full rounded-md border border-[#bfcabb] px-3 py-2"
        >
          <option value="minimal-light">Minimal light</option>
          <option value="minimal-dark">Minimal dark</option>
          <option value="ucc-inspired">UCC-inspired</option>
        </select>
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-2 text-sm font-medium text-[#334033]">
          Background
          <input
            type="color"
            defaultValue={design.backgroundColor}
            className="h-10 w-full rounded-md border border-[#bfcabb]"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-[#334033]">
          Accent
          <input
            type="color"
            defaultValue={design.accentColor}
            className="h-10 w-full rounded-md border border-[#bfcabb]"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm font-medium text-[#334033]">
        Font size
        <input
          type="range"
          min="24"
          max="52"
          defaultValue={design.fontSize}
          className="w-full accent-[#1f6d4a]"
        />
      </label>

      <div className="space-y-3 text-sm font-medium text-[#334033]">
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
              className="h-4 w-4 accent-[#1f6d4a]"
            />
            {label}
          </label>
        ))}
      </div>
    </aside>
  );
}
