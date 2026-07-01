import Link from "next/link";

import { PasteZone } from "@/components/image-import/PasteZone";

const steps = [
  "Paste or upload an AIMS schedule screenshot",
  "Crop the upper subject table",
  "Review detected classes",
  "Customize the wallpaper",
  "Download the final PNG",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#172019]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between border-b border-[#dfe5d8] pb-5">
          <Link href="/" className="text-base font-semibold tracking-[0.08em]">
            AIMS SCHEDULER
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/review"
              className="rounded-md px-3 py-2 text-[#51604f] hover:bg-[#e9eee4]"
            >
              Review
            </Link>
            <Link
              href="/customize"
              className="rounded-md bg-[#1f6d4a] px-3 py-2 font-medium text-white hover:bg-[#18583c]"
            >
              Customize
            </Link>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1f6d4a]">
                Schedule wallpaper builder
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Turn your AIMS schedule into a custom wallpaper.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#586457]">
                Start with a screenshot, confirm the detected meetings, then
                export a sharp phone or desktop wallpaper.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/import"
                className="rounded-md bg-[#1f6d4a] px-5 py-3 text-center font-semibold text-white hover:bg-[#18583c]"
              >
                Paste screenshot
              </Link>
              <Link
                href="/import"
                className="rounded-md border border-[#bfcabb] px-5 py-3 text-center font-semibold text-[#263127] hover:bg-[#e9eee4]"
              >
                Upload screenshot
              </Link>
            </div>

            <ol className="grid gap-3 sm:grid-cols-5">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="border-l-2 border-[#cdd8c6] py-1 pl-3 text-sm text-[#586457]"
                >
                  <span className="block text-xs font-semibold text-[#1f6d4a]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <PasteZone />
        </div>
      </section>
    </main>
  );
}
