import Link from "next/link";
import type { Locale } from "@/config/site";
import { getDict, path } from "@/lib/i18n";
import Photo from "./Photo";
import ReserveButton from "./ReserveButton";
import rooms from "@/content/rooms.json";

export type Room = (typeof rooms.rooms)[number];

export default function RoomCard({ room, locale, full = false }: { room: Room; locale: Locale; full?: boolean }) {
  const d = getDict(locale);
  return (
    <article id={room.id} className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
      {full ? (
        <div className="grid grid-cols-3 gap-1">
          <Photo className="col-span-3 aspect-[16/9]" tone={0} />
          {Array.from({ length: room.photos - 1 }).map((_, i) => <Photo key={i} className="col-span-1 aspect-[4/3] md:col-span-1" tone={i + 1} />)}
        </div>
      ) : <Photo className="aspect-[4/3]" tone={1} />}
      <div className="p-5">
        <h3 className="text-2xl">{room.name[locale]}</h3>
        <p className="mt-1 text-sm text-charcoal-soft">{d.rooms.guests.replace("{n}", String(room.guests))} · {room.bed[locale]}</p>
        {full && (
          <>
            <p className="mt-3">{room.description[locale]}</p>
            <h4 className="mt-4 text-sm font-medium uppercase tracking-widest text-charcoal-soft">{d.rooms.amenities}</h4>
            <ul className="mt-2 flex flex-wrap gap-2 text-sm">{room.amenities[locale].map((a) => <li key={a} className="rounded-full bg-sand-100 px-3 py-1">{a}</li>)}</ul>
          </>
        )}
        <div className="mt-5">
          {full ? <ReserveButton href={path(locale, "/reservar")} label={d.rooms.book} where={`cuarto-${room.id}`} />
            : <Link href={path(locale, `/cuartos#${room.id}`)} className="text-sm text-accent underline">{d.rooms.book} →</Link>}
        </div>
      </div>
    </article>
  );
}
