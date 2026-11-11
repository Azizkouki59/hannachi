"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Wrench, ArrowRight } from "lucide-react";
import { nav, business } from "@/data/site";

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
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-primary/8 bg-white/95 shadow-[0_1px_24px_rgba(15,23,42,.08)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/90"
          : "border-b border-transparent bg-white/0 backdrop-blur-sm"
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5 leading-none" aria-label="Hannachi Elektrohaushaltsgeräte Service – zur Startseite">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-sm transition-all duration-300 group-hover:shadow-[0_0_0_4px_rgba(14,165,233,.2)] group-hover:scale-105">
            <Wrench size={17} />
          </div>
          <div>
            <span className="block text-[18px] font-extrabold tracking-widest text-primary">HANNACHI</span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.15em] text-ink-faint leading-none">Elektrohaushaltsgeräte</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`relative rounded-lg px-3.5 py-2 text-[14px] font-medium transition-all duration-200 ${
                    isActive(n.href)
                      ? "bg-accent/8 text-accent"
                      : "text-ink-muted hover:bg-primary/4 hover:text-primary"
                  }`}
                >
                  {n.label}
                  {isActive(n.href) && (
                    <span className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-accent/60" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2.5">
          <a
            href={business.phoneHref}
            className="hidden items-center gap-1.5 text-[13px] font-semibold text-ink-muted transition-colors hover:text-primary sm:flex lg:hidden xl:flex"
          >
            <Phone size={14} className="text-accent" />
            {business.phoneDisplay}
          </a>
          <Link
            href="/kontakt#anfrage"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-accent px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-dark hover:shadow-[0_4px_16px_rgba(14,165,233,.4)] hover:-translate-y-px active:translate-y-0"
          >
            Anfragen
            <ArrowRight size={14} />
          </Link>
          <a
            href={business.phoneHref}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/12 text-primary transition-all hover:border-accent/40 hover:text-accent hover:bg-accent/5 sm:hidden"
            aria-label={`Anrufen: ${business.phoneDisplay}`}
          >
            <Phone size={18} />
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/12 text-primary transition-all hover:border-accent/40 hover:text-accent hover:bg-accent/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav — full-screen dark overlay */}
      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-primary-dark lg:hidden">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 -left-10 h-60 w-60 rounded-full bg-blue-600/10 blur-3xl" />
          <nav aria-label="Mobile Navigation" className="container-page relative py-10">
            <ul className="divide-y divide-white/8">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`flex items-center justify-between py-4 text-xl font-semibold transition-colors ${
                      isActive(n.href) ? "text-accent" : "text-white hover:text-accent"
                    }`}
                  >
                    {n.label}
                    <ArrowRight size={18} className="text-white/30" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 grid gap-3">
              <Link href="/kontakt#anfrage" className="btn-primary justify-center">Reparatur anfragen</Link>
              <a href={business.phoneHref} className="btn-ghost-light justify-center"><Phone size={18} /> Jetzt anrufen: {business.phoneDisplay}</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
