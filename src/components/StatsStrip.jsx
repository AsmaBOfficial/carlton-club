import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 12, label: "Full-Size Tables", suffix: "" },
  { value: 1963, label: "Founded", suffix: "" },
  { value: 400, label: "Members", suffix: "+" },
  { value: null, label: "Accredited Club", display: "EPSB" },
];

function Counter({ target, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsStrip() {
  return (
    <div className="border-y border-brass/25 bg-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4 md:px-10">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <p className="font-display text-4xl font-semibold text-baize md:text-5xl">
              {s.display ? s.display : <Counter target={s.value} suffix={s.suffix} />}
            </p>
            <p className="mt-1 font-body text-xs uppercase tracking-widest text-ink/60">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}