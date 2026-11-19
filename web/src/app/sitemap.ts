import type { MetadataRoute } from "next";
import { locales, site } from "@/config/site";
export const dynamic = "force-static";
const pages = ["", "cuartos", "ubicacion", "reservar", "faq", "privacidad"]; // /registro no se indexa
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((l) => pages.map((p) => ({ url: `${site.url}/${l}/${p ? p + "/" : ""}` })));
}
