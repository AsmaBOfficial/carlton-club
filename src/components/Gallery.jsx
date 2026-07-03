import { useState } from "react";
import { motion } from "framer-motion";

const IMAGES = [
  { src: "/images/table.jpg", alt: "Championship snooker table" },
  { src: "/images/match_night.jpg", alt: "Match night under the table lights" },
  { src: "/images/bar.jpg", alt: "Members' bar and lounge" },
  { src: "/images/Row_of_table.jpg", alt: "Row of championship tables" },
  { src: "/images/cabnit_trophy.jpg", alt: "Trophy cabinet in the clubhouse" },
  { src: "/images/junior.jpg", alt: "Junior league action" },
  { src: "/images/close_up.jpg", alt: "Close-up of cue and ball" },
  { src: "/images/night_club.jpg", alt: "Evening at the club" },
  { src: "/images/Table_close_up.jpg", alt: "Table detail close-up" },
];
export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="bg-white px-6 py-28 md:px-10">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="font-body text-xs uppercase tracking-[0.25em] text-brass">
          Gallery
        </p>
        <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-6xl">
          Life at the club.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setActive(i)}
              className="block w-full overflow-hidden rounded-2xl shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-64 w-full object-cover transition duration-300 hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      </motion.div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-6"
          onClick={() => setActive(null)}
        >
          <img
            src={IMAGES[active].src}
            alt={IMAGES[active].alt}
            className="max-h-[85vh] max-w-full rounded-sm"
          />
          <button
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-6 top-6 text-3xl text-cream"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}