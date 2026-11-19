import type { Locale } from "@/config/site";
import { getDict } from "@/lib/i18n";
import Header from "@/components/Header";
import RoomFull from "@/components/RoomCard";
import rooms from "@/content/rooms.json";

export default async function Rooms({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale as Locale;
  const d = getDict(l);
  return (
    <>
      <Header locale={l} current="/cuartos" />
      <main className="container-x mt-12">
        <h1 className="text-[2rem] sm:text-[3rem]">{d.rooms.title}</h1>
        <p className="mt-3 max-w-[50ch] text-dusk-soft">{d.rooms.intro}</p>
        <div className="mt-10">{rooms.rooms.map((r, i) => <RoomFull key={r.id} room={r} locale={l} eager={i === 0} />)}</div>
      </main>
    </>
  );
}
