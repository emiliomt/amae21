"use client";
import { useState } from "react";
import Link from "next/link";
import { site, type Locale } from "@/config/site";
import { getDict, path } from "@/lib/i18n";

// ESPACIO PARA SUPABASE: con site.demo = false guarda en la tabla `consentimientos`
// (la fecha/hora del consentimiento la pone la base de datos). Ver supabase/schema.sql.
export default function RegisterForm({ locale }: { locale: Locale }) {
  const d = getDict(locale).register;
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error" | "unconfigured">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return; // honeypot
    const nombre = String(f.get("nombre") ?? "").trim();
    const whatsapp = String(f.get("whatsapp") ?? "").replace(/[\s()-]/g, "");
    const correo = String(f.get("correo") ?? "").trim();
    const err: Record<string, string> = {};
    if (nombre.length < 2) err.nombre = d.errName;
    if (!/^\+?\d{10,15}$/.test(whatsapp)) err.whatsapp = d.errWa;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) err.correo = d.errEmail;
    if (!f.get("consent")) err.consent = d.errConsent;
    setErrors(err);
    if (Object.keys(err).length) return;

    if (site.demo) { setState("ok"); return; } // demo: no se guarda nada
    if (!site.supabaseUrl || !site.supabaseAnonKey) { setState("unconfigured"); return; }
    setState("sending");
    try {
      const r = await fetch(`${site.supabaseUrl}/rest/v1/consentimientos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: site.supabaseAnonKey, Authorization: `Bearer ${site.supabaseAnonKey}`, Prefer: "return=minimal" },
        body: JSON.stringify({ nombre, whatsapp, correo, idioma: locale, version_aviso: site.consentVersion, consentimiento: true }),
      });
      setState(r.ok ? "ok" : "error");
    } catch { setState("error"); }
  }

  if (state === "ok") return (
    <div role="status" className="rounded-2xl bg-sand-100 p-6 text-center">
      <p className="font-serif text-2xl">{d.ok}</p>
      {site.demo && <p className="mt-2 text-xs uppercase tracking-widest text-accent">DEMO: no se guardó ningún dato</p>}
    </div>
  );
  const field = "mt-1 w-full rounded-lg border border-sand-300 bg-white px-3 py-3 text-base outline-none focus:border-accent";
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="block text-sm">{d.name}<input name="nombre" autoComplete="name" className={field} />{errors.nombre && <span role="alert" className="text-accent">{errors.nombre}</span>}</label>
      <label className="block text-sm">{d.whatsapp}<input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" className={field} />{errors.whatsapp && <span role="alert" className="text-accent">{errors.whatsapp}</span>}</label>
      <label className="block text-sm">{d.email}<input name="correo" type="email" autoComplete="email" className={field} />{errors.correo && <span role="alert" className="text-accent">{errors.correo}</span>}</label>
      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="consent" className="mt-1 h-5 w-5 accent-[#9c4a2f]" />
        <span>{d.consent} <Link href={path(locale, "/privacidad")} className="underline" target="_blank">{d.privacyLink}</Link>.</span>
      </label>
      {errors.consent && <p role="alert" className="text-sm text-accent">{errors.consent}</p>}
      <button className="btn w-full" disabled={state === "sending"}>{state === "sending" ? d.sending : d.submit}</button>
      {state === "error" && <p role="alert" className="text-sm text-accent">{d.error}</p>}
      {state === "unconfigured" && <p role="alert" className="text-sm text-accent">{d.notConfigured}</p>}
    </form>
  );
}
