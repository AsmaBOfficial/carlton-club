import { motion } from "framer-motion";

const REVIEWS = [
  {
    quote:
      "Twelve tables, always well kept, and a bar that feels like a second living room. Been a member eleven years and counting.",
    name: "Peter Whitfield",
    tier: "Full Member",
    since: 2015,
  },
  {
    quote:
      "The junior coaching gave my son something to be genuinely proud of. David's patience with the younger players is remarkable.",
    name: "Sarah Coombes",
    tier: "Junior Parent",
    since: 2022,
  },
  {
    quote:
      "Best value league in the district. Standard membership gets you everything you actually need to play seriously.",
    name: "Imran Qureshi",
    tier: "Standard Member",
    since: 2019,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-paper px-6 py-28 md:px-10">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="font-body text-xs uppercase tracking-[0.25em] text-brass">
          What Members Say
        </p>
        <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-6xl">
          Trusted by the club's own members.
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden border border-brass/20 bg-brass/20 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <div key={r.name} className="flex flex-col bg-white p-7">
              <span className="font-display text-4xl leading-none text-brass/30">
                &ldquo;
              </span>
              <p className="-mt-3 flex-1 font-body text-sm text-ink/80">
                {r.quote}
              </p>
              <div className="mt-5 border-t border-brass/15 pt-3">
                <p className="font-display text-base font-semibold text-ink">
                  {r.name}
                </p>
                <p className="font-body text-xs uppercase tracking-widest text-ink/60">
                  {r.tier} · member since {r.since}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}