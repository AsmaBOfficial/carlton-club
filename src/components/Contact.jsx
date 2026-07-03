import { motion } from "framer-motion";

const HOURS = [
  { day: "Monday", time: "5pm – 11pm" },
  { day: "Tuesday", time: "5pm – 11pm" },
  { day: "Wednesday", time: "2pm – 11pm" },
  { day: "Thursday", time: "2pm – 11pm" },
  { day: "Friday", time: "2pm – Midnight" },
  { day: "Saturday", time: "11am – Midnight" },
  { day: "Sunday", time: "11am – 10pm" },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-white px-6 py-28 md:px-10">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="font-body text-xs uppercase tracking-[0.25em] text-brass">
          Contact & Find Us
        </p>
        <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-6xl">
          Come and see the club for yourself.
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-brass/20 shadow-md">
            <iframe
              title="Carlton & District Liberal Club location"
              src="https://maps.google.com/maps?q=Carlton%2C%20Yorkshire&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-80 w-full md:h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-semibold text-baize">
                Address
              </h3>
              <p className="mt-1 font-body text-ink/75">
                14 Wentbridge Road, Carlton, Yorkshire, WF3 8QN
              </p>
            </div>
            <div className="flex flex-wrap gap-10">
              <div>
                <h3 className="font-display text-xl font-semibold text-baize">
                  Phone
                </h3>
                <p className="mt-1 font-body text-ink/75">01924 555 213</p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-baize">
                  Email
                </h3>
                <p className="mt-1 font-body text-ink/75">
                  info@carltondistrictclub.co.uk
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-semibold text-baize">
                Opening Hours
              </h3>
              <table className="mt-2 w-full max-w-sm font-body text-sm text-ink/75">
                <tbody>
                  {HOURS.map((h) => (
                    <tr key={h.day} className="border-b border-brass/10">
                      <td className="py-1.5">{h.day}</td>
                      <td className="py-1.5 text-right">{h.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="font-body text-xs text-ink/60">
              Free on-site parking. Two minutes' walk from Carlton bus
              interchange (routes 12, 44, 51).
            </p>

            <div>
              <h3 className="font-display text-xl font-semibold text-baize">
                Send a Message
              </h3>
              <form className="mt-3 max-w-sm space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full rounded-sm border border-brass/30 bg-paper px-4 py-2.5 font-body text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-brass"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full rounded-sm border border-brass/30 bg-paper px-4 py-2.5 font-body text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-brass"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  required
                  className="w-full rounded-sm border border-brass/30 bg-paper px-4 py-2.5 font-body text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-brass"
                />
                <button
                  type="submit"
                  className="rounded-sm bg-baize px-6 py-2.5 font-body text-sm font-medium text-cream transition hover:bg-baizeDark"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}