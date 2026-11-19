import { site, type Locale } from "@/config/site";
import { getDict } from "@/lib/i18n";
import Header from "@/components/Header";

export default async function Location({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale as Locale;
  const d = getDict(l);
  const { lat, lng } = site.geo;
  const d2 = 0.004;
  const osm = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d2},${lat - d2},${lng + d2},${lat + d2}&layer=mapnik&marker=${lat},${lng}`;
  return (
    <>
      <Header locale={l} current="/ubicacion" />
      <main className="container-x mt-10">
        <h1 className="text-[2rem] sm:text-[3rem]">{d.location.title}</h1>
        <p className="mt-2 text-dusk-soft">{d.location.intro}</p>
        <iframe title={d.location.mapTitle} src={osm} loading="lazy" className="mt-8 h-80 w-full border border-concreto [filter:grayscale(1)_contrast(1.05)]" />
        <a className="btn-line mt-5" href={`https://www.google.com/maps?q=${lat},${lng}`} target="_blank" rel="noopener noreferrer">{d.location.openMap}</a>
        <h2 className="mt-14 h-sec">{d.location.nearbyTitle}</h2>
        <div className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {d.location.nearby.map((n) => <div key={n.t} className="bullet"><h3 className="text-lg">{n.t}</h3><p className="mt-1 text-dusk-soft">{n.d}</p></div>)}
        </div>
        <h2 className="mt-14 h-sec">{d.location.gettingThereTitle}</h2>
        <p className="mt-3 max-w-2xl text-dusk-soft">{d.location.gettingThere}</p>
      </main>
    </>
  );
}
