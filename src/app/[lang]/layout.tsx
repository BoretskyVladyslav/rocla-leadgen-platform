import { Footer } from "@/components/layout/Footer";
import { HashScrollRestorer } from "@/components/layout/HashScrollRestorer";
import { Header } from "@/components/layout/Header";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { getDictionary } from "@/data/dictionary";
import { LOCALES } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <ScrollProgress />
      <HashScrollRestorer />
      <Header lang={lang} copy={dict.header} />
      <div className="flex flex-1 flex-col pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-0">
        <main className="flex-1">{children}</main>
        <Footer lang={lang} copy={dict.footer} />
      </div>
      <MobileStickyCta
        lang={lang}
        phone={dict.header.phone}
        copy={dict.stickyCta}
      />
    </>
  );
}
