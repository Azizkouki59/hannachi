import type { Metadata } from "next";
import ContactCta from "@/components/ContactCta";
import { PageHeader, ReviewCard } from "@/components/ui";
import { reviews } from "@/data/site";

export const metadata: Metadata = {
  title: "Kundenbewertungen",
  description: "Echte Google-Bewertungen von Kunden der Firma Hannachi in Osnabrück.",
};

export default function Kundenbewertungen() {
  return (
    <>
      <PageHeader title="Das sagen unsere Kunden" intro="Originalbewertungen von Google, unverändert übernommen von hannachi.de." />
      <section className="section bg-white">
        <div className="container-page columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {reviews.map((r) => <ReviewCard key={r.author} review={r} large />)}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
