"use client";
import { useState } from "react";
import { Search } from "lucide-react";

type Props = {
  onSearch: (params: { q?: string; city?: string; min?: string; max?: string }) => void;
};
export default function SearchBar({ onSearch }: Props) {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
      <input className="rounded-xl border border-slate-200 bg-white/60 px-3 py-2 outline-none
                        focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:bg-slate-900"
             placeholder="Search title…" value={q} onChange={e=>setQ(e.target.value)} />
      <input className="rounded-xl border border-slate-200 bg-white/60 px-3 py-2 outline-none
                        focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:bg-slate-900"
             placeholder="City (e.g. Barcelona)" value={city} onChange={e=>setCity(e.target.value)} />
      <input className="rounded-xl border border-slate-200 bg-white/60 px-3 py-2 outline-none
                        focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:bg-slate-900"
             placeholder="Min €" inputMode="numeric" value={min} onChange={e=>setMin(e.target.value)} />
      <input className="rounded-xl border border-slate-200 bg-white/60 px-3 py-2 outline-none
                        focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:bg-slate-900"
             placeholder="Max €" inputMode="numeric" value={max} onChange={e=>setMax(e.target.value)} />
      <button onClick={()=>onSearch({ q, city, min, max })}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white
                         hover:bg-slate-800 active:scale-[.99] dark:bg-slate-100 dark:text-slate-900">
        <Search className="h-4 w-4" />
        Search
      </button>
    </div>
  );
}
