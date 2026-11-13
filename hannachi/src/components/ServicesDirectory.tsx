"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  WashingMachine,
  Wind,
  Layers,
  UtensilsCrossed,
  Zap,
  Refrigerator,
  Snowflake,
  Flame,
  Fan,
  Microwave,
  Coffee,
  Sparkles,
  Cpu,
  ArrowRight,
  MessageCircle,
  Search,
  CheckCircle2,
  X,
  Phone,
} from "lucide-react";
import {
  mainServiceCategories,
  electronicsWorkshopCategory,
  type DeviceItem,
  type ServiceCategory,
} from "@/data/servicesCatalog";
import { business } from "@/data/site";

// Icon mapping helper
function DeviceIcon({ iconName, className = "h-5 w-5" }: { iconName: DeviceItem["iconName"]; className?: string }) {
  switch (iconName) {
    case "WashingMachine":
      return <WashingMachine className={className} aria-hidden />;
    case "Wind":
      return <Wind className={className} aria-hidden />;
    case "Layers":
      return <Layers className={className} aria-hidden />;
    case "UtensilsCrossed":
      return <UtensilsCrossed className={className} aria-hidden />;
    case "Zap":
      return <Zap className={className} aria-hidden />;
    case "Refrigerator":
      return <Refrigerator className={className} aria-hidden />;
    case "Snowflake":
      return <Snowflake className={className} aria-hidden />;
    case "Flame":
      return <Flame className={className} aria-hidden />;
    case "Fan":
      return <Fan className={className} aria-hidden />;
    case "Microwave":
      return <Microwave className={className} aria-hidden />;
    case "Coffee":
      return <Coffee className={className} aria-hidden />;
    case "Sparkles":
      return <Sparkles className={className} aria-hidden />;
    case "Cpu":
      return <Cpu className={className} aria-hidden />;
    default:
      return <Zap className={className} aria-hidden />;
  }
}

// Individual Device Card
function ApplianceCard({ device, categoryTitle }: { device: DeviceItem; categoryTitle: string }) {
  const whatsappUrl = `https://wa.me/491703493494?text=${encodeURIComponent(
    `Hallo Herr Hannachi, ich habe eine Anfrage zur Reparatur für: ${device.name}`
  )}`;

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-primary/10 bg-white p-5 sm:p-6 shadow-xs hover:border-accent/40 hover:shadow-md transition-all duration-200">
      <div>
        {/* Card Header: Icon & Device Title */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <DeviceIcon iconName={device.iconName} className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary leading-tight">{device.name}</h3>
            <p className="mt-1 text-xs text-ink-muted leading-relaxed">{device.description}</p>
          </div>
        </div>

        {/* Common Faults List */}
        <div className="mt-5 border-t border-primary/6 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">
            Häufige Fehler:
          </p>
          <ul className="mt-2.5 space-y-1.5" role="list">
            {device.faults.map((fault) => (
              <li key={fault} className="flex items-start gap-2 text-xs sm:text-[13px] text-ink leading-snug">
                <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" aria-hidden />
                <span>{fault}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Actions: Primary Inquiry button + Quick WhatsApp link */}
      <div className="mt-6 border-t border-primary/6 pt-4 flex items-center gap-2">
        <Link
          href={`/kontakt?geraet=${encodeURIComponent(device.name)}#anfrage`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 px-3.5 text-xs font-bold text-white hover:bg-accent transition-colors shadow-xs"
        >
          <span>Anfragen</span>
          <ArrowRight size={13} aria-hidden />
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`WhatsApp-Anfrage für ${device.name}`}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-500/50 transition-colors"
          aria-label={`WhatsApp-Anfrage für ${device.name}`}
        >
          <MessageCircle size={15} aria-hidden />
        </a>
      </div>
    </article>
  );
}

export default function ServicesDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allCategories = useMemo(
    () => [...mainServiceCategories, electronicsWorkshopCategory],
    []
  );

  // Filter categories and devices based on tab and optional search query
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allCategories
      .filter((cat) => selectedCategory === "all" || cat.id === selectedCategory)
      .map((cat) => {
        if (!q) return cat;

        const matchingDevices = cat.devices.filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q) ||
            d.faults.some((f) => f.toLowerCase().includes(q))
        );

        return {
          ...cat,
          devices: matchingDevices,
        };
      })
      .filter((cat) => cat.devices.length > 0);
  }, [allCategories, selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* ── Category Filter Tabs & Quick Search ── */}
      <div className="border-b border-primary/8 bg-surface/60 py-4 sticky top-16 z-30 backdrop-blur-md">
        <div className="container-page flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Scrollable category navigation pills */}
          <nav
            aria-label="Kategorie-Navigation"
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                selectedCategory === "all"
                  ? "bg-primary text-white shadow-xs"
                  : "bg-white text-ink-muted border border-primary/10 hover:border-primary/20 hover:text-primary"
              }`}
            >
              Alle Bereiche
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white text-ink-muted border border-primary/10 hover:border-primary/20 hover:text-primary"
                }`}
              >
                {cat.shortTitle}
              </button>
            ))}
          </nav>

          {/* Quick search input */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none"
              aria-hidden
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Gerät oder Fehler suchen..."
              className="w-full rounded-xl border border-primary/10 bg-white pl-8 pr-7 py-1.5 text-xs text-primary placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              aria-label="Geräte oder Fehler durchsuchen"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-primary"
                aria-label="Suche zurücksetzen"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="container-page py-10 sm:py-14 space-y-16 sm:space-y-20">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-primary/10 p-8">
            <p className="text-base font-bold text-primary">Keine Geräte für Ihre Suche gefunden.</p>
            <p className="mt-1 text-xs text-ink-muted">
              Probieren Sie einen anderen Begriff oder rufen Sie uns direkt an.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-white hover:bg-accent-dark transition-colors"
            >
              Alle Leistungen anzeigen
            </button>
          </div>
        ) : (
          filteredCategories.map((category) => {
            const isElectronics = category.id === "elektronik";

            return (
              <section
                key={category.id}
                id={category.id}
                className={`scroll-mt-32 ${
                  isElectronics
                    ? "rounded-3xl border border-primary/12 bg-gradient-to-b from-surface/80 to-surface p-6 sm:p-10 shadow-xs"
                    : ""
                }`}
              >
                {/* Category Header: H2 & 1-line description */}
                <div className="max-w-2xl mb-6 sm:mb-8">
                  {isElectronics && (
                    <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-[11px] font-bold text-accent mb-2">
                      Spezialwerkstatt
                    </span>
                  )}
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                    {category.title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-ink-muted leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Device Cards: 2 or 3 columns on desktop, 1 on mobile */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {category.devices.map((device) => (
                    <ApplianceCard
                      key={device.name}
                      device={device}
                      categoryTitle={category.title}
                    />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>

      {/* ── Fixed WhatsApp Button for Mobile Users ── */}
      <aside
        aria-label="WhatsApp-Direktkontakt"
        className="fixed bottom-4 left-4 right-4 z-40 sm:hidden"
      >
        <a
          href={business.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 w-full rounded-2xl bg-emerald-600 px-4 py-3.5 text-white shadow-xl shadow-emerald-950/20 active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
              <MessageCircle size={18} aria-hidden />
            </span>
            <div className="text-left">
              <p className="text-xs font-extrabold leading-tight">WhatsApp Reparaturanfrage</p>
              <p className="text-[11px] text-white/80 font-medium">{business.phoneDisplay}</p>
            </div>
          </div>
          <span className="rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-bold">
            Chat öffnen
          </span>
        </a>
      </aside>
    </div>
  );
}
