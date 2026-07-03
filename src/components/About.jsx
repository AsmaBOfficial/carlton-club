import { motion } from "framer-motion";

const PILLARS = [
  {
    title: "Craft",
    body: "Twelve championship tables, kept to exacting standards, for a game that rewards patience and precision.",
  },
  {
    title: "Community",
    body: "A clubhouse built on decades of friendship — where members of every age and background share the baize.",
  },
  {
    title: "Competition",
    body: "Home to competitive leagues and EPSB-accredited coaching, for players chasing their next century break.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-paper px-6 py-28 md:px-10">
      <span className="pointer-events-none absolute -top-10 right-0 select-none font-display text-[14rem] font-semibold leading-none text-brass/5 md:text-[20rem]">
        63
      </span>

      <div className="relative mx-auto grid max-w-6xl gap-16 md:grid-cols-12 md:gap-6">
        <motion.div
          className="md:col-span-7"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="font-body text-xs uppercase tracking-[0.25em] text-brass">
            About the Club
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-6xl">
            A Yorkshire
            <br />
            tradition, since 1963.
          </h2>
          <div className="mt-6 max-w-md space-y-4 font-body text-ink/75">
            <p>
              Carlton & District Liberal Club opened its doors in 1963 as a
              modest reading room with a single table. Over six decades it
              has grown into one of Yorkshire's most respected snooker
              clubs, without ever losing the warmth of a members' room.
            </p>
            <p>
              Today the club is home to twelve full-size tables, an EPSB
              coaching programme, and a calendar of leagues that draw
              players from across the district.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <span className="rounded-sm border border-brass/40 bg-brass/10 px-3 py-1.5 font-body text-xs font-medium uppercase tracking-wide text-brass">
              EPSB Accredited
            </span>
            <span className="font-body text-xs text-ink/60">
              Recognised by the English Partnership for Snooker & Billiards
            </span>
          </div>
        </motion.div>

        <div className="md:col-span-5 md:pt-8">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              className={`rail-panel mb-5 p-6 ${i === 1 ? "md:ml-10" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <h3 className="font-display text-2xl font-semibold text-baize">
                {p.title}
              </h3>
              <p className="mt-2 font-body text-sm text-ink/70">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}