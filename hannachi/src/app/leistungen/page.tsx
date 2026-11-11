import type { Metadata } from "next";
import ContactCta from "@/components/ContactCta";
import { PageHeader, ServiceCard } from "@/components/ui";
import { brands, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Leistungen",
  description: "Reparatur von Waschmaschinen, Geschirrspülern, Kühlschränken und Backöfen in Osnabrück. Alle Fabrikate.",
};

export default function Leistungen() {
  return (
    <>
      <PageHeader title="Unser Reparaturservice" intro="Kompetente Hilfe für Ihre Haushaltsgeräte. Egal welches Fabrikat oder Modell: Wir bringen Ihre Geräte schnell, fachgerecht und nachhaltig wieder zum Laufen." />
      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
          <div className="mt-16 max-w-3xl border-l-4 border-amber pl-6">
            <h2 className="text-2xl font-bold">Alle Fabrikate</h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-muted">
              Ob {brands.slice(0, -1).join(", ")} oder {brands[brands.length - 1]}: Wir kennen die gängigen Marken. Ersatzteile von bekannten deutschen Herstellern halten wir bereit, weitere Teile fordern wir bei Bedarf umgehend für Sie an.
            </p>
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
