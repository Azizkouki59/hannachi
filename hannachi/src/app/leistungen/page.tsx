import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Phone } from "lucide-react";
import ContactCta from "@/components/ContactCta";
import { PageHeader, ServiceCard } from "@/components/ui";
import { brands, services, allSupportedAppliances, business } from "@/data/site";

export const metadata: Metadata = {
  title: "Leistungen | Reparatur aller Haushaltsgeräte in Osnabrück",
  description:
    "Reparatur für nahezu alle Elektrohaushaltsgeräte in Osnabrück: Waschmaschinen, Trockner, Geschirrspüler, Kühlschränke, Herde, Induktion, Kaffeevollautomaten, Platinen & mehr. Alle Fabrikate.",
};

export default function Leistungen() {
  return (
    <>
      <PageHeader
        title="Reparatur für nahezu alle Haushaltsgeräte"
        intro="Egal welches Fabrikat, Modell oder Alter: Von Waschmaschine und Trockner über Spülmaschine und Kühlschrank bis hin zu Induktionskochfeld, Kaffeevollautomat und Platinenreparatur — wir reparieren fachgerecht, persönlich und nachhaltig."
      />

      {/* Primary 4 Interactive Service Cards */}
      <section className="section bg-surface">
        <div className="container-page">
          <div className="mb-8">
            <span className="eyebrow mb-2 block">Schwerpunkte</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Häufige Großgeräte im Überblick
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Full Appliance Catalogue: All Supported Devices */}
      <section className="section bg-white border-t border-primary/8">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="eyebrow mb-2 inline-block">Komplettes Leistungsspektrum</span>
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
              Wir reparieren fast jedes Haushaltsgerät
            </h2>
            <p className="mt-3 text-base text-ink-muted">
              Hannachi repariert nicht nur Großgeräte, sondern deckt das gesamte Spektrum moderner und klassischer Haushalts- und Küchentechnik ab — inklusive Platineninstandsetzung auf Bauteilebene.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allSupportedAppliances.map((cat) => (
              <div
                key={cat.title}
                className="rounded-3xl border border-primary/8 bg-surface/50 p-6 flex flex-col justify-between hover:border-accent/30 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-primary/8">
                    <h3 className="text-base font-bold text-primary">{cat.title}</h3>
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-bold text-accent shrink-0">
                      {cat.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-ink-muted">{cat.description}</p>
                  <ul className="mt-4 space-y-3">
                    {cat.items.map((item) => (
                      <li key={item.name} className="rounded-xl bg-white p-3 border border-primary/6">
                        <p className="text-xs font-bold text-primary flex items-center justify-between">
                          <span>{item.name}</span>
                          <CheckCircle2 size={13} className="text-accent" />
                        </p>
                        <p className="mt-1 text-[11px] text-ink-muted leading-tight">{item.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.symptoms.map((s) => (
                            <span
                              key={s}
                              className="inline-block rounded-md bg-surface px-1.5 py-0.5 text-[9.5px] font-medium text-ink-muted"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-primary/8 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-ink-faint">Alle Fabrikate</span>
                  <Link
                    href="/kontakt#anfrage"
                    className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-accent-dark transition-colors"
                  >
                    Reparatur anfragen <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice Banner */}
          <div className="mt-12 rounded-2xl border border-accent/25 bg-gradient-to-r from-accent/10 via-sky-500/5 to-accent/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-primary flex items-center gap-2">
                <Sparkles className="text-accent" size={18} />
                Ihr Gerät ist hier nicht aufgeführt?
              </h4>
              <p className="mt-1.5 text-sm text-ink-muted max-w-xl">
                Keine Sorge! Wir reparieren nahezu jedes Elektrohaushaltsgerät. Rufen Sie uns einfach an oder senden Sie uns ein Foto des Geräts per WhatsApp.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a href={business.phoneHref} className="btn-primary !py-2.5 !px-4 text-xs font-bold">
                <Phone size={14} /> {business.phoneDisplay}
              </a>
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-500/20 transition-all"
              >
                Foto per WhatsApp
              </a>
            </div>
          </div>

          {/* Brand Promise Box */}
          <div className="mt-16 rounded-3xl bg-primary-dark text-white p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-light">
                Hersteller-Unabhängigkeit
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Alle Fabrikate & Marken
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Ob {brands.slice(0, -1).join(", ")} oder {brands[brands.length - 1]}, sowie Samsung, LG, Liebherr, Neff, Constructa, Beko oder Gorenje: Wir kennen die Technik aller gängigen Hersteller. Gängige Ersatzteile halten wir direkt in der Meisterwerkstatt vor, spezielle Komponenten beschaffen wir innerhalb kürzester Zeit.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[...brands, "Liebherr", "Neff", "Constructa", "Samsung", "LG", "Beko", "Gorenje", "Jura", "DeLonghi"].map((brand) => (
                  <span
                    key={brand}
                    className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
