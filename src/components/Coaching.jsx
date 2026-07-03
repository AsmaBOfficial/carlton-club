import { motion } from "framer-motion";

const SESSIONS = [
  { title: "1-to-1 Coaching", body: "Focused technical sessions tailored to your game." },
  { title: "Group Sessions", body: "Small groups of 3–4, ideal for developing tactical play." },
  { title: "Junior Programme", body: "Structured coaching for players aged 8–17, EPSB safeguarded." },
];

export default function Coaching() {
  return (
    <section id="coaching" className="bg-paper px-6 py-28 md:px-10">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="font-body text-xs uppercase tracking-[0.25em] text-brass">
          Coaching
        </p>
        <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-6xl">
          Learn from an EPSB-graded coach.
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-[220px_1fr] md:gap-14">
          <div className="relative">
            <img
              src="https://picsum.photos/seed/carlton-coach/400/520"
              alt="Portrait of Head Coach David Ellery"
              className="h-64 w-full object-cover grayscale-[15%] md:h-full"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-ink/85 p-4">
              <p className="font-display text-lg font-semibold text-cream">
                David Ellery
              </p>
              <p className="font-body text-[11px] uppercase tracking-widest text-brassLight">
                EPSB Level 3 Coach
              </p>
            </div>
          </div>

          <div>
            <p className="max-w-md font-body text-sm text-ink/70">
              20 years coaching experience, former county player, and head
              coach at Carlton since 2014.{" "}
              <a href="#contact" className="text-baize underline decoration-brass/50 underline-offset-4 hover:text-brass">
                Book a session →
              </a>
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {SESSIONS.map((s) => (
                <div key={s.title} className="border-t-2 border-brass/40 pt-4">
                  <h4 className="font-display text-lg font-semibold text-baize">
                    {s.title}
                  </h4>
                  <p className="mt-2 font-body text-sm text-ink/70">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}