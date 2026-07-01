import Link from "next/link";

import { ScheduleReview } from "@/components/schedule/ScheduleReview";

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-5 py-8 text-[#172019] sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 border-b border-[#dfe5d8] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Link href="/import" className="text-sm font-semibold text-[#1f6d4a]">
              Back to import
            </Link>
            <h1 className="text-3xl font-semibold">Review detected classes</h1>
            <p className="max-w-2xl leading-7 text-[#586457]">
              OCR results must be checked before generating the wallpaper.
            </p>
          </div>
          <Link
            href="/customize"
            className="rounded-md bg-[#1f6d4a] px-4 py-3 text-center font-semibold text-white hover:bg-[#18583c]"
          >
            Continue
          </Link>
        </div>

        <ScheduleReview />
      </div>
    </main>
  );
}
