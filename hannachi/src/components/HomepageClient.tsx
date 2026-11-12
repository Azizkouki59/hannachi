"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone, Star, ArrowRight, CheckCircle2, Shield, Clock3,
  UserRound, Handshake, Wrench, Zap, Award, MessageCircle, Quote, Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  FadeUp, StaggerContainer, StaggerItem, CountUp,
  GlassBadge, MagneticHover, Parallax,
  ScrollProgressBar, MobileQuickActions, Marquee,
} from "@/components/animations";
import { SectionHeading } from "@/components/ui";
import {
  business, brands, reviews, services, yearsOfExperience,
  sparePartsHighlights, sparePartsCategories, sparePartsBrands,
} from "@/data/site";
import { serviceIcons } from "@/components/Illustrations";
import {
  InteractiveApplianceShowcase,
  ApplianceGraphic,
} from "@/components/AnimatedAppliances";
import HowItWorks from "./HowItWorks";
import ContactCta from "./ContactCta";

const smooth = [0.16, 1, 0.3, 1] as const;

/* Service photos */
const servicePhotos: Record<string, string> = {
  waschmaschinen:  "/images/washer-modern.jpg",
  geschirrspueler: "/images/dishwasher.jpg",
  kuehlschraenke:  "/images/fridge-modern.jpg",
  backoefen:       "/images/oven-kitchen.jpg",
};

const advantages = [
  {
    icon: Clock3,
    title: `${yearsOfExperience}+ Jahre Erfahrung`,
    text: "Über drei Jahrzehnte Praxis mit Haushaltsgeräten aller gängigen Marken.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    accent: "#0EA5E9",
  },
  {
    icon: UserRound,
    title: "Direkter Ansprechpartner",
    text: "Sie sprechen mit Herrn Hannachi persönlich — kein Callcenter, keine Hotline.",
    gradient: "from-violet-500/20 to-purple-500/20",
    accent: "#8B5CF6",
  },
  {
    icon: Handshake,
    title: "Transparente Beratung",
    text: "Klare Kosteneinschätzung vorab. Keine Überraschungen auf der Rechnung.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    accent: "#10B981",
  },
  {
    icon: Wrench,
    title: "Nachhaltige Reparatur",
    text: "Fachgerecht, langlebig und schnell — damit Ihr Gerät wirklich wieder läuft.",
    gradient: "from-amber-500/20 to-orange-500/20",
    accent: "#F59E0B",
  },
];

const stats = [
  { value: yearsOfExperience, suffix: "+", label: "Jahre Erfahrung", icon: Award },
  { value: 5, suffix: ".0 ★", label: "Google-Bewertung", icon: Star },
  { value: 100, suffix: "%", label: "Transparente Preise", icon: Shield },
  { value: 1, suffix: " Tag", label: "Schnelle Termine", icon: Zap },
];

/* ─── Component ─── */
export default function HomepageClient() {
  const [applianceView, setApplianceView] = useState<"cartoon" | "photo">("cartoon");

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <ScrollProgressBar />

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-[94vh] overflow-hidden bg-primary-dark">
        {/* ── Background layer ── */}
        <div className="absolute inset-0">
          <Image
            src="/images/werkstatt.jpg"
            alt=""
            fill
            priority
            quality={90}
            className="object-cover object-center opacity-[0.18]"
            sizes="100vw"
          />
          {/* Progressive dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/92 to-primary-dark/55" />
          {/* Atmospheric glow blobs */}
          <div className="absolute -top-48 -right-48 h-[600px] w-[600px] rounded-full bg-accent/12 blur-[140px]" />
          <div className="absolute bottom-10 left-10 h-[450px] w-[450px] rounded-full bg-blue-700/8 blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 h-[350px] w-[350px] rounded-full bg-violet-600/6 blur-[100px]" />
          {/* Fine dot grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "44px 44px" }}
          />
        </div>

        <div className="container-page relative grid gap-8 pb-20 pt-16 sm:pt-24 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-32 lg:pt-36">

          {/* ── Left: text ── */}
          <div className="z-10 lg:col-span-7">
            {/* Badge */}
            <div className="mb-4 sm:mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/8 px-4 py-2 text-xs sm:text-sm font-semibold text-accent-light backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Zuverlässig seit {business.founded} · Osnabrück
            </div>

            {/* Headline */}
            <h1 className="text-[32px] sm:text-[50px] lg:text-[60px] xl:text-[68px] font-extrabold leading-[1.06] text-white">
              Wenn Ihr Gerät{" "}
              <span className="relative inline-block">
                <span className="text-gradient-shimmer">streikt</span>
              </span>
              {" "}—{" "}
              <br className="hidden sm:block" />
              wir bringen es zurück.
            </h1>

            {/* Subtext */}
            <p className="mt-4 sm:mt-7 max-w-[520px] text-base sm:text-lg leading-relaxed text-white/70">
              Professioneller Reparaturservice in Osnabrück. Waschmaschinen,
              Kühlschränke, Backöfen & mehr — persönlich, fair und schnell.
            </p>

            {/* ── Mobile Workshop Photo (Visually prominent on phone, directly under intro) ── */}
            <div className="mt-6 mb-2 block lg:hidden">
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-[0_20px_50px_rgba(0,0,0,.6)]">
                <Image
                  src="/images/werkstatt.jpg"
                  alt="Herr Hannachi in seiner Werkstatt in Osnabrück"
                  width={900}
                  height={600}
                  priority
                  quality={98}
                  sizes="92vw"
                  className="aspect-[16/10] w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <div className="rounded-xl border border-white/15 bg-primary-dark/85 px-3 py-2 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Werkstatt Hannachi</p>
                      <p className="text-[10px] text-white/70">Iburger Str. 5 · Osnabrück</p>
                    </div>
                    <span className="rounded-md bg-accent/20 border border-accent/40 px-2 py-0.5 text-[10px] font-bold text-accent-light">
                      {yearsOfExperience}+ Jahre Erfahrung
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/kontakt#anfrage"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-accent px-7 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent-dark hover:shadow-[0_8px_30px_rgba(14,165,233,.4)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle size={18} />
                Reparatur anfragen
                <ArrowRight size={16} className="ml-auto sm:ml-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a
                href={business.phoneHref}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/18 px-7 py-4 text-base font-semibold text-white/90 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/8 active:translate-y-0"
              >
                <Phone size={18} />
                {business.phoneDisplay}
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-6 sm:mt-10 flex flex-wrap gap-2.5">
              {[
                { icon: Shield, label: "Geprüft & zuverlässig" },
                { icon: Star,   label: "5.0 ★ Google-Bewertung" },
                { icon: Clock3, label: `Seit ${business.founded}` },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs sm:text-sm font-medium text-white/75 backdrop-blur-sm"
                >
                  <Icon size={14} className="text-accent" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: hero image (Desktop only) ── */}
          <div className="relative z-10 hidden lg:block lg:col-span-5">
            <div className="relative">
              {/* Main photo — wide workshop view with full sharpness */}
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/15 shadow-[0_32px_80px_rgba(0,0,0,.6)]">
                <Image
                  src="/images/werkstatt.jpg"
                  alt="Herr Hannachi in seiner Werkstatt – professionelle Gerätereparatur"
                  width={1200}
                  height={800}
                  priority
                  quality={98}
                  sizes="(min-width: 1024px) 540px, 480px"
                  className="aspect-[16/11] w-full object-cover object-center"
                />
                {/* Bottom gradient on photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent pointer-events-none" />
                {/* Photo caption */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-xl border border-white/15 bg-primary-dark/85 px-4 py-2.5 backdrop-blur-md">
                    <p className="text-xs font-semibold text-white/95">Werkstatt Hannachi · Osnabrück</p>
                    <p className="text-[11px] text-white/60">Reparatur vor Ort & in der Meisterwerkstatt</p>
                  </div>
                </div>
              </div>

              {/* Floating stat — experience */}
              <GlassBadge
                className="absolute -bottom-4 -left-5 !bg-white !border-white/40 text-primary shadow-2xl"
                delay={0.7}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                    <CheckCircle2 size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ink-faint">Erfahrung</p>
                    <p className="text-sm font-extrabold text-primary">{yearsOfExperience}+ Jahre</p>
                  </div>
                </div>
              </GlassBadge>

              {/* Floating stat — rating */}
              <GlassBadge
                className="absolute -top-3 -right-3 !bg-white !border-white/40 text-primary shadow-2xl"
                delay={0.9}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <span className="text-xs font-bold text-primary">5.0 ★</span>
                </div>
              </GlassBadge>
            </div>
          </div>
        </div>

        {/* SVG wave → transitions to surface */}
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none" aria-hidden>
            <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════ */}
      <section className="relative z-10 bg-surface py-6">
        <div className="container-page">
          <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map(({ value, suffix, label, icon: Icon }) => (
              <StaggerItem key={label}>
                <MagneticHover className="card flex flex-col items-center gap-3 p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/8">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[28px] font-extrabold leading-none text-primary">
                      <CountUp target={value} suffix={suffix} />
                    </p>
                    <p className="mt-1.5 text-[13px] font-medium text-ink-muted">{label}</p>
                  </div>
                </MagneticHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BRANDS (Infinite Smooth Marquee)
      ══════════════════════════════════════════════ */}
      <section className="border-y border-primary/6 bg-white py-6 overflow-hidden">
        <div className="container-page mb-3 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-ink-faint">
            Wir reparieren alle gängigen Marken — vor Ort &amp; in der Werkstatt
          </p>
        </div>
        <Marquee items={[...brands, "Samsung", "LG", "Beko", "Liebherr", "Gorenje", "Constructa", "Neff", "Zanussi", "Privileg"]} />
      </section>

      {/* ══════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════ */}
      <section className="section bg-surface" id="leistungen">
        <div className="container-page">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <span className="eyebrow mb-3 block">Reparaturservice</span>
                <SectionHeading
                  title="Was wir reparieren"
                  subtitle="Kompetente Hilfe für Ihre Haushaltsgeräte — schnell, fair und persönlich."
                />
              </div>

              {/* View switcher & link */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex rounded-xl bg-white p-1 border border-primary/10 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setApplianceView("cartoon")}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      applianceView === "cartoon"
                        ? "bg-accent text-white shadow-xs"
                        : "text-ink-muted hover:text-primary"
                    }`}
                  >
                    <Sparkles size={13} />
                    Cartoon-Modus
                  </button>
                  <button
                    type="button"
                    onClick={() => setApplianceView("photo")}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      applianceView === "photo"
                        ? "bg-accent text-white shadow-xs"
                        : "text-ink-muted hover:text-primary"
                    }`}
                  >
                    📷 Fotos
                  </button>
                </div>
                <Link href="/leistungen" className="btn-ghost shrink-0 !py-2.5 !px-4 text-xs">
                  Alle Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </FadeUp>

          {/* 4 Cards Grid */}
          <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => {
              const Icon = serviceIcons[s.slug];
              const photo = servicePhotos[s.slug];
              return (
                <StaggerItem key={s.slug}>
                  <MagneticHover>
                    <Link
                      href={`/leistungen/${s.slug}`}
                      className="card group flex flex-col overflow-hidden bg-white"
                    >
                      {/* Photo or Cartoon Animation */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {applianceView === "cartoon" ? (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-primary-dark to-slate-950 p-3 overflow-hidden border-b border-primary/10 relative">
                            {/* Subtle radial glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.18)_0%,transparent_70%)] pointer-events-none" />
                            <div className="relative z-10 scale-95 transition-transform duration-300 group-hover:scale-105">
                              <ApplianceGraphic slug={s.slug} size="sm" />
                            </div>
                            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none z-20">
                              <span className="inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-bold text-white shadow-xs backdrop-blur-md border border-white/10">
                                <Icon className="h-3 w-3 text-accent" />
                                {s.title}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent-light bg-accent/20 border border-accent/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                                Aktiv
                              </span>
                            </div>
                          </div>
                        ) : photo ? (
                          <>
                            <Image
                              src={photo}
                              alt={s.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="(min-width:1024px) 25vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/20 to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3">
                              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-primary backdrop-blur-sm shadow-sm">
                                <Icon className="h-3.5 w-3.5" />
                                {s.title}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex h-full items-center justify-center text-white/80 transition-colors group-hover:text-accent">
                            <Icon className="h-24 w-24" />
                          </div>
                        )}
                      </div>

                      {/* Body */}
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-[17px] font-bold text-primary">{s.title}</h3>
                        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-muted">{s.short}</p>
                        <div className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-accent">
                          Mehr erfahren
                          <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </MagneticHover>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Interactive Appliance Showcase / Labor */}
          <div className="mt-16">
            <FadeUp>
              <div className="mb-6 text-center">
                <span className="eyebrow mb-2 block">Interaktiver Fehler-Finder</span>
                <h3 className="text-2xl font-extrabold text-primary sm:text-3xl">
                  Testen Sie unsere animierten Maschinen
                </h3>
                <p className="mt-2 text-sm text-ink-muted">
                  Wählen Sie ein Gerät aus und sehen Sie, wie die Technik funktioniert und was wir reparieren.
                </p>
              </div>
              <InteractiveApplianceShowcase />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHY HANNACHI
      ══════════════════════════════════════════════ */}
      <section className="section relative overflow-hidden bg-primary-dark text-white">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[140px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-600/8 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "36px 36px" }}
          />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>

        <div className="container-page relative">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
              <div>
                <span className="eyebrow mb-3 block">Unsere Stärken</span>
                <h2 className="text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-[48px]">
                  Warum{" "}
                  <span className="bg-gradient-to-r from-accent-light to-sky-300 bg-clip-text text-transparent">
                    Hannachi?
                  </span>
                </h2>
              </div>
              <Link href="/ueber-uns" className="btn-ghost-light shrink-0">
                Mehr über uns <ArrowRight size={16} />
              </Link>
            </div>
          </FadeUp>

          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map(({ icon: Icon, title, text, gradient }) => (
              <StaggerItem key={title}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="group h-full rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent/25 hover:bg-white/[0.055]"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient}`}>
                    <Icon size={22} className="text-accent" />
                  </div>
                  <h3 className="mt-5 text-[17px] font-bold text-white">{title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-white/50">{text}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ABOUT — split layout with real portrait
      ══════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-24">
          {/* Photo */}
          <FadeUp className="lg:col-span-5">
            <Parallax speed={0.12}>
              <div className="relative mx-auto max-w-xs sm:max-w-sm lg:max-w-none">
                {/* Decorative corner accent */}
                <div className="absolute -top-4 -left-4 h-32 w-32 rounded-2xl border-2 border-accent/20 -z-10" />
                <div className="overflow-hidden rounded-3xl shadow-[0_32px_80px_rgba(15,23,42,.18)] ring-1 ring-primary/8">
                  <Image
                    src="/images/herr-hannachi.jpg"
                    alt="Herr Hannachi – Inhaber des Reparaturservice"
                    width={560}
                    height={700}
                    className="aspect-[4/5] w-full object-cover object-top"
                    sizes="(min-width:1024px) 38vw, 90vw"
                  />
                </div>
                {/* Experience badge */}
                <div className="absolute -bottom-5 -right-5 rounded-2xl bg-accent px-6 py-4 text-white shadow-[0_12px_40px_rgba(14,165,233,.4)]">
                  <p className="text-3xl font-black">{yearsOfExperience}+</p>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80">Jahre</p>
                </div>
              </div>
            </Parallax>
          </FadeUp>

          {/* Text */}
          <FadeUp delay={0.15} className="lg:col-span-7">
            <span className="eyebrow mb-4 block">Über Hannachi</span>
            <h2 className="text-3xl font-extrabold leading-[1.08] text-primary sm:text-4xl lg:text-[50px]">
              Persönlicher Service
              <br />
              <span className="bg-gradient-to-r from-accent to-sky-500 bg-clip-text text-transparent">
                mit Erfahrung.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              Seit {business.founded} steht Hannachi für persönlichen Service und tiefe Erfahrung
              in der Reparatur von Haushaltsgeräten. Als Inhaber ist Herr Hannachi Ihr direkter
              Ansprechpartner — von der ersten Einschätzung bis zur fertigen Reparatur.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                "Direkter Draht zu Herrn Hannachi — kein Callcenter",
                "Ehrliche Einschätzung vor jeder Reparatur",
                "Faire Preise ohne versteckte Kosten",
                "Schnelle Termine, oft schon am nächsten Tag",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-ink-muted">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <CheckCircle2 size={13} className="text-accent" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/kontakt#anfrage" className="btn-primary">
                Reparatur anfragen <ArrowRight size={16} />
              </Link>
              <Link href="/ueber-uns" className="btn-ghost">
                Mehr erfahren
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SPARE PARTS & SUPPLIERS (ERSATZTEILSERVICE ALLER MARKEN)
      ══════════════════════════════════════════════ */}
      <section className="section relative overflow-hidden bg-white border-t border-primary/8" id="ersatzteile">
        <div className="container-page">
          <FadeUp>
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow mb-3 inline-block">Originalteile &amp; Lieferanten</span>
              <h2 className="text-3xl font-extrabold text-primary sm:text-4xl lg:text-[44px]">
                Original-Ersatzteile für alle Marken
              </h2>
              <p className="mt-4 text-base sm:text-lg text-ink-muted">
                Sie suchen ein bestimmtes Ersatzteil oder möchten Ihr Gerät mit langlebigen Originalteilen reparieren lassen?
                Wir beliefern und warten Geräte aller führenden Hersteller — direkt ab Lager oder in kürzester Zeit beschafft.
              </p>
            </div>
          </FadeUp>

          {/* 4 Value Pillars */}
          <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sparePartsHighlights.map((item) => (
              <StaggerItem key={item.title}>
                <div className="card flex h-full flex-col p-6 border-primary/8 bg-surface/50 hover:bg-white hover:shadow-md transition-all">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="text-base font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-ink-muted">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Component Showcase & Categories */}
          <div className="mt-12 rounded-3xl border border-primary/10 bg-slate-900 text-white p-6 sm:p-10 relative overflow-hidden">
            {/* Background glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent-light">Sortiment im Überblick</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    Gängige Ersatzteile &amp; Baugruppen
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/80">
                  <Sparkles size={14} className="text-accent" />
                  Direkt ab Lager oder in 24–48h lieferbar
                </div>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {sparePartsCategories.map((cat) => (
                  <div key={cat.category} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <h4 className="text-sm font-bold text-accent-light pb-3 border-b border-white/10 flex items-center justify-between">
                      {cat.category}
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </h4>
                    <ul className="mt-3.5 space-y-2">
                      {cat.parts.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs text-white/80">
                          <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Supported Brands Tags */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4 text-center sm:text-left">
                  Original-Ersatzteile für alle führenden Hersteller &amp; Marken:
                </p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {sparePartsBrands.map((b) => (
                    <span
                      key={b.name}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/20 hover:border-accent/50 transition-all"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {b.name}
                      <span className="text-[10px] text-white/40 hidden sm:inline">({b.group})</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Inquiry Action Box */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-accent/30 bg-accent/10 p-5 backdrop-blur-sm">
                <div>
                  <p className="text-sm font-bold text-white">Sie benötigen ein Ersatzteil für Ihr Gerät?</p>
                  <p className="text-xs text-white/70 mt-0.5">
                    Halten Sie am besten die Typenschild-Nummer (E-Nr. / Modell) bereit — wir prüfen die Verfügbarkeit sofort!
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <a
                    href={business.phoneHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-accent-dark transition-all"
                  >
                    <Phone size={14} />
                    {business.phoneDisplay}
                  </a>
                  <a
                    href={business.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-4 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition-all"
                  >
                    Per WhatsApp anfragen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          REVIEWS
      ══════════════════════════════════════════════ */}
      <section className="section relative overflow-hidden bg-surface">
        {/* Faint top border */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent" />

        <div className="container-page">
          <FadeUp>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={22} className="fill-amber-400 text-amber-400" />)}
              </div>
              <span className="eyebrow mb-3">Google-Bewertungen</span>
              <h2 className="text-3xl font-extrabold text-primary sm:text-4xl lg:text-[44px]">
                Das sagen unsere Kunden
              </h2>
              <p className="mt-4 max-w-md text-lg text-ink-muted">
                Original-Bewertungen — ungekürzt und unverändert.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-3">
            {[reviews[1], reviews[2], reviews[6]].map((r) => (
              <StaggerItem key={r.author}>
                <MagneticHover>
                  <figure className="card flex h-full flex-col p-6">
                    {/* Stars */}
                    <div className="mb-4 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} className="fill-accent text-accent" />
                      ))}
                    </div>
                    {/* Quote icon */}
                    <Quote size={22} className="mb-3 text-accent/25" aria-hidden />
                    {/* Text */}
                    <blockquote className="flex-1 text-[15px] leading-relaxed text-primary">
                      {r.text}
                    </blockquote>
                    {/* Author */}
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-primary/8 pt-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent-dark/20 text-xs font-extrabold text-accent">
                        {r.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">{r.author}</p>
                        <p className="text-xs text-ink-faint">Google · verifiziert</p>
                      </div>
                    </figcaption>
                  </figure>
                </MagneticHover>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.3}>
            <div className="mt-10 text-center">
              <Link href="/kundenbewertungen" className="btn-ghost inline-flex">
                Alle Bewertungen lesen <ArrowRight size={16} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <HowItWorks />
      <ContactCta />

      {/* Floating Bottom Quick-Action Dock (Mobile Only) */}
      <MobileQuickActions
        phone={business.phoneDisplay}
        phoneHref={business.phoneHref}
        whatsappHref={business.whatsappHref}
      />
    </>
  );
}

