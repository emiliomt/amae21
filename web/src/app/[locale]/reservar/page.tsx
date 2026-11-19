import type { Locale } from "@/config/site";
import { getDict } from "@/lib/i18n";
import Header from "@/components/Header";
import BookingEmbed from "@/components/BookingEmbed";

export default async function Book({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale as Locale;
  const d = getDict(l);
  return (
    <>
      <Header locale={l} current="/reservar" />
      <main className="container-x mt-10">
        <h1 className="text-4xl sm:text-5xl">{d.book.title}</h1>
        <p className="mt-2 max-w-2xl text-charcoal-soft">{d.book.intro}</p>
        <p className="mt-4 inline-block rounded-full bg-sand-100 px-4 py-2 text-sm"><strong>{d.book.benefit}:</strong> {d.benefitBanner.replace(/^[^:]+:\s*/, "")}</p>
        <div className="mt-8"><BookingEmbed locale={l} /></div>
        <p className="mt-4 text-center text-xs text-charcoal-soft">{d.book.secure}</p>
      </main>
    </>
  );
}
