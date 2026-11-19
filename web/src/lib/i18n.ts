import { es } from "@/content/es";
import { en } from "@/content/en";
import { defaultLocale, locales, type Locale } from "@/config/site";

export const dictionaries = { es, en };
export const getDict = (l: Locale) => dictionaries[l];
export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const otherLocale = (l: Locale): Locale => (l === "es" ? "en" : "es");
export const path = (l: Locale, p = "") => `/${l}${p}${p && !p.endsWith("/") ? "/" : p ? "" : "/"}`;
export { defaultLocale };
