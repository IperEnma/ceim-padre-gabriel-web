import Link from "next/link";
import { Container } from "@/components/Container";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-zinc-950">{site.name}</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-700">
              {site.description}
            </p>
          </div>
          <div className="grid gap-2 text-sm text-zinc-700">
            <p className="font-semibold text-zinc-950">Contacto</p>
            <p>{site.contact.addressLine1}</p>
            <p>{site.contact.addressLine2}</p>
            <Link className="hover:text-zinc-950" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </Link>
            <Link className="hover:text-zinc-950" href={site.links.whatsapp}>
              {site.contact.whatsappDisplay}
            </Link>
          </div>
          <div className="grid gap-2 text-sm text-zinc-700">
            <p className="font-semibold text-zinc-950">Secciones</p>
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-zinc-950"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-black/5 pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.shortName}. Todos los derechos
            reservados.
          </p>
          <p>Hecho con Next.js</p>
        </div>
      </Container>
    </footer>
  );
}

