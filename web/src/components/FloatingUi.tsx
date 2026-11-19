"use client";
import { site, type Locale } from "@/config/site";
import { getDict, path } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import Link from "next/link";

// Botón flotante de WhatsApp + barra fija "Reservar directo" en móvil.
export default function FloatingUi({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(d.whatsapp.message)}`;
  return (
    <>
      <a href={wa} target="_blank" rel="noopener noreferrer" aria-label={d.whatsapp.label}
        onClick={() => track("WhatsApp click")}
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1f8f4e] text-white shadow-lg md:bottom-6">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7a11 11 0 0 1-4.7-4.1 5.3 5.3 0 0 1-1.1-2.8c0-1.3.7-1.9.9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6a7 7 0 0 0 3.2 2.8c.3.1.5.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4Z"/></svg>
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand-200 bg-paper/95 p-3 backdrop-blur md:hidden">
        <Link href={path(locale, "/reservar")} onClick={() => track("Reservar click", { lugar: "barra-movil" })} className="btn w-full">{d.cta}</Link>
      </div>
    </>
  );
}
