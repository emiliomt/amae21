// 21 ventanas = 21 cuartos. Orden de encendido fijo y "al azar" (sin JS ni hidratación).
const ORDER = [13, 4, 18, 0, 9, 20, 6, 15, 2, 11, 17, 7, 1, 19, 10, 5, 14, 3, 16, 8, 12];

export default function Facade({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="w-full">
      <div className="grid grid-cols-7 gap-2 border border-concreto/25 bg-dusk-wall p-3 sm:gap-3 sm:p-5">
        {ORDER.map((d, i) => <div key={i} className="fachada-win" style={{ ["--d" as string]: d }} />)}
      </div>
      <div className="h-1 bg-concreto" />
    </div>
  );
}
