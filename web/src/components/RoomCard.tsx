import Link from "next/link";
import type { Locale } from "@/config/site";
import { getDict, path } from "@/lib/i18n";
import Photo from "./Photo";
import ReserveButton from "./ReserveButton";
import rooms from "@/content/rooms.json";

export type Room = (typeof rooms.rooms)[number];

// Fila de directorio (home): el cuarto como un renglón, no una tarjeta.
export function RoomRow({ room, locale }: { room: Room; locale: Locale }) {
  const d = getDict(locale);
  return (
    <li className="grid grid-cols-[96px_1fr] items-center gap-x-5 gap-y-2 border-t border-concreto py-5 sm:grid-cols-[176px_1fr_auto]">
      <Photo className="aspect-[4/3]" tone={1} label="FOTO" />
      <div>
        <h3 className="text-xl sm:text-2xl">{room.name[locale]}</h3>
        <p className="mt-1 text-dusk-soft">{d.rooms.guests.replace("{n}", String(room.guests))}, {room.bed[locale].toLowerCase()}</p>
      </div>
      <Link href={path(locale, `/cuartos#${room.id}`)} className="link col-start-2 sm:col-start-3">{d.rooms.view}</Link>
    </li>
  );
}

// Ficha completa (página Cuartos).
export default function RoomFull({ room, locale }: { room: Room; locale: Locale }) {
  const d = getDict(locale);
  return (
    <article id={room.id} className="grid scroll-mt-32 gap-6 border-t border-concreto py-10 md:grid-cols-2 md:gap-10">
      <div className="grid grid-cols-2 gap-2">
        <Photo className="col-span-2 aspect-[16/10]" tone={0} />
        {Array.from({ length: room.photos - 1 }).map((_, i) => <Photo key={i} className="aspect-[4/3]" tone={i + 1} />)}
      </div>
      <div>
        <h2 className="text-[1.75rem] sm:text-[2.25rem]">{room.name[locale]}</h2>
        <p className="mt-2 font-display text-sm font-medium">{d.rooms.guests.replace("{n}", String(room.guests))}</p>
        <p className="font-display text-sm text-dusk-soft">{room.bed[locale]}</p>
        <p className="mt-4 max-w-[60ch]">{room.description[locale]}</p>
        <h3 className="mt-6 text-base">{d.rooms.amenities}</h3>
        <ul className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">{room.amenities[locale].map((a) => <li key={a} className="bullet">{a}</li>)}</ul>
        <div className="mt-7"><ReserveButton href={path(locale, "/reservar")} label={d.rooms.book} where={`cuarto-${room.id}`} /></div>
      </div>
    </article>
  );
}
