import Link from "next/link";
import { site, type Locale } from "@/config/site";
import { getDict, otherLocale, path } from "@/lib/i18n";
import ReserveButton from "./ReserveButton";

export default function Header({ locale, current }: { locale: Locale; current: string }) {
  const d = getDict(locale);
  const links = [["", d.nav.home], ["/cuartos", d.nav.rooms], ["/ubicacion", d.nav.location], ["/faq", d.nav.faq]] as const;
  const other = otherLocale(locale);
  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-paper/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <Link href={path(locale)} className="font-serif text-xl tracking-tight">{site.name}</Link>
        <nav aria-label="principal" className="hidden gap-6 text-sm md:flex">
          {links.map(([p, label]) => (
            <Link key={p} href={path(locale, p)} className={current === p ? "text-accent" : "hover:text-accent"}>{label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href={path(other, current)} hrefLang={other} className="text-xs font-medium uppercase tracking-widest text-charcoal-soft hover:text-accent">{other}</Link>
          <ReserveButton href={path(locale, "/reservar")} label={d.cta} where="header" className="btn !px-4 !py-2" />
        </div>
      </div>
      <nav aria-label="móvil" className="container-x flex gap-5 overflow-x-auto pb-2 text-sm md:hidden">
        {links.map(([p, label]) => (
          <Link key={p} href={path(locale, p)} className={`whitespace-nowrap ${current === p ? "text-accent" : "text-charcoal-soft"}`}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}
