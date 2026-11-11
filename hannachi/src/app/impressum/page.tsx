import type { Metadata } from "next";
import LegalNotice from "@/components/LegalNotice";
import { PageHeader } from "@/components/ui";
import { business } from "@/data/site";

export const metadata: Metadata = { title: "Impressum", robots: { index: false } };

export default function Impressum() {
  return (
    <>
      <PageHeader title="Impressum" />
      <section className="section bg-white">
        <div className="container-page max-w-3xl space-y-10 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold">Angaben gemäß § 5 DDG</h2>
            <p className="mt-3">
              {business.owner}<br />Elektrohaushaltsgeräte Service &amp; Ersatzteile-Shop<br />
              {business.street}<br />{business.zip} {business.city}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Kontakt</h2>
            <p className="mt-3">Telefon: <a className="underline" href={business.phoneHref}>{business.phoneDisplay}</a></p>
            <LegalNotice>
              <strong>Noch zu ergänzen:</strong> E-Mail-Adresse. Sie ist auf hannachi.de nicht angegeben, nach § 5 DDG aber Pflichtangabe.
            </LegalNotice>
          </div>
          <div>
            <h2 className="text-xl font-bold">Umsatzsteuer-ID und Berufsrecht</h2>
            <LegalNotice>
              <strong>Noch zu ergänzen:</strong> Umsatzsteuer-Identifikationsnummer (falls vorhanden), zuständige Handwerkskammer bzw. Aufsichtsbehörde und Verbraucherstreitbeilegung. Diese Angaben stehen nicht auf hannachi.de. Bitte vom Inhaber bestätigen lassen und nicht schätzen.
            </LegalNotice>
          </div>
        </div>
      </section>
    </>
  );
}
