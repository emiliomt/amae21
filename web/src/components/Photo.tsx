// Placeholder de foto. Reemplazar por <img> con fotos propias de AMAE21 (nunca de OTAs).
export default function Photo({ label = "FOTO AMAE21", className = "", tone = 0 }: { label?: string; className?: string; tone?: number }) {
  const tones = ["bg-[#CFCDC6]", "bg-[#C4C2BA]", "bg-[#D8D6CF]"];
  return (
    <div role="img" aria-label={label} className={`relative ${tones[tone % 3]} ${className}`}>
      <span className="absolute bottom-3 left-3 font-display text-xs font-medium text-dusk-soft">{label}</span>
    </div>
  );
}
