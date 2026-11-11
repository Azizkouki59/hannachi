import Link from "next/link";
import { Phone, MapPin, Clock, Wrench } from "lucide-react";
import { business, services, nav } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white/75">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/20 text-accent">
              <Wrench size={18} />
            </div>
            <div>
              <p className="text-[18px] font-extrabold tracking-wide text-white">HANNACHI</p>
              <p className="text-[10px] font-medium text-white/50 leading-none">Elektrohaushaltsgeräte</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed">
            Unabhängiger Reparaturservice für Haushaltsgeräte in Osnabrück. Inhaber {business.owner}, seit {business.founded}.
          </p>
        </div>

        {/* Nav */}
        <FooterCol title="Seiten">
          {nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-accent transition-colors">{n.label}</Link></li>)}
        </FooterCol>

        {/* Services */}
        <FooterCol title="Leistungen">
          {services.map((s) => <li key={s.slug}><Link href={`/leistungen/${s.slug}`} className="hover:text-accent transition-colors">{s.title}</Link></li>)}
        </FooterCol>

        {/* Contact */}
        <div className="md:col-span-3">
          <h2 className="text-sm font-semibold text-white">Kontakt</h2>
          <address className="mt-4 space-y-3 text-[14px] not-italic leading-relaxed">
            <p className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
              <span>{business.street}<br />{business.zip} {business.city}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={15} className="shrink-0 text-accent" />
              <a href={business.phoneHref} className="hover:text-accent transition-colors">{business.phoneDisplay}</a>
            </p>
            <p className="flex items-center gap-2 text-white/50">
              <Clock size={15} className="shrink-0 text-accent/60" />
              {business.hours}
            </p>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-page flex flex-col gap-3 py-6 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Hannachi Elektrohaushaltsgeräte Service</p>
          <ul className="flex gap-6">
            <li><Link href="/impressum" className="hover:text-white/70 transition-colors">Impressum</Link></li>
            <li><Link href="/datenschutz" className="hover:text-white/70 transition-colors">Datenschutz</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="md:col-span-2">
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[14px]">{children}</ul>
    </div>
  );
}
