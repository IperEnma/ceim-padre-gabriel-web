"use client";

import Link from "next/link";
import { site } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <Link
        href={site.links.whatsapp}
        className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
        aria-label="Consultar por WhatsApp"
      >
        WhatsApp
      </Link>
    </div>
  );
}

