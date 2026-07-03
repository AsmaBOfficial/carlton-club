import { motion } from "framer-motion";

const TIERS = [
  {
    name: "Junior",
    price: "£75",
    period: "/ year",
    features: [
      "Under-18 membership",
      "Access to 2 practice tables",
      "Free entry to junior coaching sessions",
      "Junior league eligibility",
    ],
    highlight: false,
  },
  {
    name: "Standard",
    price: "£240",
    period: "/ year",
    features: [
      "Full table access, off-peak hours",
      "Members' bar & lounge access",
      "League entry (1 team)",
      "10% off coaching sessions",
    ],
    highlight: true,
  },
  {
    name: "Full",
    price: "£420",
    period: "/ year",
    features: [
      "Unrestricted table access, any hour",
      "Priority table booking",
      "League entry (unlimited teams)",
      "Free annual coaching assessment",
      "Guest passes (4 / year)",
    ],
    highlight: false,
  },
];

function MembershipCard({ tier, index }) {
  return (
    <motion.div
      className={`relative flex flex-col border p-8 pt-10 ${
        tier.highlight
          ? "border-brass bg-gradient-to-b from-baize to-baizeDark text-cream"
          : "border-brass/20 bg-white/70 text-ink backdrop-blur-sm"
      }`}
      style={
        tier.highlight
          ? {
              // scorecard corner-cut, like a stub torn from a membership book
              clipPath:
                "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
            }
          : undefined
      }
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      {tier.highlight && (
        <span className="absolute right-2 top-2 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-brassLight">
          Club's Choice
        </span>
      )}
      <h3 className="font-display text-2xl font-semibold">{tier.name}</h3>
      <p className="mt-3">
        <span className="font-display text-5xl font-semibold">
          {tier.price}
        </span>
        <span
          className={`ml-1 font-body text-sm ${
            tier.highlight ? "text-cream/70" : "text-ink/60"
          }`}
        >
          {tier.period}
        </span>
      </p>
      <ul className="mt-6 flex-1 space-y-3 font-body text-sm">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className={tier.highlight ? "text-brassLight" : "text-brass"}>
              ✓
            </span>
            <span className={tier.highlight ? "text-cream/90" : "text-ink/75"}>
              {f}
            </span>
          </li>
        ))}
      </ul>
      <a href="#contact" className={`mt-8 rounded-sm px-5 py-3 text-center font-body text-sm font-medium transition ${tier.highlight ? "bg-brass text-ink hover:bg-brassLight" : "border border-baize text-baize hover:bg-baize hover:text-cream"}`}>Apply Now</a>
    </motion.div>
  );
}

export default function Membership() {
  return (
    <section id="membership" className="relative overflow-hidden bg-paper px-6 py-28 md:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,147,46,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-brass">
          Membership
        </p>
        <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-6xl">
          Three ways to join the club.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <MembershipCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        <p className="mt-6 font-body text-xs text-ink/60">
          Pricing shown is indicative and subject to confirmation by the club committee.
        </p>
      </div>
    </section>
  );
}