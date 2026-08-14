import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { HashScrollRestorer } from "@/components/layout/HashScrollRestorer";
import { Header } from "@/components/layout/Header";
import { HtmlLang } from "@/components/layout/HtmlLang";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { getDictionary } from "@/data/dictionary";
import { LOCALES, resolveLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);

  return (
    <>
      <HtmlLang lang={locale} />
      <ScrollProgress />
      <HashScrollRestorer />
      <Header lang={locale} copy={dict.header} />
      <div className="flex flex-1 flex-col pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-0">
        <main className="flex-1">{children}</main>
        <Footer lang={locale} copy={dict.footer} />
      </div>
      <MobileStickyCta
        lang={locale}
        phone={dict.header.phone}
        copy={dict.stickyCta}
      />
      <ScrollToTop label={dict.a11y.scrollToTop} />
    </>
  );
}
