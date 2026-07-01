import Link from "next/link";

import { AppNav } from "@/components/app/AppNav";

const stack = ["TypeScript", "Next.js App Router", "React", "Tailwind CSS"];

export default function AboutPage() {
  return (
    <main className="page-bg">
      <div className="app-shell space-y-10">
        <AppNav actionHref="/import" actionLabel="Import screenshot" />

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            <p className="eyebrow">About the project</p>
            <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl">
              A cleaner way to turn UCC schedules into something useful.
            </h1>
            <p className="muted-copy max-w-2xl text-lg leading-8">
              AIMS Custom Scheduler helps students review, fix, and style their
              class schedule as a phone or desktop wallpaper.
            </p>
          </div>

          <div className="soft-panel space-y-6 p-5 sm:p-6">
            <section className="space-y-2">
              <h2 className="display-serif text-2xl">Why it exists</h2>
              <p className="muted-copy leading-7">
                I wanted an easy way to customize your schedule because the
                schedule from UCC feels outdated.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="display-serif text-2xl">Built with</h2>
              <div className="flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[var(--lavender)] px-3 py-2 text-sm font-bold text-[var(--purple)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="display-serif text-2xl">Theme recognition</h2>
              <p className="muted-copy leading-7">
                The visual direction is inspired by the Rewind landing page
                referenced through Landingfolio and an archived 2023 Rewind
                design: soft pastel sections, editorial serif headings,
                product mockup windows, pill CTAs, and a purple AI-productivity
                accent system. Rewind assets, product copy, screenshots, and
                exact layouts are not used.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="display-serif text-2xl">Reference note</h2>
              <p className="muted-copy leading-7">
                Treat{" "}
                <a
                  href="https://www.landingfolio.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[var(--purple)] underline-offset-4 hover:underline"
                >
                  Landingfolio
                </a>
                {" "}and the Rewind page as design references only.
              </p>
            </section>

            <Link href="/import" className="button-primary inline-block px-5 py-3">
              Start building
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
