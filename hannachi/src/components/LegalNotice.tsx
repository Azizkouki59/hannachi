import { AlertTriangle } from "lucide-react";

export default function LegalNotice({ children }: { children: React.ReactNode }) {
  return (
    <div role="note" className="my-6 flex gap-3 border-l-4 border-amber bg-amber/10 p-4 text-[15px] text-navy">
      <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-deep" aria-hidden />
      <div>{children}</div>
    </div>
  );
}
