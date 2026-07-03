import { motion } from "framer-motion";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Membership", href: "#membership" },
  { label: "Leagues", href: "#leagues" },
  { label: "Coaching", href: "#coaching" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = ["Facebook", "Instagram", "X"];

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-16 text-cream md:px-10">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <p className="font-display text-2xl font-semibold">
              Carlton <span className="text-brassLight">&</span> District
            </p>
            <p className="mt-2 max-w-xs font-body text-sm text-cream/60">
              A private snooker club in Carlton, Yorkshire. Est. 1963.
            </p>
            <div className="mt-5 flex gap-4">
              {SOCIALS.map((s) => (
                <a key={s} href="#" aria-label={s} className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-xs text-cream/70 transition-all duration-300 hover:-translate-y-1 hover:border-brassLight hover:text-brassLight">{s[0]}</a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-cream/50">
              Navigate
            </p>
            <ul className="mt-3 space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-body text-sm text-cream/75 transition hover:text-brassLight">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-cream/50">
              Affiliations
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <div className="rounded-sm border border-cream/20 px-3 py-2 text-center font-body text-xs text-cream/70">
                EPSB Accredited
              </div>
              <div className="rounded-sm border border-cream/20 px-3 py-2 text-center font-body text-xs text-cream/70">
                WPBSA Affiliated
              </div>
            </div>
          </div>
        </div>

        <div className="divider my-10" />

        <div className="flex flex-col-reverse items-center justify-between gap-4 font-body text-xs text-cream/50 md:flex-row">
          <p>© {new Date().getFullYear()} Carlton & District Liberal Club. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-brassLight">Privacy Policy</a>
            <a href="#" className="transition hover:text-brassLight">Terms & Conditions</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}