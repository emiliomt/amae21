import Link from "next/link";
import { site, type Locale } from "@/config/site";
import { getDict, path } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <footer className="on-dark mt-24 bg-dusk-deep pb-28 pt-12 text-concreto md:pb-12">
      <div className="container-x grid gap-8 text-[0.95rem] md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-yeso" style={{ fontStretch: "125%" }}>AMAE<span className="ml-0.5 bg-luz px-1.5 text-dusk-deep">21</span></p>
          <address className="mt-3 not-italic">{site.address.street}, {site.address.colony}<br />{site.address.city}, {site.address.region}</address>
        </div>
        <div><p>{site.phone}</p><p>{site.email}</p><p className="mt-3">{d.footer.directNote}</p></div>
        <div className="flex flex-col gap-1">
          <Link href={path(locale, "/privacidad")} className="underline underline-offset-4">{d.nav.privacy}</Link>
          <Link href={path(locale, "/faq")} className="underline underline-offset-4">{d.nav.faq}</Link>
        </div>
      </div>
      <p className="container-x mt-10 text-sm">© {new Date().getFullYear()} {site.name}. {d.footer.rights}</p>
    </footer>
  );
}
