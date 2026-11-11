import Link from "next/link";
import { Phone, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { business } from "@/data/site";

export default function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-primary-dark text-white">
      {/* Background effects */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        {/* Glow blobs */}
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      {/* Top border accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container-page relative grid gap-10 py-24 sm:py-32 lg:grid-cols-12 lg:items-center">
        {/* Text */}
        <div className="lg:col-span-7">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
            <Sparkles size={12} />
            Kostenlose Ersteinschätzung
          </div>
          <h2 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[56px]">
            Gerät kaputt?<br />
            <span className="bg-gradient-to-r from-accent-light via-accent to-sky-400 bg-clip-text text-transparent">
              Wir helfen sofort.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">
            Schildern Sie uns Ihr Problem. Herr Hannachi meldet sich persönlich,
            gibt eine erste Einschätzung und vereinbart einen schnellen Termin.{" "}
            <span className="font-medium text-white/90">{business.hours}.</span>
          </p>
          {/* Trust micro-items */}
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
            {["Direkter Ansprechpartner", "Faire Festpreise", "Termine oft am nächsten Tag"].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-accent/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3 lg:col-span-5">
          <Link
            href="/kontakt#anfrage"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent-dark hover:shadow-[0_8px_30px_rgba(14,165,233,.4)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle size={18} />
            Reparatur anfragen
            <ArrowRight size={16} className="ml-auto transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={business.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/8"
          >
            <Phone size={17} />
            Jetzt anrufen: {business.phoneDisplay}
          </a>
          <a
            href={business.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-[15px] font-semibold text-white/80 transition-all duration-200 hover:border-green-400/40 hover:text-green-400 hover:bg-green-400/5"
          >
            {/* WhatsApp icon */}
            <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] fill-current" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M11.998 2C6.477 2 2 6.477 2 12c0 1.774.46 3.44 1.267 4.898L2.013 22l5.265-1.21A9.954 9.954 0 0011.998 22c5.523 0 10-4.477 10-10S17.52 2 11.998 2zm0 18.182a8.154 8.154 0 01-4.17-1.141l-.298-.177-3.088.711.741-2.985-.194-.306A8.145 8.145 0 013.818 12c0-4.51 3.67-8.182 8.18-8.182S20.18 7.49 20.18 12s-3.672 8.182-8.182 8.182z"/>
            </svg>
            WhatsApp schreiben
          </a>
        </div>
      </div>
    </section>
  );
}
