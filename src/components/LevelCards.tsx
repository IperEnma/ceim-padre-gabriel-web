import { site } from "@/lib/site";

export function LevelCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {site.levels.map((l) => (
        <div
          key={l.name}
          className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-zinc-950">{l.name}</p>
              <p className="mt-1 text-sm text-zinc-600">{l.ages}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Nivel
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-zinc-700">{l.text}</p>
          <ul className="mt-5 grid gap-2 text-sm text-zinc-700">
            {l.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span className="mt-2 size-1.5 rounded-full bg-zinc-900" />
                <span className="leading-6">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

