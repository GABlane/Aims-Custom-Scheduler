import Link from "next/link";

type AppNavProps = {
  actionHref?: string;
  actionLabel?: string;
};

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/customize", label: "Preview" },
  { href: "/review", label: "Review" },
];

export function AppNav({ actionHref = "/import", actionLabel = "Start" }: AppNavProps) {
  return (
    <nav className="relative z-10 mx-auto flex h-auto max-w-6xl flex-wrap items-center justify-between gap-4 px-3 py-4 md:h-[72px] md:flex-nowrap md:px-6">
      <div className="order-2 hidden items-center gap-1 text-sm md:order-1 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full px-4 py-2 text-[var(--body)] hover:bg-white"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="order-1 flex items-center gap-3 font-semibold md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--lavender)] text-sm font-black text-[var(--purple)]">
          AS
        </span>
        <span className="tracking-[0.04em]">AIMS Scheduler</span>
      </Link>

      <div className="order-3 ml-auto flex items-center gap-2 text-sm">
        <Link href="/about" className="rounded-full px-4 py-2 text-[var(--body)] hover:bg-white md:hidden">
          About
        </Link>
        <Link href={actionHref} className="button-secondary px-4 py-2">
          {actionLabel}
        </Link>
      </div>
    </nav>
  );
}
