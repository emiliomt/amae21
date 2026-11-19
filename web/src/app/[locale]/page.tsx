import Link from "next/link";
import type { Locale } from "@/config/site";
import { getDict, path } from "@/lib/i18n";
import Header from "@/components/Header";
import Photo from "@/components/Photo";
import RoomCard from "@/components/RoomCard";
import ReserveButton from "@/components/ReserveButton";
import rooms from "@/content/rooms.json";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale as Locale;
  const d = getDict(l);
  return (
    <>
      <Header locale={l} current="" />
      <main>
        <section className="relative">
          <Photo className="h-[70vh] min-h-[420px] w-full" tone={0} corner />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent">
            <div className="container-x pb-10 text-white">
              <p className="text-xs uppercase tracking-[0.25em]">{d.home.eyebrow}</p>
              <h1 className="mt-3 max-w-2xl text-4xl leading-tight sm:text-6xl">{d.home.title}</h1>
              <p className="mt-3 max-w-xl text-white/90">{d.home.subtitle}</p>
              <div className="mt-6"><ReserveButton href={path(l, "/reservar")} label={d.cta} where="hero" /></div>
            </div>
          </div>
        </section>

        <section className="container-x mt-16">
          <h2 className="text-3xl">{d.home.highlightsTitle}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.home.highlights.map((h) => (
              <div key={h.t} className="rounded-2xl bg-sand-100 p-5"><h3 className="text-xl">{h.t}</h3><p className="mt-2 text-sm text-charcoal-soft">{h.d}</p></div>
            ))}
          </div>
        </section>

        <section className="container-x mt-16">
          <div className="flex items-end justify-between"><h2 className="text-3xl">{d.home.roomsTitle}</h2>
            <Link href={path(l, "/cuartos")} className="text-sm text-accent underline">{d.home.roomsCta}</Link></div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.rooms.map((r) => <RoomCard key={r.id} room={r} locale={l} />)}
          </div>
        </section>

        <section className="container-x mt-16">
          <h2 className="text-3xl">{d.home.reviewsTitle}</h2>
          <p className="mt-1 text-xs uppercase tracking-widest text-accent">{d.home.reviewsNote}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {d.home.reviews.map((r, i) => <blockquote key={i} className="rounded-2xl border border-sand-200 p-6"><p className="font-serif text-xl">“{r.q}”</p><footer className="mt-3 text-sm text-charcoal-soft">{r.a}</footer></blockquote>)}
          </div>
        </section>

        <section className="container-x mt-16">
          <div className="rounded-3xl bg-charcoal p-10 text-center text-sand-100">
            <h2 className="text-3xl sm:text-4xl">{d.home.finalTitle}</h2>
            <p className="mx-auto mt-3 max-w-lg text-sand-200">{d.home.finalText}</p>
            <div className="mt-6"><ReserveButton href={path(l, "/reservar")} label={d.cta} where="cta-final" /></div>
          </div>
        </section>
      </main>
    </>
  );
}
