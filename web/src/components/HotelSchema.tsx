import { site, type Locale } from "@/config/site";
import { getDict } from "@/lib/i18n";

export default function HotelSchema({ locale }: { locale: Locale }) {
  const a = site.address;
  const json = {
    "@context": "https://schema.org", "@type": "Hotel", name: site.name, url: `${site.url}/${locale}/`,
    description: getDict(locale).hotelSchemaDescription, numberOfRooms: site.rooms,
    telephone: site.phone, email: site.email, priceRange: "$$",
    address: { "@type": "PostalAddress", streetAddress: a.street, addressLocality: a.city, addressRegion: a.region, postalCode: a.postalCode, addressCountry: a.country },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    amenityFeature: ["Elevator", "Contactless check-in", "Terrace", "Free WiFi"].map((n) => ({ "@type": "LocationFeatureSpecification", name: n, value: true })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
