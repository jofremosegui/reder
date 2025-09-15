"use client";

import { useRouter } from "next/navigation";
import SearchBar from "../components/SearchBar";

const cities = ["Barcelona", "Madrid", "València", "Sevilla", "Bilbao", "Màlaga"];

export default function Landing() {
  const router = useRouter();

  const onSearch = (p: { q?: string; city?: string; min?: string; max?: string }) => {
    const u = new URLSearchParams();
    if (p.q) u.set("q", p.q);
    if (p.city) u.set("city", p.city);
    if (p.min) u.set("min_price", p.min);
    if (p.max) u.set("max_price", p.max);
    router.push(`/search?${u.toString()}`);
  };

  const jumpToCity = (city: string) => {
    const u = new URLSearchParams({ city });
    router.push(`/search?${u.toString()}`);
  };

  return (
    <div className="space-y-14">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white shadow-sm dark:border-slate-800">
        <div className="relative z-10 mx-auto max-w-5xl">
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Troba pis fàcilment. <span className="opacity-90">Sense drama.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-slate-200">
            Busca per ciutat, preu i paraules clau. Desa favorits i comparteix amb el teu equip.
          </p>

          <div className="mt-6 rounded-2xl bg-white/10 p-4 backdrop-blur">
            <SearchBar onSearch={onSearch} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => jumpToCity(c)}
                className="rounded-full bg-white/15 px-3 py-1 text-sm hover:bg-white/25"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* subtle decorative bg */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </section>

      {/* FEATURES */}
      <section className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Filtres intel·ligents",
            desc: "Preu, barri i paraules clau perquè trobis el que busques ràpid.",
          },
          {
            title: "Sense fricció",
            desc: "UI ràpida, clara i pensada per compartir amb amics o companys de pis.",
          },
          {
            title: "Escalable",
            desc: "Aviat: backend real, favorits, alerts i ingestió multi-portal.",
          },
        ].map((f) => (
          <article
            key={f.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-base font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold">Comença a cercar ara</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Explora pisos i comparteix resultats amb el teu equip.</p>
        <button
          onClick={() => router.push("/search")}
          className="mt-4 rounded-xl bg-slate-900 px-5 py-2 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900"
        >
          Anar al cercador
        </button>
      </section>
    </div>
  );
}
