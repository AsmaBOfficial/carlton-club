import { useRef, useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero3D from "./components/Hero3D";
import StatsStrip from "./components/StatsStrip";
import About from "./components/About";
import Facilities from "./components/Facilities";
import Membership from "./components/Membership";
import LeaguesEvents from "./components/LeaguesEvents";
import Coaching from "./components/Coaching";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const heroRef = useRef(null);
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div id="top" className="font-body">
      <Navigation heroInView={heroInView} />
      <Hero3D heroRef={heroRef} />
      <StatsStrip />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Facilities />
      <div className="divider" />
      <Membership />
      <div className="divider" />
      <LeaguesEvents />
      <div className="divider" />
      <Coaching />
      <div className="divider" />
      <Gallery />
      <div className="divider" />
      <Testimonials />
      <div className="divider" />
      <Contact />
      <Footer />
    </div>
  );
}
