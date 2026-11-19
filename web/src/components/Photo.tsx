// Placeholder de foto. Reemplazar por <img> con fotos propias de AMAE21 (nunca de OTAs).
export default function Photo({ label = "FOTO AMAE21", className = "", tone = 0, corner = false }: { label?: string; className?: string; tone?: number; corner?: boolean }) {
  const tones = ["from-sand-200 to-sand-300", "from-sand-100 to-sand-200", "from-sand-300 to-sand-500/60"];
  return (
    <div role="img" aria-label={label}
      className={`relative flex ${corner ? "items-start justify-end p-4" : "items-center justify-center"} bg-gradient-to-br ${tones[tone % 3]} text-charcoal-soft ${className}`}>
      <span className="rounded-full border border-charcoal/30 bg-paper/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}
