import Link from "next/link";
import type { Locale } from "@/config/site";
import { getDict, path } from "@/lib/i18n";
import Header from "@/components/Header";
import Facade from "@/components/Facade";
import Photo from "@/components/Photo";
import { RoomRow } from "@/components/RoomCard";
import ReserveButton from "@/components/ReserveButton";
import rooms from "@/content/rooms.json";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale as Locale;
  const d = getDict(l);
  return (
    <>
      <Header locale={l} current="" />
      <main>
        <section className="on-dark bg-dusk-deep text-yeso">
          <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
            <div>
              <h1 className="text-[clamp(2rem,7vw,3.5rem)]">{d.home.title}</h1>
              <p className="mt-5 max-w-[42ch] text-lg text-concreto">{d.home.subtitle}</p>
              <div className="mt-8"><ReserveButton href={path(l, "/reservar")} label={d.cta} where="hero" /></div>
            </div>
            <Facade label={l === "es" ? "Fachada con 21 ventanas, una por cuarto" : "Facade with 21 windows, one per room"} />
          </div>
        </section>
        <Photo className="aspect-[4/3] w-full sm:aspect-[21/9]" tone={0} />

        <section className="container-x mt-20">
          <h2 className="h-sec">{d.home.highlightsTitle}</h2>
          <dl className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {d.home.highlights.map((h) => (
              <div key={h.t} className="bullet"><dt className="font-display text-lg font-semibold">{h.t}</dt><dd className="mt-1 max-w-[46ch] text-dusk-soft">{h.d}</dd></div>
            ))}
          </dl>
        </section>

        <section className="container-x mt-20">
          <div className="flex items-baseline justify-between gap-4"><h2 className="h-sec">{d.home.roomsTitle}</h2>
            <Link href={path(l, "/cuartos")} className="link">{d.home.roomsCta}</Link></div>
          <ul className="mt-6 border-b border-concreto">{rooms.rooms.map((r) => <RoomRow key={r.id} room={r} locale={l} />)}</ul>
        </section>

        <section className="container-x mt-20">
          <h2 className="h-sec">{d.home.reviewsTitle}</h2>
          <p className="mt-1 text-sm text-dusk-soft">{d.home.reviewsNote}</p>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {d.home.reviews.map((r, i) => <blockquote key={i}><p className="font-body text-2xl italic leading-snug">“{r.q}”</p><footer className="mt-3 font-display text-sm text-dusk-soft">{r.a}</footer></blockquote>)}
          </div>
        </section>

        <section className="on-dark mt-24 bg-dusk py-16 text-yeso">
          <div className="container-x">
            <h2 className="max-w-[20ch] text-[1.75rem] sm:text-[2.5rem]">{d.home.finalTitle}</h2>
            <p className="mt-4 max-w-[46ch] text-concreto">{d.home.finalText}</p>
            <div className="mt-8"><ReserveButton href={path(l, "/reservar")} label={d.cta} where="cta-final" /></div>
          </div>
        </section>
      </main>
    </>
  );
}
