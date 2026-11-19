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
      <div className="border-2 border-dashed border-dusk/50 bg-bruma p-8 sm:p-12">
        <p className="inline-block bg-dusk px-2 py-0.5 font-display text-sm font-semibold text-yeso">Demo</p>
        <p className="mt-4 max-w-[22ch] font-display text-2xl font-semibold" style={{ fontStretch: "125%" }}>Aquí va el motor de reservas de Cloudbeds</p>
        <p className="mt-3 max-w-[52ch] text-dusk-soft">Fechas, huéspedes, cuartos y pago seguro se manejan dentro de Cloudbeds. En el sitio final este recuadro es el motor real.</p>
        <div className="mt-8 grid max-w-lg grid-cols-2 gap-3 font-display text-sm text-dusk-soft">
          {["Llegada", "Salida", "Huéspedes", "Código (lo crea el operador)"].map((l) => <div key={l} className="border border-concreto bg-yeso px-3 py-3">{l}</div>)}
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn mt-8" onClick={() => track("Reservar Cloudbeds abierto")}>{d.book.openNew}</a>
      </div>
    );
  }
  return (
    <div>
      {!loaded && <p className="py-6 text-center text-sm text-dusk-soft">{d.book.loading}</p>}
      <iframe src={url} title="Cloudbeds" onLoad={() => { setLoaded(true); track("Motor cargado"); }} className="h-[1100px] w-full border border-concreto bg-white" allow="payment" />
      <p className="mt-3 text-center"><a className="link" href={url} target="_blank" rel="noopener noreferrer">{d.book.openNew}</a></p>
    </div>
  );
}
