import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, site, type Locale } from "@/config/site";
import { getDict, isLocale } from "@/lib/i18n";
import Analytics from "@/components/Analytics";
import FloatingUi from "@/components/FloatingUi";
import Footer from "@/components/Footer";
import HotelSchema from "@/components/HotelSchema";
import BenefitBanner from "@/components/BenefitBanner";
import Header from "@/components/Header";

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return {
    metadataBase: new URL(site.url),
    title: d.meta.title, description: d.meta.description,
    alternates: { languages: { es: "/es/", en: "/en/" } },
    openGraph: { images: [{ url: "/img/og.jpg", width: 1200, height: 630 }], title: d.meta.title, description: d.meta.description, type: "website", locale: locale === "es" ? "es_MX" : "en_US", siteName: site.name },
    robots: site.indexable ? undefined : { index: false, follow: false },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang="${l}"` }} />
      <BenefitBanner locale={l} />
      {/* El resaltado del menú se resuelve por ruta en cada página */}
      {children}
      <Footer locale={l} />
      <FloatingUi locale={l} />
      <HotelSchema locale={l} />
      <Analytics />
    </>
  );
}
