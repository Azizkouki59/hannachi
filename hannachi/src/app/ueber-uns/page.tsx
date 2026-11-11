import type { Metadata } from "next";
import ContactCta from "@/components/ContactCta";
import HeroVisual from "@/components/HeroVisual";
import { PageHeader } from "@/components/ui";
import { business, yearsOfExperience } from "@/data/site";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Hannachi in Osnabrück: unabhängiger Haushaltsgeräte-Service von Kamal Hannachi, seit 1990.",
};

const values = [
  { title: "Ehrlichkeit und Transparenz", text: "Bei uns gibt es keine versteckten Kosten." },
  { title: "Nur, was Sie brauchen", text: "Wir verkaufen Ihnen nur das, was Sie wirklich brauchen. Nutzen Sie unsere Fachkompetenz, um das passende Ersatzteil zu finden." },
  { title: "Alle Fabrikate", text: "Miele, Bosch, Siemens, AEG, Bauknecht oder andere Marken: Wir kennen sie." },
];

export default function UeberUns() {
  return (
    <>
      <PageHeader title="Persönlicher Service mit Erfahrung." intro="Ein unabhängiger Fachbetrieb in Osnabrück, geführt von einem Techniker, der Ihre Geräte kennt." />
      <section className="section bg-white">
        <div className="container-page grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="space-y-6 text-lg leading-relaxed text-slate-muted lg:col-span-7">
            <p>
              Seit {business.founded} steht Hannachi für persönlichen Service und Erfahrung im Bereich Haushaltsgeräte. Bei uns haben Sie einen direkten Ansprechpartner und profitieren von einer individuellen Beratung.
            </p>
            <p>
              Inhaber {business.owner} ist seit mehr als {yearsOfExperience} Jahren Ihr Ansprechpartner in der Region. Sie sprechen mit dem Techniker selbst, nicht mit einer Zentrale.
            </p>
            <p>
              Bei Verschleiß und im Reparaturfall halten wir Ersatzteile von bekannten deutschen Herstellern bereit. Teile für weniger bekannte Marken fordern wir bei Bedarf umgehend für Sie an.
            </p>
          </div>
          <div className="lg:col-span-5"><div className="mx-auto max-w-md lg:max-w-none"><HeroVisual /></div></div>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="container-page grid gap-10 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="border-t-2 border-amber pt-5">
              <h2 className="text-xl font-bold">{v.title}</h2>
              <p className="mt-2 leading-relaxed text-slate-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
