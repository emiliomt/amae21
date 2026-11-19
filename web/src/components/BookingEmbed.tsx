"use client";
import { useEffect, useState } from "react";
import { site, type Locale } from "@/config/site";
import { getDict } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { withUtm } from "./Analytics";

// ESPACIO PARA CLOUDBEDS: con site.demo = false se embebe el motor real.
// Conversión de "reserva completada": el motor vive en otro dominio, así que la confirmará la
// integración de analítica propia de Cloudbeds (Plausible/GA4) o una URL de agradecimiento.
export default function BookingEmbed({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const [url, setUrl] = useState<string>(site.cloudbedsUrl);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setUrl(withUtm(site.cloudbedsUrl)), []);

  if (site.demo) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-accent/50 bg-sand-50 p-8 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">DEMO</p>
        <p className="mt-3 font-serif text-2xl">Aquí se embebe el motor de reservas de Cloudbeds</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-charcoal-soft">Fechas, huéspedes, cuartos y pago seguro se manejan 100% dentro de Cloudbeds. En el sitio final este recuadro es el motor real.</p>
        <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-3 text-left text-sm">
          {["Llegada", "Salida", "Huéspedes", "Código (lo crea el operador)"].map((l) => (
            <div key={l} className="rounded-lg border border-sand-300 bg-white px-3 py-2 text-charcoal-soft">{l}</div>
          ))}
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn mt-6" onClick={() => track("Reservar Cloudbeds abierto")}>{d.book.openNew}</a>
      </div>
    );
  }
  return (
    <div>
      {!loaded && <p className="py-6 text-center text-sm text-charcoal-soft">{d.book.loading}</p>}
      <iframe src={url} title="Cloudbeds" onLoad={() => { setLoaded(true); track("Motor cargado"); }}
        className="h-[1100px] w-full rounded-2xl border border-sand-200 bg-white" allow="payment" />
      <p className="mt-3 text-center text-sm"><a className="underline" href={url} target="_blank" rel="noopener noreferrer">{d.book.openNew}</a></p>
    </div>
  );
}
