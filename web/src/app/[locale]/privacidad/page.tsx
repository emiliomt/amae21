import type { Locale } from "@/config/site";
import { getDict } from "@/lib/i18n";
import Header from "@/components/Header";

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale as Locale;
  const d = getDict(l).privacy;
  return (
    <>
      <Header locale={l} current="/privacidad" />
      <main className="container-x mt-10 max-w-3xl">
        <h1 className="text-[2rem] sm:text-[3rem]">{d.title}</h1>
        <p className="mt-4 border-l-4 border-luz bg-bruma p-3 font-display text-sm font-medium">{d.banner}</p>
        {d.sections.map((s) => <section key={s.t} className="mt-6"><h2 className="text-xl">{s.t}</h2><p className="mt-2 max-w-[65ch] text-dusk-soft">{s.p}</p></section>)}
      </main>
    </>
  );
}
