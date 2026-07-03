import { motion } from "framer-motion";

const FACILITIES = [
  { title: "12 Championship Tables", body: "Full-size, tournament-spec tables, re-clothed annually.", big: true },
  { title: "Bar & Lounge", body: "A relaxed members' bar stocked with local ales and spirits." },
  { title: "Match-Night Screens", body: "Live tournament coverage shown across the lounge." },
  { title: "Light Refreshments", body: "Sandwiches, pies, and hot drinks served on match nights." },
  { title: "On-Site Parking", body: "Free parking for members and visitors, on-site." },
  { title: "Step-Free Access", body: "Ground-floor tables and accessible facilities throughout." },
];

export default function Facilities() {
  return (
    <section id="facilities" className="bg-white px-6 py-28 md:px-10">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="font-body text-xs uppercase tracking-[0.25em] text-brass">
          Facilities
        </p>
        <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-6xl">
          Built for the game, and the evening around it.
        </h2>

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {/* Big featured image card spans 2 cols, 2 rows */}
          <div className="relative overflow-hidden rounded-sm border border-brass/20 md:col-span-2 md:row-span-2">
            <img
              src="/images/Row_of_table.jpg"
              alt="Snooker table and lounge at Carlton & District Liberal Club"
              className="h-64 w-full object-cover md:h-full"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="font-display text-2xl font-semibold text-cream">
                12 Championship Tables
              </h3>
              <p className="mt-1 font-body text-sm text-cream/80">
                Full-size, tournament-spec tables, re-clothed annually.
              </p>
            </div>
          </div>

          {FACILITIES.slice(1).map((f, i) => (
            <motion.div
              key={f.title}
              className="rail-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="font-display text-lg font-semibold text-baize">
                {f.title}
              </h3>
              <p className="mt-1 font-body text-sm text-ink/70">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}