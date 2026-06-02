import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-white/80 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
              <span className="text-sm font-semibold">PG</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-zinc-950">{site.name}</p>
              <p className="text-xs text-zinc-600">{site.contact.hours}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-700 lg:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-zinc-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={site.links.whatsapp}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}

