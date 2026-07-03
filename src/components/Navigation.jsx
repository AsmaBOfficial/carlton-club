import { useEffect, useState } from "react";

const LINKS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Facilities", href: "#facilities", id: "facilities" },
  { label: "Membership", href: "#membership", id: "membership" },
  { label: "Leagues", href: "#leagues", id: "leagues" },
  { label: "Coaching", href: "#coaching", id: "coaching" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "Contact", href: "#contact", id: "contact" },
];

function NavLink({ link, active, onClick }) {
  const cls = active ? "text-brassLight" : "text-cream/85 hover:text-brassLight";
  return (
    <a href={link.href} onClick={onClick} className={`relative font-body text-sm tracking-wide transition ${cls}`}>
      {link.label}
      {active && <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-brassLight" />}
    </a>
  );
}

export default function Navigation({ heroInView }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const solid = !heroInView;

  useEffect(() => {
    setOpen(false);
  }, [heroInView]);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "bg-baize shadow-md" : "bg-transparent"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="font-display text-xl font-semibold tracking-wide text-cream">Carlton <span className="text-brassLight">&</span> District</a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <NavLink link={l} active={activeId === l.id} />
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden rounded-sm bg-brass px-5 py-2 font-body text-sm font-medium text-ink transition hover:bg-brassLight md:inline-block">Book a Table</a>

        <button className="text-cream md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="bg-baize px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <NavLink link={l} active={activeId === l.id} onClick={() => setOpen(false)} />
              </li>
            ))}
            <li>
              <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-block rounded-sm bg-brass px-5 py-2 font-body text-sm font-medium text-ink">Book a Table</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}