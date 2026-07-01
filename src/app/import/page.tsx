import Link from "next/link";

import { ImageCropper } from "@/components/image-import/ImageCropper";
import { PasteZone } from "@/components/image-import/PasteZone";

export default function ImportPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-5 py-8 text-[#172019] sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="space-y-5">
          <Link href="/" className="text-sm font-semibold text-[#1f6d4a]">
            Back to start
          </Link>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold">Import screenshot</h1>
            <p className="max-w-xl leading-7 text-[#586457]">
              Select the schedule image and crop around the subject table before
              running OCR.
            </p>
          </div>
          <PasteZone compact />
        </section>

        <ImageCropper />
      </div>
    </main>
  );
}
