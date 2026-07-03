import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import SnookerScene from "./SnookerScene";

export default function Hero3D({ heroRef }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [playToken, setPlayToken] = useState(1);
  const [frozen, setFrozen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFrozen(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        if (heroRef) heroRef.current = el;
      }}
      className="relative h-screen w-full overflow-hidden bg-ink"
    >
      {reducedMotion ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 35% 45%, #1B5C3C 0%, #123F29 35%, #0B0907 80%)",
          }}
        />
      ) : (
        <div className="absolute inset-0">
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ fov: 42, position: [-1, 6.5, 9.5] }}
            onCreated={() => setLoaded(true)}
          >
            <color attach="background" args={["#0B0907"]} />
            <fog attach="fog" args={["#0B0907", 8, 22]} />
            <ambientLight intensity={0.15} />
            <spotLight
              position={[1, 6, 0.5]}
              angle={0.55}
              penumbra={0.6}
              intensity={45}
              color="#ffd9a0"
              castShadow
              distance={18}
              decay={2}
            />
            <pointLight position={[-4, 2, 3]} intensity={4} color="#B8932E" />
            <Suspense fallback={null}>
              <SnookerScene playToken={playToken} frozen={frozen} />
            </Suspense>
          </Canvas>
        </div>
      )}

      {!loaded && !reducedMotion && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-ink">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brass/30 border-t-brass" />
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(11,9,7,0.75) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="relative z-10 flex h-full items-center px-6 md:px-16">
        <div className="max-w-xl">
          <p className="mb-4 font-body text-sm tracking-[0.25em] text-brassLight uppercase">
            Est. 1963 · Carlton, Yorkshire
          </p>
          <h1 className="font-display text-5xl font-medium leading-[1.05] text-cream md:text-7xl">
            Where the Break Begins.
          </h1>
          <p className="mt-5 max-w-md font-body text-base text-cream/80 md:text-lg">
            A private snooker club for serious players and social members
            alike.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#membership" className="rounded-sm bg-brass px-7 py-3 font-body text-sm font-medium tracking-wide text-ink transition hover:bg-brassLight">Become a Member</a>
            <a href="#contact" className="rounded-sm border border-cream/40 px-7 py-3 font-body text-sm font-medium tracking-wide text-cream transition hover:border-cream hover:bg-cream/10">Book a Table</a>
          </div>
        </div>
      </div>

      {!reducedMotion && (
        <button
          onClick={() => setPlayToken((p) => p + 1)}
          className="absolute bottom-8 right-6 z-10 flex items-center gap-2 rounded-full border border-cream/25 bg-ink/40 px-4 py-2 font-body text-xs uppercase tracking-wider text-cream/80 backdrop-blur transition hover:border-brass hover:text-brassLight md:right-16"
        >
          <span className="text-base leading-none">↻</span> Re-rack
        </button>
      )}

      <div className="absolute bottom-8 left-6 z-10 hidden font-body text-xs uppercase tracking-widest text-cream/50 md:block md:left-16">
        Scroll
      </div>
    </section>
  );
}