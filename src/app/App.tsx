import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowRight, Check, ArrowUpRight, Menu, X, MapPin, Play } from "lucide-react";
import logoWhite from "../imports/ACT_Holding_Horizontal_Ash_White_2.png";
import founderImg from "../imports/image-3.png";
import heroImg from "../imports/891.jpg";

/* ── brand tokens ── */
const NAVY = "#0a123b";
const DARK = "#0d0d0d";
const OBSID = "#212121";
const CARD = "#101010";
const SLATE = "#85868a";
const ASH = "#f2f2f2";
const F = "'Articulat CF', 'Almarai', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const SERIF = "'Cormorant Garamond', 'Instrument Serif', 'Playfair Display', Georgia, serif";

type Page = "home" | "about" | "portfolio" | "thesis" | "contact" | "apply";
const PAGE_PATHS: Record<Page, string> = { home: "/", about: "/about", portfolio: "/portfolio", thesis: "/thesis", contact: "/contact", apply: "/apply" };
const pageFromPath = (): Page => {
  if (typeof window === "undefined") return "home";
  const p = window.location.pathname.replace(/\/$/, "");
  const found = (Object.entries(PAGE_PATHS) as [Page, string][]).find(([k, v]) => k !== "home" && p.endsWith(v));
  return found ? found[0] : "home";
};

/* ── noise ── */
const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ── video source (hls-style mp4 with poster fallback) ── */
const HERO_VIDEO = "";
const HERO_POSTER = heroImg;

/* ─── Words pull-up ─── */
function WordsPullUp({ text, className, style, delay = 0, stagger = 0.08 }: { text: string; className?: string; style?: React.CSSProperties; delay?: number; stagger?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} className="inline-flex overflow-hidden" style={{ verticalAlign: "top" }}>
          <motion.span
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 1, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
            style={{ marginRight: i < words.length - 1 ? "0.28em" : 0, paddingBottom: "0.18em", paddingTop: "0.05em" }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function WordsPullUpMulti({ segments, className, style }: { segments: { text: string; style?: React.CSSProperties }[]; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const all: { word: string; segStyle?: React.CSSProperties }[] = [];
  segments.forEach(s => s.text.split(" ").forEach(w => all.push({ word: w, segStyle: s.style })));
  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className || ""}`} style={style}>
      {all.map((w, i) => (
        <span key={i} className="inline-flex overflow-hidden" style={{ verticalAlign: "top" }}>
          <motion.span
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 1, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
            style={{ marginRight: "0.28em", paddingBottom: "0.18em", paddingTop: "0.05em", lineHeight: "inherit", ...w.segStyle }}
          >
            {w.word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/* scroll opacity reveal */
function AnimatedChar({ ch, progress, i, total }: { ch: string; progress: any; i: number; total: number }) {
  const cp = i / total;
  const opacity = useTransform(progress, [Math.max(0, cp - 0.1), cp + 0.05], [0.2, 1]);
  return <motion.span style={{ opacity }}>{ch}</motion.span>;
}
function ScrollReveal({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  return <p ref={ref} className={className} style={{ position: "relative", ...style }}>{text.split("").map((c, i) => <AnimatedChar key={i} ch={c} progress={scrollYProgress} i={i} total={text.length} />)}</p>;
}

/* ─── DATA ─── */
const VENTURES = [
  {
    num: "01", name: "LUUCI", role: "FOUNDER & CEO", status: "ACTIVE · BUILD",
    tagline: "AI wellness for the whole family — starting with pets.",
    desc: "Personalised AI paired with wearable sensing to guide better daily health decisions. Launching in the United States.",
    tags: ["AI", "Consumer Health", "Wearables"],
    accent: "#e63946",
    img: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&h=800&fit=crop&auto=format&q=85",
  },
  {
    num: "02", name: "One Hundred Group", role: "ADVISORY BOARD & MENA PARTNER", status: "ACTIVE · BUILD",
    tagline: "A global stage for trail & endurance running.",
    desc: "Host of the Endurance Trail World Championship — connecting athletes, host cities and the brands that serve them.",
    tags: ["Sport", "Endurance", "Community"],
    accent: "#8ac926",
    img: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&h=800&fit=crop&auto=format&q=85",
  },
  {
    num: "03", name: "ACT AI Lab", role: "FOUNDER & CHAIRMAN", status: "ACTIVE · BUILD",
    tagline: "We build the AI. You build the company.",
    desc: "From idea to company — strategy, direction and end-to-end development, specialising in agentic AI and autonomous agents.",
    tags: ["Agentic AI", "AI Build Studio", "Strategy"],
    accent: "#2b52ff",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=800&fit=crop&auto=format&q=85",
  },
];
const PRINCIPLES = [
  { n: "01", t: "Operator first, capital second.", d: "We have built and scaled regulated businesses for two decades. We invest from the seat of the founder, not the seat of the LP." },
  { n: "02", t: "Conviction over consensus.", d: "We commit early to categories we believe in and stay long enough to compound. We don't chase cycles." },
  { n: "03", t: "Build durable, not loud.", d: "We value real revenue, defensible technology, and brands people trust over headlines and theatre." },
  { n: "04", t: "Intelligence is the moat.", d: "Every ACT company is designed to compound proprietary data, models and operational insight as it scales." },
  { n: "05", t: "Health is the asset class.", d: "We believe human performance — physical, cognitive, metabolic — is the most valuable and underbuilt category of the next decade." },
  { n: "06", t: "Governance, then growth.", d: "Every venture is set up with the legal, financial and ethical infrastructure of an institution from day one." },
];
const STATS = [
  { v: "~500M", l: "MENA Population" },
  { v: "55%", l: "Under Age 30" },
  { v: "$30B+", l: "GCC AI Investment by 2025" },
  { v: "$100B+", l: "AI Infrastructure Pipeline" },
];

/* ═════════════════════════════════════════════ */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [page, setPage] = useState<Page>(pageFromPath);
  const videoRef = useRef<HTMLVideoElement>(null);

  const navigate = (target: Page) => {
    setPage(target);
    setMenuOpen(false);
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", PAGE_PATHS[target]);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    const onPop = () => setPage(pageFromPath());
    window.addEventListener("popstate", onPop);
    return () => { window.removeEventListener("scroll", fn); window.removeEventListener("popstate", onPop); };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#000000", color: ASH, fontFamily: F }}>
      <style>{`
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes softPulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        ::selection { background: ${ASH}; color: ${NAVY}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(242,242,242,0.25); }
        ::-webkit-scrollbar-track { background: #000; }
        html { scroll-behavior: smooth; }
        body { background: #000000; margin: 0; }
      `}</style>

      {/* ═════════════════════════════════════
          GLASSMORPHIC NAV — floating header
          ═════════════════════════════════════ */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-[1500px]"
      >
        <div className="rounded-2xl md:rounded-full transition-all duration-500"
          style={{
            background: scrolled ? "rgba(13,13,13,0.55)" : "rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(242,242,242,0.12)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(242,242,242,0.06)",
          }}>
          <div className="flex items-center justify-between px-4 md:px-6 h-14 md:h-16">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("home"); }} className="flex items-center gap-3 shrink-0">
              <img src={logoWhite} alt="ACT Holding" className="h-5 md:h-6 w-auto" />
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {(["Home", "About", "Portfolio", "Thesis", "Contact"] as const).map((n, i) => (
                <a key={n}
                  href={PAGE_PATHS[n.toLowerCase() as Page]}
                  onClick={(e) => { e.preventDefault(); navigate(n.toLowerCase() as Page); }}
                  className="px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-colors"
                  style={{ color: "rgba(242,242,242,0.75)", fontFamily: F, fontWeight: 500 }}
                  onMouseEnter={e => { e.currentTarget.style.color = ASH; e.currentTarget.style.background = "rgba(242,242,242,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(242,242,242,0.75)"; e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ opacity: 0.5, marginRight: 6 }}>0{i + 1}</span>{n}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a href="/apply" onClick={(e) => { e.preventDefault(); navigate("apply"); }}
                className="hidden md:inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase pl-5 pr-1.5 py-1.5 rounded-full transition-all hover:gap-3"
                style={{ background: ASH, color: NAVY, fontFamily: F }}>
                Pitch Your AI Idea
                <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: NAVY }}>
                  <ArrowUpRight size={12} strokeWidth={2.2} style={{ color: ASH }} />
                </span>
              </a>
              <button className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full"
                style={{ border: "1px solid rgba(242,242,242,0.15)", color: ASH }}
                onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="lg:hidden px-4 pb-4 flex flex-col gap-1 border-t" style={{ borderColor: "rgba(242,242,242,0.08)" }}>
              {(["Home", "About", "Portfolio", "Thesis", "Contact"] as const).map(n => (
                <a key={n}
                  href={PAGE_PATHS[n.toLowerCase() as Page]}
                  className="px-4 py-3 rounded-xl text-xs tracking-widest uppercase"
                  style={{ color: "rgba(242,242,242,0.75)", fontFamily: F, fontWeight: 500 }}
                  onClick={(e) => { e.preventDefault(); navigate(n.toLowerCase() as Page); }}>{n}</a>
              ))}
            </div>
          )}
        </div>
      </motion.header>

      {page === "contact" ? <ContactPage navigate={navigate} />
        : page === "about" ? <AboutPage navigate={navigate} />
        : page === "portfolio" ? <PortfolioPage navigate={navigate} />
        : page === "thesis" ? <ThesisPage navigate={navigate} />
        : page === "apply" ? <ApplyPage navigate={navigate} />
        : (<>
      {/* ═════════════════════════════════════
          HERO — Full-screen video, bottom-left content
          ═════════════════════════════════════ */}
      <section id="top" className="relative h-screen w-full overflow-hidden" style={{ background: DARK }}>
        {/* video background */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          poster={HERO_POSTER}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.55) contrast(1.1) saturate(0.85)" }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* noise overlay */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ backgroundImage: NOISE, opacity: 0.55 }} />

        {/* gradient overlays — key to legibility */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.9) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, transparent 45%)" }} />

        {/* HERO CONTENT — bottom-left */}
        <div className="absolute inset-x-0 bottom-0 px-6 md:px-10 lg:px-14 pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-6 items-end">
            {/* left column — headline */}
            <div className="col-span-12 lg:col-span-8">

              <h1 style={{ fontFamily: F, fontWeight: 500, fontSize: "clamp(2rem, 5.6vw, 5rem)", lineHeight: 1.08, letterSpacing: "-0.03em", color: ASH, paddingBottom: "0.15em" }}>
                <WordsPullUp text="The bridge between" delay={0} />
                <br />
                <WordsPullUp text="global innovation and the" delay={0.24} />
                <br />
                <WordsPullUp text="MENA opportunity." delay={0.42} />
              </h1>
            </div>

            {/* right column — description + CTA */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 lg:pb-3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm md:text-base max-w-md"
                style={{ color: "rgba(242,242,242,0.75)", fontFamily: F, fontWeight: 300, lineHeight: 1.55 }}>
                ACT is a holding company that builds, invests in, and scales ventures at the intersection of artificial intelligence, human performance and health technology — helping global companies enter and grow across MENA.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-3"
              >
                <a href="/apply" onClick={(e) => { e.preventDefault(); navigate("apply"); }}
                  className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase pl-5 pr-1.5 py-1.5 rounded-full transition-all hover:gap-3"
                  style={{ background: ASH, color: NAVY, fontFamily: F }}>
                  Pitch Your AI Idea
                  <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: NAVY }}>
                    <ArrowUpRight size={12} strokeWidth={2.2} style={{ color: ASH }} />
                  </span>
                </a>
                <a href="/thesis" onClick={(e) => { e.preventDefault(); navigate("thesis"); }}
                  className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5"
                  style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(242,242,242,0.15)", color: ASH, fontFamily: F }}>
                  <span className="text-sm md:text-base font-medium">Read Thesis</span>
                  <ArrowRight size={13} strokeWidth={1.8} style={{ color: ASH }} />
                </a>
              </motion.div>
            </div>
          </div>

          {/* bottom fine meta row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}
            className="max-w-[1500px] mx-auto mt-10 pt-6 border-t grid grid-cols-1 sm:grid-cols-3 gap-6"
            style={{ borderColor: "rgba(242,242,242,0.15)" }}>
            {[
              { k: "EST. 2025", v: "Dubai · UAE" },
              { k: "MANDATE", v: "Build · Invest · Scale" },
              { k: "BRIDGE", v: "Global → MENA" },
            ].map(m => (
              <div key={m.k}>
                <div className="text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: "rgba(242,242,242,0.5)", fontFamily: F }}>{m.k}</div>
                <div className="text-[13px]" style={{ color: ASH, fontFamily: F }}>{m.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════
          MARQUEE
          ═════════════════════════════════════ */}
      <div className="overflow-hidden py-4 border-y" style={{ background: OBSID, borderColor: "rgba(242,242,242,0.06)" }}>
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 45s linear infinite" }}>
          {Array(6).fill(0).map((_, w) => (
            <div key={w} className="flex items-center shrink-0">
              {["Intelligence in Action", "Build · Invest · Scale", "Authority", "Consistency", "Trust"].map((t, i) => (
                <span key={i} className="flex items-center gap-10 px-10 shrink-0">
                  <span className="text-[11px] font-medium tracking-[0.4em] uppercase" style={{ color: "rgba(242,242,242,0.55)", fontFamily: F }}>{t}</span>
                  <span style={{ color: "rgba(242,242,242,0.25)", fontFamily: SERIF, fontSize: 18 }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═════════════════════════════════════
          ABOUT
          ═════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 md:px-6" style={{ background: "#000000" }}>
        <div className="mx-auto max-w-6xl rounded-2xl md:rounded-[2rem] px-6 py-16 md:px-14 md:py-24" style={{ background: CARD }}>
          <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
            <div className="flex items-center gap-4 lg:pt-2">
              <div className="w-10 h-px" style={{ background: "rgba(242,242,242,0.35)" }} />
              <span className="text-[10px] tracking-[0.35em] uppercase font-medium" style={{ color: ASH, fontFamily: F }}>Who We Are</span>
            </div>

            <div className="space-y-6 max-w-3xl">
              <p className="text-base md:text-lg" style={{ color: ASH, fontFamily: F, fontWeight: 300, lineHeight: 1.6 }}>
                ACT is a founder-led holding company. We build companies from the inside — not as passive capital, but as operators who have lived the scaling problem before. Our work concentrates in three categories we believe are inseparable: <em style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>intelligence, performance, and health.</em>
              </p>
              <p className="text-base md:text-lg" style={{ color: SLATE, fontFamily: F, fontWeight: 300, lineHeight: 1.6 }}>
                We operate in two directions: building ventures of our own, and partnering with global companies that want to enter and scale across the Middle East and North Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════
          VENTURES
          ═════════════════════════════════════ */}
      <section id="portfolio" className="min-h-screen py-20 md:py-28 px-4 md:px-6 relative overflow-hidden" style={{ background: "#000000" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: NOISE, opacity: 0.12 }} />

        <div className="relative max-w-[1500px] mx-auto">
          <div className="text-center mb-14 md:mb-20">
            <div className="max-w-4xl mx-auto text-center"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              <div>
                <WordsPullUp text="Three ventures." style={{ fontFamily: F, fontWeight: 400, color: ASH }} />
              </div>
              <div>
                <WordsPullUp text="One thesis." delay={0.2} style={{ fontFamily: F, fontWeight: 400, color: ASH }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:h-[560px]">
            {VENTURES.map((v, i) => <VentureCard key={v.num} v={v} delay={0.15 * i} />)}
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════
          MENA
          ═════════════════════════════════════ */}
      <section id="mena" className="py-20 md:py-32 px-4 md:px-6" style={{ background: "#000000" }}>
        <div className="mx-auto max-w-[1500px] rounded-2xl md:rounded-[2rem] overflow-hidden relative" style={{ background: CARD }}>
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=2000&h=1400&fit=crop&auto=format&q=80"
              alt="MENA landscape"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.28) contrast(1.1) saturate(0.7)" }}
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${CARD}80 0%, ${CARD} 100%)` }} />
            <div className="absolute inset-0 mix-blend-overlay pointer-events-none" style={{ backgroundImage: NOISE, opacity: 0.3 }} />
          </div>

          <div className="relative px-6 py-16 md:px-14 md:py-24">
            <div className="text-[10px] mb-8 tracking-[0.3em] uppercase" style={{ color: ASH, fontFamily: F, opacity: 0.9 }}>
              — The MENA Opportunity
            </div>

            <div className="max-w-5xl" style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}>
              <WordsPullUpMulti
                segments={[
                  { text: "The next billion users for AI, tech & wellness", style: { fontFamily: F, fontWeight: 500, color: ASH } },
                  { text: "live here.", style: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, color: "rgba(242,242,242,0.55)" } },
                ]}
              />
            </div>

            <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3">
              {STATS.map((s, i) => (
                <motion.div key={s.l}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl p-6"
                  style={{ background: "rgba(242,242,242,0.03)", border: "1px solid rgba(242,242,242,0.08)", backdropFilter: "blur(8px)" }}>
                  <div className="text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: SLATE, fontFamily: F }}>N0{i + 1}</div>
                  <div className="font-medium" style={{ fontFamily: F, fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)", color: ASH, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.v}</div>
                  <div className="mt-3 text-[11px] tracking-widest uppercase" style={{ color: "rgba(242,242,242,0.8)", fontFamily: F }}>{s.l}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-5">
                <p className="text-sm md:text-base" style={{ color: ASH, fontFamily: F, fontWeight: 300, lineHeight: 1.75, opacity: 0.85 }}>
                  The Middle East and North Africa is the most under-served and fastest-mobilising market for AI, technology and wellness in the world. A population approaching <strong style={{ color: ASH, fontWeight: 700 }}>500 million</strong>. More than <strong style={{ color: ASH, fontWeight: 700 }}>half under the age of thirty</strong>. Two sovereign-backed AI agendas — UAE 2031 and Saudi Vision 2030 — putting <strong style={{ color: ASH, fontWeight: 700 }}>tens of billions of dollars</strong> behind infrastructure, adoption and partnerships with global technology leaders.
                </p>
                <p className="text-base md:text-lg" style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, color: "rgba(242,242,242,0.75)", lineHeight: 1.5 }}>
                  This is no longer an emerging market. It is an emerged buyer with a blank chequebook and a national mandate to move fast.
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-row flex-wrap items-end justify-end gap-3">
                <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("contact"); }}
                  className="group inline-flex items-center gap-2 hover:gap-3 rounded-full pl-6 pr-1.5 py-1.5 transition-all"
                  style={{ background: ASH, color: NAVY, fontFamily: F }}>
                  <span className="text-sm md:text-base font-medium">Scale With ACT In MENA</span>
                  <span className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: NAVY }}>
                    <ArrowRight size={16} style={{ color: ASH }} strokeWidth={1.6} />
                  </span>
                </a>
                <a href="/thesis" onClick={(e) => { e.preventDefault(); navigate("thesis"); }}
                  className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(242,242,242,0.15)", color: ASH, fontFamily: F }}>
                  <span className="text-sm md:text-base font-medium">Read The Thesis</span>
                  <ArrowRight size={13} strokeWidth={1.8} style={{ color: ASH }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════
          PRINCIPLES
          ═════════════════════════════════════ */}
      <section id="thesis" className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden" style={{ background: "#000000" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: NOISE, opacity: 0.1 }} />
        <div className="relative max-w-[1500px] mx-auto">
          <div className="text-center mb-14 md:mb-20">
            <div className="text-[10px] mb-6 tracking-[0.3em] uppercase" style={{ color: ASH, fontFamily: F, opacity: 0.9 }}>— How We Operate</div>
            <div className="max-w-4xl mx-auto" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              <WordsPullUpMulti
                className="justify-center"
                segments={[
                  { text: "Six principles that decide", style: { fontFamily: F, fontWeight: 400, color: ASH } },
                  { text: "what we build and how.", style: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, color: SLATE } },
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRINCIPLES.map((p, i) => (
              <motion.div key={p.n}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-7 md:p-8"
                style={{ background: OBSID, minHeight: 260 }}>
                <div className="flex items-start justify-between mb-8">
                  <span className="text-[11px] tracking-[0.35em] uppercase" style={{ color: SLATE, fontFamily: F }}>Principle {p.n}</span>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(242,242,242,0.05)", border: "1px solid rgba(242,242,242,0.1)" }}>
                    <Check size={12} style={{ color: ASH }} />
                  </div>
                </div>
                <h3 className="mb-4" style={{ fontFamily: F, fontWeight: 500, fontSize: "1.15rem", lineHeight: 1.25, letterSpacing: "-0.015em", color: ASH }}>{p.t}</h3>
                <p className="text-xs sm:text-sm" style={{ color: SLATE, fontFamily: F, fontWeight: 300, lineHeight: 1.65 }}>{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════
          FOUNDER
          ═════════════════════════════════════ */}
      <section id="founder" className="py-20 md:py-32 px-4 md:px-6" style={{ background: "#000000" }}>
        <div className="mx-auto max-w-6xl rounded-2xl md:rounded-[2rem] px-6 py-16 md:px-14 md:py-24" style={{ background: CARD }}>
          <div className="text-[10px] mb-10 tracking-[0.3em] uppercase text-center" style={{ color: ASH, fontFamily: F, opacity: 0.9 }}>— From The Founder</div>

          <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-center">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden mx-auto lg:mx-0" style={{ aspectRatio: "3/4", maxWidth: 300 }}>
              <img
                src={founderImg}
                alt="Fadi Maayta"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4">
                
                
              </div>
            </div>

            <div>
              <div style={{ fontSize: "clamp(1.35rem, 2.5vw, 2rem)", lineHeight: 1.35, letterSpacing: "-0.015em" }}>
                <WordsPullUpMulti
                  segments={[
                    { text: "“After two decades operating in regulated industries, I became convinced that the next generation of category-defining companies would be built where intelligence, health and human performance converge. ACT was created to build and back those companies — with the patience of a holding company and the hands of an operator.”", style: { fontFamily: F, fontWeight: 300, color: ASH } },
                  ]}
                />
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="w-10 h-px" style={{ background: ASH }} />
                <div>
                  <div className="text-xs font-medium" style={{ color: ASH, fontFamily: F }}>Fadi Maayta</div>
                  <div className="text-[11px]" style={{ color: SLATE, fontFamily: F }}>Founder & Chairman · ACT Holding</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════
          CTA
          ═════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 md:px-6" style={{ background: "#000000" }}>
        <div className="mx-auto max-w-[1500px] rounded-2xl md:rounded-[2rem] overflow-hidden relative" style={{ background: NAVY, minHeight: 520 }}>
          <img
            src="https://images.unsplash.com/photo-1546412414-e1885259563a?w=2000&h=1200&fit=crop&auto=format&q=80"
            alt="Dubai at night"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.4) contrast(1.05) saturate(0.75)" }}
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${NAVY}B0 0%, ${NAVY}F0 100%)` }} />
          <div className="absolute inset-0 mix-blend-overlay pointer-events-none" style={{ backgroundImage: NOISE, opacity: 0.45 }} />

          <div className="relative px-6 py-24 md:px-14 md:py-32 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-10"
              style={{ background: "rgba(242,242,242,0.06)", border: "1px solid rgba(242,242,242,0.14)", backdropFilter: "blur(16px)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#34d399", animation: "softPulse 2s infinite" }} />
              <span className="text-[10px] tracking-[0.35em] uppercase font-medium" style={{ color: "rgba(242,242,242,0.75)", fontFamily: F }}>Open for partners & founders</span>
            </div>

            <div className="max-w-5xl mx-auto" style={{ fontSize: "clamp(2.4rem, 8vw, 7rem)", lineHeight: 0.95, letterSpacing: "-0.04em" }}>
              <WordsPullUpMulti
                className="justify-center"
                segments={[
                  { text: "Building the next ACT company?", style: { fontFamily: F, fontWeight: 500, color: ASH } },
                  { text: "Let's talk.", style: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, color: "rgba(242,242,242,0.6)" } },
                ]}
              />
            </div>

            <div className="mt-12 flex flex-wrap gap-3 justify-center">
              <a href="/apply" onClick={(e) => { e.preventDefault(); navigate("apply"); }} className="group inline-flex items-center gap-2 hover:gap-3 rounded-full pl-6 pr-1.5 py-1.5 transition-all"
                style={{ background: ASH, color: NAVY, fontFamily: F }}>
                <span className="text-sm md:text-base font-medium">Pitch Your AI Idea</span>
                <span className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: NAVY }}>
                  <ArrowUpRight size={16} style={{ color: ASH }} strokeWidth={1.6} />
                </span>
              </a>
              <a href="/portfolio" onClick={(e) => { e.preventDefault(); navigate("portfolio"); }} className="inline-flex items-center gap-2 rounded-full px-6 py-3.5"
                style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(242,242,242,0.25)", color: ASH, fontFamily: F }}>
                <span className="text-sm md:text-base font-medium">Explore The Portfolio</span>
                <ArrowRight size={14} strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>
      </section>
      </>)}

      {/* ═════════════════════════════════════
          FOOTER
          ═════════════════════════════════════ */}
      <footer className="pt-16 pb-8 px-4 md:px-6" style={{ background: "#000000", borderTop: "1px solid rgba(242,242,242,0.06)" }}>
        <div className="max-w-[1500px] mx-auto">
          

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10" style={{ borderBottom: "1px solid rgba(242,242,242,0.06)" }}>
            <div className="col-span-2 md:col-span-1">
              <img src={logoWhite} alt="ACT Holding" className="h-6 w-auto mb-5 opacity-80" />
              <p className="text-[13px] leading-relaxed" style={{ color: SLATE, fontFamily: SERIF, fontStyle: "italic", fontWeight: 300 }}><span className="italic">A holding company for the operators of what comes next. Intelligence in Action.</span></p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Authority", "Consistency", "Trust"].map(w => (
                  null
                ))}
              </div>
            </div>

            {[
              { title: "Company", links: ["Home", "About", "Portfolio", "Thesis", "Contact"] },
              { title: "Connect", links: ["Investors", "Partners", "Press & Media", "Careers & Talents"] },
              { title: "Office", links: ["Dubai, United Arab Emirates", "LinkedIn"] },
            ].map(col => (
              <div key={col.title}>
                <div className="text-[9px] tracking-[0.3em] uppercase mb-5" style={{ color: SLATE, fontFamily: F }}>{col.title}</div>
                <ul className="space-y-3">
                  {col.links.map(l => {
                    const key = l.toLowerCase();
                    const isPage = ["home", "about", "portfolio", "thesis", "contact", "apply"].includes(key);
                    return (
                    <li key={l}>
                      <a href={l === "LinkedIn" ? "https://www.linkedin.com/company/act-holding/" : isPage ? PAGE_PATHS[key as Page] : "#"}
                        target={l === "LinkedIn" ? "_blank" : undefined}
                        rel={l === "LinkedIn" ? "noopener noreferrer" : undefined}
                        onClick={(e) => {
                          if (l === "LinkedIn") return;
                          if (isPage) { e.preventDefault(); navigate(key as Page); }
                        }}
                        className="text-[13px] transition-colors"
                        style={{ color: "rgba(242,242,242,0.65)", fontFamily: F, fontWeight: 300 }}
                        onMouseEnter={e => (e.currentTarget.style.color = ASH)}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(242,242,242,0.65)")}>{l}</a>
                    </li>
                  );})}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span className="text-[11px]" style={{ color: SLATE, fontFamily: F, fontWeight: 300 }}>© 2026 ACT Holding. All rights reserved.</span>
            <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: SLATE, fontFamily: F }}>Authority · Consistency · Trust</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── feature cards ── */
function FeatureHeroCard({ delay }: { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden lg:h-full min-h-[360px]"
      style={{ background: NAVY }}>
      <img
        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=1500&fit=crop&auto=format&q=85"
        alt="Operators"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.7) contrast(1.05) saturate(0.85)" }}
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${NAVY}E0 0%, transparent 55%)` }} />
      <div className="absolute inset-0 mix-blend-overlay pointer-events-none" style={{ backgroundImage: NOISE, opacity: 0.5 }} />
      <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(242,242,242,0.7)", fontFamily: F }}>Portfolio · 2025</div>
      <div className="absolute bottom-5 left-5 right-5">
        <div className="font-medium" style={{ color: ASH, fontFamily: F, fontSize: "1.6rem", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          Your operating<br />
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300 }}>partner.</span>
        </div>
      </div>
    </motion.div>
  );
}

function VentureCard({ v, delay }: { v: typeof VENTURES[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl p-6 md:p-7 flex flex-col lg:h-full min-h-[360px]"
      style={{ background: OBSID }}>
      <div className="flex items-baseline gap-3 mb-5">
        <h3 style={{ fontFamily: F, fontWeight: 500, fontSize: "1.15rem", color: ASH, letterSpacing: "-0.015em" }}>{v.name}.</h3>
        <span className="text-[11px] tracking-[0.3em]" style={{ color: SLATE, fontFamily: F }}>({v.num})</span>
      </div>
      <div className="text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: SLATE, fontFamily: F }}>{v.role}</div>
      <p className="text-sm mb-4" style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, color: "rgba(242,242,242,0.9)", lineHeight: 1.35 }}>
        "{v.tagline}"
      </p>
      <p className="text-[13px] leading-relaxed mb-6 flex-1" style={{ color: SLATE, fontFamily: F, fontWeight: 300 }}>
        {v.desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {v.tags.map(t => (
          <span key={t} className="text-[11px] font-medium rounded-full px-3 py-1.5"
            style={{ background: "rgba(242,242,242,0.06)", color: ASH, border: "1px solid rgba(242,242,242,0.1)", fontFamily: F }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Contact Page ── */
function ContactPage({ navigate: _navigate }: { navigate: (t: Page) => void }) {
  return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-32 px-4 md:px-6" style={{ background: "#000000" }}>
      <div className="max-w-[1500px] mx-auto">
        <div className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: SLATE, fontFamily: F }}>Contact</div>

        <div className="mb-10" style={{ fontSize: "clamp(2.8rem, 9vw, 8rem)", lineHeight: 0.95, letterSpacing: "-0.04em" }}>
          <WordsPullUpMulti
            segments={[
              { text: "Let's", style: { fontFamily: F, fontWeight: 500, color: ASH } },
              { text: "talk.", style: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, color: "rgba(242,242,242,0.7)" } },
            ]}
          />
        </div>

        <p className="max-w-3xl mb-20 text-base md:text-lg" style={{ color: "rgba(242,242,242,0.75)", fontFamily: F, fontWeight: 300, lineHeight: 1.55 }}>
          Whether you're a founder, an investor, a partner or a journalist — we read every message that comes in, and we respond.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-24 pt-12" style={{ borderTop: "1px solid rgba(242,242,242,0.1)" }}>
          {[
            { num: "01", label: "Investment", desc: "Discuss participation in ACT or its ventures.", email: "invest@act-fm.com" },
            { num: "02", label: "Partnerships", desc: "Build with ACT — strategic, commercial or operational partnership.", email: "partners@act-fm.com" },
            { num: "03", label: "Press & Media", desc: "Press, interviews and speaking enquiries.", email: "press@act-fm.com" },
            { num: "04", label: "Careers & Talent", desc: "Careers, talent and service providers.", email: "talents@act-fm.com" },
          ].map(c => (
            <div key={c.num}>
              <div className="text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: SLATE, fontFamily: F }}>
                {c.num} — {c.label}
              </div>
              <p className="mb-3 text-lg md:text-xl" style={{ color: ASH, fontFamily: F, fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.35 }}>
                {c.desc}
              </p>
              <a href={`mailto:${c.email}`} className="inline-block text-sm underline-offset-4 hover:underline" style={{ color: "rgba(242,242,242,0.7)", fontFamily: F }}>
                {c.email}
              </a>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-x-16 gap-y-12 pt-12" style={{ borderTop: "1px solid rgba(242,242,242,0.1)" }}>
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: SLATE, fontFamily: F }}>
              05 — Send a message
            </div>
            <h3 className="mb-5" style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, color: ASH, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              Or write to us directly.
            </h3>
            <p className="text-sm md:text-[15px]" style={{ color: SLATE, fontFamily: F, fontWeight: 300, lineHeight: 1.6 }}>
              Messages submitted here are delivered to our central inbox at{" "}
              <span style={{ color: ASH, fontWeight: 500 }}>hello@act-fm.com</span> and routed to the right person. We respond within five working days.
            </p>
          </div>

            <form action="https://api.web3forms.com/submit" method="POST" className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <input type="hidden" name="access_key" value="99ea59bb-3037-462a-9b5d-1d59f17d7db9" />
            <input type="hidden" name="subject" value="New Contact Message — act-fm.com" />
            <input type="hidden" name="from_name" value="ACT Holding Website" />
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "organization", label: "Organization", type: "text" },
              { name: "email", label: "Email", type: "email" },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: SLATE, fontFamily: F }}>{f.label}</label>
                <input type={f.type} name={f.name} required={f.name === "name" || f.name === "email"} className="w-full bg-transparent outline-none pb-3 text-base transition-colors focus:border-white/60"
                  style={{ borderBottom: "1px solid rgba(242,242,242,0.2)", color: ASH, fontFamily: F }} />
              </div>
            ))}

            <div>
              <label className="block text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: SLATE, fontFamily: F }}>Subject</label>
              <select name="subject_topic" defaultValue="investment" className="w-full bg-transparent outline-none pb-3 text-base cursor-pointer transition-colors focus:border-white/60 appearance-none"
                style={{ borderBottom: "1px solid rgba(242,242,242,0.2)", color: ASH, fontFamily: F, backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1.5L6 6.5L11 1.5' stroke='%2385868a' stroke-width='1.2'/></svg>\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 4px center" }}>
                <option value="investment" style={{ background: "#0d0d0d" }}>Investment opportunity</option>
                <option value="partnership" style={{ background: "#0d0d0d" }}>Partnership</option>
                <option value="press" style={{ background: "#0d0d0d" }}>Press & Media</option>
                <option value="careers" style={{ background: "#0d0d0d" }}>Careers & Talent</option>
                <option value="other" style={{ background: "#0d0d0d" }}>Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: SLATE, fontFamily: F }}>Message</label>
              <textarea rows={4} name="message" required className="w-full bg-transparent outline-none pb-3 text-base resize-none transition-colors focus:border-white/60"
                style={{ borderBottom: "1px solid rgba(242,242,242,0.2)", color: ASH, fontFamily: F }} />
            </div>

            <div className="md:col-span-2 mt-4">
              <button type="submit" className="group w-full inline-flex items-center justify-center gap-3 rounded-full py-4 transition-all hover:gap-4"
                style={{ background: NAVY, color: ASH, fontFamily: F, border: "1px solid rgba(242,242,242,0.14)" }}>
                <span className="text-sm tracking-[0.25em] uppercase font-medium">Send Message</span>
                <ArrowRight size={16} strokeWidth={1.6} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── shared page building blocks ── */
function PageHeader({ label, before, italic, sub }: { label: string; before: string; italic: string; sub?: string }) {
  return (
    <div className="pt-40 md:pt-48 pb-16 md:pb-20 px-4 md:px-6" style={{ background: "#000000" }}>
      <div className="max-w-[1500px] mx-auto">
        <div className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: SLATE, fontFamily: F }}>{label}</div>
        <div className="mb-8" style={{ fontSize: "clamp(2.6rem, 8.5vw, 7.5rem)", lineHeight: 0.95, letterSpacing: "-0.04em" }}>
          <WordsPullUpMulti
            segments={[
              { text: before, style: { fontFamily: F, fontWeight: 500, color: ASH } },
              { text: italic, style: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, color: "rgba(242,242,242,0.7)" } },
            ]}
          />
        </div>
        {sub && (
          <p className="max-w-3xl text-base md:text-lg" style={{ color: "rgba(242,242,242,0.75)", fontFamily: F, fontWeight: 300, lineHeight: 1.55 }}>{sub}</p>
        )}
      </div>
    </div>
  );
}

function PageCTA({ label, primary, secondary, onPrimary, onSecondary }: { label: React.ReactNode; primary: string; secondary?: string; onPrimary: () => void; onSecondary?: () => void }) {
  return (
    <section className="pb-24 md:pb-32 px-4 md:px-6" style={{ background: "#000000" }}>
      <div className="mx-auto max-w-[1500px] rounded-2xl md:rounded-[2rem] overflow-hidden relative" style={{ background: NAVY, minHeight: 360 }}>
        <div className="absolute inset-0 mix-blend-overlay pointer-events-none" style={{ backgroundImage: NOISE, opacity: 0.35 }} />
        <div className="relative px-6 py-16 md:px-14 md:py-24 text-center">
          <div className="max-w-4xl mx-auto mb-10" style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em", fontFamily: F, fontWeight: 500, color: ASH }}>
            {label}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={onPrimary} className="group inline-flex items-center gap-2 hover:gap-3 rounded-full pl-6 pr-1.5 py-1.5 transition-all"
              style={{ background: ASH, color: NAVY, fontFamily: F }}>
              <span className="text-sm md:text-base font-medium">{primary}</span>
              <span className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: NAVY }}>
                <ArrowUpRight size={16} style={{ color: ASH }} strokeWidth={1.6} />
              </span>
            </button>
            {secondary && onSecondary && (
              <button onClick={onSecondary} className="inline-flex items-center gap-2 rounded-full px-6 py-3.5"
                style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(242,242,242,0.25)", color: ASH, fontFamily: F }}>
                <span className="text-sm md:text-base font-medium">{secondary}</span>
                <ArrowRight size={14} strokeWidth={1.8} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── About Page ── */
function AboutPage({ navigate }: { navigate: (t: Page) => void }) {
  const stats = [
    { v: "5", l: "Ventures in build" },
    { v: "20+", l: "Years building · operating" },
    { v: "~500M", l: "Cumulative revenue we've helped generate" },
    { v: "UAE", l: "HQ / Dubai" },
  ];
  const ways = [
    { n: "01", t: "We start companies.", d: "Where the thesis is clearest, ACT founds and operates the venture from day one — capital, direction, and product built in-house." },
    { n: "02", t: "We back exceptional teams.", d: "For founders whose category and conviction align with ours, we invest with operator intent — not passive capital." },
    { n: "03", t: "We compound across markets.", d: "Data, brand, and category authority accumulate across the portfolio, so every new venture starts further ahead than the last." },
  ];
  return (
    <>
      <PageHeader label="About" before="A holding company built like" italic="an operator." sub="ACT was founded to translate conviction into concrete companies. Our next decade will be built at the intersection of intelligence, human performance and health — categories where the world's operating layer is being rewritten." />
      <section className="px-4 md:px-6 pb-24" style={{ background: "#000000" }}>
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pt-12" style={{ borderTop: "1px solid rgba(242,242,242,0.1)" }}>
          {stats.map(s => (
            <div key={s.l}>
              <div className="mb-3" style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, color: ASH, fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.v}</div>
              <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: SLATE, fontFamily: F }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-6 pb-24" style={{ background: "#000000" }}>
        <div className="max-w-[1500px] mx-auto pt-16 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-16" style={{ borderTop: "1px solid rgba(242,242,242,0.1)" }}>
          <div className="text-[10px] tracking-[0.35em] uppercase" style={{ color: SLATE, fontFamily: F }}>01 — What we are</div>
          <div>
            <h2 className="mb-6" style={{ fontFamily: F, fontWeight: 500, color: ASH, fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              What a modern holding company should be, poetic.
            </h2>
            <p className="text-base md:text-lg mb-6" style={{ color: "rgba(242,242,242,0.75)", fontFamily: F, fontWeight: 300, lineHeight: 1.6 }}>
              A single-decision office where category conviction, capital allocation and operating discipline live in the same room. We build wholly-owned ventures where we hold the highest conviction, and back founders where the alignment is unmistakable.
            </p>
            <p className="text-base md:text-lg" style={{ color: "rgba(242,242,242,0.75)", fontFamily: F, fontWeight: 300, lineHeight: 1.6 }}>
              This is not a fund searching for outcomes. It is a holding company backing a specific conviction, over a specific decade, executed by operators who have built at scale before.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 pb-24" style={{ background: "#000000" }}>
        <div className="max-w-[1500px] mx-auto pt-16" style={{ borderTop: "1px solid rgba(242,242,242,0.1)" }}>
          <div className="text-[10px] tracking-[0.35em] uppercase mb-10" style={{ color: SLATE, fontFamily: F }}>02 — How we operate</div>
          <h3 className="mb-12" style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, color: ASH, fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Three ways we create value.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ways.map(w => (
              <div key={w.n} className="rounded-2xl p-8" style={{ background: OBSID }}>
                <div className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: SLATE, fontFamily: F }}>{w.n}</div>
                <h4 className="mb-4" style={{ fontFamily: F, fontWeight: 500, color: ASH, fontSize: "1.35rem", letterSpacing: "-0.015em", lineHeight: 1.2 }}>{w.t}</h4>
                <p className="text-sm" style={{ color: SLATE, fontFamily: F, fontWeight: 300, lineHeight: 1.55 }}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 pb-24" style={{ background: "#000000" }}>
        <div className="max-w-[1500px] mx-auto pt-16" style={{ borderTop: "1px solid rgba(242,242,242,0.1)" }}>
          <div className="text-[10px] tracking-[0.35em] uppercase mb-10" style={{ color: SLATE, fontFamily: F }}>03 — Leadership</div>
          <h3 className="mb-12" style={{ fontFamily: F, fontWeight: 500, color: ASH, fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Founder-led. <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, color: "rgba(242,242,242,0.7)" }}>Operator-advised.</span>
          </h3>
            <div className="max-w-2xl mx-auto">
            <div>
            <div>
              <p className="text-base md:text-lg mb-6" style={{ color: "rgba(242,242,242,0.85)", fontFamily: F, fontWeight: 300, lineHeight: 1.6 }}>
                ACT is a personal holding company, founded and led by design. Its structure reflects two decades of building regulated, brand-led businesses across sport, health and consumer categories — and the belief that the next generation of great companies will be built by operators who understand both product and policy.
              </p>
              <p className="text-base md:text-lg mb-8" style={{ color: "rgba(242,242,242,0.75)", fontFamily: F, fontWeight: 300, lineHeight: 1.6 }}>
                Every venture inside ACT is advised by people who have already built at scale — so founders start with judgement, not just capital.
              </p>
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, color: ASH, fontSize: "1.8rem", letterSpacing: "-0.01em" }}>Fadi Maayta</div>
              <div className="text-[10px] tracking-[0.3em] uppercase mt-2" style={{ color: SLATE, fontFamily: F }}>Founder & CEO</div>
            </div>
          </div>
        </div>
      </section>

      <PageCTA label={<>Want to understand the thesis behind ACT?</> as any}
        primary="Read the thesis" secondary="Get in touch"
        onPrimary={() => navigate("thesis")} onSecondary={() => navigate("contact")} />
    </>
  );
}

/* ── Portfolio Page ── */
function PortfolioPage({ navigate }: { navigate: (t: Page) => void }) {
  const ventures = [
    {
      num: "01", name: "LUUCI", role: "Founder & CEO", status: "Active · Build",
      hq: "United States", ops: "United States", accent: "#f5637a",
      tagline: "One AI platform for the whole family's wellness — beginning with pets.",
      body: [
        "LUUCI is an AI-powered family wellness platform that helps households make better everyday decisions about health — interpreting wearable data, nutrition, activity and medical records through a single connected intelligence. LUUCI launches with pets: a large, fast-growing, high-engagement market with fewer regulatory barriers, where the platform can be built and refined before extending the same technology to every member of the family.",
        "LUUCI sits at the centre of ACT's thesis — intelligence, performance and health, delivered to the consumer as a single, trusted experience.",
      ],
      tags: ["Artificial Intelligence", "Consumer Health", "Wearable Technology", "Personalisation"],
    },
    {
      num: "02", name: "One Hundred Group", role: "Advisory Board & MENA Partner", status: "Active · Build",
      hq: "United States", ops: "Globally", accent: "#c4d94d",
      tagline: "A global platform for trail and endurance running.",
      body: [
        "One Hundred Group is building the definitive platform for trail and endurance running — host of the Endurance Trail World Championship and connecting athletes with world-class race experience, destination communities, and the brands that serve them. The platform is designed to scale across geographies while deepening the relationship between sport, place, and audience.",
        "Endurance is the most honest expression of human performance. One Hundred Group is built around that idea — for the athlete, the host city, and the brand behind both.",
      ],
      tags: ["Sports Platform", "Endurance", "World Championship", "Community", "Destination Tourism"],
    },
    {
      num: "03", name: "ACT AI Lab", role: "Founder & Chairman", status: "Active · Build",
      hq: "Dubai · UAE", ops: "MENA", accent: "#4a6df5",
      tagline: "We build the builders. We build the company.",
      body: [
        "Everyone has an AI idea. Very few ever build a company around it. ACT AI Lab exists to close that gap.",
        "We take founders from idea to company — strategy, direction, and end-to-end product development, with deep specialisation in agentic AI and autonomous agents across business verticals. For select ventures, ACT may explore investment, but it is never assumed.",
      ],
      tags: ["AI Build-Studio", "Product Development", "Strategy", "Agentic AI"],
    },
  ];
  return (
    <>
      <PageHeader label="Portfolio" before="Three ventures. One" italic="thesis."
        sub="Each ACT company is positioned at the intersection of intelligence, performance, and health — and built to compound proprietary data, technology and brand as it scales." />

      <section className="px-4 md:px-6 pb-24" style={{ background: "#000000" }}>
        <div className="max-w-[1500px] mx-auto flex flex-col gap-16 pt-12" style={{ borderTop: "1px solid rgba(242,242,242,0.1)" }}>
          {ventures.map((v, i) => (
            <div key={v.num} className={`grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-16 ${i > 0 ? "pt-16" : ""}`}
              style={i > 0 ? { borderTop: "1px solid rgba(242,242,242,0.08)" } : {}}>
              <div>
                <div className="text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: SLATE, fontFamily: F }}>{v.num}</div>
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6" style={{ border: "1px solid rgba(242,242,242,0.14)", background: "rgba(242,242,242,0.04)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: v.accent }} />
                  <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: ASH, fontFamily: F }}>{v.status}</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: SLATE, fontFamily: F }}>Headquartered</div>
                    <div className="text-sm" style={{ color: ASH, fontFamily: F, fontWeight: 300 }}>{v.hq}</div>
                  </div>
                  <div>
                    <div className="text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: SLATE, fontFamily: F }}>Operating</div>
                    <div className="text-sm" style={{ color: ASH, fontFamily: F, fontWeight: 300 }}>{v.ops}</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-3" style={{ fontFamily: SERIF, fontWeight: 400, color: ASH, fontSize: "clamp(2.2rem, 5vw, 3.6rem)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                  {v.name}
                </h3>
                <div className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: SLATE, fontFamily: F }}>{v.role}</div>
                <p className="mb-6" style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, color: v.accent, fontSize: "1.15rem", lineHeight: 1.35 }}>
                  {v.tagline}
                </p>
                {v.body.map((p, k) => (
                  <p key={k} className="text-[15px] mb-4" style={{ color: "rgba(242,242,242,0.8)", fontFamily: F, fontWeight: 300, lineHeight: 1.65 }}>{p}</p>
                ))}
                <div className="mt-6 flex flex-wrap gap-2">
                  {v.tags.map(t => (
                    <span key={t} className="text-[10px] tracking-[0.15em] uppercase font-medium rounded-full px-3 py-1.5"
                      style={{ background: "rgba(242,242,242,0.05)", color: ASH, border: "1px solid rgba(242,242,242,0.1)", fontFamily: F }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-6 pb-24" style={{ background: "#000000" }}>
        <div className="max-w-[1500px] mx-auto pt-16" style={{ borderTop: "1px solid rgba(242,242,242,0.1)" }}>
          <div className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: SLATE, fontFamily: F }}>04 — What's next</div>
          <h3 className="mb-6" style={{ fontFamily: F, fontWeight: 500, color: ASH, fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            We build <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, color: "rgba(242,242,242,0.7)" }}>deliberately.</span>
          </h3>
          <p className="max-w-3xl mb-4 text-base md:text-lg" style={{ color: "rgba(242,242,242,0.75)", fontFamily: F, fontWeight: 300, lineHeight: 1.6 }}>
            We grow the portfolio when the right opportunity meets the right team. Future ventures will continue to live at the convergence of intelligence, performance and health — categories where ACT can compound an operating advantage rather than spread it.
          </p>
          <p className="max-w-3xl text-base md:text-lg" style={{ color: "rgba(242,242,242,0.75)", fontFamily: F, fontWeight: 300, lineHeight: 1.6 }}>
            If you're building in these categories, we'd like to hear from you.
          </p>
        </div>
      </section>

      <PageCTA label={<>Building at the convergence?</> as any} primary="Get in touch" secondary="Pitch Your AI Idea"
        onPrimary={() => navigate("contact")} onSecondary={() => navigate("apply")} />
    </>
  );
}

/* ── Thesis Page ── */
function ThesisPage({ navigate }: { navigate: (t: Page) => void }) {
  const sections = [
    { t: "The categories are converging.", body: [
      "For most of the modern industrial era, the categories that shape human lives evolved separately. Health was regulated by the state. Human performance was measured by athletes and armies. Intelligence was scarce, deployed only inside institutional walls.",
      "That is no longer true. Wearables and phones now stream a continuous signal of the human body. Foundation models can turn that signal into personalised guidance in real time. And a generation raised on optimisation expects insight, coaching, and coverage delivered to them individually — not to averages.",
      "ACT is built for this convergence. We invest and operate where these three currents meet, because that is where a new operating layer for daily life is being built.",
    ]},
    { t: "Intelligence is the substrate.", body: [
      "Artificial intelligence is not a feature. It is the substrate on which the next generation of consumer, wellness and performance companies will run. What matters is not model access but the discipline to build categories, brands and businesses on top of it.",
      "ACT prioritises founders who use AI to make previously impossible experiences feel obvious — personalised guidance, ambient understanding, judgement at machine scale — while retaining the human values (trust, taste, restraint, empathy) that make those experiences worth adopting.",
    ]},
    { t: "Performance is the application.", body: [
      "All decisions eventually show up in a body — heart rate, sleep, cognition, resilience. Performance is the language that turns abstract wellness into concrete outcomes: faster recovery, sharper focus, stronger longevity, better competition.",
      "ACT invests in platforms that measure performance honestly, coach it responsibly, and connect it to the people, places and brands that make it aspirational — from elite endurance to family wellbeing.",
    ]},
    { t: "Health is the must-have.", body: [
      "As categories mature, wellness converges toward health. Consumers do not want another dashboard; they want a shorter path to a longer, better life.",
      "ACT concentrates where a family, an athlete, or a patient can feel the outcome — nutrition, movement, mental clarity, recovery. We back companies that turn intelligence and performance into everyday health, delivered as a service with the discretion, care, and reliability of a private practice.",
    ]},
    { t: "And MENA is where it accelerates.", body: [
      "The next decade of consumer intelligence will not be underwritten only in San Francisco or London. It will be shaped in cities where new infrastructure meets new capital — Dubai, Riyadh, Abu Dhabi.",
      "MENA is uniquely positioned: young populations, high digital adoption, ambitious sovereign strategies, and governments willing to legislate for the future. It is the fastest-moving market for AI-native health, performance and lifestyle products in the world.",
      "ACT is deliberately headquartered here — close to the capital, close to the talent, close to the users, and close to the policy environments that will define what \"responsible AI\" means in practice for the next generation.",
    ]},
    { t: "The holding company model fits.", body: [
      "Categories that converge cannot be won by a single company. Winning at the intersection of intelligence, performance and health requires many bets, each specialised in category, geography, or channel, but sharing a common backbone: data, infrastructure, brand discipline, capital.",
      "The holding structure is how ACT operates that backbone. We build wholly-owned ventures where we hold the highest conviction. We advise carefully, and we treat every venture we support as a bet on operators, not on trends. The result is a compounding portfolio that reinforces itself — data flows, brands, insights, and category authority accumulate across companies rather than being spent inside one.",
    ]},
    { t: "Why now. Why us.", body: [
      "The window for building a serious holding company at this convergence is open right now. Foundation models are stable. Consumer data is abundant. Regulation is being written. Capital is flowing towards founders who can execute in the real world, not just prototype in a lab. In ten years, this landscape will be shaped by companies that are being started this decade.",
      "ACT exists to build and back those companies from Dubai — with local operating discipline, global product ambition, and a founder-led approach to every venture in the portfolio. We are not a fund searching for outcomes. We are a holding company backing a specific conviction, over a specific decade, executed by operators who have built at scale before.",
    ]},
  ];
  return (
    <>
      <PageHeader label="The Thesis" before="The convergence is the" italic="opportunity."
        sub="Why ACT concentrates at the intersection of artificial intelligence, human performance, and health — and why we believe these three categories will define the next decade of value creation." />

      <section className="px-4 md:px-6 pb-16" style={{ background: "#000000" }}>
        <div className="max-w-[1500px] mx-auto pt-12" style={{ borderTop: "1px solid rgba(242,242,242,0.1)" }}>
          <p className="max-w-3xl" style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, color: "rgba(242,242,242,0.85)", fontSize: "clamp(1.15rem, 2vw, 1.5rem)", lineHeight: 1.5 }}>
            "Every holding company, in the end, is a statement of conviction. It states where the future is going, and a willingness to put capital and time behind that claim. This is ours."
          </p>
        </div>
      </section>

      <section className="px-4 md:px-6 pb-24" style={{ background: "#000000" }}>
        <div className="max-w-[1500px] mx-auto flex flex-col">
          {sections.map((s, i) => (
            <div key={s.t} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-16 py-14" style={{ borderTop: "1px solid rgba(242,242,242,0.08)" }}>
              <div className="text-[10px] tracking-[0.35em] uppercase" style={{ color: SLATE, fontFamily: F }}>{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="mb-6" style={{ fontFamily: F, fontWeight: 500, color: ASH, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                  {s.t}
                </h3>
                {s.body.map((p, k) => (
                  <p key={k} className="text-[15px] md:text-base mb-4" style={{ color: "rgba(242,242,242,0.8)", fontFamily: F, fontWeight: 300, lineHeight: 1.7 }}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <PageCTA label={<>Want to explore the thesis further?</> as any} primary="Get in touch" secondary="See the portfolio"
        onPrimary={() => navigate("contact")} onSecondary={() => navigate("portfolio")} />
    </>
  );
}

/* ── Apply Page ── */
function ApplyPage({ navigate: _navigate }: { navigate: (t: Page) => void }) {
  const pillars = [
    { t: "Strategy & Direction", d: "We help founders define the category, the customer, and the shape of the product before writing a single line of code." },
    { t: "Product development", d: "We build end-to-end — engineering, design, agentic AI — with deep specialisation in autonomous systems that ship." },
    { t: "Venture partnership", d: "For select ventures ACT may co-found, invest or operate alongside the team. It is never assumed; it is earned through fit." },
  ];
  const validation = ["Idea stage", "Prototype / MVP", "Early customers or pilots", "Revenue", "Prior investor commitments"];
  const needs = ["Capital", "Product build", "Go-to-market strategy", "Advisory", "Introductions", "Full company build"];
  return (
    <>
      <PageHeader label="Apply" before="Great ideas are everywhere." italic="Execution is rare."
        sub="We work with a small number of founders each year. Not because we are gatekeepers, but because building a serious company at the convergence of intelligence, performance and health takes conviction, patience, and the right partners. This form is how we start the conversation." />

      <section className="px-4 md:px-6 pb-24" style={{ background: "#000000" }}>
        <div className="max-w-[1500px] mx-auto pt-12" style={{ borderTop: "1px solid rgba(242,242,242,0.1)" }}>
          <div className="text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: SLATE, fontFamily: F }}>01 — Most great ideas never become companies.</div>
          <p className="max-w-3xl mb-16 text-base md:text-lg" style={{ color: "rgba(242,242,242,0.8)", fontFamily: F, fontWeight: 300, lineHeight: 1.6 }}>
            Most applications never become companies — not for lack of insight but for lack of the surrounding conditions: direction, product, operators, capital. ACT AI Lab exists to assemble those conditions around the ideas that deserve them.
          </p>

          <div className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: SLATE, fontFamily: F }}>02 — From idea to company.</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map(p => (
              <div key={p.t} className="rounded-2xl p-8" style={{ background: OBSID }}>
                <h4 className="mb-4" style={{ fontFamily: F, fontWeight: 500, color: ASH, fontSize: "1.2rem", letterSpacing: "-0.015em" }}>{p.t}</h4>
                <p className="text-sm" style={{ color: SLATE, fontFamily: F, fontWeight: 300, lineHeight: 1.6 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 pb-24" style={{ background: "#000000" }}>
        <div className="max-w-[1500px] mx-auto pt-16" style={{ borderTop: "1px solid rgba(242,242,242,0.1)" }}>
          <div className="text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: SLATE, fontFamily: F }}>03 — Tell us about your idea.</div>
          <h3 className="mb-12" style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, color: ASH, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            The form.
          </h3>

            <form onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const btn = form.querySelector('button[type="submit"]');
            const label = btn ? btn.querySelector('span') : null;
            const original = label ? label.textContent : "";
            if (label) label.textContent = "Sending…";
            try {
              const data = new FormData(form);
              data.append("access_key", "99ea59bb-3037-462a-9b5d-1d59f17d7db9");
              data.append("subject", "New AI Idea Application — act-fm.com");
              data.append("from_name", "ACT Holding Website");
              const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
              const json = await res.json();
              if (json.success) {
                if (label) label.textContent = "Application sent ✓";
                form.reset();
              } else {
                if (label) label.textContent = "Error — try again";
              }
            } catch {
              if (label) label.textContent = "Error — try again";
            }
          }} className="max-w-4xl space-y-16">
            <div>
              <div className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: SLATE, fontFamily: F }}>About you</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                {[
                  { l: "Full name", t: "text", n: "full_name" },
                  { l: "Email", t: "email", n: "email" },
                  { l: "Country", t: "text", n: "country" },
                  { l: "Role / company", t: "text", n: "role_company" },
                ].map(f => (
                  <div key={f.l}>
                    <label className="block text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: SLATE, fontFamily: F }}>{f.l}</label>
                    <input type={f.t} name={f.n} required={f.n === "full_name" || f.n === "email"} className="w-full bg-transparent outline-none pb-3 text-base focus:border-white/60"
                      style={{ borderBottom: "1px solid rgba(242,242,242,0.2)", color: ASH, fontFamily: F }} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: SLATE, fontFamily: F }}>The opportunity</div>
              <label className="block text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: SLATE, fontFamily: F }}>What is the venture idea?</label>
              <textarea rows={5} name="venture_idea" required className="w-full bg-transparent outline-none pb-3 text-base resize-none focus:border-white/60"
                style={{ borderBottom: "1px solid rgba(242,242,242,0.2)", color: ASH, fontFamily: F }} />
            </div>

            <div>
              <div className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: SLATE, fontFamily: F }}>Validation</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {validation.map(v => (
                  <label key={v} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" name="validation" value={v} className="w-4 h-4 rounded-sm cursor-pointer accent-white" />
                    <span className="text-sm" style={{ color: ASH, fontFamily: F, fontWeight: 300 }}>{v}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: SLATE, fontFamily: F }}>What do you need?</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {needs.map(v => (
                  <label key={v} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" name="needs" value={v} className="w-4 h-4 rounded-sm cursor-pointer accent-white" />
                    <span className="text-sm" style={{ color: ASH, fontFamily: F, fontWeight: 300 }}>{v}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: SLATE, fontFamily: F }}>Commitment</div>
              <label className="block text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: SLATE, fontFamily: F }}>Are you working on this full-time?</label>
              <select name="commitment" defaultValue="fulltime" className="w-full bg-transparent outline-none pb-3 text-base cursor-pointer focus:border-white/60 appearance-none"
                style={{ borderBottom: "1px solid rgba(242,242,242,0.2)", color: ASH, fontFamily: F, backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1.5L6 6.5L11 1.5' stroke='%2385868a' stroke-width='1.2'/></svg>\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 4px center" }}>
                <option value="fulltime" style={{ background: "#0d0d0d" }}>Full-time</option>
                <option value="considering" style={{ background: "#0d0d0d" }}>Considering full-time</option>
                <option value="notyet" style={{ background: "#0d0d0d" }}>Not yet full-time</option>
              </select>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: SLATE, fontFamily: F }}>Supporting materials</div>
              <label className="block text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: SLATE, fontFamily: F }}>Pitch deck — upload PDF (max 5MB)</label>
              <input type="file" name="pitch_deck_file" accept="application/pdf" className="w-full pb-3 text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-white/10 file:text-white file:cursor-pointer"
                style={{ color: ASH, fontFamily: F }} />
              <label className="block text-[10px] tracking-[0.3em] uppercase mb-3 mt-8" style={{ color: SLATE, fontFamily: F }}>Or pitch deck link (for large files)</label>
              <input type="url" name="pitch_deck_link" placeholder="https://..." className="w-full bg-transparent outline-none pb-3 text-base focus:border-white/60"
                style={{ borderBottom: "1px solid rgba(242,242,242,0.2)", color: ASH, fontFamily: F }} />
            </div>

            <div>
              <div className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: SLATE, fontFamily: F }}>One more thing</div>
              <label className="block text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: SLATE, fontFamily: F }}>Anything else we should know?</label>
              <textarea rows={4} name="anything_else" className="w-full bg-transparent outline-none pb-3 text-base resize-none focus:border-white/60"
                style={{ borderBottom: "1px solid rgba(242,242,242,0.2)", color: ASH, fontFamily: F }} />
            </div>

            <div className="pt-4">
              <button type="submit" className="group w-full inline-flex items-center justify-center gap-3 rounded-full py-4 transition-all hover:gap-4"
                style={{ background: ASH, color: NAVY, fontFamily: F }}>
                <span className="text-sm tracking-[0.25em] uppercase font-medium">Submit Application</span>
                <ArrowRight size={16} strokeWidth={1.8} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
