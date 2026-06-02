import Link from "next/link";
import { site } from "@/lib/site";

export function ContactCard() {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-zinc-950">Datos de contacto</h3>
      <div className="mt-4 grid gap-3 text-sm text-zinc-700">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Dirección
          </p>
          <p className="mt-1">{site.contact.addressLine1}</p>
          <p>{site.contact.addressLine2}</p>
          <Link
            className="mt-2 inline-flex font-semibold text-emerald-700 hover:text-emerald-600"
            href={site.links.maps}
          >
            Ver en el mapa
          </Link>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Horario
          </p>
          <p className="mt-1">{site.contact.hours}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Email
          </p>
          <Link
            className="mt-1 inline-flex font-semibold text-zinc-950 hover:text-zinc-800"
            href={`mailto:${site.contact.email}`}
          >
            {site.contact.email}
          </Link>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            WhatsApp
          </p>
          <Link
            className="mt-1 inline-flex font-semibold text-zinc-950 hover:text-zinc-800"
            href={site.links.whatsapp}
          >
            {site.contact.whatsappDisplay}
          </Link>
        </div>
      </div>
    </div>
  );
}

