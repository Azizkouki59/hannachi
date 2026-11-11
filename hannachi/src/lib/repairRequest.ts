export const deviceTypes = ["Waschmaschine", "Geschirrspüler", "Kühlschrank", "Backofen"] as const;

export type RepairValues = {
  device: string; brand: string; model: string; problem: string;
  zip: string; name: string; phone: string; email: string; photo: File | null;
};
export type RepairErrors = Partial<Record<keyof RepairValues, string>>;

export const emptyValues: RepairValues = { device: "", brand: "", model: "", problem: "", zip: "", name: "", phone: "", email: "", photo: null };

export const MAX_PHOTO_MB = 8;

export function validate(v: RepairValues): RepairErrors {
  const e: RepairErrors = {};
  if (!v.device) e.device = "Bitte wählen Sie ein Gerät aus.";
  if (!v.brand.trim()) e.brand = "Bitte nennen Sie die Marke, zum Beispiel Miele oder Bosch.";
  if (v.problem.trim().length < 10) e.problem = "Bitte beschreiben Sie das Problem in mindestens 10 Zeichen.";
  if (!/^\d{5}$/.test(v.zip.trim())) e.zip = "Bitte geben Sie eine fünfstellige Postleitzahl ein.";
  if (v.name.trim().length < 2) e.name = "Bitte geben Sie Ihren Namen ein.";
  if (!/^[+()\d\s/-]{6,20}$/.test(v.phone.trim()) || v.phone.replace(/\D/g, "").length < 6) e.phone = "Bitte geben Sie eine gültige Telefonnummer ein.";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) {
    e.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }
  if (v.photo) {
    if (!/^image\/(jpeg|png|webp)$/.test(v.photo.type)) e.photo = "Bitte laden Sie ein Foto als JPG, PNG oder WebP hoch.";
    else if (v.photo.size > MAX_PHOTO_MB * 1024 * 1024) e.photo = `Das Foto ist größer als ${MAX_PHOTO_MB} MB.`;
  }
  return e;
}

export function createWhatsAppMessage(v: RepairValues): string {
  const lines: string[] = [
    `Hallo Herr Hannachi,`,
    `ich möchte eine Reparaturanfrage stellen:`,
    ``,
    `*Gerät:* ${v.device}`,
    `*Marke:* ${v.brand.trim()}`,
  ];

  if (v.model.trim()) {
    lines.push(`*Modell:* ${v.model.trim()}`);
  }

  lines.push(
    `*Problem:* ${v.problem.trim()}`,
    ``,
    `*Kontaktdaten:*`,
    `• Name: ${v.name.trim()}`,
    `• PLZ / Ort: ${v.zip.trim()}`,
    `• Telefon: ${v.phone.trim()}`
  );

  if (v.email.trim()) {
    lines.push(`• E-Mail: ${v.email.trim()}`);
  }

  if (v.photo) {
    lines.push(``, `📷 (Ich hänge ein Foto des Geräts / Typenschilds im Chat an)`);
  }

  return lines.join("\n");
}

export function buildWhatsAppUrl(v: RepairValues, phone = "491703493494"): string {
  const text = createWhatsAppMessage(v);
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export type SubmitResult = { delivered: boolean; whatsappUrl: string; messageText: string };

export async function submitRepairRequest(v: RepairValues): Promise<SubmitResult> {
  const whatsappUrl = buildWhatsAppUrl(v);
  const messageText = createWhatsAppMessage(v);

  // Optional backend endpoint if configured
  const url = process.env.NEXT_PUBLIC_REPAIR_REQUEST_URL;
  if (url) {
    try {
      const body = new FormData();
      Object.entries(v).forEach(([k, val]) => { if (val) body.append(k, val as string | Blob); });
      await fetch(url, { method: "POST", body });
    } catch {
      // Backend error shouldn't block WhatsApp handoff
    }
  }

  return { delivered: true, whatsappUrl, messageText };
}
