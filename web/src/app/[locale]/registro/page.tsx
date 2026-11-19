import type { Locale } from "@/config/site";
import { getDict } from "@/lib/i18n";
import Header from "@/components/Header";
import RegisterForm from "@/components/RegisterForm";

export default async function Register({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale as Locale;
  const d = getDict(l).register;
  return (
    <>
      <Header locale={l} current="/registro" />
      <main className="container-x mt-10 max-w-lg">
        <h1 className="text-[2rem] sm:text-[2.5rem]">{d.title}</h1>
        <p className="mt-2 text-dusk-soft">{d.intro}</p>
        <div className="mt-6"><RegisterForm locale={l} /></div>
      </main>
    </>
  );
}
