import type { Locale } from "@/config/site";
import { getDict } from "@/lib/i18n";
import Header from "@/components/Header";
import RoomCard from "@/components/RoomCard";
import rooms from "@/content/rooms.json";

export default async function Rooms({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale as Locale;
  const d = getDict(l);
  return (
    <>
      <Header locale={l} current="/cuartos" />
      <main className="container-x mt-10">
        <h1 className="text-4xl sm:text-5xl">{d.rooms.title}</h1>
        <p className="mt-2 text-charcoal-soft">{d.rooms.intro}</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {rooms.rooms.map((r) => <RoomCard key={r.id} room={r} locale={l} full />)}
        </div>
      </main>
    </>
  );
}
