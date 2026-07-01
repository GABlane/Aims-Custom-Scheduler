# AIMS Custom Scheduler

## Project Context

AIMS Custom Scheduler is a client-side web app for turning a UCC/AIMS class schedule screenshot into a clean, customizable phone or desktop wallpaper.

The reason for the project is simple: I want an easy way to customize your schedule because the schedule from UCC feels outdated.

## Current MVP Direction

- Paste or upload an AIMS schedule screenshot.
- Crop the upper subject table.
- Run client-side OCR later with Tesseract.js.
- Parse schedule text into editable class entries.
- Let the student review and fix OCR mistakes.
- Customize a wallpaper layout.
- Download the final PNG.

## Tech Stack

- TypeScript
- Next.js App Router
- React
- Tailwind CSS
- Browser Canvas planned for image processing and export
- Tesseract.js planned for OCR
- LocalStorage planned for local draft saving
- Vercel planned for hosting

## Theme Direction

The visual direction is based on the Rewind-style AI/productivity landing page reference described from Landingfolio and an archived 2023 Rewind capture, especially:

- soft pastel backgrounds
- editorial serif headings
- rounded oversized content sections
- large lightweight product mockups
- minimal centered-logo navigation
- repeated pill-shaped conversion CTAs
- alternating neutral, pale blue, lavender, and dark green sections
- purple gradient primary buttons

Approximate palette:

- Main page background: `#F5F2ED`
- White cards: `#FFFFFF`
- Primary text: `#48413F`
- Body text: `#817B78`
- Muted text: `#A39D98`
- Pink hero tint: `#F9E8F0`
- Lavender tint: `#EEE8F4`
- Pale blue section: `#E7EEF2`
- Dark privacy green: `#3E5345`
- Primary purple: `#7C35DE`
- Purple highlight: `#A553ED`
- Light border: `#E4DFDA`

The core landing-page UX sequence should be:

```text
Promise
-> Product demonstration
-> Authority
-> Simple explanation
-> Feature proof
-> User outcomes
-> Privacy reassurance
-> Emotional benefits
-> Final CTA
-> Objection handling
```

Rewind, Landingfolio, and any archived screenshots are design references only. Do not copy Rewind's logo, assets, screenshots, product copy, or exact layouts.

## MVP Boundaries

The MVP stays fully client-side. It should not include accounts, AIMS login, cloud screenshot storage, admin dashboards, direct scraping, or automatic calendar sync.

Original screenshots should not be stored by default because they may contain student information.

## Development

Run the app locally:

```bash
pnpm dev
```

Run checks:

```bash
CI=true pnpm lint
CI=true pnpm exec tsc --noEmit
CI=true pnpm build
```
