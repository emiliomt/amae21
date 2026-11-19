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
        <h1 className="text-4xl sm:text-5xl">{d.title}</h1>
        <p className="mt-3 rounded-lg bg-sand-100 p-3 text-sm font-medium text-accent">{d.banner}</p>
        {d.sections.map((s) => <section key={s.t} className="mt-6"><h2 className="text-2xl">{s.t}</h2><p className="mt-2 text-charcoal-soft">{s.p}</p></section>)}
      </main>
    </>
  );
}
