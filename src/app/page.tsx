import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/Container";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionTitle } from "@/components/SectionTitle";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ContactCard } from "@/components/ContactCard";
import { FeatureGrid } from "@/components/FeatureGrid";
import { LevelCards } from "@/components/LevelCards";

export default function Home() {
  return (
    <div className="min-h-full">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-white to-zinc-50">
          <Container className="py-16 sm:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-sm text-zinc-700">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Inscripciones abiertas
                </p>
                <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                  {site.hero.title}
                </h1>
                <p className="mt-4 max-w-xl text-pretty text-lg leading-8 text-zinc-700">
                  {site.hero.subtitle}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="#admisiones"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
                  >
                    Pedir información
                  </Link>
                  <Link
                    href="#niveles"
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
                  >
                    Ver niveles
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-zinc-700 sm:max-w-md">
                  {site.hero.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-zinc-900" />
                      <span className="leading-6">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <span className="text-xl font-semibold">PG</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-950">
                        {site.shortName}
                      </p>
                      <p className="text-sm text-zinc-600">
                        {site.hero.cardSubtitle}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {site.hero.cardPoints.map((p) => (
                      <div
                        key={p.title}
                        className="rounded-2xl border border-black/10 bg-zinc-50 p-4"
                      >
                        <p className="text-sm font-semibold text-zinc-950">
                          {p.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-zinc-700">
                          {p.text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={site.links.whatsapp}
                      className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-500"
                    >
                      WhatsApp
                    </Link>
                    <Link
                      href="#contacto"
                      className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
                    >
                      Contacto
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="propuesta" className="bg-white">
          <Container className="py-14 sm:py-16">
            <SectionTitle
              eyebrow="Propuesta educativa"
              title={site.valueProp.title}
              subtitle={site.valueProp.subtitle}
            />
            <FeatureGrid />
          </Container>
        </section>

        <section id="niveles" className="border-y border-black/5 bg-zinc-50">
          <Container className="py-14 sm:py-16">
            <SectionTitle
              eyebrow="Niveles"
              title="Un recorrido completo"
              subtitle="Acompañamos cada etapa con un equipo cercano y criterios claros."
            />
            <LevelCards />
          </Container>
        </section>

        <section id="admisiones" className="bg-white">
          <Container className="py-14 sm:py-16">
            <SectionTitle
              eyebrow="Admisiones"
              title="Inscripción simple, acompañada"
              subtitle="Te guiamos paso a paso. Si preferís, escribinos por WhatsApp y te respondemos rápido."
            />

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-zinc-950">
                  Pasos para inscribirse
                </h3>
                <ol className="mt-4 grid gap-3 text-sm leading-6 text-zinc-700">
                  {site.admissions.steps.map((s) => (
                    <li key={s.title} className="flex gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
                        {s.n}
                      </span>
                      <div>
                        <p className="font-semibold text-zinc-950">{s.title}</p>
                        <p className="mt-0.5">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={site.links.whatsapp}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-500"
                  >
                    Consultar por WhatsApp
                  </Link>
                  <Link
                    href="#contacto"
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
                  >
                    Dejar consulta
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-black/10 bg-zinc-50 p-6">
                <h3 className="text-lg font-semibold text-zinc-950">
                  Documentación habitual
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-700">
                  Puede variar según nivel y vacantes. Te confirmamos al momento
                  de la consulta.
                </p>
                <ul className="mt-4 grid gap-2 text-sm text-zinc-700">
                  {site.admissions.docs.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 rounded-full bg-zinc-900" />
                      <span className="leading-6">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section id="contacto" className="border-t border-black/5 bg-zinc-50">
          <Container className="py-14 sm:py-16">
            <SectionTitle
              eyebrow="Contacto"
              title="Hablemos"
              subtitle="Elegí el canal que te resulte más cómodo. Respondemos en horarios administrativos."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <ContactCard />
              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-zinc-950">
                  Consulta rápida
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-700">
                  Este formulario abre tu email con el mensaje ya armado.
                </p>

                <form
                  className="mt-5 grid gap-4"
                  action={`mailto:${encodeURIComponent(
                    site.contact.email,
                  )}?subject=${encodeURIComponent(
                    `Consulta - ${site.shortName}`,
                  )}`}
                  method="post"
                  encType="text/plain"
                >
                  <div className="grid gap-2">
                    <label
                      className="text-sm font-medium text-zinc-900"
                      htmlFor="nombre"
                    >
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="Nombre"
                      required
                      className="h-11 rounded-xl border border-black/10 bg-white px-3 text-sm outline-none ring-zinc-900/10 focus:ring-4"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      className="text-sm font-medium text-zinc-900"
                      htmlFor="telefono"
                    >
                      Teléfono (opcional)
                    </label>
                    <input
                      id="telefono"
                      name="Telefono"
                      className="h-11 rounded-xl border border-black/10 bg-white px-3 text-sm outline-none ring-zinc-900/10 focus:ring-4"
                      placeholder="+54 ..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      className="text-sm font-medium text-zinc-900"
                      htmlFor="mensaje"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="Mensaje"
                      required
                      className="min-h-28 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-zinc-900/10 focus:ring-4"
                      placeholder="Contanos para qué nivel consultás y qué necesitás saber."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
                  >
                    Enviar por email
                  </button>
                  <p className="text-xs leading-5 text-zinc-600">
                    Si no se abre tu cliente de correo, usá el botón de WhatsApp
                    o copiá el email.
                  </p>
                </form>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
