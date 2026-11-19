import { getDict } from "@/lib/i18n";
import type { Locale } from "@/config/site";
export default function BenefitBanner({ locale }: { locale: Locale }) {
  return <div className="bg-luz px-5 py-2 text-center font-display text-sm font-semibold text-dusk-deep">{getDict(locale).benefitBanner}</div>;
}
