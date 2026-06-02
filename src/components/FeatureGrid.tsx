import { site } from "@/lib/site";

export function FeatureGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {site.features.map((f) => (
        <div
          key={f.title}
          className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-semibold text-zinc-950">{f.title}</p>
          <p className="mt-2 text-sm leading-6 text-zinc-700">{f.text}</p>
        </div>
      ))}
    </div>
  );
}

