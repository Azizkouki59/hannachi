import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container-page py-32">
      <h1 className="text-4xl font-extrabold">Diese Seite gibt es nicht.</h1>
      <p className="mt-4 text-slate-muted">Vielleicht hilft Ihnen die Startseite oder die Übersicht unserer Leistungen weiter.</p>
      <div className="mt-8 flex gap-3"><Link href="/" className="btn-primary">Zur Startseite</Link><Link href="/leistungen" className="btn-ghost">Leistungen</Link></div>
    </section>
  );
}
