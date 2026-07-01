import Link from "next/link";

import { AppNav } from "@/components/app/AppNav";

const productModes = ["Browse", "Search", "Ask"];

const quickSteps = [
  {
    number: "1",
    title: "Import screenshot",
    description: "Paste or upload the AIMS subject table from your current schedule.",
  },
  {
    number: "2",
    title: "Review entries",
    description: "Check detected subjects, times, rooms, and online meetings before export.",
  },
  {
    number: "3",
    title: "Customize wallpaper",
    description: "Choose a device preset, theme, background, and schedule details.",
  },
];

const featureRows = [
  {
    label: "Schedule cleanup",
    title: "Turn a cramped table into a readable weekly plan.",
    body: "The editor is built around the review step because OCR will never be perfect. You stay in control before anything becomes a wallpaper.",
    points: ["Editable subjects and sections", "Day and time correction", "Room and online mode fields", "Duplicate meeting handling"],
    visual: "summary",
  },
  {
    label: "Fast retrieval",
    title: "Keep your current schedule draft on your device.",
    body: "The MVP stores the latest draft locally, so you can refresh, return, and continue without creating an account.",
    points: ["No sign in required", "LocalStorage draft saving", "Screenshot privacy by default", "No backend for MVP"],
    visual: "backup",
  },
  {
    label: "Wallpaper assistant",
    title: "Preview phone and desktop layouts before downloading.",
    body: "The customizer focuses on a small number of polished templates so the final wallpaper stays readable.",
    points: ["Phone and desktop presets", "Background color or image", "12-hour or 24-hour time", "Sharp PNG export path"],
    visual: "assistant",
  },
];

const testimonials = [
  {
    quote: "I can finally keep my class schedule somewhere I actually look every day.",
    name: "CS student",
    role: "UCC schedule user",
  },
  {
    quote: "The review step makes sense because screenshots are messy and OCR needs checking.",
    name: "Prototype tester",
    role: "Student workflow",
  },
  {
    quote: "A wallpaper version is faster than opening the portal just to confirm one room.",
    name: "Classmate",
    role: "Mobile-first user",
  },
];

const stories = [
  {
    title: "Less portal checking",
    body: "Students can keep the clean version of their schedule on the lock screen, desktop, or home screen.",
  },
  {
    title: "More personal than a screenshot",
    body: "The same schedule data can become a simple timetable, a minimal list, or a themed wallpaper.",
  },
];

const privacyItems = [
  {
    title: "Screenshot stays local",
    body: "The MVP processes screenshots in the browser instead of uploading them to a server.",
  },
  {
    title: "No account required",
    body: "Students can use the first version without registration, login, or a cloud profile.",
  },
  {
    title: "Drafts are local",
    body: "Saved work is intended for LocalStorage first, not permanent screenshot storage.",
  },
];

const benefits = [
  {
    title: "Get peace of mind",
    body: "A cleaner schedule makes the week easier to scan.",
  },
  {
    title: "Be more present",
    body: "Stop reopening the portal just to check a room or time.",
  },
  {
    title: "Feel prepared",
    body: "Export the same schedule for phone, laptop, or desktop.",
  },
];

const faqs = [
  {
    question: "Does OCR have to be perfect?",
    answer: "No. OCR is only the starting point. The app should always require review before export.",
  },
  {
    question: "Will screenshots be uploaded?",
    answer: "Not for the MVP. The planned OCR and wallpaper generation flow runs client-side.",
  },
  {
    question: "Why not connect directly to AIMS?",
    answer: "Direct login or scraping adds risk and complexity. Screenshot import is the safer first version.",
  },
  {
    question: "Can I make phone and desktop wallpapers?",
    answer: "Yes. The planned presets include phone portrait, modern phone portrait, desktop, laptop, and custom dimensions.",
  },
  {
    question: "Why build this?",
    answer: "The UCC schedule view feels outdated, and students need a faster way to make it readable and personal.",
  },
];

function StartActions() {
  return (
    <div className="mx-auto grid w-full max-w-xl gap-3 rounded-[999px] bg-white p-2 shadow-[0_10px_30px_rgba(58,48,43,0.08)] sm:grid-cols-[1fr_auto]">
      <div className="flex min-h-12 items-center rounded-full px-5 text-left text-sm text-[var(--body)] sm:text-base">
        Paste or upload your AIMS screenshot
      </div>
      <Link href="/import" className="button-primary flex min-h-12 items-center justify-center px-7 text-center">
        Start import
      </Link>
    </div>
  );
}

function DeviceShowcase() {
  return (
    <div className="mx-auto mt-14 w-full max-w-5xl">
      <div className="relative mx-auto min-h-[360px] max-w-4xl sm:min-h-[450px]">
        <div className="window-shadow absolute left-1/2 top-0 w-[92%] max-w-[760px] -translate-x-1/2 overflow-hidden rounded-[22px] border border-white/80 bg-white">
          <div className="flex h-10 items-center gap-2 border-b border-[var(--line)] bg-[#f8f6f3] px-4">
            <span className="h-3 w-3 rounded-full bg-[#ff8b87]" />
            <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
            <span className="h-3 w-3 rounded-full bg-[#76d39b]" />
            <div className="ml-4 h-4 w-36 rounded-full bg-[#e9e5df]" />
          </div>
          <div className="grid gap-4 p-5 md:grid-cols-[220px_1fr]">
            <aside className="rounded-2xl bg-[var(--cream)] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                Week overview
              </p>
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
                <div
                  key={day}
                  className="mt-3 flex items-center justify-between rounded-full bg-white px-3 py-2 text-sm"
                >
                  <span className="font-semibold">{day}</span>
                  <span className="text-[var(--body)]">{index + 1} classes</span>
                </div>
              ))}
            </aside>
            <div className="rounded-2xl bg-[var(--pale-blue)] p-4">
              <div className="grid gap-3">
                {[
                  ["CS 113", "Automata and Language Theory", "Thu 6:30 PM"],
                  ["CS 118", "CS Thesis Writing 1", "Fri 6:30 PM"],
                  ["IT ELEC", "Professional Elective", "Sat 10:30 AM"],
                ].map(([code, title, time]) => (
                  <article key={code} className="rounded-2xl bg-white p-4 shadow-[0_10px_20px_rgba(58,48,43,0.06)]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold text-[var(--purple)]">{code}</p>
                        <p className="mt-1 text-sm text-[var(--ink)]">{title}</p>
                      </div>
                      <p className="whitespace-nowrap text-sm text-[var(--body)]">{time}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="window-shadow absolute bottom-0 right-2 w-[170px] overflow-hidden rounded-[28px] border-4 border-[#2f2927] bg-white sm:right-12 sm:w-[210px]">
          <div className="h-8 bg-[#2f2927]" />
          <div className="space-y-3 bg-[var(--page)] p-4">
            <p className="display-heading text-2xl leading-none">Today</p>
            {["CS 113", "CS 118", "ONLINE"].map((item) => (
              <div key={item} className="rounded-2xl bg-white p-3 text-sm shadow-[0_10px_20px_rgba(58,48,43,0.06)]">
                <p className="font-bold">{item}</p>
                <p className="text-xs text-[var(--body)]">6:30 PM</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex w-fit rounded-full bg-[#fbf8f3] p-1 shadow-[0_10px_30px_rgba(58,48,43,0.08)]">
        {productModes.map((mode, index) => (
          <button
            key={mode}
            className={[
              "focus-ring rounded-full px-5 py-3 text-sm font-bold transition",
              index === 0 ? "bg-white text-[var(--ink)] shadow-[0_6px_16px_rgba(58,48,43,0.08)]" : "text-[var(--body)]",
            ].join(" ")}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
}

function SocialProof() {
  return (
    <section className="section-card bg-[var(--page)] text-center">
      <h2 className="display-heading mx-auto max-w-3xl text-4xl md:text-5xl">
        Students use cleaner schedules to move faster.
      </h2>
      <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4">
        {testimonials.map((item) => (
          <article
            key={item.name}
            className="relative min-w-[300px] snap-center rounded-[18px] border border-[var(--line)] bg-white p-6 pb-10 text-left shadow-[0_10px_30px_rgba(58,48,43,0.08)]"
          >
            <p className="text-lg leading-7 text-[var(--ink)]">
              &quot;{item.quote}&quot;
            </p>
            <div className="absolute -bottom-6 left-6 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full border-4 border-[var(--page)] bg-[var(--lavender)]" />
              <div>
                <p className="text-sm font-bold">{item.name}</p>
                <p className="text-xs text-[var(--body)]">{item.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-5 text-sm text-[var(--muted)]">
        <span>Built for</span>
        <span>UCC students</span>
        <span>Schedule review</span>
        <span>Wallpaper export</span>
        <span>Client-side privacy</span>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section-card bg-[#ebe7e1] text-center">
      <h2 className="display-heading text-5xl md:text-6xl">How it works</h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--body)]">
        The flow stays simple so students can move from screenshot to wallpaper without account setup.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {quickSteps.map((step) => (
          <article key={step.title} className="rounded-[20px] bg-white p-6 text-left shadow-[0_10px_30px_rgba(58,48,43,0.08)]">
            <div className="relative mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--line)]">
              <span className="display-heading text-3xl text-[var(--purple)]">{step.number}</span>
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--purple)] text-xs font-bold text-white">
                {step.number}
              </span>
            </div>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="mt-3 leading-7 text-[var(--body)]">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureVisual({ type }: { type: string }) {
  if (type === "backup") {
    return (
      <div className="window-shadow rounded-[20px] border border-white/80 bg-white p-5">
        <div className="mb-5 h-8 rounded-full bg-[#f1eee9]" />
        <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--cream)] p-6 text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-[var(--lavender)]" />
          <p className="font-bold">Latest draft saved locally</p>
          <p className="mt-2 text-sm text-[var(--body)]">Refresh without immediately losing your schedule edits.</p>
        </div>
      </div>
    );
  }

  if (type === "assistant") {
    return (
      <div className="window-shadow rounded-[20px] border border-white/80 bg-white p-5">
        <div className="space-y-3">
          <div className="mr-12 rounded-2xl bg-[var(--pale-blue)] p-4">
            <p className="text-sm font-bold">Make this phone wallpaper readable.</p>
          </div>
          <div className="ml-12 rounded-2xl bg-[var(--lavender)] p-4">
            <p className="text-sm text-[var(--ink)]">Use larger subject codes, show rooms, and hide empty days.</p>
          </div>
          <div className="rounded-2xl bg-[var(--cream)] p-4">
            <p className="text-sm font-bold text-[var(--purple)]">Preview ready</p>
            <p className="text-sm text-[var(--body)]">1080 x 1920 PNG export</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="window-shadow rounded-[20px] border border-white/80 bg-white p-5">
      <div className="mb-5 flex items-center gap-2 border-b border-[var(--line)] pb-4">
        <span className="h-3 w-3 rounded-full bg-[#ff8b87]" />
        <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
        <span className="h-3 w-3 rounded-full bg-[#76d39b]" />
      </div>
      <div className="space-y-3">
        {["Subject code", "Description", "Day", "Start and end time", "Location"].map((label) => (
          <div key={label} className="grid grid-cols-[140px_1fr] items-center gap-4 rounded-2xl bg-[var(--cream)] p-3 text-sm">
            <span className="font-bold">{label}</span>
            <span className="h-3 rounded-full bg-[#ddd7d0]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureShowcase() {
  return (
    <section className="section-card bg-[var(--pale-blue)]">
      <h2 className="display-heading mx-auto max-w-3xl text-center text-5xl md:text-6xl">
        Overcome schedule limitations
      </h2>
      <div className="mt-16 space-y-24">
        {featureRows.map((feature, index) => (
          <article
            key={feature.title}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <p className="eyebrow">{feature.label}</p>
              <h3 className="display-heading mt-4 max-w-xl text-4xl md:text-5xl">
                {feature.title}
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--body)]">
                {feature.body}
              </p>
              <ul className="mt-6 grid gap-3">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-[var(--ink)]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-[var(--purple)]">
                      ok
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <FeatureVisual type={feature.visual} />
          </article>
        ))}
      </div>
    </section>
  );
}

function CustomerStories() {
  return (
    <section className="section-card bg-[var(--lavender)]">
      <h2 className="display-heading mx-auto max-w-4xl text-center text-5xl md:text-6xl">
        For students who want to work smarter, better, faster
      </h2>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {stories.map((story) => (
          <article key={story.title} className="rounded-[22px] bg-white p-8 shadow-[0_10px_30px_rgba(58,48,43,0.08)]">
            <p className="display-heading text-6xl text-[var(--purple)]">
              &quot;
            </p>
            <h3 className="display-heading -mt-4 text-3xl">{story.title}</h3>
            <p className="mt-4 text-lg leading-8 text-[var(--body)]">{story.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/customize" className="button-secondary inline-flex px-6 py-3">
          View preview
        </Link>
      </div>
    </section>
  );
}

function PrivacySection() {
  return (
    <section className="section-card grid gap-10 bg-[var(--privacy-green)] text-white lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <h2 className="display-heading text-5xl md:text-6xl">Private by design</h2>
        <p className="mt-6 max-w-xl text-xl leading-8 text-[var(--privacy-copy)]">
          Class schedules can include names, sections, rooms, and school information. The MVP keeps that data on the student device.
        </p>
        <Link href="/about" className="button-secondary mt-8 inline-flex px-6 py-3 text-[var(--ink)]">
          Learn more
        </Link>
      </div>
      <div className="grid gap-4">
        {privacyItems.map((item) => (
          <article key={item.title} className="rounded-[18px] bg-white/10 p-5">
            <div className="mb-4 h-12 w-12 rounded-2xl bg-white/15" />
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="mt-2 leading-7 text-[var(--privacy-copy)]">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function EmotionalBenefits() {
  return (
    <section className="section-card grid gap-10 bg-[var(--cream)] lg:grid-cols-2 lg:items-center">
      <div>
        <h2 className="display-heading text-5xl md:text-6xl">
          Make school life more organized
        </h2>
        <p className="mt-5 max-w-lg text-xl leading-8 text-[var(--body)]">
          Life is easier when your schedule is readable, personal, and always nearby.
        </p>
      </div>
      <div className="grid gap-4">
        {benefits.map((benefit) => (
          <article key={benefit.title} className="flex gap-4 rounded-[18px] bg-white p-5 shadow-[0_10px_30px_rgba(58,48,43,0.08)]">
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-[var(--lavender)]" />
            <div>
              <h3 className="text-xl font-bold">{benefit.title}</h3>
              <p className="mt-1 text-[var(--body)]">{benefit.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="section-card bg-white text-center">
      <h2 className="display-heading mx-auto max-w-3xl text-5xl md:text-6xl">
        Download your new schedule wallpaper today
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--body)]">
        Start with a screenshot, fix the schedule fields, and export a sharp PNG.
      </p>
      <div className="mt-8">
        <StartActions />
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section-card grid gap-8 bg-[var(--page)] lg:grid-cols-[0.7fr_1.3fr]">
      <div>
        <h2 className="display-heading text-5xl">FAQ</h2>
        <p className="mt-4 max-w-sm leading-7 text-[var(--body)]">
          Questions that matter before building the OCR and export pipeline.
        </p>
      </div>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="group rounded-2xl border border-[var(--line)] bg-white p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
              {faq.question}
              <span className="transition group-open:rotate-180">v</span>
            </summary>
            <p className="mt-4 leading-7 text-[var(--body)]">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--lavender)] text-sm text-[var(--purple)]">
              AS
            </span>
            AIMS Scheduler
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--body)]">
            A client-side schedule wallpaper builder for UCC students.
          </p>
          <Link href="/import" className="button-secondary mt-5 inline-flex px-5 py-2 text-sm">
            Start import
          </Link>
        </div>
        {[
          ["Company", "About", "Context", "Privacy"],
          ["Product", "Import", "Review", "Customize"],
          ["Use Cases", "Phone wallpaper", "Desktop wallpaper", "Class planning"],
        ].map(([heading, ...links]) => (
          <div key={heading}>
            <h3 className="text-sm font-bold">{heading}</h3>
            <div className="mt-4 grid gap-2 text-sm text-[var(--body)]">
              {links.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="page-bg">
      <div className="app-shell space-y-3">
        <AppNav actionHref="/import" actionLabel="Get started" />

        <section
          className="overflow-hidden rounded-[32px] px-5 py-16 text-center sm:px-8 md:min-h-[900px] md:py-20"
          style={{
            background:
              "linear-gradient(140deg, #f9e8f0 0%, #f5f2ed 48%, #e7eef2 100%)",
          }}
        >
          <p className="eyebrow">Schedule wallpaper builder</p>
          <h1 className="display-heading mx-auto mt-5 max-w-5xl text-[44px] sm:text-[62px] lg:text-[84px]">
            A truly personalized schedule
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[var(--body)] md:text-xl">
            AIMS Scheduler turns your UCC class screenshot into an editable schedule and a clean wallpaper your phone or desktop can actually use.
          </p>
          <div className="mt-8">
            <StartActions />
          </div>
          <p className="mt-4 text-sm text-[var(--body)]">
            Client-side MVP for screenshot import, review, customization, and PNG export.
          </p>

          <DeviceShowcase />
        </section>

        <SocialProof />
        <HowItWorks />
        <FeatureShowcase />
        <CustomerStories />
        <PrivacySection />
        <EmotionalBenefits />
        <FinalCta />
        <FAQSection />
        <Footer />
      </div>
    </main>
  );
}
