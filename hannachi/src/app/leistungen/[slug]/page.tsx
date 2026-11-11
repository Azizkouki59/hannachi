import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import ContactCta from "@/components/ContactCta";
import { serviceIcons } from "@/components/Illustrations";
import { PageHeader, ReviewCard, ServiceCard } from "@/components/ui";
import { services } from "@/data/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const s = services.find((x) => x.slug === params.slug);
  if (!s) return {};
  return { title: `${s.title} Reparatur Osnabrück`, description: `${s.short} Persönlicher Reparaturservice von Hannachi in Osnabrück.` };
}

export default function ServicePage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();
  const Icon = serviceIcons[service.slug];
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader title={`${service.title} Reparatur in Osnabrück`} intro={service.intro} />
      <section className="section bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Typische Probleme</h2>
            <ul className="mt-6 divide-y divide-navy/10 border-y border-navy/10">
              {service.symptoms.map((s) => (
                <li key={s} className="flex items-center gap-3 py-4 text-lg"><Check size={20} className="shrink-0 text-amber-deep" aria-hidden /> {s}</li>
              ))}
            </ul>
            <h2 className="mt-14 text-2xl font-extrabold sm:text-3xl">So gehen wir vor</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-muted">{service.approach}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/kontakt?geraet=${service.slug}#anfrage`} className="btn-primary">Reparatur anfragen</Link>
              <Link href="/leistungen" className="btn-ghost">Alle Leistungen</Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="flex aspect-square items-center justify-center bg-navy text-amber"><Icon className="h-3/5 w-3/5" /></div>
            {service.customerNote && (
              <div className="mt-6"><ReviewCard review={{ author: service.customerNote.author, text: service.customerNote.quote }} /></div>
            )}
          </div>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Weitere Leistungen</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">{others.map((s) => <ServiceCard key={s.slug} service={s} />)}</div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
