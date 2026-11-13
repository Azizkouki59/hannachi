"use client";
import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { Phone, MessageCircle, Wrench, X, ArrowRight, Sparkles } from "lucide-react";

/* ── Shared easing ── */
const smooth = [0.16, 1, 0.3, 1] as const;

/* ── Fade-up on scroll ── 
   Uses `mounted` state: on the server and during first paint everything is
   visible (opacity 1). Once the client mounts, we switch to the animated
   version so motion effects only happen in the browser.
*/
export function FadeUp({
  children,
  delay = 0,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px 0px" }}
      transition={{ duration: 0.7, delay, ease: smooth }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Staggered container + items ── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smooth } },
};

export function StaggerContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Parallax wrapper ── */
export function Parallax({
  children,
  speed = 0.3,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Count-up number ── */
export function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <span ref={ref}>
      {prefix}
      {isInView ? (
        <AnimatedNumber target={target} duration={duration} />
      ) : (
        target
      )}
      {suffix}
    </span>
  );
}

function AnimatedNumber({ target, duration }: { target: number; duration: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const startTime = performance.now();
    let animationFrameId: number;

    const step = (ts: number) => {
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = String(Math.round(eased * target));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };
    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration]);

  return <span ref={ref}>{target}</span>;
}

/* ── Floating badge (glass) ── */
export function GlassBadge({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: smooth }}
      className={`rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-xl shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ── Magnetic hover effect ── */
export function MagneticHover({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Scroll progress bar (Top of page) ── */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-sky-400 to-indigo-500 origin-left z-50 pointer-events-none"
    />
  );
}

/* ── Mobile Floating Quick Actions (Sticky Phone Dock) ── */
export function MobileQuickActions({
  phone,
  phoneHref,
  whatsappHref,
}: {
  phone: string;
  phoneHref: string;
  whatsappHref: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling down 60px
      if (window.scrollY > 60) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-3 inset-x-3 z-40 sm:hidden"
    >
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-white/20 bg-primary-dark/95 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/20">
        {/* Direct Call Button */}
        <a
          href={phoneHref}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/10 py-3 text-xs font-bold text-white transition-all active:scale-95"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
          </span>
          Anrufen
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-md transition-all active:scale-95"
        >
          {/* WhatsApp icon */}
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M11.998 2C6.477 2 2 6.477 2 12c0 1.774.46 3.44 1.267 4.898L2.013 22l5.265-1.21A9.954 9.954 0 0011.998 22c5.523 0 10-4.477 10-10S17.52 2 11.998 2zm0 18.182a8.154 8.154 0 01-4.17-1.141l-.298-.177-3.088.711.741-2.985-.194-.306A8.145 8.145 0 013.818 12c0-4.51 3.67-8.182 8.18-8.182S20.18 7.49 20.18 12s-3.672 8.182-8.182 8.182z"/>
          </svg>
          WhatsApp
        </a>

        {/* Repair Form Button */}
        <a
          href="/kontakt#anfrage"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent py-3 text-xs font-bold text-white shadow-md transition-all active:scale-95"
        >
          Anfragen
        </a>
      </div>
    </motion.div>
  );
}

/* ── Smooth Brand Marquee ── */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative flex overflow-hidden select-none py-2 mask-linear">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 items-center gap-4 pr-4"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-xl border border-primary/10 bg-white/90 px-5 py-2.5 text-xs font-extrabold tracking-wide text-primary shadow-xs backdrop-blur-sm transition-all hover:border-accent hover:text-accent hover:scale-105"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Interactive Spotlight Card (Inspired by skillloop.tn pointer-field & pf-halo) ── */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(14, 165, 233, 0.12)",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-10"
        style={{
          opacity,
          background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ── Floating Support & Fast Contact Launcher (Inspired by skillloop.tn support-launcher) ── */
export function FloatingSupportLauncher({
  phone,
  phoneHref,
  whatsappHref,
}: {
  phone: string;
  phoneHref: string;
  whatsappHref: string;
}) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside aria-label="Schnellkontakt" className="fixed bottom-6 right-6 z-40 hidden sm:block">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-80 rounded-3xl border border-white/15 bg-primary-dark/95 p-5 text-white shadow-2xl backdrop-blur-2xl ring-1 ring-white/10"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Schnellkontakt Hannachi
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Schließen"
              >
                <X size={16} />
              </button>
            </div>

            <p className="mt-3 text-xs text-white/70 leading-relaxed">
              Sie haben eine Frage oder benötigen dringend Hilfe für Ihr Haushaltsgerät?
            </p>

            <div className="mt-4 space-y-2">
              <a
                href={phoneHref}
                className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-3 text-xs font-bold text-white transition-all hover:bg-accent hover:border-accent hover:shadow-md"
              >
                <span className="flex items-center gap-2.5">
                  <Phone size={15} className="text-accent group-hover:text-white" />
                  {phone}
                </span>
                <span className="text-[11px] text-white/60">Anrufen</span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/15 p-3 text-xs font-bold text-emerald-300 transition-all hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-md"
              >
                <span className="flex items-center gap-2.5">
                  <MessageCircle size={15} />
                  WhatsApp Chat
                </span>
                <span className="text-[11px] opacity-75">Sofort</span>
              </a>

              <a
                href="/kontakt#anfrage"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 p-3 text-xs font-bold text-white transition-all hover:bg-white/20"
              >
                <span className="flex items-center gap-2.5">
                  <Sparkles size={15} className="text-accent" />
                  Reparaturanfrage online
                </span>
                <ArrowRight size={13} className="text-white/50" />
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
              <span>Iburger Straße 5 · Osnabrück</span>
              <span className="text-accent font-semibold">Seit 1990</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        type="button"
        initial={{ scale: 0, opacity: 0 }}
        animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setOpen(!open)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_12px_32px_rgba(14,165,233,.45)] ring-2 ring-white/20 transition-all duration-300 hover:scale-105 hover:bg-accent-dark active:scale-95"
        aria-label={open ? "Schnellkontakt schließen" : "Schnellkontakt öffnen"}
        aria-expanded={open}
        title="Schnellkontakt"
      >
        {/* Subtle pulsing halo ring */}
        <span className="pointer-events-none absolute -inset-1.5 rounded-full border border-accent/40 animate-live-ping" />
        {open ? (
          <X size={22} className="transition-transform group-hover:rotate-90 duration-200" />
        ) : (
          <Wrench size={22} className="transition-transform group-hover:rotate-12 duration-200" />
        )}
      </motion.button>
    </aside>
  );
}

