"use client";
import { useEffect } from "react";
import Script from "next/script";
import { site } from "@/config/site";

const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

// Guarda UTMs de la primera visita para pasarlas al motor de reservas.
export function UtmCapture() {
  useEffect(() => {
    try {
      const q = new URLSearchParams(location.search);
      const found = UTM.filter((k) => q.get(k));
      if (found.length) sessionStorage.setItem("utm", JSON.stringify(Object.fromEntries(found.map((k) => [k, q.get(k)]))));
    } catch {}
  }, []);
  return null;
}

export function withUtm(url: string): string {
  try {
    const u = new URL(url);
    const saved = JSON.parse(sessionStorage.getItem("utm") ?? "{}");
    Object.entries(saved).forEach(([k, v]) => u.searchParams.set(k, String(v)));
    return u.toString();
  } catch { return url; }
}

export default function Analytics() {
  if (!site.plausibleDomain) return null; // espacio listo: poner NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  return (
    <>
      <Script defer data-domain={site.plausibleDomain} src="https://plausible.io/js/script.tagged-events.outbound-links.js" strategy="afterInteractive" />
      <UtmCapture />
    </>
  );
}
