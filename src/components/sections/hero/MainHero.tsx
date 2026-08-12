import { Button } from "@/components/ui/Button";

export function MainHero() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-20 sm:px-6 lg:py-28">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Rocla
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Industrial equipment leads, built for conversion
        </h1>
        <p className="max-w-xl text-base text-muted sm:text-lg">
          Modular product pages and capture flows optimized for PageSpeed and
          B2B inquiry quality.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>Browse catalog</Button>
          <Button variant="secondary">Request a quote</Button>
        </div>
      </div>
    </section>
  );
}
