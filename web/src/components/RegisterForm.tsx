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
    <div role="status" className="bg-bruma p-6">
      <p className="font-display text-xl font-semibold">{d.ok}</p>
      {site.demo && <p className="mt-2 text-sm text-dusk-soft">Demo: no se guardó ningún dato</p>}
    </div>
  );
  const field = "mt-1 w-full rounded-[2px] border border-dusk/40 bg-bruma px-3 py-3 text-base focus:border-dusk";
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="block font-display text-sm font-medium">{d.name}<input name="nombre" autoComplete="name" className={field} />{errors.nombre && <span role="alert" className="text-error">{errors.nombre}</span>}</label>
      <label className="block font-display text-sm font-medium">{d.whatsapp}<input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" className={field} />{errors.whatsapp && <span role="alert" className="text-error">{errors.whatsapp}</span>}</label>
      <label className="block font-display text-sm font-medium">{d.email}<input name="correo" type="email" autoComplete="email" className={field} />{errors.correo && <span role="alert" className="text-error">{errors.correo}</span>}</label>
      <label className="flex items-start gap-3 text-[0.95rem]">
        <input type="checkbox" name="consent" className="mt-1 h-5 w-5 accent-[#1E2B3A]" />
        <span>{d.consent} <Link href={path(locale, "/privacidad")} className="underline" target="_blank">{d.privacyLink}</Link>.</span>
      </label>
      {errors.consent && <p role="alert" className="text-sm text-error">{errors.consent}</p>}
      <button className="btn w-full" disabled={state === "sending"}>{state === "sending" ? d.sending : d.submit}</button>
      {state === "error" && <p role="alert" className="text-sm text-error">{d.error}</p>}
      {state === "unconfigured" && <p role="alert" className="text-sm text-error">{d.notConfigured}</p>}
    </form>
  );
}
