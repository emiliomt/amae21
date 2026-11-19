import Link from "next/link";
import { type Locale } from "@/config/site";
import { getDict, otherLocale, path } from "@/lib/i18n";
import ReserveButton from "./ReserveButton";

export default function Header({ locale, current }: { locale: Locale; current: string }) {
  const d = getDict(locale);
  const links = [["", d.nav.home], ["/cuartos", d.nav.rooms], ["/ubicacion", d.nav.location], ["/faq", d.nav.faq]] as const;
  const other = otherLocale(locale);
  const nav = (p: string) => `border-b-2 pb-0.5 font-display text-sm font-medium ${current === p ? "border-luz" : "border-transparent hover:border-dusk/40"}`;
  return (
    <header className="sticky top-0 z-40 border-b border-concreto bg-yeso/95 backdrop-blur">
      <div className="container-x flex h-[4.25rem] items-center justify-between gap-3">
        <Link href={path(locale)} aria-label="AMAE21 Lofts">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-horizontal.webp" width={520} height={264} alt="AMAE21 Lofts" className="h-12 w-auto" />
        </Link>
        <nav aria-label="principal" className="hidden gap-7 md:flex">
          {links.map(([p, label]) => <Link key={p} href={path(locale, p)} className={nav(p)}>{label}</Link>)}
        </nav>
        <div className="flex items-center gap-4">
          <Link href={path(other, current)} hrefLang={other} lang={other} className="font-display text-sm font-medium underline-offset-4 hover:underline">{other === "en" ? "English" : "Español"}</Link>
          <ReserveButton href={path(locale, "/reservar")} label={d.cta} where="header" className="btn !px-4 !py-2.5" />
        </div>
      </div>
      <nav aria-label="móvil" className="container-x flex gap-6 overflow-x-auto pb-2 md:hidden">
        {links.map(([p, label]) => <Link key={p} href={path(locale, p)} className={`whitespace-nowrap ${nav(p)}`}>{label}</Link>)}
      </nav>
    </header>
  );
}
