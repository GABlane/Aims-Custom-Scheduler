import Link from "next/link";

import { AppNav } from "@/components/app/AppNav";
import { ScheduleReview } from "@/components/schedule/ScheduleReview";

export default function ReviewPage() {
  return (
    <main className="page-bg">
      <div className="app-shell space-y-8">
        <AppNav actionHref="/customize" actionLabel="Customize" />
        <div className="flex flex-col gap-4 pb-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Link href="/import" className="text-sm font-bold text-[var(--purple)]">
              Back to import
            </Link>
            <h1 className="text-4xl">Review detected classes</h1>
            <p className="muted-copy max-w-2xl leading-7">
              OCR results must be checked before generating the wallpaper.
            </p>
          </div>
          <Link
            href="/customize"
            className="button-primary px-4 py-3 text-center"
          >
            Continue
          </Link>
        </div>

        <ScheduleReview />
      </div>
    </main>
  );
}
