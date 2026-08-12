import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const LOCALES = ["en", "uk"] as const;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <>
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </>
  );
}
