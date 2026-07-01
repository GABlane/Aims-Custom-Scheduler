import Link from "next/link";

import { AppNav } from "@/components/app/AppNav";
import { ImageImportWorkflow } from "@/components/image-import/ImageImportWorkflow";

export default function ImportPage() {
  return (
    <main className="page-bg">
      <div className="app-shell space-y-8">
        <AppNav actionHref="/review" actionLabel="Review classes" />
        <div className="space-y-5">
          <Link href="/" className="text-sm font-bold text-[var(--purple)]">
            Back to start
          </Link>
          <div className="space-y-3">
            <h1 className="text-4xl">Import screenshot</h1>
            <p className="muted-copy max-w-2xl leading-7">
              Select the schedule image and crop around the subject table before
              running OCR.
            </p>
          </div>
        </div>

        <ImageImportWorkflow />
      </div>
    </main>
  );
}
