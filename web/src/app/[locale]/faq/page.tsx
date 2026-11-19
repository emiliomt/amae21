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
        <h1 className="text-[2rem] sm:text-[3rem]">{d.faq.title}</h1>
        <p className="mt-3 text-sm text-dusk-soft">{d.faq.note}</p>
        <div className="mt-6 divide-y divide-concreto border-y border-concreto">
          {d.faq.items.map((i) => (
            <details key={i.q} className="group py-4"><summary className="cursor-pointer font-display text-lg font-semibold">{i.q}</summary><p className="mt-3 max-w-[60ch] text-dusk-soft">{i.a}</p></details>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </main>
    </>
  );
}
