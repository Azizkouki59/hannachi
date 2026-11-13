import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import RepairForm from "@/components/RepairForm";
import { PageHeader } from "@/components/ui";
import { business, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Reparatur anfragen bei Hannachi in Osnabrück: telefonisch, per WhatsApp oder über das Anfrageformular.",
};

const deviceBySlug: Record<string, string> = {
  waschmaschinen: "Waschmaschine",
  waschmaschine: "Waschmaschine",
  geschirrspueler: "Geschirrspüler",
  kuehlschraenke: "Kühlschrank / Gefriergerät",
  kuehlschrank: "Kühlschrank / Gefriergerät",
  backoefen: "Backofen / Herd",
  backofen: "Backofen / Herd",
  herd: "Backofen / Herd",
  trockner: "Wäschetrockner",
  waeschetrockner: "Wäschetrockner",
  waschtrockner: "Wäschetrockner",
  induktion: "Ceranfeld / Induktion",
  ceranfeld: "Ceranfeld / Induktion",
  dunstabzug: "Dunstabzugshaube",
  dunstabzugshaube: "Dunstabzugshaube",
  dunstabzugshauben: "Dunstabzugshaube",
  mikrowelle: "Mikrowelle",
  mikrowellen: "Mikrowelle",
  kaffee: "Kaffeevollautomat",
  kaffeevollautomat: "Kaffeevollautomat",
  kaffeevollautomaten: "Kaffeevollautomat",
  platine: "Elektronik / Platine",
  platinen: "Elektronik / Platine",
  elektronik: "Elektronik / Platine",
  steuerungsplatinen: "Elektronik / Platine",
  anderes: "Anderes Gerät (Sonstiges)",
};

export default function Kontakt({ searchParams }: { searchParams: { geraet?: string } }) {
  const param = searchParams.geraet?.trim().toLowerCase();
  let defaultDevice = "";
  if (param && deviceBySlug[param]) {
    defaultDevice = deviceBySlug[param];
  } else if (searchParams.geraet) {
    defaultDevice = searchParams.geraet.trim();
  }
  return (
    <>
      <PageHeader title="Wir helfen Ihnen gerne weiter." intro="Rufen Sie an, schreiben Sie per WhatsApp oder senden Sie uns Ihre Anfrage über das Formular." />
      <section className="section bg-surface">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-4">
            <div className="card p-6 space-y-6">
              <ContactItem icon={Phone} title="Telefon">
                <a href={business.phoneHref} className="font-semibold text-primary hover:text-accent transition-colors">
                  {business.phoneDisplay}
                </a>
              </ContactItem>
              <ContactItem icon={MessageCircle} title="WhatsApp">
                <a
                  href={business.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Direktnachricht schreiben
                </a>
              </ContactItem>
              <ContactItem icon={MapPin} title="Adresse">
                <address className="not-italic text-[14px]">
                  {business.owner}
                  <br />
                  {business.street}
                  <br />
                  {business.zip} {business.city}
                </address>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                >
                  Auf Google Maps ansehen (Route) →
                </a>
              </ContactItem>
              <ContactItem icon={Clock} title="Termine">
                <span className="text-[14px]">{business.hours}</span>
              </ContactItem>
            </div>

            {/* Embedded Google Maps Card */}
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between border-b border-primary/8 p-4 pb-3">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-faint">
                  <MapPin size={14} className="text-accent" />
                  Standort &amp; Anfahrt
                </span>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-accent hover:underline"
                >
                  Route planen →
                </a>
              </div>
              <div className="relative aspect-[16/10] w-full bg-surface">
                <iframe
                  title="Hannachi Standort Osnabrück auf Google Maps"
                  src={business.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
              <div className="flex items-center justify-between bg-surface p-3.5 text-xs text-ink-muted">
                <span>{business.street}, {business.zip} {business.city}</span>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary hover:text-accent transition-colors"
                >
                  In Maps öffnen ↗
                </a>
              </div>
            </div>
          </aside>
          <div id="anfrage" className="scroll-mt-28 lg:col-span-8">
            <RepairForm defaultDevice={defaultDevice} />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({ icon: Icon, title, children }: { icon: typeof Phone; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 items-start">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <Icon size={18} aria-hidden />
      </span>
      <div>
        <h2 className="text-sm font-bold text-primary">{title}</h2>
        <div className="mt-1 text-ink-muted text-sm">{children}</div>
      </div>
    </div>
  );
}
