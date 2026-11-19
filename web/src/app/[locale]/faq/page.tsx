import type { Locale } from "@/config/site";
import { getDict } from "@/lib/i18n";
import Header from "@/components/Header";

export default async function Faq({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale as Locale;
  const d = getDict(l);
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: d.faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) };
  return (
    <>
      <Header locale={l} current="/faq" />
      <main className="container-x mt-10 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl">{d.faq.title}</h1>
        <p className="mt-2 text-xs uppercase tracking-widest text-accent">{d.faq.note}</p>
        <div className="mt-6 divide-y divide-sand-200 border-y border-sand-200">
          {d.faq.items.map((i) => (
            <details key={i.q} className="group py-4"><summary className="cursor-pointer list-none font-serif text-xl">{i.q}</summary><p className="mt-2 text-charcoal-soft">{i.a}</p></details>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </main>
    </>
  );
}
