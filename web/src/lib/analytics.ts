// Eventos de Plausible (si está configurado). Seguro de llamar siempre.
export function track(event: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const p = (window as unknown as { plausible?: (e: string, o?: { props: Record<string, string> }) => void }).plausible;
  p?.(event, props ? { props } : undefined);
}
