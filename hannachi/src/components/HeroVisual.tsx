import Image from "next/image";

// Real photos of Herr Hannachi — used as fallback / standalone visual
const HERO_ASSET = "/images/werkstatt.jpg";
const ABOUT_ASSET = "/images/herr-hannachi.jpg";

export default function HeroVisual({
  priority = false,
  variant = "hero",
}: {
  priority?: boolean;
  variant?: "hero" | "about";
}) {
  const src = variant === "about" ? ABOUT_ASSET : HERO_ASSET;
  const alt =
    variant === "about"
      ? "Herr Hannachi – Inhaber und Fachmann"
      : "Herr Hannachi in seiner Werkstatt";

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width:1024px) 40vw, 90vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent" />
    </div>
  );
}
