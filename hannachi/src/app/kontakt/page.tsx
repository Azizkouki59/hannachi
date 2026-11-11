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
  waschmaschinen: "Waschmaschine", geschirrspueler: "Geschirrspüler", kuehlschraenke: "Kühlschrank", backoefen: "Backofen",
};

export default function Kontakt({ searchParams }: { searchParams: { geraet?: string } }) {
  const slug = services.find((s) => s.slug === searchParams.geraet)?.slug;
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
              </ContactItem>
              <ContactItem icon={Clock} title="Termine">
                <span className="text-[14px]">{business.hours}</span>
              </ContactItem>
            </div>
          </aside>
          <div id="anfrage" className="scroll-mt-28 lg:col-span-8">
            <RepairForm defaultDevice={slug ? deviceBySlug[slug] : ""} />
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
