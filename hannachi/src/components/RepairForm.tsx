"use client";
import { useId, useRef, useState } from "react";
import { AlertCircle, Check, Copy, ImagePlus, Loader2, MessageCircle, Phone, X } from "lucide-react";
import { business } from "@/data/site";
import {
  deviceTypes,
  emptyValues,
  submitRepairRequest,
  validate,
  type RepairErrors,
  type RepairValues,
} from "@/lib/repairRequest";

type Status = "idle" | "loading" | "success" | "error";

export default function RepairForm({ defaultDevice = "" }: { defaultDevice?: string }) {
  const uid = useId();
  const [values, setValues] = useState<RepairValues>({ ...emptyValues, device: defaultDevice });
  const [errors, setErrors] = useState<RepairErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [messageText, setMessageText] = useState("");
  const [copied, setCopied] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const id = (k: string) => `${uid}-${k}`;
  const set = <K extends keyof RepairValues>(k: K, val: RepairValues[K]) => {
    const next = { ...values, [k]: val };
    setValues(next);
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }));
  };
  const blur = (k: keyof RepairValues) => setErrors((prev) => ({ ...prev, [k]: validate(values)[k] }));

  function onPhoto(file: File | null) {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file && file.type.startsWith("image/") ? URL.createObjectURL(file) : null);
    const next = { ...values, photo: file };
    setValues(next);
    setErrors((prev) => ({ ...prev, photo: validate(next).photo }));
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstKey}"]`)?.focus();
      return;
    }
    setStatus("loading");
    try {
      const res = await submitRepairRequest(values);
      setWhatsappUrl(res.whatsappUrl);
      setMessageText(res.messageText);
      setStatus("success");
      // Open WhatsApp automatically
      if (typeof window !== "undefined") {
        window.open(res.whatsappUrl, "_blank", "noopener,noreferrer");
      }
    } catch {
      setStatus("error");
    }
  }

  function copyMessage() {
    if (!messageText) return;
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function reset() {
    onPhoto(null);
    setValues({ ...emptyValues, device: defaultDevice });
    setErrors({});
    setStatus("idle");
    setWhatsappUrl("");
    setMessageText("");
  }

  if (status === "success") {
    return (
      <div role="status" className="card p-8 sm:p-10 border-emerald-500/30">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 shadow-sm">
          <MessageCircle size={32} />
        </div>

        <h3 className="mt-6 text-2xl font-extrabold text-primary sm:text-3xl">
          Ihre Nachricht ist bereit!
        </h3>
        <p className="mt-3 text-base leading-relaxed text-ink-muted">
          WhatsApp hat sich mit Ihrer vorbereiteten Nachricht geöffnet. Sie müssen in WhatsApp nur noch auf <strong className="text-primary font-bold">„Senden“</strong> tippen.
        </p>

        {values.photo && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-[14px] text-amber-900">
            <span className="text-lg">📷</span>
            <div>
              <p className="font-semibold">Foto direkt im Chat mitsenden</p>
              <p className="mt-0.5 text-amber-800">
                Sie haben ein Foto ausgewählt ({values.photo.name}). Hängen Sie dieses bitte einfach im WhatsApp-Chat an.
              </p>
            </div>
          </div>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white shadow-sm hover:shadow-[0_4px_16px_rgba(16,185,129,.35)] hover:-translate-y-px"
          >
            <MessageCircle size={18} /> In WhatsApp öffnen & senden
          </a>
          <button
            type="button"
            onClick={copyMessage}
            className="btn-ghost"
            title="Nachrichtentext kopieren"
          >
            {copied ? (
              <>
                <Check size={18} className="text-emerald-600" /> Kopiert!
              </>
            ) : (
              <>
                <Copy size={18} /> Text kopieren
              </>
            )}
          </button>
          <a href={business.phoneHref} className="btn-ghost">
            <Phone size={18} /> {business.phoneDisplay}
          </a>
          <button type="button" onClick={reset} className="btn-ghost">
            Neue Anfrage
          </button>
        </div>

        {/* Message preview */}
        <div className="mt-8 rounded-xl border border-primary/10 bg-surface p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-primary/8">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Vorbereiteter Nachrichtentext
            </span>
          </div>
          <pre className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-primary">
            {messageText}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card p-6 sm:p-10" aria-labelledby={id("title")}>
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
          <MessageCircle size={14} /> Schnelle WhatsApp-Anfrage
        </span>
      </div>
      <h2 id={id("title")} className="text-2xl font-extrabold text-primary sm:text-3xl">
        Reparaturanfrage
      </h2>
      <p className="mt-2 text-ink-muted">
        Geben Sie die Eckdaten Ihres Geräts ein. Die Anfrage wird sofort für WhatsApp vorbereitet, sodass Sie dort nur noch auf <strong>„Senden“</strong> drücken müssen.
      </p>

      <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <Field label="Gerätetyp *" htmlFor={id("device")} error={errors.device}>
          <select
            id={id("device")}
            data-field="device"
            value={values.device}
            onChange={(e) => set("device", e.target.value)}
            onBlur={() => blur("device")}
            className={input(errors.device)}
            aria-invalid={!!errors.device}
            aria-describedby={errors.device ? id("device-err") : undefined}
          >
            <option value="">Bitte wählen</option>
            {deviceTypes.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>
        <Field label="Marke *" htmlFor={id("brand")} error={errors.brand}>
          <input
            id={id("brand")}
            data-field="brand"
            value={values.brand}
            onChange={(e) => set("brand", e.target.value)}
            onBlur={() => blur("brand")}
            className={input(errors.brand)}
            autoComplete="off"
            placeholder="z. B. Miele, Bosch, Siemens"
            aria-invalid={!!errors.brand}
            aria-describedby={errors.brand ? id("brand-err") : undefined}
          />
        </Field>
        <Field
          label="Modell (optional)"
          htmlFor={id("model")}
          className="sm:col-span-2"
          hint="Die Modellnummer steht meist auf dem Typenschild am Gerät."
        >
          <input
            id={id("model")}
            value={values.model}
            onChange={(e) => set("model", e.target.value)}
            className={input()}
            autoComplete="off"
            placeholder="z. B. Serie 6, W1"
          />
        </Field>
        <Field
          label="Beschreibung des Problems *"
          htmlFor={id("problem")}
          error={errors.problem}
          className="sm:col-span-2"
        >
          <textarea
            id={id("problem")}
            data-field="problem"
            rows={4}
            value={values.problem}
            onChange={(e) => set("problem", e.target.value)}
            onBlur={() => blur("problem")}
            className={input(errors.problem)}
            placeholder="Was passiert, und seit wann? z. B. Pumpt nicht ab oder heizt nicht..."
            aria-invalid={!!errors.problem}
            aria-describedby={errors.problem ? id("problem-err") : undefined}
          />
        </Field>

        <div className="sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-primary">
            Foto vom Gerät oder Typenschild (optional)
          </span>
          <input
            ref={fileRef}
            id={id("photo")}
            data-field="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => onPhoto(e.target.files?.[0] ?? null)}
          />
          {preview ? (
            <div className="flex items-center gap-4 rounded-xl border border-primary/15 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Vorschau des ausgewählten Fotos" className="h-16 w-16 rounded-lg object-cover" />
              <p className="min-w-0 flex-1 truncate text-sm">{values.photo?.name}</p>
              <button
                type="button"
                onClick={() => {
                  onPhoto(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-surface"
                aria-label="Foto entfernen"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <label
              htmlFor={id("photo")}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-5 text-[15px] transition-colors hover:border-accent hover:bg-accent/4 ${
                errors.photo ? "border-red-500" : "border-primary/20"
              }`}
            >
              <ImagePlus size={22} className="text-ink-muted" aria-hidden />
              <span className="text-ink-muted">
                Foto auswählen <span className="text-ink-faint">(JPG, PNG, WebP – kann direkt im WhatsApp-Chat mitgesendet werden)</span>
              </span>
            </label>
          )}
          {errors.photo && <ErrorText id={id("photo-err")}>{errors.photo}</ErrorText>}
        </div>

        <Field label="Postleitzahl *" htmlFor={id("zip")} error={errors.zip}>
          <input
            id={id("zip")}
            data-field="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={values.zip}
            onChange={(e) => set("zip", e.target.value.replace(/\D/g, ""))}
            onBlur={() => blur("zip")}
            className={input(errors.zip)}
            placeholder="49082"
            aria-invalid={!!errors.zip}
            aria-describedby={errors.zip ? id("zip-err") : undefined}
          />
        </Field>
        <Field label="Ihr Name *" htmlFor={id("name")} error={errors.name}>
          <input
            id={id("name")}
            data-field="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            className={input(errors.name)}
            placeholder="Vor- und Nachname"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? id("name-err") : undefined}
          />
        </Field>
        <Field label="Telefonnummer *" htmlFor={id("phone")} error={errors.phone}>
          <input
            id={id("phone")}
            data-field="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => blur("phone")}
            className={input(errors.phone)}
            placeholder="0170 1234567"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? id("phone-err") : undefined}
          />
        </Field>
        <Field label="E-Mail (optional)" htmlFor={id("email")} error={errors.email}>
          <input
            id={id("email")}
            data-field="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            className={input(errors.email)}
            placeholder="beispiel@domain.de"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? id("email-err") : undefined}
          />
        </Field>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden />
          Die Anfrage konnte nicht vorbereitet werden. Bitte versuchen Sie es erneut oder rufen Sie uns an: {business.phoneDisplay}.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white min-w-[250px] shadow-sm hover:shadow-[0_4px_16px_rgba(16,185,129,.35)] disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden /> Wird vorbereitet …
            </>
          ) : (
            <>
              <MessageCircle size={18} /> In WhatsApp vorbereiten & senden
            </>
          )}
        </button>
        <p className="text-xs text-ink-muted">
          Öffnet WhatsApp mit Ihrer vorbereiteten Nachricht. Sie müssen dort nur noch auf „Senden“ drücken.
        </p>
      </div>
    </form>
  );
}

const input = (err?: string) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-[16px] text-primary placeholder:text-ink-faint transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 ${
    err ? "border-red-500" : "border-primary/15 hover:border-primary/30"
  }`;

function Field({
  label,
  htmlFor,
  error,
  hint,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-primary">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-ink-muted">{hint}</p>}
      {error && <ErrorText id={`${htmlFor}-err`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-xs text-red-600">
      <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden />
      {children}
    </p>
  );
}