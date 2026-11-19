import { getDict } from "@/lib/i18n";
import type { Locale } from "@/config/site";
export default function BenefitBanner({ locale }: { locale: Locale }) {
  return <div className="bg-charcoal px-4 py-2 text-center text-sm text-sand-100">{getDict(locale).benefitBanner}</div>;
}
