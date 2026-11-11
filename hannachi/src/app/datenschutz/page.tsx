import type { Metadata } from "next";
import LegalNotice from "@/components/LegalNotice";
import { PageHeader } from "@/components/ui";
import { business } from "@/data/site";

export const metadata: Metadata = { title: "Datenschutz", robots: { index: false } };

export default function Datenschutz() {
  return (
    <>
      <PageHeader title="Datenschutzerklärung" />
      <section className="section bg-white">
        <div className="container-page max-w-3xl space-y-10 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold">Verantwortlicher</h2>
            <p className="mt-3">{business.owner}, {business.street}, {business.zip} {business.city}. Telefon: {business.phoneDisplay}</p>
          </div>
          <LegalNotice>
            <strong>Rechtstext fehlt noch.</strong> Die bestehende Seite hannachi.de enthält keine Datenschutzerklärung, die übernommen werden könnte. Der vollständige Text muss zum tatsächlichen Betrieb passen: Schriftart-Hosting, Kontaktformular-Backend, Foto-Upload, WhatsApp-Verknüpfung und die Google-Bewertungen (Trustindex) auf der alten Seite. Bitte mit einem Datenschutz-Generator oder rechtlicher Beratung erstellen.
          </LegalNotice>
          <div>
            <h2 className="text-xl font-bold">Hinweis zum Anfrageformular</h2>
            <p className="mt-3 text-slate-muted">Dieses Formular ist derzeit ein Frontend-Prototyp. Eingaben werden nicht an einen Server übermittelt.</p>
          </div>
        </div>
      </section>
    </>
  );
}
