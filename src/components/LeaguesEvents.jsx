import { motion } from "framer-motion";

// Type markers borrow real snooker ball colours rather than a generic
// tag palette — each one is a colour a member already reads off the table.
const EVENTS = [
  { date: "12 Jul", name: "Summer Handicap — Round 3", type: "League", ball: "#1B5C3C" },
  { date: "19 Jul", name: "Carlton Open Singles", type: "Tournament", ball: "#111111" },
  { date: "02 Aug", name: "Junior League Finals Night", type: "Junior", ball: "#E8C547" },
  { date: "16 Aug", name: "Charity Pro-Am Exhibition", type: "Exhibition", ball: "#2E5FA3" },
];

export default function LeaguesEvents() {
  return (
    <section id="leagues" className="bg-white px-6 py-28 md:px-10">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-brass">
              Leagues & Events
            </p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-6xl">
              The season never really stops.
            </h2>
          </div>
          <a href="#leagues" className="font-body text-sm font-medium text-baize underline decoration-brass/50 underline-offset-4 hover:text-brass">View full fixtures →</a>
        </div>

        <div className="mt-12 divide-y divide-brass/15 border-y border-brass/15">
          {EVENTS.map((e) => (
            <div
              key={e.name}
              className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:gap-8"
            >
              <span className="font-display text-lg font-semibold text-baize sm:w-24">
                {e.date}
              </span>
              <span className="flex-1 font-body text-ink/85">{e.name}</span>
              <span className="flex w-fit items-center gap-2 font-body text-xs uppercase tracking-wide text-ink/60">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: e.ball }}
                  aria-hidden="true"
                />
                {e.type}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}