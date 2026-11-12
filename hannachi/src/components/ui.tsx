"use client";
import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import type { Review, Service } from "@/data/site";
import { serviceIcons } from "./Illustrations";
import { ApplianceGraphic } from "./AnimatedAppliances";

export function SectionHeading({
  title,
  subtitle,
  light = false,
  className = "",
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <h2 className={`text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[44px] ${light ? "text-white" : "text-primary"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/70" : "text-ink-muted"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="container-page relative py-16 sm:py-24">
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{intro}</p>}
        <div className="mt-10 h-1 w-16 rounded-full bg-accent" />
      </div>
    </section>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.slug];
  return (
    <Link
      href={`/leistungen/${service.slug}`}
      className="card group flex flex-col overflow-hidden bg-white"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-b from-sky-50/70 via-white to-slate-50 p-2 border-b border-primary/5">
        <ApplianceGraphic slug={service.slug} size="sm" />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-bold text-primary shadow-xs backdrop-blur-sm">
            <Icon className="h-3 w-3 text-accent" />
            {service.title}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Live
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-primary">{service.title}</h3>
        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-muted">{service.short}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent">
          Mehr erfahren <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ReviewCard({ review, large = false }: { review: Review; large?: boolean }) {
  return (
    <figure className="card flex h-full flex-col p-6">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="fill-accent text-accent" />
        ))}
      </div>
      <blockquote className={`flex-1 leading-relaxed text-primary ${large ? "text-lg" : "text-[15px]"}`}>
        <Quote size={18} className="mb-2 text-accent/40" aria-hidden />
        {review.text}
      </blockquote>
      <figcaption className="mt-5 border-t border-primary/8 pt-4 text-sm">
        <span className="font-semibold text-primary">{review.author}</span>
        <span className="block text-ink-faint text-xs mt-0.5">Google-Bewertung</span>
      </figcaption>
    </figure>
  );
}
