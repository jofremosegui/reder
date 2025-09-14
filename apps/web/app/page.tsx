"use client";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ListingCard, { Listing } from "../components/ListingCard";


export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async (params?: URLSearchParams) => {
    setLoading(true);
    const url = params ? `/api/listings?${params.toString()}` : "/api/listings";
    const res = await fetch(url);
    setListings(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchListings(); }, []);

  const onSearch = (p: { q?: string; city?: string; min?: string; max?: string }) => {
    const u = new URLSearchParams();
    if (p.q) u.set("q", p.q);
    if (p.city) u.set("city", p.city);
    if (p.min) u.set("min_price", p.min);
    if (p.max) u.set("max_price", p.max);
    fetchListings(u);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur
                      dark:border-slate-800 dark:bg-slate-900/60">
        <SearchBar onSearch={onSearch} />
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/50" />
          ))}
        </div>
      ) : listings.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {listings.map(l => <ListingCard key={l.id} l={l} />)}
        </div>
      ) : (
        <p className="text-slate-500">No results. Try broadening your filters.</p>
      )}
    </div>
  );
}
