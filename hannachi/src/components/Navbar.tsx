"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu, X, Phone, Wrench, ArrowRight, Home,
  UsersRound, Star, MessageSquare, MapPin,
} from "lucide-react";
import { nav, business } from "@/data/site";

const navIcons: Record<string, typeof Home> = {
  "/": Home,
  "/leistungen": Wrench,
  "/ueber-uns": UsersRound,
  "/kundenbewertungen": Star,
  "/kontakt": MessageSquare,
};

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 border-b border-white/10 bg-primary-dark/95 backdrop-blur-xl shadow-lg supports-[backdrop-filter]:bg-primary-dark/90">
      {/* ── Top Bar ── */}
      <div className="container-page flex h-[68px] sm:h-[72px] items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 leading-none shrink-0"
          aria-label="Hannachi Elektrohaushaltsgeräte Service – zur Startseite"
        >
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-accent text-white shadow-md shadow-accent/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_0_4px_rgba(14,165,233,.3)]">
            <Wrench size={18} />
          </div>
          <div>
            <span className="block text-[17px] sm:text-[19px] font-extrabold tracking-wider text-white">
              HANNACHI
            </span>
            <span className="block text-[8.5px] sm:text-[9.5px] font-semibold uppercase tracking-[0.18em] text-accent-light leading-none">
              Elektrohaushaltsgeräte
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => {
              const active = isActive(n.href);
              const Icon = navIcons[n.href];
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-[14px] font-medium transition-all duration-200 ${
                      active
                        ? "bg-accent text-white shadow-sm font-semibold"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {Icon && <Icon size={15} className={active ? "text-white" : "text-white/60"} />}
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Phone desktop link */}
          <a
            href={business.phoneHref}
            className="hidden items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-[13px] font-semibold text-white/90 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-accent/40 sm:flex lg:hidden xl:flex"
          >
            <Phone size={14} className="text-accent" />
            {business.phoneDisplay}
          </a>

          {/* Anfragen desktop button */}
          <Link
            href="/kontakt#anfrage"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 sm:px-5 py-2.5 text-[14px] font-semibold text-white shadow-md shadow-accent/25 transition-all duration-200 hover:bg-accent-dark hover:shadow-lg active:scale-95"
          >
            Anfragen
            <ArrowRight size={14} />
          </Link>

          {/* Direct phone call button on mobile */}
          <a
            href={business.phoneHref}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-all hover:bg-accent hover:border-accent active:scale-95 sm:hidden"
            aria-label={`Anrufen: ${business.phoneDisplay}`}
          >
            <Phone size={17} />
          </a>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 h-10 px-3 rounded-xl border border-white/15 bg-white/10 text-white font-semibold text-xs transition-all hover:bg-white/20 active:scale-95 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
            <span className="hidden xs:inline">{open ? "Zu" : "Menü"}</span>
          </button>
        </div>
      </div>

      {/* ── Mobile Horizontal Quick Navigation Banner (Direct Page Access) ── */}
      <div className="lg:hidden border-t border-white/10 bg-primary-dark/98 px-3 py-2 overflow-x-auto scrollbar-none flex items-center gap-1.5 whitespace-nowrap">
        {nav.map((n) => {
          const active = isActive(n.href);
          const Icon = navIcons[n.href];
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all shrink-0 active:scale-95 ${
                active
                  ? "bg-accent text-white shadow-sm ring-1 ring-accent-light/50"
                  : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/15 hover:text-white"
              }`}
            >
              {Icon && <Icon size={13} className={active ? "text-white" : "text-accent-light"} />}
              <span>{n.label}</span>
            </Link>
          );
        })}
      </div>

      {/* ── Mobile Nav Full Drawer (When Menu is clicked) ── */}
      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-[112px] bottom-0 z-50 overflow-y-auto bg-primary-dark/98 backdrop-blur-2xl lg:hidden animate-fade-in"
        >
          {/* Atmospheric background glow */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 -left-10 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl" />

          <nav aria-label="Mobile Navigation" className="container-page relative py-6">
            {/* Quick Title */}
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-3">
              Navigation
            </p>

            {/* Links list */}
            <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-md">
              {nav.map((n) => {
                const active = isActive(n.href);
                const Icon = navIcons[n.href];
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition-all ${
                        active
                          ? "bg-accent text-white shadow-xs"
                          : "text-white hover:bg-white/10 hover:text-accent-light"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {Icon && <Icon size={18} className={active ? "text-white" : "text-accent"} />}
                        {n.label}
                      </span>
                      <ArrowRight size={16} className={active ? "text-white" : "text-white/40"} />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Quick Contact & WhatsApp Cards */}
            <div className="mt-6 grid gap-3">
              <Link
                href="/kontakt#anfrage"
                className="btn-primary w-full justify-center !py-3.5 text-sm font-bold shadow-lg shadow-accent/25"
              >
                <MessageSquare size={16} />
                Reparatur anfragen
                <ArrowRight size={16} />
              </Link>
              <a
                href={business.phoneHref}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/20"
              >
                <Phone size={16} className="text-accent" />
                Jetzt anrufen: {business.phoneDisplay}
              </a>
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/25"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                WhatsApp Nachricht schreiben
              </a>
            </div>

            {/* Address & Hours Info */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Hannachi Elektrohaushaltsgeräte</p>
                  <p className="mt-0.5">{business.street}, {business.zip} {business.city}</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
