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
        <h1 className="text-[2rem] sm:text-[3rem]">{d.book.title}</h1>
        <p className="mt-2 max-w-2xl text-dusk-soft">{d.book.intro}</p>
        <p className="mt-5 inline-block bg-luz px-4 py-2 font-display text-sm"><strong>{d.book.benefit}:</strong> {d.benefitBanner.replace(/^[^:]+:\s*/, "")}</p>
        <div className="mt-8"><BookingEmbed locale={l} /></div>
        <p className="mt-4 text-center text-sm text-dusk-soft">{d.book.secure}</p>
      </main>
    </>
  );
}
