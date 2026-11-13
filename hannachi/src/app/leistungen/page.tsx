import type { Metadata } from "next";
import ContactCta from "@/components/ContactCta";
import { PageHeader } from "@/components/ui";
import ServicesDirectory from "@/components/ServicesDirectory";
import { brands } from "@/data/site";

export const metadata: Metadata = {
  title: "Unsere Leistungen | Reparatur von Haushaltsgeräten in Osnabrück",
  description:
    "Reparatur für Waschmaschinen, Trockner, Geschirrspüler, Kühlschränke, Backöfen, Kaffeevollautomaten und Elektronikplatinen in Osnabrück. Alle Fabrikate.",
};

export default function LeistungenPage() {
  return (
    <>
      {/* ── Page Header: Klare Überschrift und kurze Einführung ── */}
      <PageHeader
        title="Unsere Leistungen"
        intro="Reparaturservice für Haushaltsgeräte in Osnabrück und Umgebung. Wir prüfen Ihr defektes Gerät vor Ort und reparieren es zuverlässig."
      />

      {/* ── Neuer, strukturierter Leistungskatalog mit Tabs und Gerätekarten ── */}
      <main className="bg-surface/30">
        <ServicesDirectory />

        {/* ── Schlichter Marken-Hinweis ohne Überfrachtung ── */}
        <section className="border-t border-primary/8 bg-white py-12">
          <div className="container-page text-center">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-faint">
              Reparatur aller bekannten Marken und Hersteller
            </h2>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {[...brands, "Liebherr", "Neff", "Constructa", "Samsung", "LG", "Beko", "Gorenje", "Jura", "DeLonghi"].map((brand) => (
                <span
                  key={brand}
                  className="rounded-lg border border-primary/10 bg-surface px-3 py-1 text-xs font-semibold text-primary"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ContactCta />
    </>
  );
}
