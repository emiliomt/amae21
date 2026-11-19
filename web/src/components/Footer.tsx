import Link from "next/link";
import { site, type Locale } from "@/config/site";
import { getDict, path } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <footer className="mt-20 border-t border-sand-200 bg-sand-100 pb-24 pt-10 md:pb-10">
      <div className="container-x grid gap-6 text-sm md:grid-cols-3">
        <div>
          <p className="font-serif text-lg">{site.name}</p>
          <address className="mt-2 not-italic text-charcoal-soft">{site.address.street}, {site.address.colony}<br />{site.address.city}, {site.address.region}</address>
        </div>
        <div className="text-charcoal-soft">
          <p>{site.phone}</p><p>{site.email}</p><p className="mt-2">{d.footer.directNote}</p>
        </div>
        <div className="flex flex-col gap-1">
          <Link href={path(locale, "/privacidad")} className="hover:text-accent">{d.nav.privacy}</Link>
          <Link href={path(locale, "/faq")} className="hover:text-accent">{d.nav.faq}</Link>
        </div>
      </div>
      <p className="container-x mt-8 text-xs text-charcoal-soft">© {new Date().getFullYear()} {site.name}. {d.footer.rights}</p>
    </footer>
  );
}
